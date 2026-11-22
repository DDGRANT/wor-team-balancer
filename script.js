// 本地存储 Key 定义（全局唯一声明）
const STORAGE_KEY_AUTO = "wor_balancer_autosave_v7";
const STORAGE_KEY_PRESET = "wor_balancer_preset_v7";
const STORAGE_KEY_LANG = "wor_balancer_lang_v7";

// 双语同屏字典：中英双语 (zh_en) / 日英双语 (ja_en)
const I18N = {
  zh_en: {
    htmlLang: "zh-CN",
    title: "WAR OF RIGHTS · 联队人数平衡器 Team Balancer",
    subtitle: "表格录入 · 虚报/少报修正与公示 · 分级区间配平 · 一键生成双语战报长图 | Table Entry · Audit Disclosure · Bracket Balance",
    tabTable: "📊 表格录入 Table Entry",
    tabText: "📝 文本批量粘贴 Bulk Paste",
    btnSavePreset: "💾 存为常用 Save Preset",
    btnLoadPreset: "📂 载入常用 Load Preset",
    btnExportJson: "⬇️ 导出 Export JSON",
    btnImportJson: "⬆️ 导入 Import JSON",
    thRegiment: "兵团番号 Regiment Tag",
    thMin: "申报下限 Min",
    thMax: "申报上限 Max",
    thAdjusted: "修正预估 & 分级 Adj & Bracket",
    thLock: "阵营锁定 Faction Lock",
    thAction: "操作 Action",
    btnAddRow: "+ 添加一行 Add Row",
    hintTable: "提示：下方“修正档案”中的兵团会自动折算并划分大/中/小型分级 | Tip: Regiments in Audit table are auto-adjusted & bracketed",
    labelRosterInput: "批量粘贴报名文本（每行一个，自动同步至表格 Paste Roster）：",
    hintTextFormat: "支持格式 Formats：<code>[18thVA]15-20</code>、<code>[HD] 25~30 USA</code>、<code>散人 Pubs 10</code>",
    btnParseToTable: "📥 解析并同步到表格 Parse & Sync",
    hintParseSync: "解析后自动切换回表格模式微调 | Auto-switches back to Table Entry",
    strategySectionTitle: "⚖️ 配平策略 Draw / Balance Mode",
    bracketRuleDesc: "分级规则：中位数>26=大型(2槽) >16=中型(1槽) 其余=小型(1槽) | Bracket: mid>26=Large(2), >16=Medium(1), else=Small(1)",
    modePureTitle: "纯平衡 Pure Balance",
    modePureDesc: "只根据人数上限和中位数平衡，不考虑战队分级 Balance by max & mid only, no brackets",
    modeBracketTitle: "分级平衡 Bracket Balance",
    modeBracketDesc: "先平衡人数，再平衡各级战队数，两队数量差<=2 Balance brackets, team count diff <=2",
    modeSmallCompTitle: "小战队补偿 Small Team Comp",
    modeSmallCompDesc: "先选出小型战队作为种子，其余分级平衡后补入 Seed small team, then bracket balance",
    btnSample: "填入示例 Sample",
    btnClear: "清空报名表 Clear",
    btnBalance: "⚔️ 开始自动平衡 Auto Balance",
    auditTitle: "⚖️ 兵团虚报 / 少报人数修正档案 Audit & Public Disclosure（公开公示 · 自动记忆）",
    auditFormula: "公式 Formula：<strong>修正后人数 Adjusted = round(申报 Reported × 系数 Factor + 增减 Offset)</strong>。例如虚报 20% 填 <code>0.80</code>；多报 3 人填 <code>-3</code>。",
    btnAddAudit: "+ 新增规则 Add Rule",
    thAuditTag: "兵团番号 Regiment Tag",
    thAuditFactor: "人数系数 Factor",
    thAuditDelta: "固定增减 Offset",
    thAuditReason: "公开公示说明 Public Reason",
    usaBadge: "USA 联邦军 Union",
    csaBadge: "CSA 邦联军 Confederate",
    diffTitle: "双方修正后人数差值 Headcount Diff",
    usaHeader: "USA · 联邦军 (Union)",
    csaHeader: "CSA · 邦联军 (Confederate)",
    resThRegiment: "兵团 Regiment",
    resThRaw: "申报 Raw",
    resThAdj: "修正 Adj",
    resThBracket: "分级 Bracket",
    resThStatus: "状态 Status",
    tfootTotal: "合计 Total",
    publicNoticeTitle: "📢 本次联队人数修正公开公示 Public Headcount Adjustment Disclosure",
    btnGenImg: "🖼️ 生成双语排表长图 Generate PNG",
    btnCopyText: "📋 复制双语群公告 Copy Roster Text",
    modalTitle: "对战排表长图预览 Preview（右键复制或点击下载 Download）",
    btnCloseModal: "关闭 Close ✕",
    btnDownloadImg: "⬇️ 下载 Download PNG",
    // 动态文本
    activeModeLabel: (name) => `当前策略 Active Mode：${name}`,
    teamCount: (n) => `${n} 队 Teams`,
    bracketLarge: "大型 Large(2)",
    bracketMedium: "中型 Medium(1)",
    bracketSmall: "小型 Small(1)",
    bracketShortL: "大L(2)",
    bracketShortM: "中M(1)",
    bracketShortS: "小S(1)",
    slotCount: (s) => `${s} 槽 Slots`,
    lockAuto: "自动分配 Auto",
    lockUSA: "锁定 USA Lock",
    lockCSA: "锁定 CSA Lock",
    btnDelete: "删除 Del",
    phRegiment: "如 [18thVA] 或 散人 Pubs",
    phAuditTag: "如 [18thVA] 或 18thVA",
    phAuditReason: "公示依据 Basis，如：近期出勤约80% / ~80% turnout",
    emptyAuditRow: "暂无虚报/少报修正记录（所有兵团按 100% 计算）| No audit rules configured",
    emptyResultRow: "暂无队伍分配至此阵营 | No regiments assigned",
    statusLocked: (f) => `锁定 Lock ${f}`,
    statusModified: "已修正 Adj",
    statusSeed: "种子 Seed",
    statusAuto: "自动 Auto",
    btnSwapTo: (f) => `转 ${f} ⇄`,
    footAdjSummary: (min, max, avg) => `${min}-${max} (均值Avg ${avg})`,
    summarySub: (avg, rMin, rMax) => `修正均值 Avg：${avg} | 原始申报 Raw：${rMin}-${rMax}`,
    bracketBreakdown: (l, m, s, slots) => `分级 Brackets：大L×${l} 中M×${m} 小S×${s} (${slots}槽Slots)`,
    diffSubText: (minD, maxD) => `下限差 MinDiff ${minD} | 上限差 MaxDiff ${maxD}`,
    avgDiffText: (avgD) => `中位均值差 MidDiff：${avgD}`,
    teamDiffText: (tDiff, sDiff) => `队数差 TeamDiff：${tDiff} | 槽位差 SlotDiff：${sDiff}`,
    saveEnabled: "● 已启用自动本地记忆 Auto-Save Active",
    saveAutoDone: "● 已自动保存至本地 Auto-Saved",
    saveRestored: "● 已恢复上次本地记忆 Restored",
    savePresetDone: "✔ 已保存为常用名单！Preset Saved!",
    loadPresetDone: "✔ 已载入常用名单！Preset Loaded!",
    exportJsonDone: "✔ 已导出 JSON 备份！JSON Exported!",
    importJsonDone: "✔ JSON 导入成功！JSON Imported!",
    copyDone: "✔ 已复制双语战报到剪贴板！Copied!",
    warnHeader: "以下行格式未能识别（已跳过）Unrecognized lines:",
    warnLine: (lineNo, txt) => `第 ${lineNo} 行无法识别 Line ${lineNo}: "${txt}"`,
    unnamedTeam: (n) => `未命名队伍#${n}`,
    alertNoSaveData: "当前没有可保存的有效兵团数据！No valid rows to save!",
    alertNoPreset: "尚未保存过常用名单！No preset saved yet!",
    alertReadPresetFail: "读取常用名单失败。Failed to load preset.",
    alertInvalidJson: "JSON 文件格式不正确。Invalid JSON file.",
    alertNoExportData: "当前没有可导出的排表数据！No data to export!",
    alertNoImgData: "当前没有可生成图片的排表数据！No data to render!",
    noticeItem: (item, r, formulaStr) => {
      const reasonStr = r.reason ? `（依据 Basis：${r.reason}）` : "";
      return `${item.name}：申报 Raw ${item.rawMin}-${item.rawMax} → 修正 Adj ${item.min}-${item.max} [${formulaStr}]${reasonStr}`;
    },
    factorLabel: (f) => `系数Factor ×${f}`,
    deltaLabel: (d) => `增减Offset ${d > 0 ? "+" + d : d}`,
    exportTitle: "【War of Rights 联队阵营分配表 Event Faction Roster】",
    exportModeLine: (modeName) => `⚖️ 配平策略 Balance Mode：${modeName}`,
    exportUSA: (min, max, avg, l, m, s) => `🔵 USA 联邦军 Union [修正预估 ${min}-${max} | 均值Avg ${avg} | 大L:${l} 中M:${m} 小S:${s}]：`,
    exportCSA: (min, max, avg, l, m, s) => `⚪ CSA 邦联军 Confederate [修正预估 ${min}-${max} | 均值Avg ${avg} | 大L:${l} 中M:${m} 小S:${s}]：`,
    exportLineMod: (name, adj, rMin, rMax, bTag) => `• ${name} [${bTag}]：修正Adj ${adj}（原报Raw ${rMin}-${rMax}）`,
    exportLineNorm: (name, adj, bTag) => `• ${name} [${bTag}]：${adj}`,
    exportDiff: (minD, maxD, tDiff) => `📊 双方修正差 Diff：下限差Min ${minD} / 上限差Max ${maxD} / 队数差Teams ${tDiff}`,
    exportNoticeHeader: "⚖️ 【人数修正公开公示 Public Adjustment Disclosure】：",
    imgTitle: "WAR OF RIGHTS · 联队阵营人数平衡排表 EVENT ROSTER",
    imgSubtitle: (timeStr, modeName, minD, maxD, tDiff) => `${timeStr}  |  ${modeName}  |  下限差Min:${minD} 上限差Max:${maxD} 队数差Teams:${tDiff}`,
    imgUSATitle: "USA 联邦军",
    imgCSATitle: "CSA 邦联军",
    imgCardSub: (avg, rMin, rMax) => `均值Avg ${avg} | 原报Raw ${rMin}-${rMax}`,
    imgTableTeams: (n, l, m, s) => `${n}队 (L:${l} M:${m} S:${s})`,
    imgRowMod: (adjStr, rMin, rMax, bShort) => `[${bShort}] 修正${adjStr} (原${rMin}-${rMax})`,
    imgRowNorm: (adjStr, bShort) => `[${bShort}] ${adjStr}`,
    imgFootLabel: "合计 Total",
    imgNoticeTitle: "⚖️ 本次联队人数修正公开公示 Public Adjustment Disclosure：",
    imgFooter: "War of Rights Team Balancer · 双语智能平衡与人数修正公示系统"
  },
  ja_en: {
    htmlLang: "ja",
    title: "WAR OF RIGHTS · 連隊人数バランサー Team Balancer",
    subtitle: "テーブル入力 · 申告人数補正と公開公示 · 規模階級バランス · 日英編成表画像出力 | Table · Audit · Bracket Balance",
    tabTable: "📊 テーブル入力 Table Entry",
    tabText: "📝 テキスト一括貼付 Bulk Paste",
    btnSavePreset: "💾 定番保存 Save Preset",
    btnLoadPreset: "📂 定番読込 Load Preset",
    btnExportJson: "⬇️ 出力 Export JSON",
    btnImportJson: "⬆️ 読込 Import JSON",
    thRegiment: "連隊タグ Regiment Tag",
    thMin: "申告下限 Min",
    thMax: "申告上限 Max",
    thAdjusted: "補正予測 & 階級 Adj & Bracket",
    thLock: "陣営固定 Faction Lock",
    thAction: "操作 Action",
    btnAddRow: "+ 行を追加 Add Row",
    hintTable: "ヒント：「人数補正アーカイブ」登録連隊は自動補正＆大/中/小規模に分類されます | Tip: Regiments in Audit table are auto-adjusted",
    labelRosterInput: "参加リスト一括貼付（1行1連隊・自動同期 Paste Roster）：",
    hintTextFormat: "対応形式 Formats：<code>[18thVA]15-20</code>、<code>[HD] 25~30 USA</code>、<code>野良 Pubs 10</code>",
    btnParseToTable: "📥 解析してテーブルへ同期 Parse & Sync",
    hintParseSync: "解析後にテーブル入力モードへ自動切替 | Auto-switches back to Table Entry",
    strategySectionTitle: "⚖️ バランス方式 Draw / Balance Mode",
    bracketRuleDesc: "階級規則：中央値>26=大型(2枠) >16=中型(1枠) 他=小型(1枠) | Bracket: mid>26=Large(2), >16=Medium(1), else=Small(1)",
    modePureTitle: "純バランス Pure Balance",
    modePureDesc: "人数上限と中央値のみでバランス調整（連隊規模を考慮しない）Balance by max & mid only, no brackets",
    modeBracketTitle: "階級バランス Bracket Balance",
    modeBracketDesc: "人数を揃えた後、各規模の連隊数を均等化（連隊数差<=2）Balance brackets, team count diff <=2",
    modeSmallCompTitle: "小連隊補償 Small Team Comp",
    modeSmallCompDesc: "小型連隊をシードとして先に確保し、他を階級バランス後に補充 Seed small team, then bracket balance",
    btnSample: "サンプル Sample",
    btnClear: "消去 Clear",
    btnBalance: "⚔️ 自動バランス実行 Auto Balance",
    auditTitle: "⚖️ 連隊の過大・過少申告 補正アーカイブ Audit & Public Disclosure（公開公示 · 自動保存）",
    auditFormula: "計算式 Formula：<strong>補正後人数 Adjusted = round(申告 Reported × 係数 Factor + 増減 Offset)</strong>。例：20%過大は <code>0.80</code>、3名減は <code>-3</code>。",
    btnAddAudit: "+ ルール追加 Add Rule",
    thAuditTag: "連隊タグ Regiment Tag",
    thAuditFactor: "人数係数 Factor",
    thAuditDelta: "固定増减 Offset",
    thAuditReason: "公開公示根拠 Public Reason",
    usaBadge: "USA 北軍 Union",
    csaBadge: "CSA 南軍 Confederate",
    diffTitle: "両軍の補正後人数差 Headcount Diff",
    usaHeader: "USA · 北軍 (Union)",
    csaHeader: "CSA · 南軍 (Confederate)",
    resThRegiment: "連隊 Regiment",
    resThRaw: "申告 Raw",
    resThAdj: "補正 Adj",
    resThBracket: "階級 Bracket",
    resThStatus: "状態 Status",
    tfootTotal: "合計 Total",
    publicNoticeTitle: "📢 本イベントの人数補正に関する公開公示 Public Headcount Adjustment Disclosure",
    btnGenImg: "🖼️ 日英編成表画像を生成 Generate PNG",
    btnCopyText: "📋 日英告知テキストをコピー Copy Roster Text",
    modalTitle: "編成表画像プレビュー Preview（右クリックでコピー、または保存 Download）",
    btnCloseModal: "閉じる Close ✕",
    btnDownloadImg: "⬇️ 保存 Download PNG",
    // 动态文本
    activeModeLabel: (name) => `現在の方式 Active Mode：${name}`,
    teamCount: (n) => `${n} 連隊 Teams`,
    bracketLarge: "大型 Large(2)",
    bracketMedium: "中型 Medium(1)",
    bracketSmall: "小型 Small(1)",
    bracketShortL: "大L(2)",
    bracketShortM: "中M(1)",
    bracketShortS: "小S(1)",
    slotCount: (s) => `${s} 枠 Slots`,
    lockAuto: "自動振分 Auto",
    lockUSA: "USA 固定 Lock",
    lockCSA: "CSA 固定 Lock",
    btnDelete: "削除 Del",
    phRegiment: "例: [18thVA] / 野良 Pubs",
    phAuditTag: "例: [18thVA] / 18thVA",
    phAuditReason: "公示根拠 Basis（例：直近出席率約80% / ~80% turnout）",
    emptyAuditRow: "人数補正ルールはありません（全連隊100%計算）| No audit rules configured",
    emptyResultRow: "この陣営に割り当てられた連隊はありません | No regiments assigned",
    statusLocked: (f) => `${f} 固定 Lock`,
    statusModified: "補正済 Adj",
    statusSeed: "シード Seed",
    statusAuto: "自動 Auto",
    btnSwapTo: (f) => `${f} へ ⇄`,
    footAdjSummary: (min, max, avg) => `${min}-${max} (平均Avg ${avg})`,
    summarySub: (avg, rMin, rMax) => `補正平均 Avg：${avg} | 元申告 Raw：${rMin}-${rMax}`,
    bracketBreakdown: (l, m, s, slots) => `階級 Brackets：大L×${l} 中M×${m} 小S×${s} (${slots}枠Slots)`,
    diffSubText: (minD, maxD) => `下限差 MinDiff ${minD} | 上限差 MaxDiff ${maxD}`,
    avgDiffText: (avgD) => `中央平均差 MidDiff：${avgD}`,
    teamDiffText: (tDiff, sDiff) => `連隊数差 TeamDiff：${tDiff} | 枠数差 SlotDiff：${sDiff}`,
    saveEnabled: "● ローカル自動保存 有効 Auto-Save Active",
    saveAutoDone: "● 自動保存完了 Auto-Saved",
    saveRestored: "● 前回データを復元 Restored",
    savePresetDone: "✔ 定番リスト保存完了！Preset Saved!",
    loadPresetDone: "✔ 定番リスト読込完了！Preset Loaded!",
    exportJsonDone: "✔ JSON出力完了！JSON Exported!",
    importJsonDone: "✔ JSON読込完了！JSON Imported!",
    copyDone: "✔ 日英告知テキストをコピーしました！Copied!",
    warnHeader: "認識できなかった行（スキップ）Unrecognized lines:",
    warnLine: (lineNo, txt) => `${lineNo} 行目エラー Line ${lineNo}: "${txt}"`,
    unnamedTeam: (n) => `名称未設定#${n}`,
    alertNoSaveData: "保存できる有効なデータがありません！No valid rows to save!",
    alertNoPreset: "定番リストがまだ保存されていません！No preset saved yet!",
    alertReadPresetFail: "定番リストの読み込みに失敗しました。Failed to load preset.",
    alertInvalidJson: "JSONファイルの形式が正しくありません。Invalid JSON file.",
    alertNoExportData: "出力する編成データがありません！No data to export!",
    alertNoImgData: "画像を生成するデータがありません！No data to render!",
    noticeItem: (item, r, formulaStr) => {
      const reasonStr = r.reason ? `（根拠 Basis：${r.reason}）` : "";
      return `${item.name}：申告 Raw ${item.rawMin}-${item.rawMax} → 補正 Adj ${item.min}-${item.max} [${formulaStr}]${reasonStr}`;
    },
    factorLabel: (f) => `係数Factor ×${f}`,
    deltaLabel: (d) => `増減Offset ${d > 0 ? "+" + d : d}`,
    exportTitle: "【War of Rights 連隊陣営編成表 Event Faction Roster】",
    exportModeLine: (modeName) => `⚖️ バランス方式 Balance Mode：${modeName}`,
    exportUSA: (min, max, avg, l, m, s) => `🔵 USA 北軍 Union [補正予測 ${min}-${max} | 平均Avg ${avg} | 大L:${l} 中M:${m} 小S:${s}]：`,
    exportCSA: (min, max, avg, l, m, s) => `⚪ CSA 南軍 Confederate [補正予測 ${min}-${max} | 平均Avg ${avg} | 大L:${l} 中M:${m} 小S:${s}]：`,
    exportLineMod: (name, adj, rMin, rMax, bTag) => `• ${name} [${bTag}]：補正Adj ${adj}（元申告Raw ${rMin}-${rMax}）`,
    exportLineNorm: (name, adj, bTag) => `• ${name} [${bTag}]：${adj}`,
    exportDiff: (minD, maxD, tDiff) => `📊 両軍補正差 Diff：下限差Min ${minD} / 上限差Max ${maxD} / 連隊差Teams ${tDiff}`,
    exportNoticeHeader: "⚖️ 【人数補正に関する公開公示 Public Adjustment Disclosure】：",
    imgTitle: "WAR OF RIGHTS · 連隊陣営人数バランス編成表 EVENT ROSTER",
    imgSubtitle: (timeStr, modeName, minD, maxD, tDiff) => `${timeStr}  |  ${modeName}  |  下限差Min:${minD} 上限差Max:${maxD} 連隊差Teams:${tDiff}`,
    imgUSATitle: "USA 北軍",
    imgCSATitle: "CSA 南軍",
    imgCardSub: (avg, rMin, rMax) => `平均Avg ${avg} | 元申告Raw ${rMin}-${rMax}`,
    imgTableTeams: (n, l, m, s) => `${n}連隊 (L:${l} M:${m} S:${s})`,
    imgRowMod: (adjStr, rMin, rMax, bShort) => `[${bShort}] 補正${adjStr} (元${rMin}-${rMax})`,
    imgRowNorm: (adjStr, bShort) => `[${bShort}] ${adjStr}`,
    imgFootLabel: "合計 Total",
    imgNoticeTitle: "⚖️ 本イベントの人数補正に関する公開公示 Public Adjustment Disclosure：",
    imgFooter: "War of Rights Team Balancer · 日英自動バランス・人数修正公示システム"
  }
};

// 当前双语模式状态 ("zh_en" 或 "ja_en")
let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || "zh_en";
if (!I18N[currentLang]) currentLang = "zh_en";

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.zh_en;
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val !== undefined ? val : key;
}

// 核心数据模型
let entryRows = [];
let auditRules = [];
let currentMode = "pure"; // "pure" | "bracket" | "small_comp"
let currentState = { usa: [], csa: [] };

// DOM 引用
const tabTableBtn = document.getElementById("tabTableBtn");
const tabTextBtn = document.getElementById("tabTextBtn");
const tableInputView = document.getElementById("tableInputView");
const textInputView = document.getElementById("textInputView");
const entryTbody = document.getElementById("entryTbody");
const auditTbody = document.getElementById("auditTbody");
const rosterInput = document.getElementById("rosterInput");
const parseWarning = document.getElementById("parseWarning");
const saveIndicator = document.getElementById("saveIndicator");
const activeModeTag = document.getElementById("activeModeTag");

// 初始化加载
window.addEventListener("DOMContentLoaded", () => {
  bindLanguageButtons();
  bindStrategyCards();
  loadFromAutoSave();
  applyLanguage(currentLang, false);
});

function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang && I18N[lang]) {
        applyLanguage(lang, true);
      }
    });
  });
}

function bindStrategyCards() {
  document.querySelectorAll(".strategy-card").forEach((card) => {
    const selectHandler = () => {
      const mode = card.getAttribute("data-mode");
      if (!mode) return;
      setStrategyMode(mode, true);
    };
    card.addEventListener("click", selectHandler);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectHandler();
      }
    });
  });
}

function setStrategyMode(mode, triggerBalance = false) {
  if (!["pure", "bracket", "small_comp"].includes(mode)) {
    mode = "pure";
  }
  currentMode = mode;

  document.querySelectorAll(".strategy-card").forEach((card) => {
    card.classList.toggle("active", card.getAttribute("data-mode") === mode);
  });

  updateActiveModeLabel();
  saveToAutoSave();

  if (triggerBalance && getCleanRowsFromEntry().length > 0) {
    runBalance();
  }
}

function getModeDisplayName(mode) {
  if (mode === "bracket") return t("modeBracketTitle");
  if (mode === "small_comp") return t("modeSmallCompTitle");
  return t("modePureTitle");
}

function updateActiveModeLabel() {
  if (activeModeTag) {
    activeModeTag.textContent = t("activeModeLabel", getModeDisplayName(currentMode));
  }
}

function applyLanguage(lang, reRenderAll = true) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG, lang);
  document.documentElement.lang = t("htmlLang");

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });

  updateActiveModeLabel();
  if (saveIndicator) {
    saveIndicator.textContent = t("saveEnabled");
  }

  if (reRenderAll) {
    renderAuditTable();
    renderEntryTable();
    renderResultTables();
  }
}

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
    entryRows = teams.map((tItem) => ({
      id: tItem.id,
      name: tItem.name,
      min: tItem.min,
      max: tItem.max,
      lockedFaction: tItem.lockedFaction
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
    alert(t("alertNoSaveData"));
    return;
  }
  localStorage.setItem(STORAGE_KEY_PRESET, JSON.stringify(validRows));
  flashSaveIndicator(t("savePresetDone"));
});

// 载入常用名单模板
document.getElementById("loadPresetBtn").addEventListener("click", () => {
  const raw = localStorage.getItem(STORAGE_KEY_PRESET);
  if (!raw) {
    alert(t("alertNoPreset"));
    return;
  }
  try {
    const presetRows = JSON.parse(raw);
    entryRows = presetRows.map((r) => ({ ...r, id: genId() }));
    renderEntryTable();
    syncTableToText();
    saveToAutoSave();
    runBalance();
    flashSaveIndicator(t("loadPresetDone"));
  } catch (e) {
    alert(t("alertReadPresetFail"));
  }
});

// 导出 JSON 配置文件
document.getElementById("exportJsonBtn").addEventListener("click", () => {
  const backupData = {
    version: "WoR-Balancer-v7",
    exportedAt: new Date().toISOString(),
    balanceMode: currentMode,
    entryRows,
    auditRules,
    presetRows: JSON.parse(localStorage.getItem(STORAGE_KEY_PRESET) || "[]")
  };
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `WoR_Balancer_Backup_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
  flashSaveIndicator(t("exportJsonDone"));
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
        setStrategyMode(data.balanceMode, false);
      }
      renderEntryTable();
      renderAuditTable();
      syncTableToText();
      saveToAutoSave();
      runBalance();
      flashSaveIndicator(t("importJsonDone"));
    } catch (err) {
      alert(t("alertInvalidJson"));
    }
    importJsonInput.value = "";
  };
  reader.readAsText(file);
});

// 填入示例数据（以 [18thVA] 为首）
document.getElementById("sampleBtn").addEventListener("click", () => {
  const pubsName = currentLang === "ja_en" ? "野良 Pubs" : "散人 Pubs";
  entryRows = [
    { id: genId(), name: "[18thVA]", min: 15, max: 20, lockedFaction: null },
    { id: genId(), name: "[HD]", min: 26, max: 32, lockedFaction: null },
    { id: genId(), name: "[1stTX]", min: 18, max: 22, lockedFaction: null },
    { id: genId(), name: "[69thNY]", min: 28, max: 34, lockedFaction: null },
    { id: genId(), name: "[4thVA]", min: 10, max: 14, lockedFaction: "CSA" },
    { id: genId(), name: "[20thME]", min: 14, max: 18, lockedFaction: "USA" },
    { id: genId(), name: "[9thNY]", min: 8, max: 10, lockedFaction: null },
    { id: genId(), name: pubsName, min: 10, max: 14, lockedFaction: null }
  ];

  if (auditRules.length === 0) {
    const r1 = currentLang === "ja_en"
      ? "直近3回の出席率約80% / ~80% average turnout"
      : "近三次联队实际到场率约 80% / ~80% average turnout";
    const r2 = currentLang === "ja_en"
      ? "控えめな申告で実際は+3名 / Usually +3 extra players"
      : "保守少报倾向，实际多到约 3 人 / Usually +3 extra players";

    auditRules = [
      { id: genId(), tag: "[69thNY]", factor: 0.8, delta: 0, reason: r1 },
      { id: genId(), tag: "[9thNY]", factor: 1.0, delta: 3, reason: r2 }
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

// 点击“开始自动平衡”
document.getElementById("balanceBtn").addEventListener("click", () => {
  if (!textInputView.classList.contains("hidden")) {
    const { teams, invalidLines } = parseInputText(rosterInput.value);
    showWarnings(invalidLines);
    if (teams.length > 0) {
      entryRows = teams.map((tItem) => ({
        id: tItem.id,
        name: tItem.name,
        min: tItem.min,
        max: tItem.max,
        lockedFaction: tItem.lockedFaction
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

/**
 * 分级规则（依据参考图）：
 * 中位数 > 26 = 大型 (2槽)
 * 中位数 > 16 = 中型 (1槽)
 * 其余 <= 16  = 小型 (1槽)
 */
function classifyBracket(mid) {
  if (mid > 26) {
    return { bracket: "L", slots: 2 };
  }
  if (mid > 16) {
    return { bracket: "M", slots: 1 };
  }
  return { bracket: "S", slots: 1 };
}

function getBracketBadgeHtml(bracket) {
  if (bracket === "L") {
    return `<span class="bracket-pill bracket-large">${escapeHtml(t("bracketLarge"))}</span>`;
  }
  if (bracket === "M") {
    return `<span class="bracket-pill bracket-medium">${escapeHtml(t("bracketMedium"))}</span>`;
  }
  return `<span class="bracket-pill bracket-small">${escapeHtml(t("bracketSmall"))}</span>`;
}

function getBracketShortLabel(bracket) {
  if (bracket === "L") return t("bracketShortL");
  if (bracket === "M") return t("bracketShortM");
  return t("bracketShortS");
}

function renderAuditTable() {
  if (!auditTbody) return;
  if (auditRules.length === 0) {
    auditTbody.innerHTML = `<tr class="empty-row"><td colspan="5">${escapeHtml(t("emptyAuditRow"))}</td></tr>`;
    return;
  }

  auditTbody.innerHTML = auditRules
    .map((rule) => {
      return `
        <tr>
          <td>
            <input type="text" id="audit_tag_${rule.id}" name="audit_tag_${rule.id}" class="cell-input" placeholder="${escapeHtml(t("phAuditTag"))}"
              value="${escapeHtml(rule.tag)}"
              oninput="updateAuditRow('${rule.id}', 'tag', this.value)" />
          </td>
          <td>
            <input type="number" id="audit_factor_${rule.id}" name="audit_factor_${rule.id}" step="0.05" min="0.1" max="3.0" class="cell-input"
              value="${rule.factor}"
              onchange="updateAuditRow('${rule.id}', 'factor', this.value)" />
          </td>
          <td>
            <input type="number" id="audit_delta_${rule.id}" name="audit_delta_${rule.id}" step="1" min="-100" max="100" class="cell-input"
              value="${rule.delta}"
              onchange="updateAuditRow('${rule.id}', 'delta', this.value)" />
          </td>
          <td>
            <input type="text" id="audit_reason_${rule.id}" name="audit_reason_${rule.id}" class="cell-input" placeholder="${escapeHtml(t("phAuditReason"))}"
              value="${escapeHtml(rule.reason)}"
              oninput="updateAuditRow('${rule.id}', 'reason', this.value)" />
          </td>
          <td style="text-align: center;">
            <button type="button" class="del-row-btn" onclick="deleteAuditRow('${rule.id}')">${escapeHtml(t("btnDelete"))}</button>
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
      const mid = (adjMin + adjMax) / 2;
      const { bracket } = classifyBracket(mid);
      const rangeStr = `${adjMin}-${adjMax}`;
      const badgeHtml = getBracketBadgeHtml(bracket);

      return `
        <tr data-id="${row.id}">
          <td>
            <input type="text" id="entry_name_${row.id}" name="entry_name_${row.id}" class="cell-input" placeholder="${escapeHtml(t("phRegiment"))}"
              value="${escapeHtml(row.name)}"
              oninput="updateEntryRow('${row.id}', 'name', this.value)" />
          </td>
          <td>
            <input type="number" id="entry_min_${row.id}" name="entry_min_${row.id}" class="cell-input" min="0" max="500"
              value="${row.min}"
              onchange="updateEntryRow('${row.id}', 'min', this.value)" />
          </td>
          <td>
            <input type="number" id="entry_max_${row.id}" name="entry_max_${row.id}" class="cell-input" min="0" max="500"
              value="${row.max}"
              onchange="updateEntryRow('${row.id}', 'max', this.value)" />
          </td>
          <td>
            <span id="preview_${row.id}" class="adj-preview ${isModified ? "modified" : ""}">${rangeStr} ${badgeHtml}</span>
          </td>
          <td>
            <select id="entry_lock_${row.id}" name="entry_lock_${row.id}" class="cell-select" onchange="updateEntryRow('${row.id}', 'lockedFaction', this.value)">
              <option value="" ${!row.lockedFaction ? "selected" : ""}>${escapeHtml(t("lockAuto"))}</option>
              <option value="USA" ${row.lockedFaction === "USA" ? "selected" : ""}>${escapeHtml(t("lockUSA"))}</option>
              <option value="CSA" ${row.lockedFaction === "CSA" ? "selected" : ""}>${escapeHtml(t("lockCSA"))}</option>
            </select>
          </td>
          <td style="text-align: center;">
            <button type="button" class="del-row-btn" onclick="deleteEntryRow('${row.id}')">${escapeHtml(t("btnDelete"))}</button>
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
    const mid = (adjMin + adjMax) / 2;
    const { bracket } = classifyBracket(mid);
    previewEl.innerHTML = `${adjMin}-${adjMax} ${getBracketBadgeHtml(bracket)}`;
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

      const name = r.name.trim() || t("unnamedTeam", idx + 1);
      const auditRule = findAuditRuleForTeam(name);
      const { adjMin, adjMax, isModified } = applyAuditToTeam(rawMin, rawMax, auditRule);
      const avg = (adjMin + adjMax) / 2;
      const { bracket, slots } = classifyBracket(avg);

      return {
        id: r.id,
        name,
        rawMin,
        rawMax,
        min: adjMin,
        max: adjMax,
        avg,
        bracket,
        slots,
        lockedFaction: r.lockedFaction || null,
        isModified,
        isSeed: false,
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

    const rangeMatch = workingStr.match(/(\d+)\s*(?:[-~—–至到]\s*(\d+))?\s*[人名]?\s*$/);
    if (!rangeMatch) {
      invalidLines.push(t("warnLine", idx + 1, trimmed));
      return;
    }

    let min = parseInt(rangeMatch[1], 10);
    let max = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : min;
    if (min > max) [min, max] = [max, min];

    let name = workingStr.slice(0, rangeMatch.index).trim();
    if (!name) name = t("unnamedTeam", teams.length + 1);

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
    parseWarning.innerHTML = `<strong>${escapeHtml(t("warnHeader"))}</strong><br>${invalidLines.join("<br>")}`;
    parseWarning.classList.remove("hidden");
  } else {
    parseWarning.classList.add("hidden");
  }
}

/**
 * 核心平衡求解器（支持三种策略）：
 * 1. pure: 纯平衡（只根据人数上限与中位数平衡，不考虑战队分级）
 * 2. bracket: 分级平衡（先平衡人数，再平衡大/中/小各级战队数，两队总数量差 <= 2）
 * 3. small_comp: 小战队补偿（先选出小型战队作为种子，其余分级平衡后将种子补入人数劣势方）
 */
function balanceTeams(teams, mode = "pure") {
  const fixedUSA = [];
  const fixedCSA = [];
  let freeTeams = [];

  teams.forEach((item) => {
    const copy = { ...item, isSeed: false };
    if (copy.lockedFaction === "USA") fixedUSA.push(copy);
    else if (copy.lockedFaction === "CSA") fixedCSA.push(copy);
    else freeTeams.push(copy);
  });

  // 模式 3：小战队补偿（先提取小型战队作为补偿种子池）
  let seedPool = [];
  if (mode === "small_comp") {
    const smallFree = freeTeams.filter((tItem) => tItem.bracket === "S");
    const nonSmallFree = freeTeams.filter((tItem) => tItem.bracket !== "S");
    // 选取最多 2 支小型战队作为补偿种子（优先保留至少 1 支做尾差补偿）
    if (smallFree.length > 0) {
      smallFree.sort((a, b) => a.avg - b.avg);
      const seedCount = Math.min(2, smallFree.length);
      seedPool = smallFree.slice(0, seedCount).map((s) => ({ ...s, isSeed: true }));
      freeTeams = [...nonSmallFree, ...smallFree.slice(seedCount)];
    }
  }

  // 主体配平
  const mainResult = solvePartition(fixedUSA, fixedCSA, freeTeams, mode);
  let resUSA = mainResult.usa;
  let resCSA = mainResult.csa;

  // 若存在小战队补偿种子，依次补入当前中位数人数较少的一侧（同时兼顾两队数量差 <= 2）
  if (seedPool.length > 0) {
    seedPool.forEach((seed) => {
      const uStat = sumStats(resUSA);
      const cStat = sumStats(resCSA);
      const uCount = resUSA.length;
      const cCount = resCSA.length;

      // 优先补入人数少的一侧；若人数接近但一侧队伍已多出 2 支，则补入队伍少的一侧
      if (uCount - cCount >= 2) {
        resCSA.push(seed);
      } else if (cCount - uCount >= 2) {
        resUSA.push(seed);
      } else if (uStat.avg <= cStat.avg) {
        resUSA.push(seed);
      } else {
        resCSA.push(seed);
      }
    });
  }

  return { usa: resUSA, csa: resCSA };
}

function solvePartition(fixedUSA, fixedCSA, freeTeams, mode) {
  freeTeams.sort((a, b) => b.avg - a.avg);

  const baseU = sumStats(fixedUSA);
  const baseC = sumStats(fixedCSA);

  function evaluateState(uMin, uMax, uAvg, uCnt, uL, uM, uS, cMin, cMax, cAvg, cCnt, cL, cM, cS) {
    const diffMax = Math.abs(uMax - cMax);
    const diffAvg = Math.abs(uAvg - cAvg);
    const diffMin = Math.abs(uMin - cMin);

    if (mode === "pure") {
      // 纯平衡：只根据人数上限和中位数平衡，不考虑战队分级
      return diffAvg * 10 + diffMax * 6 + diffMin * 1;
    }

    // 分级平衡 / 小战队补偿主体：先平衡人数，再平衡各级战队数，两队数量差 <= 2
    const teamDiff = Math.abs(uCnt - cCnt);
    const teamCapPenalty = teamDiff > 2 ? (teamDiff - 2) * 5000 : 0;
    const bracketDiffPenalty =
      Math.abs(uL - cL) * 18 +
      Math.abs(uM - cM) * 10 +
      Math.abs(uS - cS) * 8 +
      teamDiff * 6;

    return teamCapPenalty + diffAvg * 25 + diffMax * 12 + diffMin * 3 + bracketDiffPenalty;
  }

  let bestUSA = [];
  let bestCSA = [];

  if (freeTeams.length <= 20) {
    let bestScore = Infinity;
    let bestMask = 0;

    function dfs(idx, uMin, uMax, uAvg, uCnt, uL, uM, uS, cMin, cMax, cAvg, cCnt, cL, cM, cS, mask) {
      if (idx === freeTeams.length) {
        const score = evaluateState(uMin, uMax, uAvg, uCnt, uL, uM, uS, cMin, cMax, cAvg, cCnt, cL, cM, cS);
        if (score < bestScore) {
          bestScore = score;
          bestMask = mask;
        }
        return;
      }

      const item = freeTeams[idx];
      const addL = item.bracket === "L" ? 1 : 0;
      const addM = item.bracket === "M" ? 1 : 0;
      const addS = item.bracket === "S" ? 1 : 0;

      // 放入 USA
      dfs(
        idx + 1,
        uMin + item.min, uMax + item.max, uAvg + item.avg, uCnt + 1, uL + addL, uM + addM, uS + addS,
        cMin, cMax, cAvg, cCnt, cL, cM, cS,
        mask | (1 << idx)
      );

      // 无固定队伍时对称去重
      if (idx === 0 && fixedUSA.length === 0 && fixedCSA.length === 0) {
        return;
      }

      // 放入 CSA
      dfs(
        idx + 1,
        uMin, uMax, uAvg, uCnt, uL, uM, uS,
        cMin + item.min, cMax + item.max, cAvg + item.avg, cCnt + 1, cL + addL, cM + addM, cS + addS,
        mask
      );
    }

    dfs(
      0,
      baseU.min, baseU.max, baseU.avg, fixedUSA.length, baseU.countL, baseU.countM, baseU.countS,
      baseC.min, baseC.max, baseC.avg, fixedCSA.length, baseC.countL, baseC.countM, baseC.countS,
      0
    );

    freeTeams.forEach((item, i) => {
      if (bestMask & (1 << i)) bestUSA.push(item);
      else bestCSA.push(item);
    });
  } else {
    // 超过 20 支队伍时的兜底贪心
    let u = { ...baseU, cnt: fixedUSA.length };
    let c = { ...baseC, cnt: fixedCSA.length };

    freeTeams.forEach((item) => {
      const addL = item.bracket === "L" ? 1 : 0;
      const addM = item.bracket === "M" ? 1 : 0;
      const addS = item.bracket === "S" ? 1 : 0;

      const sUSA = evaluateState(
        u.min + item.min, u.max + item.max, u.avg + item.avg, u.cnt + 1, u.countL + addL, u.countM + addM, u.countS + addS,
        c.min, c.max, c.avg, c.cnt, c.countL, c.countM, c.countS
      );
      const sCSA = evaluateState(
        u.min, u.max, u.avg, u.cnt, u.countL, u.countM, u.countS,
        c.min + item.min, c.max + item.max, c.avg + item.avg, c.cnt + 1, c.countL + addL, c.countM + addM, c.countS + addS
      );

      if (sUSA <= sCSA) {
        bestUSA.push(item);
        u.min += item.min; u.max += item.max; u.avg += item.avg; u.cnt++;
        u.countL += addL; u.countM += addM; u.countS += addS;
      } else {
        bestCSA.push(item);
        c.min += item.min; c.max += item.max; c.avg += item.avg; c.cnt++;
        c.countL += addL; c.countM += addM; c.countS += addS;
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
    (acc, item) => {
      const avg = item.avg ?? (item.min + item.max) / 2;
      const bInfo = item.bracket ? { bracket: item.bracket, slots: item.slots || (item.bracket === "L" ? 2 : 1) } : classifyBracket(avg);
      acc.rawMin += item.rawMin ?? item.min;
      acc.rawMax += item.rawMax ?? item.max;
      acc.min += item.min;
      acc.max += item.max;
      acc.avg += avg;
      acc.slots += bInfo.slots;
      if (bInfo.bracket === "L") acc.countL += 1;
      else if (bInfo.bracket === "M") acc.countM += 1;
      else acc.countS += 1;
      return acc;
    },
    { rawMin: 0, rawMax: 0, min: 0, max: 0, avg: 0, slots: 0, countL: 0, countM: 0, countS: 0 }
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

  currentState = balanceTeams(teams, currentMode);
  renderResultTables();
  saveToAutoSave();
}

window.swapTeamFaction = function (teamId, fromFaction) {
  const toFaction = fromFaction === "usa" ? "csa" : "usa";
  const sourceList = currentState[fromFaction];
  const idx = sourceList.findIndex((item) => item.id === teamId);
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
  const footSlots = document.getElementById(`${faction}FootSlots`);

  if (countTag) countTag.textContent = t("teamCount", list.length);
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">${escapeHtml(t("emptyResultRow"))}</td></tr>`;
    if (footRaw) footRaw.innerHTML = `<strong>0 - 0</strong>`;
    if (footAdj) footAdj.innerHTML = `<strong>0 - 0 (0.0)</strong>`;
    if (footSlots) footSlots.innerHTML = `<strong>${escapeHtml(t("slotCount", 0))}</strong>`;
    return;
  }

  const targetName = faction === "usa" ? "CSA" : "USA";

  tbody.innerHTML = list
    .map((item) => {
      const rMin = item.rawMin ?? item.min;
      const rMax = item.rawMax ?? item.max;
      const avg = item.avg ?? (item.min + item.max) / 2;
      const bracket = item.bracket || classifyBracket(avg).bracket;

      const rawText = `${rMin}-${rMax}`;
      const adjText = `${item.min}-${item.max}`;

      const badges = [];
      if (item.lockedFaction) {
        badges.push(`<span class="tag-lock">${escapeHtml(t("statusLocked", item.lockedFaction))}</span>`);
      }
      if (item.isModified) {
        badges.push(`<span class="tag-audit">${escapeHtml(t("statusModified"))}</span>`);
      }
      if (item.isSeed) {
        badges.push(`<span class="tag-seed">${escapeHtml(t("statusSeed"))}</span>`);
      }
      if (badges.length === 0) {
        badges.push(`<span class="tag-auto">${escapeHtml(t("statusAuto"))}</span>`);
      }

      return `
        <tr>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td>${rawText}</td>
          <td><strong style="color:${item.isModified ? "#f0b866" : "inherit"}">${adjText}</strong></td>
          <td>${getBracketBadgeHtml(bracket)}</td>
          <td>${badges.join(" ")}</td>
          <td>
            <button class="swap-btn" type="button" onclick="swapTeamFaction('${item.id}', '${faction}')">
              ${escapeHtml(t("btnSwapTo", targetName))}
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  const stats = sumStats(list);
  if (footRaw) footRaw.innerHTML = `<strong>${stats.rawMin}-${stats.rawMax}</strong>`;
  if (footAdj) footAdj.innerHTML = `<strong>${t("footAdjSummary", stats.min, stats.max, stats.avg.toFixed(1))}</strong>`;
  if (footSlots) footSlots.innerHTML = `<strong>${escapeHtml(t("slotCount", stats.slots))}</strong>`;
}

function updateSummary() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  const usaRangeEl = document.getElementById("usaRange");
  const usaAvgEl = document.getElementById("usaAvg");
  const usaBracketsEl = document.getElementById("usaBrackets");

  const csaRangeEl = document.getElementById("csaRange");
  const csaAvgEl = document.getElementById("csaAvg");
  const csaBracketsEl = document.getElementById("csaBrackets");

  const diffSummaryEl = document.getElementById("diffSummary");
  const avgDiffSummaryEl = document.getElementById("avgDiffSummary");
  const teamDiffSummaryEl = document.getElementById("teamDiffSummary");

  if (usaRangeEl) usaRangeEl.textContent = `${uStats.min} - ${uStats.max}`;
  if (usaAvgEl) usaAvgEl.textContent = t("summarySub", uStats.avg.toFixed(1), uStats.rawMin, uStats.rawMax);
  if (usaBracketsEl) usaBracketsEl.textContent = t("bracketBreakdown", uStats.countL, uStats.countM, uStats.countS, uStats.slots);

  if (csaRangeEl) csaRangeEl.textContent = `${cStats.min} - ${cStats.max}`;
  if (csaAvgEl) csaAvgEl.textContent = t("summarySub", cStats.avg.toFixed(1), cStats.rawMin, cStats.rawMax);
  if (csaBracketsEl) csaBracketsEl.textContent = t("bracketBreakdown", cStats.countL, cStats.countM, cStats.countS, cStats.slots);

  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  const avgDiff = Math.abs(uStats.avg - cStats.avg);
  const teamDiff = Math.abs(currentState.usa.length - currentState.csa.length);
  const slotDiff = Math.abs(uStats.slots - cStats.slots);

  if (diffSummaryEl) diffSummaryEl.textContent = t("diffSubText", minDiff, maxDiff);
  if (avgDiffSummaryEl) avgDiffSummaryEl.textContent = t("avgDiffText", avgDiff.toFixed(1));
  if (teamDiffSummaryEl) teamDiffSummaryEl.textContent = t("teamDiffText", teamDiff, slotDiff);
}

function getActivePublicNotices() {
  const allTeams = [...currentState.usa, ...currentState.csa];
  return allTeams
    .filter((item) => item.isModified && item.auditRule)
    .map((item) => {
      const r = item.auditRule;
      const factorPart = r.factor !== 1 ? t("factorLabel", r.factor) : "";
      const deltaPart = r.delta !== 0 ? t("deltaLabel", r.delta) : "";
      const formulaStr = [factorPart, deltaPart].filter(Boolean).join(", ");
      return t("noticeItem", item, r, formulaStr);
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
    balanceMode: currentMode
  };
  localStorage.setItem(STORAGE_KEY_AUTO, JSON.stringify(payload));
  flashSaveIndicator(t("saveAutoDone"));
}

function loadFromAutoSave() {
  const raw = localStorage.getItem(STORAGE_KEY_AUTO);
  if (!raw) {
    entryRows = [createEmptyRow()];
    setStrategyMode("pure", false);
    renderAuditTable();
    renderEntryTable();
    renderResultTables();
    return;
  }

  try {
    const saved = JSON.parse(raw);
    entryRows = Array.isArray(saved.entryRows) && saved.entryRows.length > 0
      ? saved.entryRows
      : [createEmptyRow()];
    auditRules = Array.isArray(saved.auditRules) ? saved.auditRules : [];
    currentState = saved.currentState || { usa: [], csa: [] };
    setStrategyMode(saved.balanceMode || "pure", false);
    renderAuditTable();
    renderEntryTable();
    syncTableToText();
    renderResultTables();
    flashSaveIndicator(t("saveRestored"));
  } catch (e) {
    entryRows = [createEmptyRow()];
    setStrategyMode("pure", false);
    renderAuditTable();
    renderEntryTable();
    renderResultTables();
  }
}

function flashSaveIndicator(msg) {
  if (saveIndicator) saveIndicator.textContent = msg;
}

function copyScheduleText() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  if (currentState.usa.length === 0 && currentState.csa.length === 0) {
    alert(t("alertNoExportData"));
    return;
  }

  const formatLine = (item) => {
    const avg = item.avg ?? (item.min + item.max) / 2;
    const bTag = getBracketShortLabel(item.bracket || classifyBracket(avg).bracket);
    const adj = `${item.min}-${item.max}`;
    if (item.isModified) {
      return t("exportLineMod", item.name, adj, item.rawMin, item.rawMax, bTag);
    }
    return t("exportLineNorm", item.name, adj, bTag);
  };

  const teamDiff = Math.abs(currentState.usa.length - currentState.csa.length);

  const lines = [
    t("exportTitle"),
    t("exportModeLine", getModeDisplayName(currentMode)),
    "",
    t("exportUSA", uStats.min, uStats.max, uStats.avg.toFixed(1), uStats.countL, uStats.countM, uStats.countS),
    ...currentState.usa.map(formatLine),
    "",
    t("exportCSA", cStats.min, cStats.max, cStats.avg.toFixed(1), cStats.countL, cStats.countM, cStats.countS),
    ...currentState.csa.map(formatLine),
    "",
    t("exportDiff", Math.abs(uStats.min - cStats.min), Math.abs(uStats.max - cStats.max), teamDiff)
  ];

  const notices = getActivePublicNotices();
  if (notices.length > 0) {
    lines.push("", t("exportNoticeHeader"));
    notices.forEach((n) => lines.push(`- ${n}`));
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const status = document.getElementById("copyStatus");
    if (status) {
      status.textContent = t("copyDone");
      setTimeout(() => {
        status.textContent = "";
      }, 3000);
    }
  });
}

function generateScheduleImage() {
  if (currentState.usa.length === 0 && currentState.csa.length === 0) {
    alert(t("alertNoImgData"));
    return;
  }

  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);
  const notices = getActivePublicNotices();

  const width = 1080;
  const maxRows = Math.max(currentState.usa.length, currentState.csa.length, 1);
  const rowHeight = 42;
  const tableStartY = 200;
  const tableHeight = 44 + maxRows * rowHeight + 46;
  const noticeBlockHeight = notices.length > 0 ? 55 + notices.length * 28 : 0;
  const height = tableStartY + tableHeight + noticeBlockHeight + 65;

  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const fontStack = "'Microsoft YaHei', 'Hiragino Sans', 'Yu Gothic', 'Segoe UI', sans-serif";

  ctx.fillStyle = "#14171c";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#c8a252";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.fillStyle = "#c8a252";
  ctx.font = `bold 25px ${fontStack}`;
  ctx.textAlign = "center";
  ctx.fillText(t("imgTitle"), width / 2, 56);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = `13.5px ${fontStack}`;
  const localeMap = { zh_en: "zh-CN", ja_en: "ja-JP" };
  const timeStr = new Date().toLocaleString(localeMap[currentLang] || "zh-CN", { hour12: false });
  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  const teamDiff = Math.abs(currentState.usa.length - currentState.csa.length);
  ctx.fillText(t("imgSubtitle", timeStr, getModeDisplayName(currentMode), minDiff, maxDiff, teamDiff), width / 2, 84);

  drawSummaryBox(
    ctx, fontStack, 36, 108, 485, 70, "#1f4268", "#7fb3eb",
    t("imgUSATitle"),
    `${uStats.min} - ${uStats.max}`,
    t("imgCardSub", uStats.avg.toFixed(1), uStats.rawMin, uStats.rawMax)
  );
  drawSummaryBox(
    ctx, fontStack, 559, 108, 485, 70, "#4b4f56", "#d1b48c",
    t("imgCSATitle"),
    `${cStats.min} - ${cStats.max}`,
    t("imgCardSub", cStats.avg.toFixed(1), cStats.rawMin, cStats.rawMax)
  );

  drawFactionTable(ctx, fontStack, 36, tableStartY, 485, maxRows, rowHeight, "#1f4268", t("usaHeader"), currentState.usa, uStats);
  drawFactionTable(ctx, fontStack, 559, tableStartY, 485, maxRows, rowHeight, "#4b4f56", t("csaHeader"), currentState.csa, cStats);

  if (notices.length > 0) {
    const ny = tableStartY + tableHeight + 20;
    ctx.fillStyle = "rgba(200, 162, 82, 0.12)";
    ctx.fillRect(36, ny, width - 72, noticeBlockHeight);
    ctx.strokeStyle = "#c8a252";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(36, ny, width - 72, noticeBlockHeight);

    ctx.fillStyle = "#c8a252";
    ctx.font = `bold 15px ${fontStack}`;
    ctx.textAlign = "left";
    ctx.fillText(t("imgNoticeTitle"), 52, ny + 28);

    ctx.fillStyle = "#e6e8ec";
    ctx.font = `13px ${fontStack}`;
    notices.forEach((line, idx) => {
      ctx.fillText(`• ${line}`, 54, ny + 54 + idx * 26);
    });
  }

  ctx.fillStyle = "#6c7586";
  ctx.font = `12px ${fontStack}`;
  ctx.textAlign = "center";
  ctx.fillText(t("imgFooter"), width / 2, height - 24);

  const dataUrl = canvas.toDataURL("image/png");
  document.getElementById("previewImg").src = dataUrl;
  document.getElementById("downloadImgLink").href = dataUrl;
  document.getElementById("imageModal").classList.remove("hidden");
}

function drawSummaryBox(ctx, fontStack, x, y, w, h, headerColor, accentColor, title, mainText, subText) {
  ctx.fillStyle = "#1d222a";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = headerColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, 134, h);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 14.5px ${fontStack}`;
  ctx.textAlign = "center";
  ctx.fillText(title, x + 67, y + 41);

  ctx.fillStyle = accentColor;
  ctx.font = `bold 21px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(mainText, x + 150, y + 34);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = `12.5px ${fontStack}`;
  ctx.fillText(subText, x + 150, y + 56);
}

function drawFactionTable(ctx, fontStack, x, y, w, maxRows, rowH, headerColor, title, list, stats) {
  const totalH = 44 + maxRows * rowH + 46;
  ctx.fillStyle = "#1d222a";
  ctx.fillRect(x, y, w, totalH);
  ctx.strokeStyle = "#323a46";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, w, totalH);

  ctx.fillStyle = headerColor;
  ctx.fillRect(x, y, w, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 15px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(title, x + 16, y + 28);

  ctx.textAlign = "right";
  ctx.font = `12.5px ${fontStack}`;
  ctx.fillText(t("imgTableTeams", list.length, stats.countL, stats.countM, stats.countS), x + w - 16, y + 27);

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

    const item = list[i];
    if (!item) continue;

    const avg = item.avg ?? (item.min + item.max) / 2;
    const bShort = getBracketShortLabel(item.bracket || classifyBracket(avg).bracket);

    ctx.textAlign = "left";
    ctx.fillStyle = "#e6e8ec";
    ctx.font = `bold 14.5px ${fontStack}`;
    ctx.fillText(item.name, x + 16, ry + 26);

    const adjStr = `${item.min}-${item.max}`;
    ctx.textAlign = "right";
    if (item.isModified) {
      ctx.fillStyle = "#f0b866";
      ctx.font = `bold 13px ${fontStack}`;
      ctx.fillText(t("imgRowMod", adjStr, item.rawMin, item.rawMax, bShort), x + w - 16, ry + 26);
    } else {
      ctx.fillStyle = "#cbd2df";
      ctx.font = `13.5px ${fontStack}`;
      ctx.fillText(t("imgRowNorm", adjStr, bShort), x + w - 16, ry + 26);
    }
  }

  const fy = y + 44 + maxRows * rowH;
  ctx.fillStyle = "#161a20";
  ctx.fillRect(x, fy, w, 46);
  ctx.fillStyle = "#c8a252";
  ctx.font = `bold 14px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(`${t("imgFootLabel")} (${t("slotCount", stats.slots)})`, x + 16, fy + 28);

  ctx.textAlign = "right";
  ctx.fillText(t("footAdjSummary", stats.min, stats.max, stats.avg.toFixed(1)), x + w - 16, fy + 28);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
