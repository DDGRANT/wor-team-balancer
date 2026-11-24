let selectedAnim = "simple";
let activeAnimRaf = null;
let activeInterval = null;
let isAnimating = false;
let currentDrawnMap = null;
let scratchRevealed = false;

window.addEventListener("DOMContentLoaded", async () => {
  const core = window.WoRMapCore;
  core.loadState();
  core.bindLanguageButtons(() => refreshDrawUI());
  core.bindInspectorModal(() => refreshDrawUI());

  await core.loadDatabase();
  bindDrawPageEvents();
  refreshDrawUI();
});

function bindDrawPageEvents() {
  const core = window.WoRMapCore;

  // Mode cards
  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (isAnimating) return;
      core.poolState.selectedMode = card.getAttribute("data-mode") || "skirmish";
      core.poolState.selectedCampaign = "ALL";
      core.saveState();
      refreshDrawUI();
    });
  });

  // Campaign filters
  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (isAnimating) return;
      core.poolState.selectedCampaign = btn.getAttribute("data-camp") || "ALL";
      core.saveState();
      refreshDrawUI();
    });
  });

  // Animation selector cards
  document.querySelectorAll(".anim-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (isAnimating) return;
      selectedAnim = card.getAttribute("data-anim") || "simple";
      document.querySelectorAll(".anim-card").forEach((c) => {
        c.classList.toggle("active", c.getAttribute("data-anim") === selectedAnim);
      });
    });
  });

  // No-replacement checkbox
  const noRepChk = document.getElementById("noReplacementChk");
  noRepChk.checked = core.poolState.noReplacement;
  noRepChk.addEventListener("change", () => {
    core.poolState.noReplacement = noRepChk.checked;
    core.saveState();
  });

  // Start draw button
  document.getElementById("startDrawBtn").addEventListener("click", startDrawSequence);

  // Scratch reveal button
  document.getElementById("revealScratchNowBtn").addEventListener("click", () => {
    if (currentDrawnMap && !scratchRevealed) {
      scratchRevealed = true;
      const canvas = document.getElementById("scratchCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      finalizeDrawnMap(currentDrawnMap);
    }
  });

  // Open inspector
  document.getElementById("openDrawnInspectorBtn").addEventListener("click", () => {
    if (currentDrawnMap) core.openInspector(currentDrawnMap.slug, 0);
  });

  // Put back drawn map
  document.getElementById("putBackDrawnBtn").addEventListener("click", () => {
    if (!currentDrawnMap) return;
    delete core.poolState.disabledMapSlugs[currentDrawnMap.slug];
    delete core.poolState.disableReasons[currentDrawnMap.slug];
    core.poolState.drawHistory = core.poolState.drawHistory.filter((h) => h.slug !== currentDrawnMap.slug);
    core.saveState();
    refreshDrawUI();
    alert(`已将 "${currentDrawnMap.name}" 放回抽取池！`);
  });

  // Restore all history
  document.getElementById("restoreAllHistoryBtn").addEventListener("click", () => {
    core.poolState.drawHistory.forEach((h) => {
      delete core.poolState.disabledMapSlugs[h.slug];
      delete core.poolState.disableReasons[h.slug];
    });
    core.poolState.drawHistory = [];
    core.saveState();
    refreshDrawUI();
  });

  // Copy result
  document.getElementById("copyDrawResultBtn").addEventListener("click", copyResultText);
}

function getCandidatePool() {
  const core = window.WoRMapCore;
  return core.allMaps.filter((m) => {
    if (m.mode !== core.poolState.selectedMode) return false;
    if (core.poolState.disabledMapSlugs[m.slug]) return false;
    if (core.poolState.selectedCampaign !== "ALL" && m.campaign !== core.poolState.selectedCampaign) return false;
    return true;
  });
}

function refreshDrawUI() {
  const core = window.WoRMapCore;

  ["skirmish", "conquest", "picket_patrol", "onslaught", "drill_camp"].forEach((mode) => {
    const modeMaps = core.allMaps.filter((m) => m.mode === mode);
    const activeCount = modeMaps.filter((m) => !core.poolState.disabledMapSlugs[m.slug]).length;
    const countEl = document.getElementById(`count_${mode}`);
    if (countEl) countEl.textContent = `${activeCount} / ${modeMaps.length}`;
  });

  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    card.classList.toggle("active", card.getAttribute("data-mode") === core.poolState.selectedMode);
  });

  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-camp") === core.poolState.selectedCampaign);
  });

  const candidates = getCandidatePool();
  const modeTotal = core.allMaps.filter((m) => m.mode === core.poolState.selectedMode).length;
  document.getElementById("drawPoolStatus").textContent = `当前筛选可抽池 Active Pool: ${candidates.length} 张 (模式总计 ${modeTotal} 张)`;

  renderHistoryChips();
}

function renderHistoryChips() {
  const core = window.WoRMapCore;
  const panel = document.getElementById("historyPanel");
  const chipsEl = document.getElementById("historyChips");
  const hist = core.poolState.drawHistory || [];

  if (hist.length === 0) {
    panel.classList.add("hidden");
    return;
  }

  panel.classList.remove("hidden");
  chipsEl.innerHTML = hist.map((item, idx) => `
    <span class="history-chip">
      <span>#${idx + 1} <strong>${core.escapeHtml(item.name)}</strong> (${core.escapeHtml(item.campaign)})</span>
      <button type="button" onclick="restoreSingleHistory('${item.slug}')">放回</button>
    </span>
  `).join("");
}

window.restoreSingleHistory = function (slug) {
  const core = window.WoRMapCore;
  delete core.poolState.disabledMapSlugs[slug];
  delete core.poolState.disableReasons[slug];
  core.poolState.drawHistory = core.poolState.drawHistory.filter((h) => h.slug !== slug);
  core.saveState();
  refreshDrawUI();
};

function stopAllAnimations() {
  if (activeAnimRaf) {
    cancelAnimationFrame(activeAnimRaf);
    activeAnimRaf = null;
  }
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
  isAnimating = false;
}

function hideAllStages() {
  document.getElementById("stagePlaceholder").classList.add("hidden");
  document.getElementById("simpleStage").classList.add("hidden");
  document.getElementById("scratchStage").classList.add("hidden");
  document.getElementById("canvasStage").classList.add("hidden");
}

function startDrawSequence() {
  if (isAnimating) return;
  const pool = getCandidatePool();
  if (pool.length === 0) {
    alert("当前筛选条件下可用地图池为空！请切换模式/战役，或前往“地图池管理”页面重新启用地图。");
    return;
  }

  stopAllAnimations();
  hideAllStages();
  document.getElementById("drawResultBox").classList.add("hidden");
  document.getElementById("stagePanel").classList.add("active-glow");

  // 预先决定本次随机抽中的目标地图（确保绝对公平等概率）
  const winner = pool[Math.floor(Math.random() * pool.length)];
  currentDrawnMap = winner;

  if (selectedAnim === "simple") {
    runSimpleAnimation(pool, winner);
  } else if (selectedAnim === "scratch") {
    runScratchCardAnimation(winner);
  } else if (selectedAnim === "wheel") {
    runWheelAnimation(pool, winner);
  } else if (selectedAnim === "pachinko") {
    runPachinkoAnimation(pool, winner);
  } else if (selectedAnim === "lottery") {
    runLotteryAnimation(pool, winner);
  } else if (selectedAnim === "horserace") {
    runHorseRaceAnimation(pool, winner);
  }
}

function finalizeDrawnMap(winner) {
  isAnimating = false;
  const core = window.WoRMapCore;

  // 原则上每次抽出的地图都不放回池中
  if (core.poolState.noReplacement) {
    core.poolState.disabledMapSlugs[winner.slug] = true;
    const nowStr = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    core.poolState.disableReasons[winner.slug] = `已抽取 (${nowStr})`;
    if (!core.poolState.drawHistory.some((h) => h.slug === winner.slug)) {
      core.poolState.drawHistory.push({
        slug: winner.slug,
        name: winner.name,
        campaign: winner.campaign_name || winner.campaign,
        mode: winner.mode_name || winner.mode,
        time: nowStr
      });
    }
    core.saveState();
  }

  const att = winner.attacker ? winner.attacker.toUpperCase() : "Neutral";
  const def = winner.defender ? winner.defender.toUpperCase() : "Neutral";

  document.getElementById("drawResultBox").classList.remove("hidden");
  document.getElementById("drawnMapName").textContent = winner.name;
  document.getElementById("drawnCampTag").textContent = `Campaign: ${winner.campaign_name || winner.campaign}`;
  document.getElementById("drawnRoleTag").textContent = `攻 Att: ${att} / 守 Def: ${def}`;
  document.getElementById("drawnSlotsTag").textContent = `Units: ${winner.unit_slots || "-"} 槽`;
  document.getElementById("drawnFinalPushTag").textContent = `Final Push: ${winner.final_push || "-"}`;
  document.getElementById("drawnUsaTickets").textContent = winner.usa_tickets !== null ? `${winner.usa_tickets}` : "-";
  document.getElementById("drawnCsaTickets").textContent = winner.csa_tickets !== null ? `${winner.csa_tickets}` : "-";

  refreshDrawUI();
}

// ==========================================
// 动画 1: 最简易滚动 (Simple Roll)
// ==========================================
function runSimpleAnimation(pool, winner) {
  isAnimating = true;
  const stage = document.getElementById("simpleStage");
  const ticker = document.getElementById("simpleTickerText");
  stage.classList.remove("hidden");

  let step = 0;
  const totalSteps = 22;
  activeInterval = setInterval(() => {
    step++;
    if (step < totalSteps) {
      const rnd = pool[Math.floor(Math.random() * pool.length)];
      ticker.textContent = `🎲 ${rnd.name}`;
      ticker.style.color = "#cbd2df";
    } else {
      clearInterval(activeInterval);
      activeInterval = null;
      ticker.textContent = `🎯 ${winner.name}`;
      ticker.style.color = "#c8a252";
      finalizeDrawnMap(winner);
    }
  }, 65);
}

// ==========================================
// 动画 2: 刮刮乐彩票 (Scratch Card)
// ==========================================
function runScratchCardAnimation(winner) {
  isAnimating = true;
  scratchRevealed = false;
  const stage = document.getElementById("scratchStage");
  stage.classList.remove("hidden");

  document.getElementById("scratchCampText").textContent = `${winner.campaign_name || winner.campaign} · ${winner.mode_name || winner.mode}`;
  document.getElementById("scratchMapText").textContent = winner.name;
  const tInfo = winner.usa_tickets !== null
    ? `USA ${winner.usa_tickets} vs CSA ${winner.csa_tickets} | Final Push: ${winner.final_push}`
    : `Units: ${winner.unit_slots || "-"} 槽 | 宽度: ${Math.round(winner.ground_width_meters || 0)}m`;
  document.getElementById("scratchStatsText").textContent = tInfo;

  const canvas = document.getElementById("scratchCanvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";

  // 绘制银灰色刮刮乐涂层
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#7c8594");
  grad.addColorStop(0.5, "#a6b0c0");
  grad.addColorStop(1, "#6c7482");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#4d5563";
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  ctx.fillStyle = "#1d222a";
  ctx.font = "bold 22px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🪙 刮开此涂层揭晓中奖地图", canvas.width / 2, 92);
  ctx.font = "14px 'Microsoft YaHei', sans-serif";
  ctx.fillText("SCRATCH HERE TO REVEAL MAP", canvas.width / 2, 122);

  let drawing = false;
  let strokeCount = 0;

  function scratchAt(clientX, clientY) {
    if (scratchRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    strokeCount++;
    if (strokeCount % 12 === 0) {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < imgData.length; i += 16) {
        if (imgData[i] === 0) cleared++;
      }
      const ratio = cleared / (imgData.length / 16);
      if (ratio > 0.45 && !scratchRevealed) {
        scratchRevealed = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        finalizeDrawnMap(winner);
      }
    }
  }

  canvas.onmousedown = (e) => { drawing = true; scratchAt(e.clientX, e.clientY); };
  canvas.onmousemove = (e) => { if (drawing) scratchAt(e.clientX, e.clientY); };
  window.onmouseup = () => { drawing = false; };
  canvas.ontouchstart = (e) => { e.preventDefault(); drawing = true; scratchAt(e.touches[0].clientX, e.touches[0].clientY); };
  canvas.ontouchmove = (e) => { e.preventDefault(); if (drawing) scratchAt(e.touches[0].clientX, e.touches[0].clientY); };
  canvas.ontouchend = () => { drawing = false; };
}

// 辅助函数：从池中抽取 N 个展示切片（确保包含 winner）
function buildSampleSlices(pool, winner, maxCount) {
  if (pool.length <= maxCount) return [...pool];
  const others = pool.filter((m) => m.slug !== winner.slug);
  // 洗牌取前 maxCount - 1 个
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  const selected = others.slice(0, maxCount - 1);
  const insertPos = Math.floor(Math.random() * (selected.length + 1));
  selected.splice(insertPos, 0, winner);
  return selected;
}

// ==========================================
// 动画 3: 幸运大转盘 (Wheel of Fortune)
// ==========================================
function runWheelAnimation(pool, winner) {
  isAnimating = true;
  const stage = document.getElementById("canvasStage");
  const canvas = document.getElementById("animCanvas");
  const statusEl = document.getElementById("canvasStatusText");
  stage.classList.remove("hidden");
  canvas.width = 760;
  canvas.height = 460;
  const ctx = canvas.getContext("2d");

  const slices = buildSampleSlices(pool, winner, 12);
  const n = slices.length;
  const winnerIdx = slices.findIndex((s) => s.slug === winner.slug);
  const arc = (Math.PI * 2) / n;

  // 指针在正上方 (-Math.PI / 2)，计算让 winnerIdx 正好停在指针下的目标角度
  const targetCenterAngle = winnerIdx * arc + arc / 2;
  const extraSpins = 6 * Math.PI * 2;
  const finalRotation = extraSpins + (-Math.PI / 2 - targetCenterAngle);

  const duration = 4200;
  const startTime = performance.now();
  const colors = ["#1f4268", "#4b4f56", "#2b547e", "#3c4149", "#244c75", "#565b64"];

  statusEl.textContent = "🎡 幸运大转盘旋转中...";

  function renderWheel(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Cubic ease-out
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentRot = finalRotation * ease;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 12;
    const radius = 195;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentRot);

    for (let i = 0; i < n; i++) {
      const startA = i * arc;
      const endA = startA + arc;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#c8a252";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 文字
      ctx.save();
      ctx.rotate(startA + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px 'Microsoft YaHei', sans-serif";
      const label = slices[i].name.length > 18 ? slices[i].name.slice(0, 17) + "…" : slices[i].name;
      ctx.fillText(label, radius - 14, 4);
      ctx.restore();
    }
    ctx.restore();

    // 中心圆盘
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = "#c8a252";
    ctx.fill();
    ctx.fillStyle = "#14171c";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WoR", cx, cy + 4);

    // 顶部指针
    ctx.beginPath();
    ctx.moveTo(cx - 14, cy - radius - 14);
    ctx.lineTo(cx + 14, cy - radius - 14);
    ctx.lineTo(cx, cy - radius + 12);
    ctx.closePath();
    ctx.fillStyle = "#f28b82";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (progress < 1) {
      activeAnimRaf = requestAnimationFrame(renderWheel);
    } else {
      statusEl.textContent = `🎯 指针锁定：${winner.name}！`;
      finalizeDrawnMap(winner);
    }
  }

  activeAnimRaf = requestAnimationFrame(renderWheel);
}

// ==========================================
// 动画 4: 柏青哥弹珠 (Pachinko Pinball)
// ==========================================
function runPachinkoAnimation(pool, winner) {
  isAnimating = true;
  const stage = document.getElementById("canvasStage");
  const canvas = document.getElementById("animCanvas");
  const statusEl = document.getElementById("canvasStatusText");
  stage.classList.remove("hidden");
  canvas.width = 840;
  canvas.height = 460;
  const ctx = canvas.getContext("2d");

  const slots = buildSampleSlices(pool, winner, 7);
  const slotCount = slots.length;
  const winnerIdx = slots.findIndex((s) => s.slug === winner.slug);
  const slotW = (canvas.width - 80) / slotCount;
  const targetX = 40 + winnerIdx * slotW + slotW / 2;

  // 生成钉阵
  const pegs = [];
  const rows = 6;
  for (let r = 0; r < rows; r++) {
    const y = 95 + r * 44;
    const cols = r % 2 === 0 ? 11 : 10;
    const offsetX = r % 2 === 0 ? 70 : 105;
    const spacing = (canvas.width - 140) / 10;
    for (let c = 0; c < cols; c++) {
      pegs.push({ x: offsetX + c * spacing, y });
    }
  }

  let ball = {
    x: canvas.width / 2 + (Math.random() - 0.5) * 80,
    y: 35,
    vx: (Math.random() - 0.5) * 3,
    vy: 1.5,
    r: 10
  };

  statusEl.textContent = "🎰 柏青哥弹珠下落中...";

  function stepPachinko() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制底部获奖槽
    const slotTop = canvas.height - 75;
    for (let i = 0; i < slotCount; i++) {
      const sx = 40 + i * slotW;
      ctx.fillStyle = i === winnerIdx && ball.y >= slotTop ? "rgba(200,162,82,0.35)" : "#191f29";
      ctx.fillRect(sx, slotTop, slotW - 4, 62);
      ctx.strokeStyle = "#c8a252";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sx, slotTop, slotW - 4, 62);

      ctx.fillStyle = "#e6e8ec";
      ctx.font = "bold 11px 'Microsoft YaHei', sans-serif";
      ctx.textAlign = "center";
      const nm = slots[i].name.length > 12 ? slots[i].name.slice(0, 11) + "…" : slots[i].name;
      ctx.fillText(nm, sx + (slotW - 4) / 2, slotTop + 36);
    }

    // 绘制钉子
    ctx.fillStyle = "#8ab4f8";
    pegs.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // 简单碰撞反弹
      const dx = ball.x - p.x;
      const dy = ball.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < ball.r + 4) {
        const angle = Math.atan2(dy, dx);
        ball.vx = Math.cos(angle) * 3.2 + (targetX - ball.x) * 0.012;
        ball.vy = Math.abs(Math.sin(angle)) * 2.2 + 1.2;
        ball.x = p.x + Math.cos(angle) * (ball.r + 5);
        ball.y = p.y + Math.sin(angle) * (ball.r + 5);
      }
    });

    // 重力与温和向目标槽引导（保证最后自然落入事先随机选定的 winner 槽）
    ball.vy += 0.16;
    const progressY = Math.max(0, Math.min(1, ball.y / slotTop));
    ball.vx += (targetX - ball.x) * (0.0018 + progressY * 0.004);
    ball.vx *= 0.96;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x < 45) { ball.x = 45; ball.vx *= -0.7; }
    if (ball.x > canvas.width - 45) { ball.x = canvas.width - 45; ball.vx *= -0.7; }

    // 绘制金色弹珠
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#f0b866";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (ball.y < slotTop + 22) {
      activeAnimRaf = requestAnimationFrame(stepPachinko);
    } else {
      statusEl.textContent = `🎯 弹珠落入：${winner.name}！`;
      finalizeDrawnMap(winner);
    }
  }

  activeAnimRaf = requestAnimationFrame(stepPachinko);
}

// ==========================================
// 动画 5: 六合彩出彩球 (Lottery Drum)
// ==========================================
function runLotteryAnimation(pool, winner) {
  isAnimating = true;
  const stage = document.getElementById("canvasStage");
  const canvas = document.getElementById("animCanvas");
  const statusEl = document.getElementById("canvasStatusText");
  stage.classList.remove("hidden");
  canvas.width = 760;
  canvas.height = 440;
  const ctx = canvas.getContext("2d");

  const sampleBalls = buildSampleSlices(pool, winner, 14);
  const ballColors = ["#e06c75", "#61afef", "#98c379", "#e5c07b", "#c678dd", "#56b6c2"];
  const cx = canvas.width / 2 - 80;
  const cy = canvas.height / 2;
  const drumR = 165;

  const balls = sampleBalls.map((m, idx) => ({
    map: m,
    num: idx + 1,
    x: cx + (Math.random() - 0.5) * 140,
    y: cy + (Math.random() - 0.5) * 140,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.5) * 14,
    color: ballColors[idx % ballColors.length],
    isWinner: m.slug === winner.slug
  }));

  const startTime = performance.now();
  const mixDuration = 2800;
  const ejectDuration = 1200;

  statusEl.textContent = "🎱 六合彩搅珠机高速搅拌中...";

  function stepLottery(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 搅珠机玻璃球罩
    ctx.beginPath();
    ctx.arc(cx, cy, drumR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fill();
    ctx.strokeStyle = "#c8a252";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 右侧出球管道
    ctx.strokeStyle = "#4b5568";
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.moveTo(cx + drumR - 8, cy);
    ctx.lineTo(cx + drumR + 180, cy);
    ctx.stroke();

    balls.forEach((b) => {
      if (elapsed >= mixDuration && b.isWinner) {
        // 赢家彩球沿管道滚出并放大展示
        const p = Math.min(1, (elapsed - mixDuration) / ejectDuration);
        b.x = cx + drumR + p * 160;
        b.y = cy;
      } else {
        b.vy += 0.35; // 重力
        // 底部气流吹起
        if (b.y > cy + drumR - 45) {
          b.vy -= (6 + Math.random() * 6);
          b.vx += (Math.random() - 0.5) * 8;
        }
        b.x += b.vx;
        b.y += b.vy;

        const dx = b.x - cx;
        const dy = b.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > drumR - 20) {
          const ang = Math.atan2(dy, dx);
          b.x = cx + Math.cos(ang) * (drumR - 20);
          b.y = cy + Math.sin(ang) * (drumR - 20);
          b.vx *= -0.85;
          b.vy *= -0.85;
        }
      }

      const r = (elapsed >= mixDuration && b.isWinner) ? 34 : 18;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#14171c";
      ctx.font = `bold ${r > 20 ? 15 : 11}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(`#${b.num}`, b.x, b.y + 4);
    });

    if (elapsed >= mixDuration) {
      const p = Math.min(1, (elapsed - mixDuration) / ejectDuration);
      if (p > 0.3) {
        ctx.fillStyle = "#c8a252";
        ctx.font = "bold 20px 'Microsoft YaHei', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(winner.name, cx + drumR + 160, cy + 68);
      }
    }

    if (elapsed < mixDuration + ejectDuration) {
      activeAnimRaf = requestAnimationFrame(stepLottery);
    } else {
      statusEl.textContent = `🎯 开出中奖彩球：${winner.name}！`;
      finalizeDrawnMap(winner);
    }
  }

  activeAnimRaf = requestAnimationFrame(stepLottery);
}

// ==========================================
// 动画 6: 西部赛马 (Horse Racing)
// ==========================================
function runHorseRaceAnimation(pool, winner) {
  isAnimating = true;
  const stage = document.getElementById("canvasStage");
  const canvas = document.getElementById("animCanvas");
  const statusEl = document.getElementById("canvasStatusText");
  stage.classList.remove("hidden");
  canvas.width = 880;
  canvas.height = 420;
  const ctx = canvas.getContext("2d");

  const racers = buildSampleSlices(pool, winner, 6);
  const laneCount = racers.length;
  const startX = 70;
  const finishX = canvas.width - 90;
  const laneH = (canvas.height - 60) / laneCount;

  const horses = racers.map((m, idx) => ({
    map: m,
    x: startX,
    isWinner: m.slug === winner.slug,
    baseSpeed: 2.4 + Math.random() * 0.8
  }));

  statusEl.textContent = "🏇 骑兵赛马冲刺中...";

  function stepRace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 跑道背景与终点黑白格线
    for (let i = 0; i < laneCount; i++) {
      const y = 30 + i * laneH;
      ctx.fillStyle = i % 2 === 0 ? "#181e27" : "#141920";
      ctx.fillRect(30, y, canvas.width - 60, laneH);
      ctx.strokeStyle = "#2b3340";
      ctx.strokeRect(30, y, canvas.width - 60, laneH);

      // 跑道左侧地图名标签
      ctx.fillStyle = "#cbd2df";
      ctx.font = "bold 12px 'Microsoft YaHei', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${i + 1}. ${horses[i].map.name}`, 42, y + laneH / 2 + 4);
    }

    // 终点线
    ctx.strokeStyle = "#c8a252";
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(finishX, 30);
    ctx.lineTo(finishX, canvas.height - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    let winnerCrossed = false;

    horses.forEach((h, i) => {
      const y = 30 + i * laneH + laneH / 2;
      const progress = (h.x - startX) / (finishX - startX);
      // 冲刺阶段让 winner 稳步超越冲线
      let boost = (Math.random() - 0.35) * 2.2;
      if (progress > 0.65) {
        boost += h.isWinner ? 1.35 : -0.45;
      }
      h.x += Math.max(0.8, h.baseSpeed + boost);

      if (h.isWinner && h.x >= finishX) {
        winnerCrossed = true;
      } else if (!h.isWinner && h.x >= finishX - 12) {
        h.x = finishX - 12;
      }

      // 绘制战马图标（镜像朝右奔跑）
      ctx.save();
      ctx.translate(h.x, y + 6);
      ctx.scale(-1, 1);
      ctx.font = "26px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🏇", 0, 0);
      ctx.restore();
    });

    if (!winnerCrossed) {
      activeAnimRaf = requestAnimationFrame(stepRace);
    } else {
      statusEl.textContent = `🏆 冲线夺冠：${winner.name}！`;
      finalizeDrawnMap(winner);
    }
  }

  activeAnimRaf = requestAnimationFrame(stepRace);
}

function copyResultText() {
  if (!currentDrawnMap) return;
  const m = currentDrawnMap;
  const att = m.attacker ? m.attacker.toUpperCase() : "Neutral";
  const def = m.defender ? m.defender.toUpperCase() : "Neutral";

  const lines = [
    `【War of Rights 联队活动地图抽取结果 Event Map Draw】`,
    `🗺️ 抽中地图 Selected Map：${m.name} (${m.campaign_name || m.campaign} - ${m.mode_name || m.mode})`,
    `⚔️ 攻守阵营 Roles：攻 Attacker ${att} | 守 Defender ${def} | Final Push: ${m.final_push || "-"}`
  ];

  if (m.usa_tickets !== null) {
    lines.push(`🎫 双方票数 Tickets：USA ${m.usa_tickets} vs CSA ${m.csa_tickets} (总计 Total: ${m.total_tickets})`);
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const status = document.getElementById("mapCopyStatus");
    if (status) {
      status.textContent = "✔ 已复制到剪贴板！Copied!";
      setTimeout(() => (status.textContent = ""), 3000);
    }
  });
}
