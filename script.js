// 本地存储 Key 定义
const STORAGE_KEY_AUTO = "wor_balancer_autosave_v5";
const STORAGE_KEY_PRESET = "wor_balancer_preset_v5";
const STORAGE_KEY_LANG = "wor_balancer_lang_v5";

// 多语言字典（简体中文 / English / 日本語）
const I18N = {
  zh: {
    htmlLang: "zh-CN",
    title: "WAR OF RIGHTS · 联队人数平衡器",
    subtitle: "表格录入 · 虚报/少报修正与公示 · 双端区间配平 · 一键生成排表长图",
    tabTable: "📊 表格录入模式",
    tabText: "📝 文本批量粘贴",
    btnSavePreset: "💾 存为常用名单",
    btnLoadPreset: "📂 载入常用名单",
    btnExportJson: "⬇️ 导出 JSON 备份",
    btnImportJson: "⬆️ 导入 JSON",
    thRegiment: "兵团番号 / 队伍名称",
    thMin: "申报下限",
    thMax: "申报上限",
    thAdjusted: "修正后预估 (自动)",
    thLock: "阵营锁定",
    thAction: "操作",
    btnAddRow: "+ 添加一行兵团",
    hintTable: "提示：若下方“修正档案”中包含该团，系统会自动计算修正后预估人数并参与平衡",
    labelRosterInput: "批量粘贴报名文本（每行一个，自动同步至表格）：",
    hintTextFormat: "支持格式：<code>[FEX]15-20</code>、<code>[HD] 25~30 USA</code>、<code>散人 10</code>",
    btnParseToTable: "📥 解析并同步到表格",
    hintParseSync: "解析后会自动切换回表格模式供你微调",
    labelMode: "优先配平策略：",
    optBalanced: "综合平衡（同时兼顾下限、上限与预期均值）",
    optMin: "保底优先（优先对齐最低出勤下限）",
    optMax: "峰值优先（优先对齐最高出勤上限）",
    btnSample: "填入示例(含修正)",
    btnClear: "清空报名表",
    btnBalance: "⚔️ 开始自动平衡",
    auditTitle: "⚖️ 兵团虚报 / 少报人数修正档案（公开公示 · 自动记忆）",
    auditFormula: "公式：<strong>修正后人数 = round(申报人数 × 系数 + 增减值)</strong>。例如虚报 20% 可填系数 <code>0.80</code>；常多报 3 人可填增减 <code>-3</code>；少报多来则填 <code>1.15</code> 或 <code>+3</code>。",
    btnAddAudit: "+ 新增修正规则",
    thAuditTag: "兵团番号 (自动忽略方括号)",
    thAuditFactor: "人数系数 (默认1.0)",
    thAuditDelta: "固定增减 (如 -3 / +2)",
    thAuditReason: "公开公示说明 / 历史出勤依据",
    usaBadge: "USA 联邦军",
    csaBadge: "CSA 邦联军",
    diffTitle: "双方修正后人数差值",
    usaHeader: "USA · 联邦军 (Union)",
    csaHeader: "CSA · 邦联军 (Confederate)",
    resThRegiment: "兵团番号",
    resThRaw: "申报人数",
    resThAdj: "修正预估",
    resThStatus: "状态",
    tfootTotal: "合计",
    publicNoticeTitle: "📢 本次联队人数修正公开公示",
    btnGenImg: "🖼️ 生成对战排表图片 (PNG)",
    btnCopyText: "📋 一键复制群公告文本(含公示)",
    modalTitle: "对战排表长图预览（可直接右键复制或点击下载发群）",
    btnCloseModal: "关闭 ✕",
    btnDownloadImg: "⬇️ 下载 PNG 图片",
    // 动态文本模板
    unitPerson: "人",
    teamCount: (n) => `${n} 支队伍`,
    adjModifiedTag: (min, max) => `${min} - ${max} 人 (已修正)`,
    adjNormalTag: (min, max) => `${min} - ${max} 人`,
    lockAuto: "自动分配",
    lockUSA: "锁定 USA 联邦",
    lockCSA: "锁定 CSA 邦联",
    btnDelete: "删除",
    phRegiment: "如 [FEX] 或 散人",
    phAuditTag: "如 [FEX] 或 FEX",
    phAuditReason: "填写公示依据，如：近期出勤率约80%",
    emptyAuditRow: "暂无虚报/少报修正记录（所有兵团均按 100% 申报人数计算）",
    emptyResultRow: "暂无队伍分配至此阵营",
    statusLocked: (f) => `锁定 ${f}`,
    statusModified: "已修正",
    statusAuto: "自动分配",
    btnSwapTo: (f) => `转至 ${f} ⇄`,
    footAdjSummary: (min, max, avg) => `${min} - ${max} 人 (均值 ${avg})`,
    summarySub: (avg, rMin, rMax) => `修正均值：${avg} 人 | 原始申报：${rMin}-${rMax} 人`,
    diffSubText: (minD, maxD) => `下限差 ${minD} 人 | 上限差 ${maxD} 人`,
    avgDiffText: (avgD) => `修正均值差：${avgD} 人`,
    saveEnabled: "● 已启用自动本地记忆",
    saveAutoDone: "● 已自动保存至本地",
    saveRestored: "● 已恢复上次的本地记忆数据",
    savePresetDone: "✔ 已保存为常用名单模板！",
    loadPresetDone: "✔ 已载入常用名单！",
    exportJsonDone: "✔ 已导出 JSON 配置文件！",
    importJsonDone: "✔ JSON 配置导入成功！",
    copyDone: "✔ 已复制到剪贴板，可直接粘贴发送！",
    warnHeader: "以下行格式未能识别（已跳过）：",
    warnLine: (lineNo, txt) => `第 ${lineNo} 行无法识别人数: "${txt}"`,
    unnamedTeam: (n) => `未命名队伍#${n}`,
    alertNoSaveData: "当前表格没有可保存的有效兵团数据！",
    alertNoPreset: "尚未保存过常用名单模板！请先录入兵团后点击“存为常用名单”。",
    alertReadPresetFail: "读取常用名单失败。",
    alertInvalidJson: "JSON 文件格式不正确，导入失败。",
    alertNoExportData: "当前没有可导出的排表数据！",
    alertNoImgData: "当前没有可生成图片的排表数据，请先点击“开始自动平衡”！",
    noticeItem: (t, r, formulaStr) => {
      const reasonStr = r.reason ? `（依据：${r.reason}）` : "";
      return `${t.name}：申报 ${t.rawMin}-${t.rawMax}人 → 修正为 ${t.min}-${t.max}人 [${formulaStr}]${reasonStr}`;
    },
    factorLabel: (f) => `系数 ×${f}`,
    deltaLabel: (d) => `增减 ${d > 0 ? "+" + d : d}人`,
    // 导出文本 & Canvas 图片文案
    exportTitle: "【War of Rights 联队阵营分配表】",
    exportUSA: (min, max, avg) => `🔵 USA 联邦军 [修正预估 ${min}-${max} 人 | 均值 ${avg}]：`,
    exportCSA: (min, max, avg) => `⚪ CSA 邦联军 [修正预估 ${min}-${max} 人 | 均值 ${avg}]：`,
    exportLineMod: (name, adj, rMin, rMax) => `• ${name}：修正 ${adj}（原报 ${rMin}-${rMax}人）`,
    exportLineNorm: (name, adj) => `• ${name}：${adj}`,
    exportDiff: (minD, maxD) => `📊 双方修正后人数差：下限差 ${minD} 人 / 上限差 ${maxD} 人`,
    exportNoticeHeader: "⚖️ 【人数修正公开公示】：",
    imgTitle: "WAR OF RIGHTS · 联队阵营人数平衡排表",
    imgSubtitle: (timeStr, minD, maxD) => `生成时间：${timeStr}   |   双方修正后人数差：下限差 ${minD} 人 / 上限差 ${maxD} 人`,
    imgUSATitle: "USA 联邦军",
    imgCSATitle: "CSA 邦联军",
    imgCardSub: (avg, rMin, rMax) => `修正均值 ${avg} | 原始申报 ${rMin}-${rMax}`,
    imgTableTeams: (n) => `共 ${n} 支队伍`,
    imgRowMod: (adjStr, rMin, rMax) => `修正 ${adjStr} (原${rMin}-${rMax})`,
    imgFootLabel: "合计修正预估",
    imgNoticeTitle: "⚖️ 本次联队人数修正公开公示：",
    imgFooter: "War of Rights Team Balancer · 自动平衡与人数修正公示系统"
  },
  en: {
    htmlLang: "en",
    title: "WAR OF RIGHTS · REGIMENT TEAM BALANCER",
    subtitle: "Table Entry · Attendance Adjustment & Public Audit · Interval Balancing · PNG Roster Export",
    tabTable: "📊 Table Entry",
    tabText: "📝 Bulk Text Paste",
    btnSavePreset: "💾 Save Preset",
    btnLoadPreset: "📂 Load Preset",
    btnExportJson: "⬇️ Export JSON",
    btnImportJson: "⬆️ Import JSON",
    thRegiment: "Regiment Tag / Name",
    thMin: "Reported Min",
    thMax: "Reported Max",
    thAdjusted: "Adjusted Est. (Auto)",
    thLock: "Faction Lock",
    thAction: "Action",
    btnAddRow: "+ Add Regiment Row",
    hintTable: "Tip: Regiments listed in the Adjustment Audit table below will be auto-adjusted before balancing.",
    labelRosterInput: "Paste bulk roster text (one per line, auto-syncs to table):",
    hintTextFormat: "Formats: <code>[FEX]15-20</code>, <code>[HD] 25~30 USA</code>, <code>Pubs 10</code>",
    btnParseToTable: "📥 Parse & Sync to Table",
    hintParseSync: "Automatically switches back to Table Entry for fine-tuning",
    labelMode: "Balancing Priority:",
    optBalanced: "Balanced (Min, Max & Expected Average)",
    optMin: "Minimum Floor Priority (Align Minimum Headcount)",
    optMax: "Maximum Ceiling Priority (Align Maximum Headcount)",
    btnSample: "Load Sample",
    btnClear: "Clear Roster",
    btnBalance: "⚔️ Auto Balance",
    auditTitle: "⚖️ Regiment Over/Under-Reporting Audit & Public Disclosure (Auto-Saved)",
    auditFormula: "Formula: <strong>Adjusted = round(Reported × Factor + Offset)</strong>. E.g., 20% over-report → Factor <code>0.80</code>; usually -3 players → Offset <code>-3</code>; under-report → <code>1.15</code> or <code>+3</code>.",
    btnAddAudit: "+ Add Audit Rule",
    thAuditTag: "Regiment Tag (Brackets ignored)",
    thAuditFactor: "Multiplier (Default 1.0)",
    thAuditDelta: "Fixed Offset (e.g. -3 / +2)",
    thAuditReason: "Public Disclosure Note / Attendance Basis",
    usaBadge: "USA UNION",
    csaBadge: "CSA CONFEDERATE",
    diffTitle: "Adjusted Headcount Difference",
    usaHeader: "USA · Union Forces",
    csaHeader: "CSA · Confederate Forces",
    resThRegiment: "Regiment",
    resThRaw: "Reported",
    resThAdj: "Adjusted",
    resThStatus: "Status",
    tfootTotal: "Total",
    publicNoticeTitle: "📢 Public Disclosure of Headcount Adjustments",
    btnGenImg: "🖼️ Generate Roster Image (PNG)",
    btnCopyText: "📋 Copy Discord/Chat Announcement",
    modalTitle: "Roster Image Preview (Right-click to copy or click Download)",
    btnCloseModal: "Close ✕",
    btnDownloadImg: "⬇️ Download PNG",
    unitPerson: "",
    teamCount: (n) => `${n} Team${n === 1 ? "" : "s"}`,
    adjModifiedTag: (min, max) => `${min} - ${max} (Adjusted)`,
    adjNormalTag: (min, max) => `${min} - ${max}`,
    lockAuto: "Auto Assign",
    lockUSA: "Lock USA",
    lockCSA: "Lock CSA",
    btnDelete: "Delete",
    phRegiment: "e.g. [FEX] or Pubs",
    phAuditTag: "e.g. [FEX] or FEX",
    phAuditReason: "Public reason, e.g. ~80% recent turnout",
    emptyAuditRow: "No adjustment rules configured (all regiments calculated at 100% reported strength).",
    emptyResultRow: "No regiments assigned to this faction",
    statusLocked: (f) => `Locked ${f}`,
    statusModified: "Adjusted",
    statusAuto: "Auto",
    btnSwapTo: (f) => `Move to ${f} ⇄`,
    footAdjSummary: (min, max, avg) => `${min} - ${max} (Avg ${avg})`,
    summarySub: (avg, rMin, rMax) => `Adjusted Avg: ${avg} | Reported: ${rMin}-${rMax}`,
    diffSubText: (minD, maxD) => `Min Diff: ${minD} | Max Diff: ${maxD}`,
    avgDiffText: (avgD) => `Adjusted Avg Diff: ${avgD}`,
    saveEnabled: "● Local Auto-Save Active",
    saveAutoDone: "● Auto-saved locally",
    saveRestored: "● Restored previous session data",
    savePresetDone: "✔ Saved as Preset Roster!",
    loadPresetDone: "✔ Preset Roster loaded!",
    exportJsonDone: "✔ JSON backup exported!",
    importJsonDone: "✔ JSON backup imported!",
    copyDone: "✔ Copied to clipboard!",
    warnHeader: "Unrecognized lines (skipped):",
    warnLine: (lineNo, txt) => `Line ${lineNo} invalid headcount: "${txt}"`,
    unnamedTeam: (n) => `Unnamed#${n}`,
    alertNoSaveData: "No valid regiment rows to save!",
    alertNoPreset: "No preset saved yet! Enter regiments and click 'Save Preset' first.",
    alertReadPresetFail: "Failed to load preset.",
    alertInvalidJson: "Invalid JSON file format.",
    alertNoExportData: "No balanced roster data to export!",
    alertNoImgData: "No roster data available. Click 'Auto Balance' first!",
    noticeItem: (t, r, formulaStr) => {
      const reasonStr = r.reason ? ` (Basis: ${r.reason})` : "";
      return `${t.name}: Reported ${t.rawMin}-${t.rawMax} → Adjusted ${t.min}-${t.max} [${formulaStr}]${reasonStr}`;
    },
    factorLabel: (f) => `Factor ×${f}`,
    deltaLabel: (d) => `Offset ${d > 0 ? "+" + d : d}`,
    exportTitle: "[War of Rights Event Faction Roster]",
    exportUSA: (min, max, avg) => `🔵 USA Union [Est. ${min}-${max} | Avg ${avg}]:`,
    exportCSA: (min, max, avg) => `⚪ CSA Confederate [Est. ${min}-${max} | Avg ${avg}]:`,
    exportLineMod: (name, adj, rMin, rMax) => `• ${name}: Adj ${adj} (Reported ${rMin}-${rMax})`,
    exportLineNorm: (name, adj) => `• ${name}: ${adj}`,
    exportDiff: (minD, maxD) => `📊 Adjusted Diff: Min Diff ${minD} / Max Diff ${maxD}`,
    exportNoticeHeader: "⚖️ [Public Headcount Adjustment Disclosure]:",
    imgTitle: "WAR OF RIGHTS · EVENT FACTION ROSTER",
    imgSubtitle: (timeStr, minD, maxD) => `Generated: ${timeStr}   |   Adjusted Diff: Min ${minD} / Max ${maxD}`,
    imgUSATitle: "USA UNION",
    imgCSATitle: "CSA CONFEDERATE",
    imgCardSub: (avg, rMin, rMax) => `Adj Avg ${avg} | Reported ${rMin}-${rMax}`,
    imgTableTeams: (n) => `${n} Regiment${n === 1 ? "" : "s"}`,
    imgRowMod: (adjStr, rMin, rMax) => `Adj ${adjStr} (Raw ${rMin}-${rMax})`,
    imgFootLabel: "Total Adjusted Est.",
    imgNoticeTitle: "⚖️ Public Disclosure of Headcount Adjustments:",
    imgFooter: "War of Rights Team Balancer · Automated Balancing & Public Audit System"
  },
  ja: {
    htmlLang: "ja",
    title: "WAR OF RIGHTS · 連隊人数バランサー",
    subtitle: "テーブル入力 · 申告人数補正と公開公示 · 範囲人数バランス調整 · 画像出力",
    tabTable: "📊 テーブル入力",
    tabText: "📝 テキスト一括貼付",
    btnSavePreset: "💾 定番リスト保存",
    btnLoadPreset: "📂 定番リスト読込",
    btnExportJson: "⬇️ JSON出力",
    btnImportJson: "⬆️ JSON読込",
    thRegiment: "連隊タグ / チーム名",
    thMin: "申告下限",
    thMax: "申告上限",
    thAdjusted: "補正後予測 (自動)",
    thLock: "陣営固定",
    thAction: "操作",
    btnAddRow: "+ 連隊行を追加",
    hintTable: "ヒント：下の「人数補正アーカイブ」に登録された連隊は自動的に補正後の人数で計算されます",
    labelRosterInput: "参加リストを一括貼り付け（1行に1連隊、自動でテーブルに同期）：",
    hintTextFormat: "対応形式：<code>[FEX]15-20</code>、<code>[HD] 25~30 USA</code>、<code>野良 10</code>",
    btnParseToTable: "📥 解析してテーブルへ同期",
    hintParseSync: "解析後、微調整のため自動的にテーブル入力モードへ切り替わります",
    labelMode: "バランス優先方針：",
    optBalanced: "総合バランス（下限・上限・平均値を均等に調整）",
    optMin: "最低保証優先（最低参加人数の下限を優先して揃える）",
    optMax: "最大値優先（最大参加人数の上限を優先して揃える）",
    btnSample: "サンプル入力",
    btnClear: "リスト消去",
    btnBalance: "⚔️ 自動バランス実行",
    auditTitle: "⚖️ 連隊の過大・過少申告 補正アーカイブ（公開公示 · 自動保存）",
    auditFormula: "計算式：<strong>補正後人数 = round(申告人数 × 係数 + 増減値)</strong>。例：20%過大申告は係数 <code>0.80</code>、常時3名減は <code>-3</code>、過少申告は <code>1.15</code> や <code>+3</code> を入力。",
    btnAddAudit: "+ 補正ルール追加",
    thAuditTag: "連隊タグ (括弧は自動無視)",
    thAuditFactor: "人数係数 (初期値1.0)",
    thAuditDelta: "固定増減 (例 -3 / +2)",
    thAuditReason: "公開公示理由 / 過去の出席率根拠",
    usaBadge: "USA 北軍",
    csaBadge: "CSA 南軍",
    diffTitle: "両軍の補正後人数差",
    usaHeader: "USA · 北軍 (Union)",
    csaHeader: "CSA · 南軍 (Confederate)",
    resThRegiment: "連隊タグ",
    resThRaw: "申告人数",
    resThAdj: "補正予測",
    resThStatus: "状態",
    tfootTotal: "合計",
    publicNoticeTitle: "📢 本イベントの人数補正に関する公開公示",
    btnGenImg: "🖼️ 編成表画像を生成 (PNG)",
    btnCopyText: "📋 告知用テキストをコピー(公示付)",
    modalTitle: "編成表プレビュー（右クリックでコピー、またはPNGダウンロード）",
    btnCloseModal: "閉じる ✕",
    btnDownloadImg: "⬇️ PNG画像を保存",
    unitPerson: "名",
    teamCount: (n) => `${n} 連隊`,
    adjModifiedTag: (min, max) => `${min} - ${max} 名 (補正済)`,
    adjNormalTag: (min, max) => `${min} - ${max} 名`,
    lockAuto: "自動振分",
    lockUSA: "USA 北軍固定",
    lockCSA: "CSA 南軍固定",
    btnDelete: "削除",
    phRegiment: "例: [FEX] または 野良",
    phAuditTag: "例: [FEX] または FEX",
    phAuditReason: "公示根拠を入力（例：直近出席率約80%）",
    emptyAuditRow: "人数補正ルールはありません（全連隊が申告通り100%で計算されます）",
    emptyResultRow: "この陣営に割り当てられた連隊はありません",
    statusLocked: (f) => `${f} 固定`,
    statusModified: "補正済",
    statusAuto: "自動",
    btnSwapTo: (f) => `${f} へ移動 ⇄`,
    footAdjSummary: (min, max, avg) => `${min} - ${max} 名 (平均 ${avg})`,
    summarySub: (avg, rMin, rMax) => `補正平均：${avg} 名 | 元申告：${rMin}-${rMax} 名`,
    diffSubText: (minD, maxD) => `下限差 ${minD} 名 | 上限差 ${maxD} 名`,
    avgDiffText: (avgD) => `補正平均差：${avgD} 名`,
    saveEnabled: "● ローカル自動保存 有効",
    saveAutoDone: "● ローカルに自動保存しました",
    saveRestored: "● 前回のデータを復元しました",
    savePresetDone: "✔ 定番リストとして保存しました！",
    loadPresetDone: "✔ 定番リストを読み込みました！",
    exportJsonDone: "✔ JSONバックアップを出力しました！",
    importJsonDone: "✔ JSONデータをインポートしました！",
    copyDone: "✔ クリップボードにコピーしました！",
    warnHeader: "認識できなかった行（スキップされました）：",
    warnLine: (lineNo, txt) => `${lineNo} 行目の人数を認識できません: "${txt}"`,
    unnamedTeam: (n) => `名称未設定#${n}`,
    alertNoSaveData: "保存できる有効な連隊データがありません！",
    alertNoPreset: "定番リストがまだ保存されていません！先に連隊を入力して保存してください。",
    alertReadPresetFail: "定番リストの読み込みに失敗しました。",
    alertInvalidJson: "JSONファイルの形式が正しくありません。",
    alertNoExportData: "出力する編成データがありません！",
    alertNoImgData: "画像を生成するデータがありません。先に「自動バランス実行」を押してください！",
    noticeItem: (t, r, formulaStr) => {
      const reasonStr = r.reason ? `（根拠：${r.reason}）` : "";
      return `${t.name}：申告 ${t.rawMin}-${t.rawMax}名 → 補正後 ${t.min}-${t.max}名 [${formulaStr}]${reasonStr}`;
    },
    factorLabel: (f) => `係数 ×${f}`,
    deltaLabel: (d) => `増減 ${d > 0 ? "+" + d : d}名`,
    exportTitle: "【War of Rights 連隊陣営編成表】",
    exportUSA: (min, max, avg) => `🔵 USA 北軍 [補正予測 ${min}-${max} 名 | 平均 ${avg}]：`,
    exportCSA: (min, max, avg) => `⚪ CSA 南軍 [補正予測 ${min}-${max} 名 | 平均 ${avg}]：`,
    exportLineMod: (name, adj, rMin, rMax) => `• ${name}：補正 ${adj}（元申告 ${rMin}-${rMax}名）`,
    exportLineNorm: (name, adj) => `• ${name}：${adj}`,
    exportDiff: (minD, maxD) => `📊 両軍補正後人数差：下限差 ${minD} 名 / 上限差 ${maxD} 名`,
    exportNoticeHeader: "⚖️ 【人数補正に関する公開公示】：",
    imgTitle: "WAR OF RIGHTS · 連隊陣営人数バランス編成表",
    imgSubtitle: (timeStr, minD, maxD) => `作成日時：${timeStr}   |   両軍補正後人数差：下限差 ${minD} 名 / 上限差 ${maxD} 名`,
    imgUSATitle: "USA 北軍",
    imgCSATitle: "CSA 南軍",
    imgCardSub: (avg, rMin, rMax) => `補正平均 ${avg} | 元申告 ${rMin}-${rMax}`,
    imgTableTeams: (n) => `計 ${n} 連隊`,
    imgRowMod: (adjStr, rMin, rMax) => `補正 ${adjStr} (元${rMin}-${rMax})`,
    imgFootLabel: "合計補正予測",
    imgNoticeTitle: "⚖️ 本イベントの人数補正に関する公開公示：",
    imgFooter: "War of Rights Team Balancer · 自動バランス・人数補正公示システム"
  }
};

// 当前语言状态
let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || "zh";
if (!I18N[currentLang]) currentLang = "zh";

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.zh;
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val !== undefined ? val : key;
}


// 核心数据模型
let entryRows = [];
let auditRules = [];
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

// 初始化加载
window.addEventListener("DOMContentLoaded", () => {
  bindLanguageButtons();
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

function applyLanguage(lang, reRenderAll = true) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG, lang);
  document.documentElement.lang = t("htmlLang");

  // 高亮当前语言按钮
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  // 替换静态文本节点
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // 替换包含 HTML 标签的提示节点
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });

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
    version: "WoR-Balancer-v5",
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
        balanceModeSelect.value = data.balanceMode;
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

// 填入示例数据
document.getElementById("sampleBtn").addEventListener("click", () => {
  const pubsName = currentLang === "en" ? "Pubs" : currentLang === "ja" ? "野良プレイヤー" : "散人玩家";
  entryRows = [
    { id: genId(), name: "[FEX]", min: 15, max: 20, lockedFaction: null },
    { id: genId(), name: "[HD]", min: 25, max: 30, lockedFaction: null },
    { id: genId(), name: "[1stTX]", min: 12, max: 16, lockedFaction: null },
    { id: genId(), name: "[69thNY]", min: 20, max: 25, lockedFaction: null },
    { id: genId(), name: "[4thVA]", min: 10, max: 14, lockedFaction: "CSA" },
    { id: genId(), name: "[20thME]", min: 14, max: 18, lockedFaction: "USA" },
    { id: genId(), name: "[9thNY]", min: 8, max: 10, lockedFaction: null },
    { id: genId(), name: pubsName, min: 10, max: 15, lockedFaction: null }
  ];

  if (auditRules.length === 0) {
    const r1 = currentLang === "en"
      ? "~80% average turnout over last 3 events"
      : currentLang === "ja"
        ? "直近3回の出席率が約80%のため8掛け補正"
        : "近三次联队实际到场率约 80%，按八折修正虚报";
    const r2 = currentLang === "en"
      ? "Usually brings ~3 extra players than reported"
      : currentLang === "ja"
        ? "控えめな申告傾向があり実際は約3名多く参加"
        : "保守少报倾向，实际开战后通常多到 3 人左右";

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
            <input type="text" class="cell-input" placeholder="${escapeHtml(t("phAuditTag"))}"
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
            <input type="text" class="cell-input" placeholder="${escapeHtml(t("phAuditReason"))}"
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
      const previewText = isModified
        ? t("adjModifiedTag", adjMin, adjMax)
        : t("adjNormalTag", adjMin, adjMax);

      return `
        <tr data-id="${row.id}">
          <td>
            <input type="text" class="cell-input" placeholder="${escapeHtml(t("phRegiment"))}"
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
    previewEl.textContent = isModified ? t("adjModifiedTag", adjMin, adjMax) : t("adjNormalTag", adjMin, adjMax);
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
 * 阵营人数平衡核心算法（精确枚举全局最优解）
 */
function balanceTeams(teams, mode = "balanced") {
  const fixedUSA = [];
  const fixedCSA = [];
  const freeTeams = [];

  teams.forEach((tItem) => {
    if (tItem.lockedFaction === "USA") fixedUSA.push(tItem);
    else if (tItem.lockedFaction === "CSA") fixedCSA.push(tItem);
    else freeTeams.push(tItem);
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

      const item = freeTeams[idx];
      dfs(idx + 1, uMin + item.min, uMax + item.max, cMin, cMax, mask | (1 << idx));

      if (idx === 0 && fixedUSA.length === 0 && fixedCSA.length === 0) {
        return;
      }

      dfs(idx + 1, uMin, uMax, cMin + item.min, cMax + item.max, mask);
    }

    dfs(0, baseUSA.min, baseUSA.max, baseCSA.min, baseCSA.max, 0);

    freeTeams.forEach((item, i) => {
      if (bestMask & (1 << i)) bestUSA.push(item);
      else bestCSA.push(item);
    });
  } else {
    let uMin = baseUSA.min, uMax = baseUSA.max;
    let cMin = baseCSA.min, cMax = baseCSA.max;

    freeTeams.forEach((item) => {
      const scoreIfUSA = calcPenalty(uMin + item.min, uMax + item.max, cMin, cMax);
      const scoreIfCSA = calcPenalty(uMin, uMax, cMin + item.min, cMax + item.max);
      if (scoreIfUSA <= scoreIfCSA) {
        bestUSA.push(item);
        uMin += item.min;
        uMax += item.max;
      } else {
        bestCSA.push(item);
        cMin += item.min;
        cMax += item.max;
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
      acc.rawMin += item.rawMin ?? item.min;
      acc.rawMax += item.rawMax ?? item.max;
      acc.min += item.min;
      acc.max += item.max;
      acc.avg += item.avg ?? (item.min + item.max) / 2;
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

function formatHeadcount(min, max) {
  const unit = t("unitPerson") ? ` ${t("unitPerson")}` : "";
  return min === max ? `${min}${unit}` : `${min}-${max}${unit}`;
}

function renderSingleResultTable(faction, list) {
  const tbody = document.getElementById(`${faction}Tbody`);
  const countTag = document.getElementById(`${faction}CountTag`);
  const footRaw = document.getElementById(`${faction}FootRaw`);
  const footAdj = document.getElementById(`${faction}FootAdj`);

  if (countTag) countTag.textContent = t("teamCount", list.length);
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">${escapeHtml(t("emptyResultRow"))}</td></tr>`;
    if (footRaw) footRaw.innerHTML = `<strong>0 - 0</strong>`;
    if (footAdj) footAdj.innerHTML = `<strong>0 - 0 (0.0)</strong>`;
    return;
  }

  const targetName = faction === "usa" ? "CSA" : "USA";

  tbody.innerHTML = list
    .map((item) => {
      const rMin = item.rawMin ?? item.min;
      const rMax = item.rawMax ?? item.max;
      const rawText = formatHeadcount(rMin, rMax);
      const adjText = formatHeadcount(item.min, item.max);

      const badges = [];
      if (item.lockedFaction) {
        badges.push(`<span class="tag-lock">${escapeHtml(t("statusLocked", item.lockedFaction))}</span>`);
      }
      if (item.isModified) {
        badges.push(`<span class="tag-audit">${escapeHtml(t("statusModified"))}</span>`);
      }
      if (badges.length === 0) {
        badges.push(`<span class="tag-auto">${escapeHtml(t("statusAuto"))}</span>`);
      }

      return `
        <tr>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td>${rawText}</td>
          <td><strong style="color:${item.isModified ? "#f0b866" : "inherit"}">${adjText}</strong></td>
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
  if (footRaw) footRaw.innerHTML = `<strong>${formatHeadcount(stats.rawMin, stats.rawMax)}</strong>`;
  if (footAdj) footAdj.innerHTML = `<strong>${t("footAdjSummary", stats.min, stats.max, stats.avg.toFixed(1))}</strong>`;
}

function updateSummary() {
  const uStats = sumStats(currentState.usa);
  const cStats = sumStats(currentState.csa);

  const unit = t("unitPerson") ? ` ${t("unitPerson")}` : "";

  const usaRangeEl = document.getElementById("usaRange");
  const usaAvgEl = document.getElementById("usaAvg");
  const csaRangeEl = document.getElementById("csaRange");
  const csaAvgEl = document.getElementById("csaAvg");
  const diffSummaryEl = document.getElementById("diffSummary");
  const avgDiffSummaryEl = document.getElementById("avgDiffSummary");

  if (usaRangeEl) usaRangeEl.textContent = `${uStats.min} - ${uStats.max}${unit}`;
  if (usaAvgEl) usaAvgEl.textContent = t("summarySub", uStats.avg.toFixed(1), uStats.rawMin, uStats.rawMax);

  if (csaRangeEl) csaRangeEl.textContent = `${cStats.min} - ${cStats.max}${unit}`;
  if (csaAvgEl) csaAvgEl.textContent = t("summarySub", cStats.avg.toFixed(1), cStats.rawMin, cStats.rawMax);

  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  const avgDiff = Math.abs(uStats.avg - cStats.avg);

  if (diffSummaryEl) diffSummaryEl.textContent = t("diffSubText", minDiff, maxDiff);
  if (avgDiffSummaryEl) avgDiffSummaryEl.textContent = t("avgDiffText", avgDiff.toFixed(1));
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
    balanceMode: balanceModeSelect.value
  };
  localStorage.setItem(STORAGE_KEY_AUTO, JSON.stringify(payload));
  flashSaveIndicator(t("saveAutoDone"));
}

function loadFromAutoSave() {
  const raw = localStorage.getItem(STORAGE_KEY_AUTO);
  if (!raw) {
    entryRows = [createEmptyRow()];
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
    if (saved.balanceMode) {
      balanceModeSelect.value = saved.balanceMode;
    }
    renderAuditTable();
    renderEntryTable();
    syncTableToText();
    renderResultTables();
    flashSaveIndicator(t("saveRestored"));
  } catch (e) {
    entryRows = [createEmptyRow()];
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
    const adj = formatHeadcount(item.min, item.max);
    if (item.isModified) {
      return t("exportLineMod", item.name, adj, item.rawMin, item.rawMax);
    }
    return t("exportLineNorm", item.name, adj);
  };

  const lines = [
    t("exportTitle"),
    "",
    t("exportUSA", uStats.min, uStats.max, uStats.avg.toFixed(1)),
    ...currentState.usa.map(formatLine),
    "",
    t("exportCSA", cStats.min, cStats.max, cStats.avg.toFixed(1)),
    ...currentState.csa.map(formatLine),
    "",
    t("exportDiff", Math.abs(uStats.min - cStats.min), Math.abs(uStats.max - cStats.max))
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

  const fontStack = "'Microsoft YaHei', 'Hiragino Sans', 'Yu Gothic', 'Segoe UI', sans-serif";

  ctx.fillStyle = "#14171c";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#c8a252";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.fillStyle = "#c8a252";
  ctx.font = `bold 27px ${fontStack}`;
  ctx.textAlign = "center";
  ctx.fillText(t("imgTitle"), width / 2, 58);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = `14px ${fontStack}`;
  const localeMap = { zh: "zh-CN", en: "en-US", ja: "ja-JP" };
  const timeStr = new Date().toLocaleString(localeMap[currentLang] || "zh-CN", { hour12: false });
  const minDiff = Math.abs(uStats.min - cStats.min);
  const maxDiff = Math.abs(uStats.max - cStats.max);
  ctx.fillText(t("imgSubtitle", timeStr, minDiff, maxDiff), width / 2, 86);

  const unit = t("unitPerson") ? ` ${t("unitPerson")}` : "";
  drawSummaryBox(
    ctx, fontStack, 36, 108, 465, 68, "#1f4268", "#7fb3eb",
    t("imgUSATitle"),
    `${uStats.min} - ${uStats.max}${unit}`,
    t("imgCardSub", uStats.avg.toFixed(1), uStats.rawMin, uStats.rawMax)
  );
  drawSummaryBox(
    ctx, fontStack, 539, 108, 465, 68, "#4b4f56", "#d1b48c",
    t("imgCSATitle"),
    `${cStats.min} - ${cStats.max}${unit}`,
    t("imgCardSub", cStats.avg.toFixed(1), cStats.rawMin, cStats.rawMax)
  );

  drawFactionTable(ctx, fontStack, 36, tableStartY, 465, maxRows, rowHeight, "#1f4268", t("usaHeader"), currentState.usa, uStats);
  drawFactionTable(ctx, fontStack, 539, tableStartY, 465, maxRows, rowHeight, "#4b4f56", t("csaHeader"), currentState.csa, cStats);

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
    ctx.font = `13.5px ${fontStack}`;
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
  ctx.fillRect(x, y, 132, h);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 14px ${fontStack}`;
  ctx.textAlign = "center";
  ctx.fillText(title, x + 66, y + 40);

  ctx.fillStyle = accentColor;
  ctx.font = `bold 21px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(mainText, x + 146, y + 33);

  ctx.fillStyle = "#9aa3b2";
  ctx.font = `12.5px ${fontStack}`;
  ctx.fillText(subText, x + 146, y + 55);
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
  ctx.font = `bold 15.5px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(title, x + 16, y + 28);

  ctx.textAlign = "right";
  ctx.font = `13px ${fontStack}`;
  ctx.fillText(t("imgTableTeams", list.length), x + w - 16, y + 27);

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

    ctx.textAlign = "left";
    ctx.fillStyle = "#e6e8ec";
    ctx.font = `bold 14.5px ${fontStack}`;
    ctx.fillText(item.name, x + 16, ry + 26);

    const adjStr = formatHeadcount(item.min, item.max);
    ctx.textAlign = "right";
    if (item.isModified) {
      ctx.fillStyle = "#f0b866";
      ctx.font = `bold 13.5px ${fontStack}`;
      ctx.fillText(t("imgRowMod", adjStr, item.rawMin, item.rawMax), x + w - 16, ry + 26);
    } else {
      ctx.fillStyle = "#cbd2df";
      ctx.font = `14px ${fontStack}`;
      ctx.fillText(adjStr, x + w - 16, ry + 26);
    }
  }

  const fy = y + 44 + maxRows * rowH;
  ctx.fillStyle = "#161a20";
  ctx.fillRect(x, fy, w, 46);
  ctx.fillStyle = "#c8a252";
  ctx.font = `bold 14px ${fontStack}`;
  ctx.textAlign = "left";
  ctx.fillText(t("imgFootLabel"), x + 16, fy + 28);

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
