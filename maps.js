const STORAGE_KEY_MAP_STATE = "wor_map_pool_state_v3";
const STORAGE_KEY_LANG_MAP = "wor_balancer_lang_v8";

// 内置 PDF 士气数据表（即便直接用原始 maps.json 也能自动匹配显示票数与 Final Push）
const PDF_MORALE_STATS = {
  "alexander-farm": { final_push: "4:04", usa_tickets: 159, csa_tickets: 117, total_tickets: 276, favored_side: "USA", favored_role: "Attacker" },
  "crossroads": { final_push: "3:34", usa_tickets: 145, csa_tickets: 106, total_tickets: 251, favored_side: "USA", favored_role: "Attacker" },
  "smith-field": { final_push: "4:04", usa_tickets: 137, csa_tickets: 106, total_tickets: 243, favored_side: "USA", favored_role: "Attacker" },
  "crecy-s-cornfield": { final_push: "4:04", usa_tickets: 120, csa_tickets: 100, total_tickets: 220, favored_side: "USA", favored_role: "Defender" },
  "larsen-homestead": { final_push: "4:04", usa_tickets: 125, csa_tickets: 104, total_tickets: 229, favored_side: "USA", favored_role: "Defender" },
  "south-woodlot": { final_push: "3:34", usa_tickets: 153, csa_tickets: 127, total_tickets: 280, favored_side: "USA", favored_role: "Defender" },
  "flemming-s-meadow": { final_push: "4:04", usa_tickets: 154, csa_tickets: 102, total_tickets: 256, favored_side: "USA", favored_role: "Attacker" },
  "wagon-road": { final_push: "4:04", usa_tickets: 171, csa_tickets: 120, total_tickets: 291, favored_side: "USA", favored_role: "Attacker" },
  "crossley-creek": { final_push: "4:04", usa_tickets: 162, csa_tickets: 103, total_tickets: 265, favored_side: "USA", favored_role: "Attacker" },
  "union-camp": { final_push: "3:34", usa_tickets: 156, csa_tickets: 125, total_tickets: 281, favored_side: "USA", favored_role: "Defender" },
  "pat-s-turnpike": { final_push: "3:44", usa_tickets: 157, csa_tickets: 129, total_tickets: 286, favored_side: "USA", favored_role: "Defender" },
  "stefan-s-lot": { final_push: "3:54", usa_tickets: 131, csa_tickets: 137, total_tickets: 268, favored_side: "CSA", favored_role: "Attacker" },
  "confederate-encampment": { final_push: "4:04", usa_tickets: 156, csa_tickets: 107, total_tickets: 263, favored_side: "USA", favored_role: "Attacker" },
  "east-woods-skirmish": { final_push: "3:14", usa_tickets: 143, csa_tickets: 115, total_tickets: 258, favored_side: "USA", favored_role: "Attacker" },
  "hooker-s-push": { final_push: "6:10", usa_tickets: 122, csa_tickets: 122, total_tickets: 244, favored_side: "Even", favored_role: "Even" },
  "hagerstown-turnpike": { final_push: "1:50", usa_tickets: 130, csa_tickets: 110, total_tickets: 240, favored_side: "USA", favored_role: "Attacker" },
  "miller-s-cornfield": { final_push: "2:02", usa_tickets: 134, csa_tickets: 122, total_tickets: 256, favored_side: "USA", favored_role: "Defender" },
  "east-woods": { final_push: "3:18", usa_tickets: 130, csa_tickets: 124, total_tickets: 254, favored_side: "USA", favored_role: "Defender" },
  "nicodemus-hill": { final_push: "2:26", usa_tickets: 174, csa_tickets: 89, total_tickets: 263, favored_side: "USA", favored_role: "Attacker" },
  "bloody-lane": { final_push: "3:06", usa_tickets: 146, csa_tickets: 100, total_tickets: 246, favored_side: "USA", favored_role: "Attacker" },
  "pry-ford": { final_push: "2:58", usa_tickets: 124, csa_tickets: 84, total_tickets: 208, favored_side: "USA", favored_role: "Attacker" },
  "pry-grist-mill": { final_push: "2:44", usa_tickets: 150, csa_tickets: 106, total_tickets: 256, favored_side: "USA", favored_role: "Attacker" },
  "pry-house": { final_push: "2:04", usa_tickets: 115, csa_tickets: 125, total_tickets: 240, favored_side: "CSA", favored_role: "Attacker" },
  "west-woods": { final_push: "2:12", usa_tickets: 137, csa_tickets: 101, total_tickets: 238, favored_side: "USA", favored_role: "Attacker" },
  "dunker-church": { final_push: "3:44", usa_tickets: 137, csa_tickets: 103, total_tickets: 240, favored_side: "USA", favored_role: "Attacker" },
  "burnside-bridge": { final_push: "4:24", usa_tickets: 137, csa_tickets: 93, total_tickets: 230, favored_side: "USA", favored_role: "Attacker" },
  "cooke-s-countercharge": { final_push: "2:48", usa_tickets: 143, csa_tickets: 122, total_tickets: 265, favored_side: "USA", favored_role: "Defender" },
  "otto-sherrick-farm": { final_push: "2:16", usa_tickets: 159, csa_tickets: 92, total_tickets: 251, favored_side: "USA", favored_role: "Attacker" },
  "roulette-lane": { final_push: "2:26", usa_tickets: 127, csa_tickets: 135, total_tickets: 262, favored_side: "CSA", favored_role: "Attacker" },
  "piper-farm": { final_push: "2:12", usa_tickets: 124, csa_tickets: 100, total_tickets: 224, favored_side: "USA", favored_role: "Attacker" },
  "hill-s-counterattack": { final_push: "2:38", usa_tickets: 135, csa_tickets: 121, total_tickets: 256, favored_side: "USA", favored_role: "Defender" },
  "garland-s-stand": { final_push: "4:06", usa_tickets: 152, csa_tickets: 120, total_tickets: 272, favored_side: "USA", favored_role: "Attacker" },
  "cox-s-push": { final_push: "3:10", usa_tickets: 163, csa_tickets: 102, total_tickets: 265, favored_side: "USA", favored_role: "Attacker" },
  "hatch-s-attack": { final_push: "3:28", usa_tickets: 134, csa_tickets: 115, total_tickets: 249, favored_side: "USA", favored_role: "Attacker" },
  "anderson-s-counterattack": { final_push: "3:20", usa_tickets: 151, csa_tickets: 110, total_tickets: 261, favored_side: "USA", favored_role: "Defender" },
  "reno-s-fall": { final_push: "3:41", usa_tickets: 138, csa_tickets: 102, total_tickets: 240, favored_side: "USA", favored_role: "Defender" },
  "colquitt-s-defence": { final_push: "4:02", usa_tickets: 168, csa_tickets: 117, total_tickets: 285, favored_side: "USA", favored_role: "Attacker" },
  "maryland-heights": { final_push: "2:34", usa_tickets: 155, csa_tickets: 149, total_tickets: 304, favored_side: "USA", favored_role: "Defender" },
  "river-crossing": { final_push: "4:22", usa_tickets: 111, csa_tickets: 159, total_tickets: 270, favored_side: "CSA", favored_role: "Attacker" },
  "downtown": { final_push: "2:12", usa_tickets: 135, csa_tickets: 124, total_tickets: 259, favored_side: "USA", favored_role: "Defender" },
  "school-house-ridge": { final_push: "1:30", usa_tickets: 157, csa_tickets: 150, total_tickets: 307, favored_side: "USA", favored_role: "Defender" },
  "high-street": { final_push: "1:52", usa_tickets: 147, csa_tickets: 114, total_tickets: 261, favored_side: "USA", favored_role: "Defender" },
  "bolivar-heights-camp": { final_push: "3:28", usa_tickets: 145, csa_tickets: 120, total_tickets: 265, favored_side: "USA", favored_role: "Defender" },
  "shenandoah-street": { final_push: "1:14", usa_tickets: 145, csa_tickets: 122, total_tickets: 267, favored_side: "USA", favored_role: "Defender" },
  "harpers-graveyard": { final_push: "1:44", usa_tickets: 124, csa_tickets: 88, total_tickets: 212, favored_side: "USA", favored_role: "Defender" },
  "bolivar-heights-redoubt": { final_push: "3:24", usa_tickets: 142, csa_tickets: 134, total_tickets: 276, favored_side: "USA", favored_role: "Defender" },
  "washington-street": { final_push: "1:56", usa_tickets: 140, csa_tickets: 123, total_tickets: 263, favored_side: "USA", favored_role: "Defender" }
};

let ALL_MAPS = [];
let currentLang = localStorage.getItem(STORAGE_KEY_LANG_MAP) || "zh_cn_en";
if (!window.I18N || !window.I18N[currentLang]) currentLang = "zh_cn_en";

function t(key, ...args) {
  const dict = (window.I18N && window.I18N[currentLang]) || (window.I18N && window.I18N.zh_cn_en) || {};
  const val = dict[key];
  if (typeof val === "function") return val(...args);
  return val !== undefined ? val : key;
}

let poolState = {
  selectedMode: "skirmish",
  selectedCampaign: "ALL",
  disabledMapSlugs: {},
  disableReasons: {}
};

let lastDrawnMap = null;
let currentlyInspectedMap = null;

window.addEventListener("DOMContentLoaded", async () => {
  loadPoolState();
  bindLanguageButtons();
  bindModeCards();
  bindCampaignFilters();
  bindActionButtons();
  bindInspectorModal();
  applyLanguage(currentLang, false);

  await loadMapsDatabase();
  refreshAllViews();
});

async function loadMapsDatabase() {
  // 优先读取压缩优化后的 maps_merged.json，其次读取原始 maps.json，最后回退到 maps_data.json
  const candidates = ["maps_merged.json", "maps.json", "maps_data.json"];
  for (const file of candidates) {
    try {
      const resp = await fetch(`${file}?t=${Date.now()}`);
      if (!resp.ok) continue;
      const json = await resp.json();
      const rawList = Array.isArray(json) ? json : (Array.isArray(json.maps) ? json.maps : []);
      if (rawList.length > 0) {
        ALL_MAPS = rawList.map(normalizeMapRecord);
        return;
      }
    } catch (e) {}
  }
}

function normalizeMapRecord(m) {
  const slug = m.slug || m.id || String(m.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const morale = m.morale || PDF_MORALE_STATS[slug] || {};
  return {
    ...m,
    slug,
    mode: String(m.mode || "skirmish").toLowerCase(),
    campaign: String(m.campaign || "antietam").toLowerCase(),
    final_push: morale.final_push || m.final_push || "-",
    usa_tickets: morale.usa_tickets ?? m.usa_tickets ?? null,
    csa_tickets: morale.csa_tickets ?? m.csa_tickets ?? null,
    total_tickets: morale.total_tickets ?? m.total_tickets ?? null,
    favored_side: morale.favored_side || m.favored_side || "-"
  };
}

function loadPoolState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAP_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      poolState.selectedMode = parsed.selectedMode || "skirmish";
      poolState.selectedCampaign = parsed.selectedCampaign || "ALL";
      poolState.disabledMapSlugs = parsed.disabledMapSlugs || {};
      poolState.disableReasons = parsed.disableReasons || {};
    }
  } catch (e) {}
}

function savePoolState() {
  localStorage.setItem(STORAGE_KEY_MAP_STATE, JSON.stringify(poolState));
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang && window.I18N && window.I18N[lang]) {
        applyLanguage(lang, true);
      }
    });
  });
}

function applyLanguage(lang, reRender = true) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG_MAP, lang);
  document.documentElement.lang = t("htmlLang");

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  if (reRender) {
    refreshAllViews();
  }
}

function bindModeCards() {
  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    const handler = () => {
      const mode = card.getAttribute("data-mode");
      if (!mode) return;
      poolState.selectedMode = mode;
      poolState.selectedCampaign = "ALL";
      savePoolState();
      refreshAllViews();
    };
    card.addEventListener("click", handler);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    });
  });
}

function bindCampaignFilters() {
  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      poolState.selectedCampaign = btn.getAttribute("data-camp") || "ALL";
      savePoolState();
      refreshAllViews();
    });
  });
}

function bindActionButtons() {
  document.getElementById("drawMapBtn").addEventListener("click", drawRandomMap);

  document.getElementById("openDrawnInspectorBtn").addEventListener("click", () => {
    if (lastDrawnMap) openMapInspector(lastDrawnMap.slug);
  });

  document.getElementById("disableDrawnBtn").addEventListener("click", () => {
    if (!lastDrawnMap) return;
    poolState.disabledMapSlugs[lastDrawnMap.slug] = true;
    if (!poolState.disableReasons[lastDrawnMap.slug]) {
      poolState.disableReasons[lastDrawnMap.slug] = "近期已打 / Recently Played";
    }
    savePoolState();
    refreshAllViews();
  });

  document.getElementById("enableAllBtn").addEventListener("click", () => {
    ALL_MAPS.filter((m) => m.mode === poolState.selectedMode).forEach((m) => {
      delete poolState.disabledMapSlugs[m.slug];
    });
    savePoolState();
    refreshAllViews();
  });

  document.getElementById("copyDrawResultBtn").addEventListener("click", copyDrawSummary);

  document.getElementById("exportMapCfgBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(poolState, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WoR_MapPool_Exclusions_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const importInput = document.getElementById("importMapCfgInput");
  document.getElementById("importMapCfgBtn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.disabledMapSlugs) poolState.disabledMapSlugs = data.disabledMapSlugs;
        if (data.disableReasons) poolState.disableReasons = data.disableReasons;
        if (data.selectedMode) poolState.selectedMode = data.selectedMode;
        savePoolState();
        refreshAllViews();
      } catch (err) {
        alert("Invalid JSON file");
      }
      importInput.value = "";
    };
    reader.readAsText(file);
  });
}

function bindInspectorModal() {
  const modal = document.getElementById("mapInspectorModal");
  const closeFn = () => modal.classList.add("hidden");
  document.getElementById("closeInspectorBtn").addEventListener("click", closeFn);
  document.getElementById("closeInspectorBtn2").addEventListener("click", closeFn);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeFn();
  });

  document.getElementById("inspectorTogglePoolBtn").addEventListener("click", () => {
    if (!currentlyInspectedMap) return;
    const slug = currentlyInspectedMap.slug;
    const isDisabled = !!poolState.disabledMapSlugs[slug];
    if (isDisabled) {
      delete poolState.disabledMapSlugs[slug];
    } else {
      poolState.disabledMapSlugs[slug] = true;
      if (!poolState.disableReasons[slug]) {
        poolState.disableReasons[slug] = "手动移出池外 / Excluded";
      }
    }
    savePoolState();
    refreshAllViews();
    openMapInspector(slug);
  });
}

function refreshAllViews() {
  ["skirmish", "conquest", "picket_patrol", "onslaught", "drill_camp"].forEach((mode) => {
    const modeMaps = ALL_MAPS.filter((m) => m.mode === mode);
    const activeCount = modeMaps.filter((m) => !poolState.disabledMapSlugs[m.slug]).length;
    const countEl = document.getElementById(`count_${mode}`);
    if (countEl) countEl.textContent = `${activeCount} / ${modeMaps.length}`;
  });

  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    card.classList.toggle("active", card.getAttribute("data-mode") === poolState.selectedMode);
  });

  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-camp") === poolState.selectedCampaign);
  });

  const modeMaps = ALL_MAPS.filter((m) => m.mode === poolState.selectedMode);
  const activeInMode = modeMaps.filter((m) => !poolState.disabledMapSlugs[m.slug]);
  const disabledInMode = modeMaps.filter((m) => poolState.disabledMapSlugs[m.slug]);

  const statsEl = document.getElementById("poolStatsLabel");
  if (statsEl) {
    statsEl.textContent = t("mapPoolStats", activeInMode.length, modeMaps.length, disabledInMode.length);
  }

  renderMapTable(modeMaps);
  renderDisabledNotice(disabledInMode);
}

function renderMapTable(modeMaps) {
  const tbody = document.getElementById("mapPoolTbody");
  if (!tbody) return;

  if (ALL_MAPS.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">未检测到 maps.json 或 maps_merged.json，请将您整理的 maps.json 放入仓库根目录后刷新！</td></tr>`;
    return;
  }

  const filtered = modeMaps.filter((m) => {
    if (poolState.selectedCampaign === "ALL") return true;
    return m.campaign === poolState.selectedCampaign;
  });

  tbody.innerHTML = filtered
    .map((m) => {
      const isDisabled = !!poolState.disabledMapSlugs[m.slug];
      const reason = poolState.disableReasons[m.slug] || "";
      const att = m.attacker ? m.attacker.toUpperCase() : "Neutral";
      const def = m.defender ? m.defender.toUpperCase() : "Neutral";
      const ticketHtml = m.usa_tickets !== null
        ? `<span style="color:var(--usa-light); font-weight:700;">USA ${m.usa_tickets}</span> / <span style="color:var(--csa-light); font-weight:700;">CSA ${m.csa_tickets}</span><div style="font-size:0.74rem; color:var(--gold-accent);">Final Push: ${escapeHtml(m.final_push)}</div>`
        : `<span style="color:var(--text-muted); font-size:0.8rem;">非 Skirmish / 无固定票数</span>`;

      return `
        <tr class="${isDisabled ? "row-disabled" : ""}">
          <td>
            <label class="switch">
              <input type="checkbox" id="chk_${m.slug}" name="chk_${m.slug}" ${!isDisabled ? "checked" : ""} onchange="toggleMapInPool('${m.slug}', this.checked)" />
              <span class="slider"></span>
            </label>
            <div style="font-size:0.74rem; margin-top:3px; color:${isDisabled ? "#e06c75" : "#6fd08c"};">
              ${escapeHtml(isDisabled ? t("mapStatusExcluded") : t("mapStatusInPool"))}
            </div>
          </td>
          <td>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
              <strong class="map-name-link" onclick="openMapInspector('${m.slug}')">${escapeHtml(m.name)}</strong>
              <button type="button" class="inspect-btn" onclick="openMapInspector('${m.slug}')">检视 🔍</button>
            </div>
          </td>
          <td>${escapeHtml(m.campaign_name || m.campaign)}</td>
          <td>
            <span style="font-size:0.82rem;">攻 Att: <strong>${escapeHtml(att)}</strong></span><br/>
            <span style="font-size:0.78rem; color:var(--text-muted);">守 Def: ${escapeHtml(def)}</span>
          </td>
          <td><strong>${m.unit_slots || "-"}</strong> 槽<br/><span style="font-size:0.74rem; color:var(--text-muted);">(${m.available_units || "-"} 单位)</span></td>
          <td>${ticketHtml}</td>
          <td>
            <input type="text" id="reason_${m.slug}" name="reason_${m.slug}" class="reason-input"
              placeholder="${escapeHtml(t("mapPhReason"))}"
              value="${escapeHtml(reason)}"
              oninput="updateDisableReason('${m.slug}', this.value)" />
          </td>
        </tr>
      `;
    })
    .join("");
}

window.openMapInspector = function (slug, imgIndex = 0) {
  const m = ALL_MAPS.find((item) => item.slug === slug);
  if (!m) return;
  currentlyInspectedMap = m;

  document.getElementById("inspectorTitle").textContent = `🗺️ ${m.name} (${m.campaign_name || m.campaign} · ${m.mode_name || m.mode})`;

  const att = m.attacker ? m.attacker.toUpperCase() : "Neutral";
  const def = m.defender ? m.defender.toUpperCase() : "Neutral";
  document.getElementById("insRoles").textContent = `攻 Att: ${att} | 守 Def: ${def}`;

  const widthText = m.ground_width_meters ? `${Math.round(m.ground_width_meters)}m` : "-";
  document.getElementById("insFinalPush").textContent = `${m.final_push || "-"} | 宽度 ${widthText}`;

  const usaSide = m.order_of_battle?.sides?.usa;
  const csaSide = m.order_of_battle?.sides?.csa;

  document.getElementById("insUsaSideLabel").textContent = `${usaSide?.label || "USA"} 票数 & 槽位`;
  document.getElementById("insCsaSideLabel").textContent = `${csaSide?.label || "CSA"} 票数 & 槽位`;

  document.getElementById("insUsaTickets").textContent = m.usa_tickets !== null
    ? `${m.usa_tickets} 票 (${usaSide?.slot_count || "-"} 槽)`
    : `${usaSide?.slot_count || "-"} 槽 / ${usaSide?.available_unit_count || "-"} 单位`;

  document.getElementById("insCsaTickets").textContent = m.csa_tickets !== null
    ? `${m.csa_tickets} 票 (${csaSide?.slot_count || "-"} 槽)`
    : `${csaSide?.slot_count || "-"} 槽 / ${csaSide?.available_unit_count || "-"} 单位`;

  document.getElementById("insDescription").textContent = m.description || "";

  // 渲染双方完整编制与武器
  document.getElementById("insUsaOobHeader").textContent = `🔵 ${usaSide?.label || "USA"} 参战编制 (${usaSide?.slot_count || 0} 槽 / ${usaSide?.available_unit_count || 0} 单位)`;
  document.getElementById("insCsaOobHeader").textContent = `⚪ ${csaSide?.label || "CSA"} 参战编制 (${csaSide?.slot_count || 0} 槽 / ${csaSide?.available_unit_count || 0} 单位)`;
  document.getElementById("insUsaUnits").innerHTML = renderSideBranchesHtml(usaSide);
  document.getElementById("insCsaUnits").innerHTML = renderSideBranchesHtml(csaSide);

  // 渲染图片（优先使用压缩版 web_file，其次原始 file，最后 source_asset）
  const images = Array.isArray(m.images) && m.images.length > 0 ? m.images : [];
  const activeImgObj = images[imgIndex] || images[0] || null;

  const imgContainer = document.getElementById("inspectorImageContainer");
  const thumbsBar = document.getElementById("inspectorThumbsBar");
  const pathHint = document.getElementById("inspectorImgPathHint");
  const fullImgLink = document.getElementById("inspectorOpenFullImgBtn");
  const worToolLink = document.getElementById("inspectorWorToolLink");

  if (worToolLink) worToolLink.href = m.url || `https://wortool.com/maps/${m.slug}`;

  if (activeImgObj) {
    const primarySrc = activeImgObj.web_file || activeImgObj.file;
    const fallbackSrc = activeImgObj.file;
    pathHint.textContent = `图片: ${primarySrc}`;
    fullImgLink.href = primarySrc;

    const imgEl = document.createElement("img");
    imgEl.src = primarySrc;
    imgEl.alt = m.name;
    imgEl.onclick = () => window.open(primarySrc, "_blank");
    imgEl.onerror = () => {
      if (fallbackSrc && imgEl.src.indexOf(fallbackSrc) === -1) {
        imgEl.src = fallbackSrc;
        fullImgLink.href = fallbackSrc;
        pathHint.textContent = `图片: ${fallbackSrc}`;
      } else {
        imgContainer.innerHTML = `<div style="padding:36px 20px; text-align:center; color:#9aa3b2;">未找到本地地图图片 <code>${escapeHtml(primarySrc)}</code><br/><br/>请确认已将 <code>maps/</code> 或压缩后的 <code>maps_web/</code> 文件夹上传至仓库根目录。</div>`;
      }
    };
    imgContainer.innerHTML = "";
    imgContainer.appendChild(imgEl);
  } else {
    imgContainer.innerHTML = `<div style="padding:36px 20px; text-align:center; color:#9aa3b2;">该地图无内置图片记录</div>`;
  }

  // 多图切换按钮（如 Picket Patrol 有 12 张图）
  if (images.length > 1) {
    thumbsBar.classList.remove("hidden");
    thumbsBar.innerHTML = images.map((im, idx) => `
      <button type="button" class="thumb-pill ${idx === imgIndex ? "active" : ""}" onclick="openMapInspector('${m.slug}', ${idx})">
        ${escapeHtml(im.label || `图 #${idx + 1}`)}
      </button>
    `).join("");
  } else {
    thumbsBar.classList.add("hidden");
  }

  const toggleBtn = document.getElementById("inspectorTogglePoolBtn");
  const isDisabled = !!poolState.disabledMapSlugs[m.slug];
  if (isDisabled) {
    toggleBtn.textContent = "✅ 将此地图放回抽取池 Enable in Pool";
    toggleBtn.className = "btn btn-primary";
  } else {
    toggleBtn.textContent = "🚫 将此地图移出抽取池 Exclude from Pool";
    toggleBtn.className = "btn btn-danger-outline";
  }

  document.getElementById("mapInspectorModal").classList.remove("hidden");
};

function renderSideBranchesHtml(sideObj) {
  if (!sideObj || !Array.isArray(sideObj.branches) || sideObj.branches.length === 0) {
    return `<div class="hint">无编制数据</div>`;
  }
  return sideObj.branches.map((br) => {
    const slotsHtml = (br.slots || []).map((slot) => {
      if (slot.type === "pool") {
        const previewUnits = (slot.units || []).slice(0, 6).map((u) => u.name).join(", ");
        const more = (slot.units || []).length > 6 ? ` ...等 ${slot.units.length} 支` : "";
        return `
          <div style="margin-bottom:6px;">
            <strong>▪ ${escapeHtml(slot.pool_name)}</strong><span class="pool-badge">Pool (${slot.member_count})</span>
            <div class="weapon-sub">${escapeHtml(previewUnits + more)}</div>
          </div>
        `;
      }
      const wList = (slot.weapons || []).map((w) => w.quantity > 1 ? `${w.name} ×${w.quantity}` : w.name).join(" / ");
      return `
        <div style="margin-bottom:5px;">
          <strong>▪ ${escapeHtml(slot.name)}</strong>
          ${wList ? `<div class="weapon-sub">${escapeHtml(wList)}</div>` : ""}
        </div>
      `;
    }).join("");

    return `
      <div class="branch-title">${escapeHtml(br.branch_name || br.branch)} (${br.slot_count})</div>
      ${slotsHtml}
    `;
  }).join("");
}

window.toggleMapInPool = function (slug, isEnabled) {
  if (isEnabled) {
    delete poolState.disabledMapSlugs[slug];
  } else {
    poolState.disabledMapSlugs[slug] = true;
  }
  savePoolState();
  refreshAllViews();
};

window.updateDisableReason = function (slug, val) {
  poolState.disableReasons[slug] = val;
  savePoolState();
  const modeMaps = ALL_MAPS.filter((m) => m.mode === poolState.selectedMode);
  const disabledInMode = modeMaps.filter((m) => poolState.disabledMapSlugs[m.slug]);
  renderDisabledNotice(disabledInMode);
};

function renderDisabledNotice(disabledList) {
  const box = document.getElementById("disabledNoticeBox");
  const listEl = document.getElementById("disabledNoticeList");
  if (!box || !listEl) return;

  if (disabledList.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  listEl.innerHTML = disabledList
    .map((m) => {
      const reason = poolState.disableReasons[m.slug] ? ` — ${poolState.disableReasons[m.slug]}` : "";
      return `<li><strong>[${escapeHtml(m.campaign_name || m.campaign)}] ${escapeHtml(m.name)}</strong>${escapeHtml(reason)}</li>`;
    })
    .join("");
}

function drawRandomMap() {
  const candidatePool = ALL_MAPS.filter((m) => {
    if (m.mode !== poolState.selectedMode) return false;
    if (poolState.disabledMapSlugs[m.slug]) return false;
    if (poolState.selectedCampaign !== "ALL" && m.campaign !== poolState.selectedCampaign) return false;
    return true;
  });

  if (candidatePool.length === 0) {
    alert(t("mapAlertEmptyPool"));
    return;
  }

  let filteredPool = candidatePool;
  if (candidatePool.length > 1 && lastDrawnMap) {
    filteredPool = candidatePool.filter((m) => m.slug !== lastDrawnMap.slug);
  }

  const chosen = filteredPool[Math.floor(Math.random() * filteredPool.length)];
  lastDrawnMap = chosen;

  const att = chosen.attacker ? chosen.attacker.toUpperCase() : "Neutral";
  const def = chosen.defender ? chosen.defender.toUpperCase() : "Neutral";

  document.getElementById("drawResultBox").classList.remove("hidden");
  document.getElementById("drawnMapName").textContent = chosen.name;
  document.getElementById("drawnCampTag").textContent = `Campaign: ${chosen.campaign_name || chosen.campaign}`;
  document.getElementById("drawnRoleTag").textContent = `攻 Att: ${att} / 守 Def: ${def}`;
  document.getElementById("drawnSlotsTag").textContent = `Units: ${chosen.unit_slots || "-"} 槽`;
  document.getElementById("drawnFinalPushTag").textContent = `Final Push: ${chosen.final_push || "-"}`;

  document.getElementById("drawnUsaTickets").textContent = chosen.usa_tickets !== null ? `${chosen.usa_tickets}` : "-";
  document.getElementById("drawnCsaTickets").textContent = chosen.csa_tickets !== null ? `${chosen.csa_tickets}` : "-";

  openMapInspector(chosen.slug, 0);
}

function copyDrawSummary() {
  if (!lastDrawnMap) return;
  const m = lastDrawnMap;
  const att = m.attacker ? m.attacker.toUpperCase() : "Neutral";
  const def = m.defender ? m.defender.toUpperCase() : "Neutral";
  const modeMaps = ALL_MAPS.filter((item) => item.mode === poolState.selectedMode);
  const disabledInMode = modeMaps.filter((item) => poolState.disabledMapSlugs[item.slug]);

  const lines = [
    `【War of Rights 联队活动地图抽取结果 Event Map Draw】`,
    `🗺️ 抽中地图 Selected Map：${m.name} (${m.campaign_name || m.campaign} - ${m.mode_name || m.mode})`,
    `⚔️ 攻守阵营 Roles：攻 Attacker ${att} | 守 Defender ${def} | Final Push: ${m.final_push || "-"}`
  ];

  if (m.usa_tickets !== null) {
    lines.push(`🎫 双方票数 Tickets：USA ${m.usa_tickets} vs CSA ${m.csa_tickets} (总计 Total: ${m.total_tickets})`);
  }

  if (disabledInMode.length > 0) {
    lines.push("", `🚫 本次已移出抽取池地图 Excluded Maps (${m.mode_name || m.mode})：`);
    disabledInMode.forEach((d) => {
      const r = poolState.disableReasons[d.slug] ? ` (${poolState.disableReasons[d.slug]})` : "";
      lines.push(`- ${d.name}${r}`);
    });
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    const status = document.getElementById("mapCopyStatus");
    if (status) {
      status.textContent = t("mapCopyDone");
      setTimeout(() => (status.textContent = ""), 3000);
    }
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
