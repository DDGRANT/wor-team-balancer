// 本地存储 Key 定义
const STORAGE_KEY_AUTO = "wor_balancer_autosave_v2";
const STORAGE_KEY_PRESET = "wor_balancer_preset_v2";

// 核心数据模型
let entryRows = []; // [{ id, name, min, max, lockedFaction }]
let currentState = { usa: [], csa: [] };

// DOM 引用
const tabTableBtn = document.getElementById("tabTableBtn");
const tabTextBtn = document.getElementById("tabTextBtn");
const tableInputView = document.getElementById("tableInputView");
const textInputView = document.getElementById("textInputView");
const entryTbody = document.getElementById("entryTbody");
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

// 添加一行兵团
document.getElementById("addRowBtn").addEventListener("click", () => {
  entryRows.push({
    id: genId(),
    name: "",
    min: 10,
    max: 15,
    lockedFaction: null
  });
  renderEntryTable();
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
  const validRows = getCleanRowsFromEntry();
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

// 填入示例数据
document.getElementById("sampleBtn").addEventListener("click", () => {
  entryRows = [
    { id: genId(), name: "[FEX]", min: 15, max: 20, lockedFaction: null },
    { id: genId(), name: "[HD]", min: 25, max: 30, lockedFaction: null },
    { id: genId(), name: "[1stTX]", min: 12, max: 16, lockedFaction: null },
    { id: genId(), name: "[69thNY]", min: 18, max: 22, lockedFaction: null },
    { id: genId(), name: "[4thVA]", min: 10, max: 14, lockedFaction: "CSA" },
    { id: genId(), name: "[20thME]", min: 14, max: 18, lockedFaction: "USA" },
    { id: genId(), name: "[9thNY]", min: 8, max: 12, lockedFaction: null },
    { id: genId(), name: "散人玩家", min: 10, max: 15, lockedFaction: null }
  ];
  parseWarning.classList.add("hidden");
  renderEntryTable();
  syncTableToText();
  saveToAutoSave();
  runBalance();
});

// 清空全部
document.getElementById("clearBtn").addEventListener("click", () => {
  entryRows = [createEmptyRow()];
  rosterInput.value = "";
  currentState = { usa: [], csa: [] };
  parseWarning.classList.add("hidden");
  renderEntryTable();
  renderResultTables();
  saveToAutoSave();
});

// 策略切换时自动记忆并重新平衡
balanceModeSelect.addEventListener("change", () => {
  saveToAutoSave();
  if (getCleanRowsFromEntry().length > 0) {
    runBalance();
  }
});

// 点击“开始自动平衡”
document.getElementById("balanceBtn").addEventListener("click", () => {
  // 如果当前在文本模式，先自动解析同步到表格
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

// 一键复制排表文本
document.getElementById("copyTextBtn").addEventListener("click", copyScheduleText);

function genId() {
  return `team_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function createEmptyRow() {
  return { id: genId(), name: "", min: 10, max: 15, lockedFaction: null };
}

/**
 * 渲染可视化录入表格
 */
function renderEntryTable() {
  if (entryRows.length === 0) {
    entryRows.push(createEmptyRow());
  }

  entryTbody.innerHTML = entryRows
    .map((row, index) => {
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
            <select class="cell-select" onchange="updateEntryRow('${row.id}', 'lockedFaction', this.value)">
              <option value="" ${!row.lockedFaction ? "selected" : ""}>自动分配</option>
              <option value="USA" ${row.lockedFaction === "USA" ? "selected" : ""}>锁定 USA 联邦</option>
              <option value="CSA" ${row.lockedFaction === "CSA" ? "selected" : ""}>锁定 CSA 邦联</option>
            </select>
          </td>
          <td style="text-align: center;">
            <button type="button" class="del-row-btn" onclick="deleteEntryRow('${row.id}')" title="删除此行">删除</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// 表格单元格实时更新
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

  saveToAutoSave();
};

// 删除录入表格行
window.deleteEntryRow = function (id) {
  entryRows = entryRows.filter((r) => r.id !== id);
  if (entryRows.length === 0) {
    entryRows.push(createEmptyRow());
  }
  renderEntryTable();
  saveToAutoSave();
};

// 将当前表格同步生成为纯文本（方便切换去文本页查看或复制）
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

// 获取有效且格式化后的兵团对象数组
function getCleanRowsFromEntry() {
  return entryRows
    .filter((r) => r.name.trim() !== "" || r.min > 0 || r.max > 0)
    .map((r, idx) => {
      let min = Math.max(0, parseInt(r.min, 10) || 0);
      let max = Math.max(0, parseInt(r.max, 10) || 0);
      if (min > max) [min, max] = [max, min];
      return {
        id: r.id,
        name: r.name.trim() || `未命名队伍#${idx + 1}`,
        min,
        max,
        avg: (min + max) / 2,
        lockedFaction: r.lockedFaction || null
      };
    });
}

/**
 * 解析文本输入
 */
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
      avg: (min + max) / 2,
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
 * 阵营人数平衡核心算法
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
      if (uMin - (cMax + suffixMax[idx]) <= bestScore) {
        dfs(idx + 1, uMin + t.min, uMax + t.max, cMin, cMax, mask | (1 << idx));
      }
      if (idx === 0 && fixedUSA.length === 0 && fixedCSA.length === 0) {
        return;
      }
      if (cMin - (uMax + suffixMax[idx]) <= bestScore) {
        dfs(idx + 1, uMin, uMax, cMin + t.min, cMax + t.max, mask);
      }
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
      acc.min += t.min;
      acc.max += t.max;
      acc.avg += t.avg;
      return acc;
    },
    { min: 0, max: 0, avg: 0 }
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

// 手动对调阵营（同样会触发自动记忆）
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
}

function renderSingleResultTable(faction, list) {
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

// 自动保存到 localStorage
function saveToAutoSave() {
  const payload = {
    entryRows,
    currentState,
    balanceMode: balanceModeSelect.value
  };
  localStorage.setItem(STORAGE_KEY_AUTO, JSON.stringify(payload));
  flashSaveIndicator("● 已自动保存至本地");
}

// 页面启动时读取 localStorage
function loadFromAutoSave() {
  const raw = localStorage.getItem(STORAGE_KEY_AUTO);
  if (!raw) {
    entryRows = [createEmptyRow()];
    renderEntryTable();
    return;
  }

  try {
    const saved = JSON.parse(raw);
    entryRows = Array.isArray(saved.entryRows) && saved.entryRows.length > 0
      ? saved.entryRows
      : [createEmptyRow()];
    currentState = saved.currentState || { usa: [], csa: [] };
    if (saved.balanceMode) {
      balanceModeSelect.value = saved.balanceMode;
    }
    renderEntryTable();
    syncTableToText();
    renderResultTables();
    flashSaveIndicator("● 已恢复上次的本地记忆数据");
  } catch (e) {
    entryRows = [createEmptyRow()];
    renderEntryTable();
  }
}

function flashSaveIndicator(msg) {
  saveIndicator.textContent = msg;
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
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
