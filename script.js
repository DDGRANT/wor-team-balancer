// 全局当前分配状态
let currentState = {
  usa: [],
  csa: []
};

const rosterInput = document.getElementById("rosterInput");
const balanceModeSelect = document.getElementById("balanceMode");
const parseWarning = document.getElementById("parseWarning");

// 示例数据按钮
document.getElementById("sampleBtn").addEventListener("click", () => {
  rosterInput.value = [
    "[FEX]15-20",
    "[HD]25-30",
    "[1stTX]12-16",
    "[69thNY]18-22",
    "[4thVA]10-14 CSA",
    "[20thME]14-18 USA",
    "[9thNY]8-12",
    "散人玩家 10-15"
  ].join("\n");
  runBalance();
});

// 清空按钮
document.getElementById("clearBtn").addEventListener("click", () => {
  rosterInput.value = "";
  currentState = { usa: [], csa: [] };
  parseWarning.classList.add("hidden");
  renderTables();
});

// 自动平衡按钮
document.getElementById("balanceBtn").addEventListener("click", runBalance);

// 一键复制排表文本
document.getElementById("copyTextBtn").addEventListener("click", copyScheduleText);

/**
 * 解析输入文本
 * 支持格式：
 * [FEX]15-20 / [FEX] 15~20人 / FEX 15-20 / [HD] 20 / [4thVA]10-14 CSA
 */
function parseInputText(rawText) {
  const lines = rawText.split(/\r?\n/);
  const teams = [];
  const invalidLines = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // 1. 提取末尾可选的强制阵营标记 (USA 或 CSA)
    let lockedFaction = null;
    let workingStr = trimmed;
    const factionMatch = workingStr.match(/(?:^|\s|\(|\[)(USA|CSA)(?:\)|\])?\s*$/i);
    if (factionMatch) {
      lockedFaction = factionMatch[1].toUpperCase();
      workingStr = workingStr.slice(0, factionMatch.index).trim();
    }

    // 2. 匹配数字或数字区间 (例如 15-20, 15~20, 15—20, 15至20, 或单个数字 20)
    const rangeMatch = workingStr.match(/(\d+)\s*(?:[-~—–至到]\s*(\d+))?\s*人?\s*$/);
    if (!rangeMatch) {
      invalidLines.push(`第 ${idx + 1} 行无法识别人数: "${trimmed}"`);
      return;
    }

    let min = parseInt(rangeMatch[1], 10);
    let max = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : min;

    // 自动纠正写反的区间，如 20-15 -> 15-20
    if (min > max) {
      [min, max] = [max, min];
    }

    // 3. 提取兵团番号（去掉末尾的人数部分）
    let name = workingStr.slice(0, rangeMatch.index).trim();
    if (!name) {
      name = `未命名队伍#${teams.length + 1}`;
    }

    teams.push({
      id: `team_${idx}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      min,
      max,
      avg: (min + max) / 2,
      lockedFaction
    });
  });

  return { teams, invalidLines };
}

/**
 * 阵营人数平衡核心算法
 * 采用分支定界 / 精确搜索（队伍数 <= 22 时求全局最优解；超过时采用大团优先贪心 + 局部交换优化）
 */
function balanceTeams(teams, mode = "balanced") {
  const fixedUSA = [];
  const fixedCSA = [];
  const freeTeams = [];

  teams.forEach((t) => {
    if (t.lockedFaction === "USA") {
      fixedUSA.push(t);
    } else if (t.lockedFaction === "CSA") {
      fixedCSA.push(t);
    } else {
      freeTeams.push(t);
    }
  });

  // 按预期均值从大到小排序，加速剪枝与贪心分配
  freeTeams.sort((a, b) => b.avg - a.avg);

  const baseUSA = sumStats(fixedUSA);
  const baseCSA = sumStats(fixedCSA);

  // 计算差异惩罚分（越小越平衡）
  function calcPenalty(uMin, uMax, cMin, cMax) {
    const diffMin = Math.abs(uMin - cMin);
    const diffMax = Math.abs(uMax - cMax);
    const diffAvg = Math.abs((uMin + uMax) / 2 - (cMin + cMax) / 2);

    if (mode === "min") {
      return diffMin * 10 + diffAvg * 2 + diffMax;
    } else if (mode === "max") {
      return diffMax * 10 + diffAvg * 2 + diffMin;
    }
    // 综合模式：均值差权重最高，同时兼顾下限差与上限差
    return diffAvg * 4 + diffMin * 2 + diffMax * 2;
  }

  let bestUSA = [];
  let bestCSA = [];

  if (freeTeams.length <= 20) {
    // 精确回溯搜索，保证全局最优配平
    let bestScore = Infinity;
    let bestMask = 0;

    // 预计算后缀和用于剪枝
    const suffixMax = new Array(freeTeams.length + 1).fill(0);
    for (let i = freeTeams.length - 1; i >= 0; i--) {
      suffixMax[i] = suffixMax[i + 1] + freeTeams[i].max;
    }

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
      // 剪枝：如果当前一方已经超出另一方 + 剩余所有最大人数，无需继续向该侧倾斜
      if (uMin - (cMax + suffixMax[idx]) <= bestScore) {
        dfs(idx + 1, uMin + t.min, uMax + t.max, cMin, cMax, mask | (1 << idx));
      }
      // 若无锁定队伍且当前双方完全对称，第一支队伍只需搜一侧即可去重
      if (idx === 0 && fixedUSA.length === 0 && fixedCSA.length === 0) {
        return;
      }
      if (cMin - (uMax + suffixMax[idx]) <= bestScore) {
        dfs(idx + 1, uMin, uMax, cMin + t.min, cMax + t.max, mask);
      }
    }

    dfs(0, baseUSA.min, baseUSA.max, baseCSA.min, baseCSA.max, 0);

    freeTeams.forEach((t, i) => {
      if (bestMask & (1 << i)) {
        bestUSA.push(t);
      } else {
        bestCSA.push(t);
      }
    });
  } else {
    // 超多队伍兜底贪心分配
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
      acc.min += t.min;
      acc.max += t.max;
      acc.avg += t.avg;
      return acc;
    },
    { min: 0, max: 0, avg: 0 }
  );
}

function runBalance() {
  const { teams, invalidLines } = parseInputText(rosterInput.value);

  if (invalidLines.length > 0) {
    parseWarning.innerHTML = `<strong>以下行格式未能识别（已跳过）：</strong><br>${invalidLines.join("<br>")}`;
    parseWarning.classList.remove("hidden");
  } else {
    parseWarning.classList.add("hidden");
  }

  if (teams.length === 0) {
    currentState = { usa: [], csa: [] };
    renderTables();
    return;
  }

  currentState = balanceTeams(teams, balanceModeSelect.value);
  renderTables();
}

/**
 * 手动将某个兵团切换到对立阵营
 */
window.swapTeamFaction = function (teamId, fromFaction) {
  const toFaction = fromFaction === "usa" ? "csa" : "usa";
  const sourceList = currentState[fromFaction];
  const idx = sourceList.findIndex((t) => t.id === teamId);
  if (idx === -1) return;

  const [movedTeam] = sourceList.splice(idx, 1);
  currentState[toFaction].push(movedTeam);
  renderTables();
};

function renderTables() {
  renderSingleTable("usa", currentState.usa);
  renderSingleTable("csa", currentState.csa);
  updateSummary();
}

function renderSingleTable(faction, list) {
  const tbody = document.getElementById(`${faction}Tbody`);
  const countTag = document.getElementById(`${faction}CountTag`);
  const footRange = document.getElementById(`${faction}FootRange`);
  const footAvg = document.getElementById(`${faction}FootAvg`);

  countTag.textContent = `${list.length} 支队伍`;

  if (list.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">暂无队伍分配至此阵营</td></tr>`;
    footRange.innerHTML = `<strong>0 - 0</strong>`;
    footAvg.innerHTML = `<strong>0.0</strong>`;
    return;
  }

  const targetName = faction === "usa" ? "CSA" : "USA";

  tbody.innerHTML = list
    .map((t) => {
      const rangeText = t.min === t.max ? `${t.min} 人` : `${t.min} - ${t.max} 人`;
      const statusHtml = t.lockedFaction
        ? `<span class="tag-lock">锁定 ${t.lockedFaction}</span>`
        : `<span class="tag-auto">自动分配</span>`;

      return `
        <tr>
          <td><strong>${escapeHtml(t.name)}</strong></td>
          <td>${rangeText}</td>
          <td>${t.avg.toFixed(1)}</td>
          <td>${statusHtml}</td>
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
  footRange.innerHTML = `<strong>${stats.min} - ${stats.max} 人</strong>`;
  footAvg.innerHTML = `<strong>${stats.avg.toFixed(1)}</strong>`;
}

function updateSummary() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  document.getElementById("usaRange").textContent = `${uStats.min} - ${uStats.max} 人`;
  document.getElementById("usaAvg").textContent = `预期均值：${uStats.avg.toFixed(1)} 人 | 兵团数：${currentState.usa.length}`;

  document.getElementById("csaRange").textContent = `${cStats.min} - ${cStats.max} 人`;
  document.getElementById("csaAvg").textContent = `预期均值：${cStats.avg.toFixed(1)} 人 | 兵团数：${currentState.csa.length}`;

  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  const avgDiff = Math.abs(uStats.avg - cStats.avg);

  document.getElementById("diffSummary").textContent = `下限差 ${minDiff} 人 | 上限差 ${maxDiff} 人`;
  document.getElementById("avgDiffSummary").textContent = `预期均值差：${avgDiff.toFixed(1)} 人`;
}

function copyScheduleText() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  if (currentState.usa.length === 0 && currentState.csa.length === 0) {
    alert("当前没有可导出的排表数据！");
    return;
  }

  const formatLine = (t) =>
    t.min === t.max ? `• ${t.name} (${t.min}人)` : `• ${t.name} (${t.min}-${t.max}人)`;

  const output = [
    "【War of Rights 联队阵营分配表】",
    "",
    `🔵 USA 联邦军 [预计 ${uStats.min}-${uStats.max} 人 | 均值 ${uStats.avg.toFixed(1)}]：`,
    ...currentState.usa.map(formatLine),
    "",
    `⚪ CSA 邦联军 [预计 ${cStats.min}-${cStats.max} 人 | 均值 ${cStats.avg.toFixed(1)}]：`,
    ...currentState.csa.map(formatLine),
    "",
    `📊 双方人数差：下限差 ${Math.abs(uStats.min - cStats.min)} 人 / 上限差 ${Math.abs(uStats.max - cStats.max)} 人`
  ].join("\n");

  navigator.clipboard.writeText(output).then(() => {
    const status = document.getElementById("copyStatus");
    status.textContent = "✔ 已复制到剪贴板，可直接粘贴发送！";
    setTimeout(() => {
      status.textContent = "";
    }, 3000);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
