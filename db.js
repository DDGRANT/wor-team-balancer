const STORAGE_KEY_ASIA_DB = "wor_asia_regiments_db_v1";
const STORAGE_KEY_MATCH_LOGS = "wor_match_winrate_logs_v1";
const STORAGE_KEY_LANG_DB = "wor_balancer_lang_v8";

const DEFAULT_ASIA_REGIMENTS = [
  { tag: "[1stNC]", defaultMin: 12, defaultMax: 16, defaultLock: "", note: "亚服常驻团" },
  { tag: "[BEF]", defaultMin: 15, defaultMax: 20, defaultLock: "", note: "亚服常驻团" },
  { tag: "[FEX]", defaultMin: 15, defaultMax: 20, defaultLock: "", note: "亚服常驻团" },
  { tag: "[NYV]", defaultMin: 12, defaultMax: 16, defaultLock: "", note: "亚服常驻团" },
  { tag: "(NOV)", defaultMin: 10, defaultMax: 15, defaultLock: "", note: "亚服常驻团" },
  { tag: "[18thVA]", defaultMin: 15, defaultMax: 20, defaultLock: "", note: "亚服常驻团" },
  { tag: "[36thOH]", defaultMin: 12, defaultMax: 16, defaultLock: "", note: "亚服常驻团" },
  { tag: "[10thSC]", defaultMin: 10, defaultMax: 15, defaultLock: "", note: "亚服常驻团" },
  { tag: "[79thNY]", defaultMin: 12, defaultMax: 16, defaultLock: "", note: "亚服常驻团" }
];

let regimentsDb = [];
let matchLogs = [];
let currentLang = localStorage.getItem(STORAGE_KEY_LANG_DB) || "zh_cn_en";

function t(key, ...args) {
  const dict = (window.I18N && window.I18N[currentLang]) || (window.I18N && window.I18N.zh_cn_en) || {};
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val !== undefined ? val : key;
}

window.addEventListener("DOMContentLoaded", async () => {
  bindLangButtons();
  await loadRegimentsDb();
  loadMatchLogs();
  await populateMapDatalist();
  renderQuickAddChips();
  bindFormAndButtons();
  renderAllDbTables();
  await initCloudSyncSection();
});

function bindLangButtons() {
  if (!window.I18N || !window.I18N[currentLang]) currentLang = "zh_cn_en";
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const l = btn.getAttribute("data-lang");
      if (l && window.I18N && window.I18N[l]) {
        currentLang = l;
        localStorage.setItem(STORAGE_KEY_LANG_DB, l);
        document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.getAttribute("data-lang") === l));
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          el.textContent = t(el.getAttribute("data-i18n"));
        });
      }
    });
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
}

function normTag(s) {
  return String(s || "").replace(/[\[\]【】\(\)（）\s]/g, "").toUpperCase();
}

async function loadRegimentsDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ASIA_DB);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) {
        regimentsDb = arr;
        return;
      }
    }
  } catch (e) {}

  try {
    const resp = await fetch("asia_regiments.json?t=" + Date.now());
    if (resp.ok) {
      const ext = await resp.json();
      if (Array.isArray(ext) && ext.length > 0) {
        regimentsDb = ext;
        saveRegimentsDb();
        return;
      }
    }
  } catch (e) {}

  regimentsDb = JSON.parse(JSON.stringify(DEFAULT_ASIA_REGIMENTS));
  saveRegimentsDb();
}

function saveRegimentsDb() {
  localStorage.setItem(STORAGE_KEY_ASIA_DB, JSON.stringify(regimentsDb));
}

function loadMatchLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MATCH_LOGS);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        matchLogs = arr;
        return;
      }
    }
  } catch (e) {}
  matchLogs = [];
}

function saveMatchLogs() {
  localStorage.setItem(STORAGE_KEY_MATCH_LOGS, JSON.stringify(matchLogs));
}

async function populateMapDatalist() {
  const dl = document.getElementById("mapSuggestionsList");
  if (!dl) return;
  const names = new Set([
    "Alexander Farm", "Crossroads", "Smith Field", "East Woods Skirmish",
    "Hooker's Push", "Hagerstown Turnpike", "Miller's Cornfield", "Bloody Lane",
    "Burnside Bridge", "Garland's Stand", "Maryland Heights", "School House Ridge"
  ]);
  for (const fn of ["maps_merged.json", "maps.json", "maps_data.json"]) {
    try {
      const resp = await fetch(`${fn}?t=` + Date.now());
      if (resp.ok) {
        const data = await resp.json();
        const list = Array.isArray(data) ? data : (data.maps || []);
        list.forEach((m) => { if (m.name) names.add(m.name); });
        break;
      }
    } catch (e) {}
  }
  dl.innerHTML = Array.from(names).map((n) => `<option value="${escapeHtml(n)}"></option>`).join("");
}

function renderQuickAddChips() {
  const usaBox = document.getElementById("quickAddUsaChips");
  const csaBox = document.getElementById("quickAddCsaChips");
  if (!usaBox || !csaBox) return;

  usaBox.innerHTML = regimentsDb.map((r) => `
    <button type="button" class="btn-outline-sm" style="padding:2px 7px; font-size:0.74rem;" onclick="appendRegToField('usaTeamsInput', '${escapeHtml(r.tag)}')">+ ${escapeHtml(r.tag)}</button>
  `).join("");

  csaBox.innerHTML = regimentsDb.map((r) => `
    <button type="button" class="btn-outline-sm" style="padding:2px 7px; font-size:0.74rem;" onclick="appendRegToField('csaTeamsInput', '${escapeHtml(r.tag)}')">+ ${escapeHtml(r.tag)}</button>
  `).join("");
}

window.appendRegToField = function (inputId, tag) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const parts = el.value.split(",").map((x) => x.trim()).filter(Boolean);
  if (!parts.some((p) => normTag(p) === normTag(tag))) {
    parts.push(tag);
    el.value = parts.join(", ");
  }
};

function bindFormAndButtons() {
  const nowStr = new Date().toISOString().slice(0, 16).replace("T", " ");
  const timeInput = document.getElementById("matchTimeInput");
  if (timeInput && !timeInput.value) timeInput.value = nowStr;

  document.getElementById("matchLogForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const timeVal = document.getElementById("matchTimeInput").value.trim() || new Date().toLocaleString("zh-CN", { hour12: false });
    const mapVal = document.getElementById("matchMapInput").value.trim();
    const winnerVal = document.getElementById("matchWinnerSelect").value;
    const usaTeams = document.getElementById("usaTeamsInput").value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    const csaTeams = document.getElementById("csaTeamsInput").value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    const usaCas = Math.max(0, parseInt(document.getElementById("usaCasInput").value, 10) || 0);
    const csaCas = Math.max(0, parseInt(document.getElementById("csaCasInput").value, 10) || 0);

    if (!mapVal) return;

    // 自动把新出现的队伍番号补充进队伍数据库
    [...usaTeams, ...csaTeams].forEach((tag) => {
      if (!regimentsDb.some((r) => normTag(r.tag) === normTag(tag))) {
        regimentsDb.push({ tag, defaultMin: 12, defaultMax: 16, defaultLock: "", note: "战绩自动收录" });
      }
    });
    saveRegimentsDb();

    matchLogs.unshift({
      id: "m_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      time: timeVal,
      map: mapVal,
      usaTeams,
      csaTeams,
      winner: winnerVal,
      usaCas,
      csaCas
    });
    saveMatchLogs();

    document.getElementById("usaTeamsInput").value = "";
    document.getElementById("csaTeamsInput").value = "";
    document.getElementById("usaCasInput").value = "0";
    document.getElementById("csaCasInput").value = "0";

    renderQuickAddChips();
    renderAllDbTables();
  });

  document.getElementById("addRegimentBtn").addEventListener("click", () => {
    const tag = prompt("请输入新队伍番号（如 [20thME] 或 [69thNY]）：");
    if (!tag || !tag.trim()) return;
    const minN = Math.max(0, parseInt(prompt("默认最少人数 Min：", "12"), 10) || 10);
    const maxN = Math.max(minN, parseInt(prompt("默认最多人数 Max：", "16"), 10) || minN);
    regimentsDb.push({ tag: tag.trim(), defaultMin: minN, defaultMax: maxN, defaultLock: "", note: "手动添加" });
    saveRegimentsDb();
    renderQuickAddChips();
    renderAllDbTables();
  });

  document.getElementById("resetRegimentsBtn").addEventListener("click", () => {
    if (!confirm("确定重置为默认 9 支亚服队伍吗？")) return;
    regimentsDb = JSON.parse(JSON.stringify(DEFAULT_ASIA_REGIMENTS));
    saveRegimentsDb();
    renderQuickAddChips();
    renderAllDbTables();
  });

  document.getElementById("addSampleMatchBtn").addEventListener("click", () => {
    const samples = [
      {
        id: "sample_1",
        time: "2026-11-20 21:00",
        map: "Bloody Lane",
        usaTeams: ["[18thVA]", "[FEX]", "[36thOH]"],
        csaTeams: ["[1stNC]", "[BEF]", "[10thSC]"],
        winner: "USA",
        usaCas: 84,
        csaCas: 112
      },
      {
        id: "sample_2",
        time: "2026-11-22 21:15",
        map: "Burnside Bridge",
        usaTeams: ["[1stNC]", "[NYV]", "(NOV)"],
        csaTeams: ["[18thVA]", "[FEX]", "[79thNY]"],
        winner: "CSA",
        usaCas: 128,
        csaCas: 79
      }
    ];
    samples.forEach((s) => {
      if (!matchLogs.some((m) => m.id === s.id)) matchLogs.unshift(s);
    });
    saveMatchLogs();
    renderAllDbTables();
  });

  document.getElementById("exportDbJsonBtn").addEventListener("click", () => {
    const payload = { regimentsDb, matchLogs };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WoR_Regiments_WinRate_DB_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const impInput = document.getElementById("importDbJsonInput");
  document.getElementById("importDbJsonBtn").addEventListener("click", () => impInput.click());
  impInput.addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const d = JSON.parse(evt.target.result);
        if (Array.isArray(d.regimentsDb)) { regimentsDb = d.regimentsDb; saveRegimentsDb(); }
        if (Array.isArray(d.matchLogs)) { matchLogs = d.matchLogs; saveMatchLogs(); }
        renderQuickAddChips();
        renderAllDbTables();
      } catch (err) {
        alert("JSON 格式错误");
      }
      impInput.value = "";
    };
    reader.readAsText(f);
  });
}

window.deleteMatchLog = function (id) {
  matchLogs = matchLogs.filter((m) => m.id !== id);
  saveMatchLogs();
  renderAllDbTables();
};

window.deleteRegimentFromDb = function (idx) {
  if (!confirm(`确定删除队伍 ${regimentsDb[idx].tag} 吗？`)) return;
  regimentsDb.splice(idx, 1);
  saveRegimentsDb();
  renderQuickAddChips();
  renderAllDbTables();
};

function fmtRate(wins, total) {
  if (!total || total <= 0) return `<span class="hint">- (0/0)</span>`;
  const pct = ((wins / total) * 100).toFixed(1);
  const cls = pct >= 60 ? "win-high" : (pct >= 40 ? "win-mid" : "win-low");
  return `<span class="${cls}">${pct}%</span> <span class="hint">(${wins}/${total})</span>`;
}

function renderAllDbTables() {
  renderRegimentStatsTable();
  renderMapStatsTable();
  renderMatchHistoryTable();
}

function renderRegimentStatsTable() {
  const tbody = document.getElementById("regimentStatsTbody");
  if (!tbody) return;

  tbody.innerHTML = regimentsDb.map((reg, idx) => {
    const key = normTag(reg.tag);
    let totGames = 0, totWins = 0;
    let usaGames = 0, usaWins = 0;
    let csaGames = 0, csaWins = 0;
    let casSum = 0, casCount = 0;

    matchLogs.forEach((m) => {
      const inUsa = (m.usaTeams || []).some((tName) => normTag(tName) === key);
      const inCsa = (m.csaTeams || []).some((tName) => normTag(tName) === key);

      if (inUsa) {
        totGames++; usaGames++;
        if (m.winner === "USA") { totWins++; usaWins++; }
        casSum += (m.usaCas || 0);
        casCount++;
      }
      if (inCsa) {
        totGames++; csaGames++;
        if (m.winner === "CSA") { totWins++; csaWins++; }
        casSum += (m.csaCas || 0);
        casCount++;
      }
    });

    const avgCas = casCount > 0 ? (casSum / casCount).toFixed(1) : "-";

    return `
      <tr>
        <td><strong>${escapeHtml(reg.tag)}</strong></td>
        <td>${reg.defaultMin}-${reg.defaultMax}</td>
        <td>${fmtRate(totWins, totGames)}</td>
        <td>${fmtRate(usaWins, usaGames)}</td>
        <td>${fmtRate(csaWins, csaGames)}</td>
        <td>${avgCas}</td>
        <td style="text-align:center;">
          <button type="button" class="del-row-btn" onclick="deleteRegimentFromDb(${idx})">删</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderMapStatsTable() {
  const tbody = document.getElementById("mapStatsTbody");
  if (!tbody) return;

  if (matchLogs.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">暂无对局数据，请在上方录入对局战绩</td></tr>`;
    return;
  }

  const mapAgg = {};
  matchLogs.forEach((m) => {
    const mName = m.map.trim();
    if (!mapAgg[mName]) {
      mapAgg[mName] = { name: mName, games: 0, usaWins: 0, csaWins: 0, usaCasTotal: 0, csaCasTotal: 0 };
    }
    const g = mapAgg[mName];
    g.games++;
    if (m.winner === "USA") g.usaWins++;
    if (m.winner === "CSA") g.csaWins++;
    g.usaCasTotal += (m.usaCas || 0);
    g.csaCasTotal += (m.csaCas || 0);
  });

  tbody.innerHTML = Object.values(mapAgg).map((g) => {
    const avgU = (g.usaCasTotal / g.games).toFixed(1);
    const avgC = (g.csaCasTotal / g.games).toFixed(1);
    return `
      <tr>
        <td><strong>${escapeHtml(g.name)}</strong></td>
        <td>${g.games}</td>
        <td>${fmtRate(g.usaWins, g.games)}</td>
        <td>${fmtRate(g.csaWins, g.games)}</td>
        <td style="color:var(--usa-light); font-weight:600;">${avgU}</td>
        <td style="color:var(--csa-light); font-weight:600;">${avgC}</td>
      </tr>
    `;
  }).join("");
}

function renderMatchHistoryTable() {
  const tbody = document.getElementById("matchHistoryTbody");
  if (!tbody) return;

  if (matchLogs.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">暂无历史对局记录</td></tr>`;
    return;
  }

  tbody.innerHTML = matchLogs.map((m) => {
    const winBadge = m.winner === "USA"
      ? `<span class="badge-usa-win">USA 胜</span>`
      : (m.winner === "CSA"
        ? `<span class="badge-csa-win">CSA 胜</span>`
        : `<span class="badge-draw">平局</span>`);

    return `
      <tr>
        <td style="font-size:0.8rem;">${escapeHtml(m.time)}</td>
        <td><strong>${escapeHtml(m.map)}</strong></td>
        <td style="font-size:0.82rem;">${escapeHtml((m.usaTeams || []).join(", "))}</td>
        <td style="font-size:0.82rem;">${escapeHtml((m.csaTeams || []).join(", "))}</td>
        <td>${winBadge}</td>
        <td style="font-size:0.82rem;">U:${m.usaCas} / C:${m.csaCas}</td>
        <td style="text-align:center;">
          <button type="button" class="del-row-btn" onclick="deleteMatchLog('${m.id}')">删除</button>
        </td>
      </tr>
    `;
  }).join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


async function initCloudSyncSection() {
  if (!window.WoRCloudSync) return;
  const didAuto = await window.WoRCloudSync.checkSundayZeroAutoUpload();
  renderSyncStatusAndTable(didAuto);

  document.getElementById("manualUploadSnapBtn").addEventListener("click", async () => {
    const res = await window.WoRCloudSync.uploadSnapshot("manual");
    renderSyncStatusAndTable(false, `已手动上传快照 (${res.record.uploadedAt})，当前线上保留最近 ${res.snapshots.length}/5 周数据`);
  });

  document.getElementById("exportOnline5wBtn").addEventListener("click", () => {
    const snaps = window.WoRCloudSync.loadSnapshots();
    const blob = new Blob([JSON.stringify({ retentionWeeks: 5, snapshots: snaps }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WoR_Online_Snapshots_5Weeks_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("openSyncCfgBtn").addEventListener("click", () => {
    const box = document.getElementById("syncCfgBox");
    const cfg = window.WoRCloudSync.getSyncConfig();
    document.getElementById("cfgGhRepo").value = cfg.githubRepo || "";
    document.getElementById("cfgGhPath").value = cfg.githubPath || "data/online_snapshots_5w.json";
    document.getElementById("cfgGhToken").value = cfg.githubToken || "";
    box.classList.toggle("hidden");
  });

  document.getElementById("saveSyncCfgBtn").addEventListener("click", () => {
    window.WoRCloudSync.saveSyncConfig({
      githubRepo: document.getElementById("cfgGhRepo").value.trim(),
      githubPath: document.getElementById("cfgGhPath").value.trim() || "data/online_snapshots_5w.json",
      githubToken: document.getElementById("cfgGhToken").value.trim()
    });
    document.getElementById("syncCfgBox").classList.add("hidden");
    renderSyncStatusAndTable(false, "已保存线上同步配置");
  });
}

function renderSyncStatusAndTable(didAuto, extraMsg = "") {
  const snaps = window.WoRCloudSync.loadSnapshots();
  const wkKey = window.WoRCloudSync.getCurrentSundayWeekKey();
  const subEl = document.getElementById("syncStatusSub");
  if (subEl) {
    const autoTxt = didAuto ? " · 本周日0点自动上传已完成" : "";
    const extraTxt = extraMsg ? ` · ${extraMsg}` : "";
    subEl.textContent = `本地实时写入 | 线上默认保留 5 周快照 (当前已存 ${snaps.length}/5 份，当前周期: ${wkKey})${autoTxt}${extraTxt}`;
  }

  const tbody = document.getElementById("onlineSnapshotsTbody");
  if (!tbody) return;

  if (snaps.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">暂无线上快照，点击“立即上传至线上快照”或等待周日 0 点自动上传</td></tr>`;
    return;
  }

  tbody.innerHTML = snaps.map((s) => {
    const regCnt = (s.payload?.asiaRegimentsDb || []).length;
    const logCnt = (s.payload?.matchLogs || []).length;
    const srcLabel = s.source === "sunday_00_auto" ? "周日0点自动" : "手动上传";
    return `
      <tr>
        <td><strong>${escapeHtml(s.weekKey)}</strong></td>
        <td style="font-size:0.82rem;">${escapeHtml(s.uploadedAt)}</td>
        <td><span class="tag-seed">${srcLabel}</span></td>
        <td style="font-size:0.82rem;">队伍库 ${regCnt} 支 · 战绩 ${logCnt} 场</td>
        <td style="text-align:center;">
          <button type="button" class="btn btn-outline-sm" onclick="restoreOnlineSnap('${s.id}')">恢复此快照</button>
        </td>
      </tr>
    `;
  }).join("");
}

window.restoreOnlineSnap = async function (snapId) {
  if (!confirm("确定要用选中的线上快照覆盖当前本地数据吗？")) return;
  const ok = window.WoRCloudSync.restoreSnapshot(snapId);
  if (ok) {
    await loadRegimentsDb();
    loadMatchLogs();
    renderQuickAddChips();
    renderAllDbTables();
    renderSyncStatusAndTable(false, "已从线上快照恢复本地数据");
  }
};
