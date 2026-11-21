// 本地存储 Key 定义（升级 Key 避免旧缓存数据格式冲突）
const STORAGE_KEY_AUTO = "wor_balancer_autosave_v4";
const STORAGE_KEY_PRESET = "wor_balancer_preset_v4";

// 核心数据模型
let entryRows = []; // [{ id, name, min, max, lockedFaction }]
let auditRules = []; // [{ id, tag, factor, delta, reason }]
let currentState = { usa: [], csa: [] };

// DOM 引用
const tabTableBtn = document.getElementById("tabTableBtn");
const tabTextBtn = document.getElementById("tabTextBtn");
const tableInputView = document.getElementById("tableInputView");
const textInputView = document.getElementById("textInputView");
const entryTbody = document.getElementById("entryTbody");
const auditTbody = document.getElementById("auditTbody");
const rosterInput = document.getElementById("rosterInput");
const balanceModeSelect = document.getElementById("balanceMode");
const parseWarning = document.getElementById("parseWarning");
const saveIndicator = document.getElementById("saveIndicator");

// 初始化加载本地记忆
window.addEventListener("DOMContentLoaded", () => {
  loadFromAutoSave();
});

// 视图 Tab 切换
tabTableBtn.addEventListener("click", () => switchInputTab("table"));
tabTextBtn.addEventListener("click", () => {
  syncTableToText();
  switchInputTab("text");
});

function switchInputTab(tab) {
  if (tab === "table") {
    tabTableBtn.classList.add("active");
    tabTextBtn.classList.remove("active");
    tableInputView.classList.remove("hidden");
    textInputView.classList.add("hidden");
  } else {
    tabTextBtn.classList.add("active");
    tabTableBtn.classList.remove("active");
    textInputView.classList.remove("hidden");
    tableInputView.classList.add("hidden");
  }
}

// 添加报名兵团行
document.getElementById("addRowBtn").addEventListener("click", () => {
  entryRows.push(createEmptyRow());
  renderEntryTable();
  saveToAutoSave();
});

// 添加虚报/少报修正规则行
document.getElementById("addAuditBtn").addEventListener("click", () => {
  auditRules.push({
    id: genId(),
    tag: "",
    factor: 1.0,
    delta: 0,
    reason: ""
  });
  renderAuditTable();
  saveToAutoSave();
});

// 文本解析并同步到表格
document.getElementById("parseToTableBtn").addEventListener("click", () => {
  const { teams, invalidLines } = parseInputText(rosterInput.value);
  showWarnings(invalidLines);

  if (teams.length > 0) {
    entryRows = teams.map((t) => ({
      id: t.id,
      name: t.name,
      min: t.min,
      max: t.max,
      lockedFaction: t.lockedFaction
    }));
    renderEntryTable();
    saveToAutoSave();
    switchInputTab("table");
  }
});

// 存为常用名单模板
document.getElementById("savePresetBtn").addEventListener("click", () => {
  const validRows = entryRows.filter((r) => r.name.trim() !== "");
  if (validRows.length === 0) {
    alert("当前表格没有可保存的有效兵团数据！");
    return;
  }
  localStorage.setItem(STORAGE_KEY_PRESET, JSON.stringify(validRows));
  flashSaveIndicator("✔ 已保存为常用名单模板！");
});

// 载入常用名单模板
document.getElementById("loadPresetBtn").addEventListener("click", () => {
  const raw = localStorage.getItem(STORAGE_KEY_PRESET);
  if (!raw) {
    alert("尚未保存过常用名单模板！请先录入兵团后点击“存为常用名单”。");
    return;
  }
  try {
    const presetRows = JSON.parse(raw);
    entryRows = presetRows.map((r) => ({ ...r, id: genId() }));
    renderEntryTable();
    syncTableToText();
    saveToAutoSave();
    runBalance();
    flashSaveIndicator("✔ 已载入常用名单！");
  } catch (e) {
    alert("读取常用名单失败。");
  }
});

// 导出 JSON 配置文件
document.getElementById("exportJsonBtn").addEventListener("click", () => {
  const backupData = {
    version: "WoR-Balancer-v4",
    exportedAt: new Date().toISOString(),
    balanceMode: balanceModeSelect.value,
    entryRows,
    auditRules,
    presetRows: JSON.parse(localStorage.getItem(STORAGE_KEY_PRESET) || "[]")
  };
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `WoR_队伍平衡配置_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
  flashSaveIndicator("✔ 已导出 JSON 配置文件！");
});

// 导入 JSON 配置文件
const importJsonInput = document.getElementById("importJsonInput");
document.getElementById("importJsonBtn").addEventListener("click", () => {
  importJsonInput.click();
});

importJsonInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data.entryRows)) {
        entryRows = data.entryRows.length > 0 ? data.entryRows : [createEmptyRow()];
      }
      if (Array.isArray(data.auditRules)) {
        auditRules = data.auditRules;
      }
      if (Array.isArray(data.presetRows) && data.presetRows.length > 0) {
        localStorage.setItem(STORAGE_KEY_PRESET, JSON.stringify(data.presetRows));
      }
      if (data.balanceMode) {
        balanceModeSelect.value = data.balanceMode;
      }
      renderEntryTable();
      renderAuditTable();
      syncTableToText();
      saveToAutoSave();
      runBalance();
      flashSaveIndicator("✔ JSON 配置导入成功！");
    } catch (err) {
      alert("JSON 文件格式不正确，导入失败。");
    }
    importJsonInput.value = "";
  };
  reader.readAsText(file);
});

// 填入示例数据（含虚报/少报示例）
document.getElementById("sampleBtn").addEventListener("click", () => {
  entryRows = [
    { id: genId(), name: "[FEX]", min: 15, max: 20, lockedFaction: null },
    { id: genId(), name: "[HD]", min: 25, max: 30, lockedFaction: null },
    { id: genId(), name: "[1stTX]", min: 12, max: 16, lockedFaction: null },
    { id: genId(), name: "[69thNY]", min: 20, max: 25, lockedFaction: null },
    { id: genId(), name: "[4thVA]", min: 10, max: 14, lockedFaction: "CSA" },
    { id: genId(), name: "[20thME]", min: 14, max: 18, lockedFaction: "USA" },
    { id: genId(), name: "[9thNY]", min: 8, max: 10, lockedFaction: null },
    { id: genId(), name: "散人玩家", min: 10, max: 15, lockedFaction: null }
  ];

  if (auditRules.length === 0) {
    auditRules = [
      {
        id: genId(),
        tag: "[69thNY]",
        factor: 0.8,
        delta: 0,
        reason: "近三次联队实际到场率约 80%，按八折修正虚报"
      },
      {
        id: genId(),
        tag: "[9thNY]",
        factor: 1.0,
        delta: 3,
        reason: "保守少报倾向，实际开战后通常多到 3 人左右"
      }
    ];
  }

  parseWarning.classList.add("hidden");
  renderAuditTable();
  renderEntryTable();
  syncTableToText();
  saveToAutoSave();
  runBalance();
});

// 清空报名表
document.getElementById("clearBtn").addEventListener("click", () => {
  entryRows = [createEmptyRow()];
  rosterInput.value = "";
  currentState = { usa: [], csa: [] };
  parseWarning.classList.add("hidden");
  renderEntryTable();
  renderResultTables();
  saveToAutoSave();
});

// 策略切换
balanceModeSelect.addEventListener("change", () => {
  saveToAutoSave();
  if (getCleanRowsFromEntry().length > 0) {
    runBalance();
  }
});

// 点击“开始自动平衡”
document.getElementById("balanceBtn").addEventListener("click", () => {
  if (!textInputView.classList.contains("hidden")) {
    const { teams, invalidLines } = parseInputText(rosterInput.value);
    showWarnings(invalidLines);
    if (teams.length > 0) {
      entryRows = teams.map((t) => ({
        id: t.id,
        name: t.name,
        min: t.min,
        max: t.max,
        lockedFaction: t.lockedFaction
      }));
      renderEntryTable();
    }
  }
  runBalance();
});

// 导出按钮绑定
document.getElementById("copyTextBtn").addEventListener("click", copyScheduleText);
document.getElementById("generateImgBtn").addEventListener("click", generateScheduleImage);
document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("imageModal").classList.add("hidden");
});

function genId() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function createEmptyRow() {
  return { id: genId(), name: "", min: 10, max: 15, lockedFaction: null };
}

function normalizeTag(str) {
  return String(str || "")
    .replace(/[\[\]【】\(\)（）\s]/g, "")
    .toUpperCase();
}

function findAuditRuleForTeam(teamName) {
  const normName = normalizeTag(teamName);
  if (!normName) return null;
  return auditRules.find((r) => {
    const normRule = normalizeTag(r.tag);
    if (!normRule) return false;
    return normName === normRule || normName.includes(normRule) || normRule.includes(normName);
  }) || null;
}

function applyAuditToTeam(rawMin, rawMax, rule) {
  if (!rule) {
    return { adjMin: rawMin, adjMax: rawMax, isModified: false };
  }
  const factor = Number.isFinite(parseFloat(rule.factor)) ? parseFloat(rule.factor) : 1.0;
  const delta = Number.isFinite(parseInt(rule.delta, 10)) ? parseInt(rule.delta, 10) : 0;

  let adjMin = Math.max(0, Math.round(rawMin * factor + delta));
  let adjMax = Math.max(0, Math.round(rawMax * factor + delta));
  if (adjMin > adjMax) [adjMin, adjMax] = [adjMax, adjMin];

  const isModified = adjMin !== rawMin || adjMax !== rawMax;
  return { adjMin, adjMax, isModified };
}

function renderAuditTable() {
  if (!auditTbody) return;
  if (auditRules.length === 0) {
    auditTbody.innerHTML = `<tr class="empty-row"><td colspan="5">暂无虚报/少报修正记录（所有兵团均按 100% 申报人数计算）</td></tr>`;
    return;
  }

  auditTbody.innerHTML = auditRules
    .map((rule) => {
      return `
        <tr>
          <td>
            <input type="text" class="cell-input" placeholder="如 [FEX] 或 FEX"
              value="${escapeHtml(rule.tag)}"
              oninput="updateAuditRow('${rule.id}', 'tag', this.value)" />
          </td>
          <td>
            <input type="number" step="0.05" min="0.1" max="3.0" class="cell-input"
              value="${rule.factor}"
              onchange="updateAuditRow('${rule.id}', 'factor', this.value)" />
          </td>
          <td>
            <input type="number" step="1" min="-100" max="100" class="cell-input"
              value="${rule.delta}"
              onchange="updateAuditRow('${rule.id}', 'delta', this.value)" />
          </td>
          <td>
            <input type="text" class="cell-input" placeholder="填写公示依据，如：近期出勤率约80%"
              value="${escapeHtml(rule.reason)}"
              oninput="updateAuditRow('${rule.id}', 'reason', this.value)" />
          </td>
          <td style="text-align: center;">
            <button type="button" class="del-row-btn" onclick="deleteAuditRow('${rule.id}')">删除</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

window.updateAuditRow = function (id, field, value) {
  const rule = auditRules.find((r) => r.id === id);
  if (!rule) return;

  if (field === "tag" || field === "reason") {
    rule[field] = value;
  } else if (field === "factor") {
    const num = parseFloat(value);
    rule.factor = Number.isFinite(num) && num > 0 ? num : 1.0;
  } else if (field === "delta") {
    const num = parseInt(value, 10);
    rule.delta = Number.isFinite(num) ? num : 0;
  }

  renderEntryTable();
  saveToAutoSave();
};

window.deleteAuditRow = function (id) {
  auditRules = auditRules.filter((r) => r.id !== id);
  renderAuditTable();
  renderEntryTable();
  saveToAutoSave();
};

function renderEntryTable() {
  if (!entryTbody) return;
  if (entryRows.length === 0) {
    entryRows.push(createEmptyRow());
  }

  entryTbody.innerHTML = entryRows
    .map((row) => {
      const rule = findAuditRuleForTeam(row.name);
      const { adjMin, adjMax, isModified } = applyAuditToTeam(row.min, row.max, rule);
      const previewText = isModified
        ? `${adjMin} - ${adjMax} 人 (已修正)`
        : `${adjMin} - ${adjMax} 人`;

      return `
        <tr data-id="${row.id}">
          <td>
            <input type="text" class="cell-input" placeholder="如 [FEX] 或 散人"
              value="${escapeHtml(row.name)}"
              oninput="updateEntryRow('${row.id}', 'name', this.value)" />
          </td>
          <td>
            <input type="number" class="cell-input" min="0" max="500"
              value="${row.min}"
              onchange="updateEntryRow('${row.id}', 'min', this.value)" />
          </td>
          <td>
            <input type="number" class="cell-input" min="0" max="500"
              value="${row.max}"
              onchange="updateEntryRow('${row.id}', 'max', this.value)" />
          </td>
          <td>
            <span id="preview_${row.id}" class="adj-preview ${isModified ? "modified" : ""}">${previewText}</span>
          </td>
          <td>
            <select class="cell-select" onchange="updateEntryRow('${row.id}', 'lockedFaction', this.value)">
              <option value="" ${!row.lockedFaction ? "selected" : ""}>自动分配</option>
              <option value="USA" ${row.lockedFaction === "USA" ? "selected" : ""}>锁定 USA 联邦</option>
              <option value="CSA" ${row.lockedFaction === "CSA" ? "selected" : ""}>锁定 CSA 邦联</option>
            </select>
          </td>
          <td style="text-align: center;">
            <button type="button" class="del-row-btn" onclick="deleteEntryRow('${row.id}')">删除</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

window.updateEntryRow = function (id, field, value) {
  const row = entryRows.find((r) => r.id === id);
  if (!row) return;

  if (field === "name") {
    row.name = value;
  } else if (field === "min") {
    const num = Math.max(0, parseInt(value, 10) || 0);
    row.min = num;
    if (row.max < num) {
      row.max = num;
      renderEntryTable();
    }
  } else if (field === "max") {
    const num = Math.max(0, parseInt(value, 10) || 0);
    row.max = num;
    if (row.min > num) {
      row.min = num;
      renderEntryTable();
    }
  } else if (field === "lockedFaction") {
    row.lockedFaction = value === "USA" || value === "CSA" ? value : null;
  }

  const previewEl = document.getElementById(`preview_${row.id}`);
  if (previewEl) {
    const rule = findAuditRuleForTeam(row.name);
    const { adjMin, adjMax, isModified } = applyAuditToTeam(row.min, row.max, rule);
    previewEl.textContent = isModified ? `${adjMin} - ${adjMax} 人 (已修正)` : `${adjMin} - ${adjMax} 人`;
    previewEl.className = `adj-preview ${isModified ? "modified" : ""}`;
  }

  saveToAutoSave();
};

window.deleteEntryRow = function (id) {
  entryRows = entryRows.filter((r) => r.id !== id);
  if (entryRows.length === 0) {
    entryRows.push(createEmptyRow());
  }
  renderEntryTable();
  saveToAutoSave();
};

function syncTableToText() {
  const lines = entryRows
    .filter((r) => r.name.trim() !== "")
    .map((r) => {
      const range = r.min === r.max ? `${r.min}` : `${r.min}-${r.max}`;
      const lock = r.lockedFaction ? ` ${r.lockedFaction}` : "";
      return `${r.name.trim()} ${range}${lock}`;
    });
  rosterInput.value = lines.join("\n");
}

function getCleanRowsFromEntry() {
  return entryRows
    .filter((r) => r.name.trim() !== "" || r.min > 0 || r.max > 0)
    .map((r, idx) => {
      let rawMin = Math.max(0, parseInt(r.min, 10) || 0);
      let rawMax = Math.max(0, parseInt(r.max, 10) || 0);
      if (rawMin > rawMax) [rawMin, rawMax] = [rawMax, rawMin];

      const name = r.name.trim() || `未命名队伍#${idx + 1}`;
      const auditRule = findAuditRuleForTeam(name);
      const { adjMin, adjMax, isModified } = applyAuditToTeam(rawMin, rawMax, auditRule);

      return {
        id: r.id,
        name,
        rawMin,
        rawMax,
        min: adjMin,
        max: adjMax,
        avg: (adjMin + adjMax) / 2,
        lockedFaction: r.lockedFaction || null,
        isModified,
        auditRule: isModified ? auditRule : null
      };
    });
}

function parseInputText(rawText) {
  const lines = rawText.split(/\r?\n/);
  const teams = [];
  const invalidLines = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let lockedFaction = null;
    let workingStr = trimmed;
    const factionMatch = workingStr.match(/(?:^|\s|\(|\[)(USA|CSA)(?:\)|\])?\s*$/i);
    if (factionMatch) {
      lockedFaction = factionMatch[1].toUpperCase();
      workingStr = workingStr.slice(0, factionMatch.index).trim();
    }

    const rangeMatch = workingStr.match(/(\d+)\s*(?:[-~—–至到]\s*(\d+))?\s*人?\s*$/);
    if (!rangeMatch) {
      invalidLines.push(`第 ${idx + 1} 行无法识别人数: "${trimmed}"`);
      return;
    }

    let min = parseInt(rangeMatch[1], 10);
    let max = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : min;
    if (min > max) [min, max] = [max, min];

    let name = workingStr.slice(0, rangeMatch.index).trim();
    if (!name) name = `未命名队伍#${teams.length + 1}`;

    teams.push({
      id: genId(),
      name,
      min,
      max,
      lockedFaction
    });
  });

  return { teams, invalidLines };
}

function showWarnings(invalidLines) {
  if (invalidLines.length > 0) {
    parseWarning.innerHTML = `<strong>以下行格式未能识别（已跳过）：</strong><br>${invalidLines.join("<br>")}`;
    parseWarning.classList.remove("hidden");
  } else {
    parseWarning.classList.add("hidden");
  }
}

/**
 * 阵营人数平衡核心算法（精确枚举全局最优解）
 */
function balanceTeams(teams, mode = "balanced") {
  const fixedUSA = [];
  const fixedCSA = [];
  const freeTeams = [];

  teams.forEach((t) => {
    if (t.lockedFaction === "USA") fixedUSA.push(t);
    else if (t.lockedFaction === "CSA") fixedCSA.push(t);
    else freeTeams.push(t);
  });

  freeTeams.sort((a, b) => b.avg - a.avg);

  const baseUSA = sumStats(fixedUSA);
  const baseCSA = sumStats(fixedCSA);

  function calcPenalty(uMin, uMax, cMin, cMax) {
    const diffMin = Math.abs(uMin - cMin);
    const diffMax = Math.abs(uMax - cMax);
    const diffAvg = Math.abs((uMin + uMax) / 2 - (cMin + cMax) / 2);

    if (mode === "min") return diffMin * 10 + diffAvg * 2 + diffMax;
    if (mode === "max") return diffMax * 10 + diffAvg * 2 + diffMin;
    return diffAvg * 4 + diffMin * 2 + diffMax * 2;
  }

  let bestUSA = [];
  let bestCSA = [];

  if (freeTeams.length <= 20) {
    let bestScore = Infinity;
    let bestMask = 0;

    function dfs(idx, uMin, uMax, cMin, cMax, mask) {
      if (idx === freeTeams.length) {
        const score = calcPenalty(uMin, uMax, cMin, cMax);
        if (score < bestScore) {
          bestScore = score;
          bestMask = mask;
        }
        return;
      }

      const t = freeTeams[idx];
      // 分配给 USA
      dfs(idx + 1, uMin + t.min, uMax + t.max, cMin, cMax, mask | (1 << idx));

      // 对称去重：如果双方没有任何固定锁定队伍，第 0 支队伍只需放一侧即可覆盖所有组合
      if (idx === 0 && fixedUSA.length === 0 && fixedCSA.length === 0) {
        return;
      }

      // 分配给 CSA
      dfs(idx + 1, uMin, uMax, cMin + t.min, cMax + t.max, mask);
    }

    dfs(0, baseUSA.min, baseUSA.max, baseCSA.min, baseCSA.max, 0);

    freeTeams.forEach((t, i) => {
      if (bestMask & (1 << i)) bestUSA.push(t);
      else bestCSA.push(t);
    });
  } else {
    let uMin = baseUSA.min, uMax = baseUSA.max;
    let cMin = baseCSA.min, cMax = baseCSA.max;

    freeTeams.forEach((t) => {
      const scoreIfUSA = calcPenalty(uMin + t.min, uMax + t.max, cMin, cMax);
      const scoreIfCSA = calcPenalty(uMin, uMax, cMin + t.min, cMax + t.max);
      if (scoreIfUSA <= scoreIfCSA) {
        bestUSA.push(t);
        uMin += t.min;
        uMax += t.max;
      } else {
        bestCSA.push(t);
        cMin += t.min;
        cMax += t.max;
      }
    });
  }

  return {
    usa: [...fixedUSA, ...bestUSA],
    csa: [...fixedCSA, ...bestCSA]
  };
}

function sumStats(list) {
  return list.reduce(
    (acc, t) => {
      acc.rawMin += t.rawMin ?? t.min;
      acc.rawMax += t.rawMax ?? t.max;
      acc.min += t.min;
      acc.max += t.max;
      acc.avg += t.avg ?? (t.min + t.max) / 2;
      return acc;
    },
    { rawMin: 0, rawMax: 0, min: 0, max: 0, avg: 0 }
  );
}

function runBalance() {
  const teams = getCleanRowsFromEntry();
  if (teams.length === 0) {
    currentState = { usa: [], csa: [] };
    renderResultTables();
    saveToAutoSave();
    return;
  }

  currentState = balanceTeams(teams, balanceModeSelect.value);
  renderResultTables();
  saveToAutoSave();
}

window.swapTeamFaction = function (teamId, fromFaction) {
  const toFaction = fromFaction === "usa" ? "csa" : "usa";
  const sourceList = currentState[fromFaction];
  const idx = sourceList.findIndex((t) => t.id === teamId);
  if (idx === -1) return;

  const [movedTeam] = sourceList.splice(idx, 1);
  currentState[toFaction].push(movedTeam);
  renderResultTables();
  saveToAutoSave();
};

function renderResultTables() {
  renderSingleResultTable("usa", currentState.usa);
  renderSingleResultTable("csa", currentState.csa);
  updateSummary();
  renderPublicNotice();
}

function renderSingleResultTable(faction, list) {
  const tbody = document.getElementById(`${faction}Tbody`);
  const countTag = document.getElementById(`${faction}CountTag`);
  const footRaw = document.getElementById(`${faction}FootRaw`);
  const footAdj = document.getElementById(`${faction}FootAdj`);

  if (countTag) countTag.textContent = `${list.length} 支队伍`;

  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">暂无队伍分配至此阵营</td></tr>`;
    if (footRaw) footRaw.innerHTML = `<strong>0 - 0</strong>`;
    if (footAdj) footAdj.innerHTML = `<strong>0 - 0 (0.0)</strong>`;
    return;
  }

  const targetName = faction === "usa" ? "CSA" : "USA";

  tbody.innerHTML = list
    .map((t) => {
      const rMin = t.rawMin ?? t.min;
      const rMax = t.rawMax ?? t.max;
      const rawText = rMin === rMax ? `${rMin} 人` : `${rMin}-${rMax} 人`;
      const adjText = t.min === t.max ? `${t.min} 人` : `${t.min}-${t.max} 人`;

      const badges = [];
      if (t.lockedFaction) {
        badges.push(`<span class="tag-lock">锁定 ${t.lockedFaction}</span>`);
      }
      if (t.isModified) {
        badges.push(`<span class="tag-audit">已修正</span>`);
      }
      if (badges.length === 0) {
        badges.push(`<span class="tag-auto">自动分配</span>`);
      }

      return `
        <tr>
          <td><strong>${escapeHtml(t.name)}</strong></td>
          <td>${rawText}</td>
          <td><strong style="color:${t.isModified ? "#f0b866" : "inherit"}">${adjText}</strong></td>
          <td>${badges.join(" ")}</td>
          <td>
            <button class="swap-btn" type="button" onclick="swapTeamFaction('${t.id}', '${faction}')">
              转至 ${targetName} ⇄
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  const stats = sumStats(list);
  if (footRaw) footRaw.innerHTML = `<strong>${stats.rawMin} - ${stats.rawMax} 人</strong>`;
  if (footAdj) footAdj.innerHTML = `<strong>${stats.min} - ${stats.max} 人 (均值 ${stats.avg.toFixed(1)})</strong>`;
}

function updateSummary() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  const usaRangeEl = document.getElementById("usaRange");
  const usaAvgEl = document.getElementById("usaAvg");
  const csaRangeEl = document.getElementById("csaRange");
  const csaAvgEl = document.getElementById("csaAvg");
  const diffSummaryEl = document.getElementById("diffSummary");
  const avgDiffSummaryEl = document.getElementById("avgDiffSummary");

  if (usaRangeEl) usaRangeEl.textContent = `${uStats.min} - ${uStats.max} 人`;
  if (usaAvgEl) usaAvgEl.textContent = `修正均值：${uStats.avg.toFixed(1)} 人 | 原始申报：${uStats.rawMin}-${uStats.rawMax} 人`;

  if (csaRangeEl) csaRangeEl.textContent = `${cStats.min} - ${cStats.max} 人`;
  if (csaAvgEl) csaAvgEl.textContent = `修正均值：${cStats.avg.toFixed(1)} 人 | 原始申报：${cStats.rawMin}-${cStats.rawMax} 人`;

  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  const avgDiff = Math.abs(uStats.avg - cStats.avg);

  if (diffSummaryEl) diffSummaryEl.textContent = `下限差 ${minDiff} 人 | 上限差 ${maxDiff} 人`;
  if (avgDiffSummaryEl) avgDiffSummaryEl.textContent = `修正均值差：${avgDiff.toFixed(1)} 人`;
}

function getActivePublicNotices() {
  const allTeams = [...currentState.usa, ...currentState.csa];
  return allTeams
    .filter((t) => t.isModified && t.auditRule)
    .map((t) => {
      const r = t.auditRule;
      const factorPart = r.factor !== 1 ? `系数 ×${r.factor}` : "";
      const deltaPart = r.delta !== 0 ? `增减 ${r.delta > 0 ? "+" + r.delta : r.delta}人` : "";
      const formulaStr = [factorPart, deltaPart].filter(Boolean).join("，");
      const reasonStr = r.reason ? `（依据：${r.reason}）` : "";
      return `${t.name}：申报 ${t.rawMin}-${t.rawMax}人 → 修正为 ${t.min}-${t.max}人 [${formulaStr}]${reasonStr}`;
    });
}

function renderPublicNotice() {
  const box = document.getElementById("publicNoticeBox");
  const listEl = document.getElementById("publicNoticeList");
  if (!box || !listEl) return;

  const notices = getActivePublicNotices();
  if (notices.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  listEl.innerHTML = notices.map((text) => `<li>${escapeHtml(text)}</li>`).join("");
}

function saveToAutoSave() {
  const payload = {
    entryRows,
    auditRules,
    currentState,
    balanceMode: balanceModeSelect.value
  };
  localStorage.setItem(STORAGE_KEY_AUTO, JSON.stringify(payload));
  flashSaveIndicator("● 已自动保存至本地");
}

function loadFromAutoSave() {
  const raw = localStorage.getItem(STORAGE_KEY_AUTO);
  if (!raw) {
    entryRows = [createEmptyRow()];
    renderAuditTable();
    renderEntryTable();
    return;
  }

  try {
    const saved = JSON.parse(raw);
    entryRows = Array.isArray(saved.entryRows) && saved.entryRows.length > 0
      ? saved.entryRows
      : [createEmptyRow()];
    auditRules = Array.isArray(saved.auditRules) ? saved.auditRules : [];
    currentState = saved.currentState || { usa: [], csa: [] };
    if (saved.balanceMode) {
      balanceModeSelect.value = saved.balanceMode;
    }
    renderAuditTable();
    renderEntryTable();
    syncTableToText();
    renderResultTables();
    flashSaveIndicator("● 已恢复上次的本地记忆数据");
  } catch (e) {
    entryRows = [createEmptyRow()];
    renderAuditTable();
    renderEntryTable();
  }
}

function flashSaveIndicator(msg) {
  if (saveIndicator) saveIndicator.textContent = msg;
}

function copyScheduleText() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  if (currentState.usa.length === 0 && currentState.csa.length === 0) {
    alert("当前没有可导出的排表数据！");
    return;
  }

  const formatLine = (t) => {
    const adj = t.min === t.max ? `${t.min}人` : `${t.min}-${t.max}人`;
    if (t.isModified) {
      return `• ${t.name}：修正 ${adj}（原报 ${t.rawMin}-${t.rawMax}人）`;
    }
    return `• ${t.name}：${adj}`;
  };

  const lines = [
    "【War of Rights 联队阵营分配表】",
    "",
    `🔵 USA 联邦军 [修正预估 ${uStats.min}-${uStats.max} 人 | 均值 ${uStats.avg.toFixed(1)}]：`,
    ...currentState.usa.map(formatLine),
    "",
    `⚪ CSA 邦联军 [修正预估 ${cStats.min}-${cStats.max} 人 | 均值 ${cStats.avg.toFixed(1)}]：`,
    ...currentState.csa.map(formatLine),
    "",
    `📊 双方修正后人数差：下限差 ${Math.abs(uStats.min - cStats.min)} 人 / 上限差 ${Math.abs(uStats.max - cStats.max)} 人`
  ];

  const notices = getActivePublicNotices();
  if (notices.length > 0) {
    lines.push("", "⚖️ 【人数修正公开公示】：");
    notices.forEach((n) => lines.push(`- ${n}`));
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const status = document.getElementById("copyStatus");
    if (status) {
      status.textContent = "✔ 已复制到剪贴板，可直接粘贴发送！";
      setTimeout(() => {
        status.textContent = "";
      }, 3000);
    }
  });
}

function generateScheduleImage() {
  if (currentState.usa.length === 0 && currentState.csa.length === 0) {
    alert("当前没有可生成图片的排表数据，请先点击“开始自动平衡”！");
    return;
  }

  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);
  const notices = getActivePublicNotices();

  const width = 1040;
  const maxRows = Math.max(currentState.usa.length, currentState.csa.length, 1);
  const rowHeight = 42;
  const tableStartY = 195;
  const tableHeight = 44 + maxRows * rowHeight + 46;
  const noticeBlockHeight = notices.length > 0 ? 55 + notices.length * 28 : 0;
  const height = tableStartY + tableHeight + noticeBlockHeight + 65;

  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  ctx.fillStyle = "#14171c";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#c8a252";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.fillStyle = "#c8a252";
  ctx.font = "bold 28px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WAR OF RIGHTS · 联队阵营人数平衡排表", width / 2, 58);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = "14px 'Microsoft YaHei', sans-serif";
  const timeStr = new Date().toLocaleString("zh-CN", { hour12: false });
  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  ctx.fillText(`生成时间：${timeStr}   |   双方修正后人数差：下限差 ${minDiff} 人 / 上限差 ${maxDiff} 人`, width / 2, 86);

  drawSummaryBox(ctx, 36, 108, 465, 68, "#1f4268", "#7fb3eb", "USA 联邦军", `${uStats.min} - ${uStats.max} 人`, `修正均值 ${uStats.avg.toFixed(1)} | 原始申报 ${uStats.rawMin}-${uStats.rawMax}`);
  drawSummaryBox(ctx, 539, 108, 465, 68, "#4b4f56", "#d1b48c", "CSA 邦联军", `${cStats.min} - ${cStats.max} 人`, `修正均值 ${cStats.avg.toFixed(1)} | 原始申报 ${cStats.rawMin}-${cStats.rawMax}`);

  drawFactionTable(ctx, 36, tableStartY, 465, maxRows, rowHeight, "#1f4268", "USA · 联邦军 (Union)", currentState.usa, uStats);
  drawFactionTable(ctx, 539, tableStartY, 465, maxRows, rowHeight, "#4b4f56", "CSA · 邦联军 (Confederate)", currentState.csa, cStats);

  if (notices.length > 0) {
    const ny = tableStartY + tableHeight + 20;
    ctx.fillStyle = "rgba(200, 162, 82, 0.12)";
    ctx.fillRect(36, ny, width - 72, noticeBlockHeight);
    ctx.strokeStyle = "#c8a252";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(36, ny, width - 72, noticeBlockHeight);

    ctx.fillStyle = "#c8a252";
    ctx.font = "bold 15px 'Microsoft YaHei', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("⚖️ 本次联队人数修正公开公示：", 52, ny + 28);

    ctx.fillStyle = "#e6e8ec";
    ctx.font = "13.5px 'Microsoft YaHei', sans-serif";
    notices.forEach((line, idx) => {
      ctx.fillText(`• ${line}`, 54, ny + 54 + idx * 26);
    });
  }

  ctx.fillStyle = "#6c7586";
  ctx.font = "12px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("War of Rights Team Balancer · 自动平衡与人数修正公示系统", width / 2, height - 24);

  const dataUrl = canvas.toDataURL("image/png");
  document.getElementById("previewImg").src = dataUrl;
  document.getElementById("downloadImgLink").href = dataUrl;
  document.getElementById("imageModal").classList.remove("hidden");
}

function drawSummaryBox(ctx, x, y, w, h, headerColor, accentColor, title, mainText, subText) {
  ctx.fillStyle = "#1d222a";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = headerColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, 115, h);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, x + 57, y + 40);

  ctx.fillStyle = accentColor;
  ctx.font = "bold 22px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(mainText, x + 132, y + 33);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = "13px 'Microsoft YaHei', sans-serif";
  ctx.fillText(subText, x + 132, y + 55);
}

function drawFactionTable(ctx, x, y, w, maxRows, rowH, headerColor, title, list, stats) {
  const totalH = 44 + maxRows * rowH + 46;
  ctx.fillStyle = "#1d222a";
  ctx.fillRect(x, y, w, totalH);
  ctx.strokeStyle = "#323a46";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, w, totalH);

  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, w, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(title, x + 16, y + 28);

  ctx.textAlign = "right";
  ctx.font = "13px 'Microsoft YaHei', sans-serif";
  ctx.fillText(`共 ${list.length} 支队伍`, x + w - 16, y + 27);

  for (let i = 0; i < maxRows; i++) {
    const ry = y + 44 + i * rowH;
    if (i % 2 === 1) {
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(x, ry, w, rowH);
    }
    ctx.strokeStyle = "#2b323d";
    ctx.beginPath();
    ctx.moveTo(x, ry + rowH);
    ctx.lineTo(x + w, ry + rowH);
    ctx.stroke();

    const t = list[i];
    if (!t) continue;

    ctx.textAlign = "left";
    ctx.fillStyle = "#e6e8ec";
    ctx.font = "bold 14.5px 'Microsoft YaHei', sans-serif";
    ctx.fillText(t.name, x + 16, ry + 26);

    const adjStr = t.min === t.max ? `${t.min} 人` : `${t.min}-${t.max} 人`;
    ctx.textAlign = "right";
    if (t.isModified) {
      ctx.fillStyle = "#f0b866";
      ctx.font = "bold 14px 'Microsoft YaHei', sans-serif";
      ctx.fillText(`修正 ${adjStr} (原${t.rawMin}-${t.rawMax})`, x + w - 16, ry + 26);
    } else {
      ctx.fillStyle = "#cbd2df";
      ctx.font = "14px 'Microsoft YaHei', sans-serif";
      ctx.fillText(adjStr, x + w - 16, ry + 26);
    }
  }

  const fy = y + 44 + maxRows * rowH;
  ctx.fillStyle = "#161a20";
  ctx.fillRect(x, fy, w, 46);
  ctx.fillStyle = "#c8a252";
  ctx.font = "bold 14.5px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("合计修正预估", x + 16, fy + 28);

  ctx.textAlign = "right";
  ctx.fillText(`${stats.min} - ${stats.max} 人 (均值 ${stats.avg.toFixed(1)})`, x + w - 16, fy + 28);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
