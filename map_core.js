const STORAGE_KEY_MAP_STATE = "wor_map_pool_state_v4";
const STORAGE_KEY_LANG_MAP = "wor_balancer_lang_v8";

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

window.WoRMapCore = {
  allMaps: [],
  currentLang: localStorage.getItem(STORAGE_KEY_LANG_MAP) || "zh_cn_en",
  poolState: {
    selectedMode: "skirmish",
    selectedCampaign: "ALL",
    disabledMapSlugs: {},
    disableReasons: {},
    drawHistory: [], // 记录不放回抽取历史
    matchMaps: [null, null], // 联队两张比赛地图 [地图1, 地图2]
    noReplacement: true // 原则上每次抽出的地图都不放回池中
  },
  currentlyInspectedMap: null,

  t(key, ...args) {
    const dict = (window.I18N && window.I18N[this.currentLang]) || (window.I18N && window.I18N.zh_cn_en) || {};
    const val = dict[key];
    if (typeof val === "function") return val(...args);
    return val !== undefined ? val : key;
  },

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MAP_STATE);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.poolState.selectedMode = parsed.selectedMode || "skirmish";
        this.poolState.selectedCampaign = parsed.selectedCampaign || "ALL";
        this.poolState.disabledMapSlugs = parsed.disabledMapSlugs || {};
        this.poolState.disableReasons = parsed.disableReasons || {};
        this.poolState.drawHistory = Array.isArray(parsed.drawHistory) ? parsed.drawHistory : [];
        this.poolState.matchMaps = Array.isArray(parsed.matchMaps) && parsed.matchMaps.length === 2 ? parsed.matchMaps : [null, null];
        this.poolState.noReplacement = parsed.noReplacement !== undefined ? !!parsed.noReplacement : true;
      }
    } catch (e) {}
  },

  saveState() {
    localStorage.setItem(STORAGE_KEY_MAP_STATE, JSON.stringify(this.poolState));
  },

  async loadDatabase() {
    const candidates = ["maps_merged.json", "maps.json", "maps_data.json"];
    for (const file of candidates) {
      try {
        const resp = await fetch(`${file}?t=${Date.now()}`);
        if (!resp.ok) continue;
        const json = await resp.json();
        const rawList = Array.isArray(json) ? json : (Array.isArray(json.maps) ? json.maps : []);
        if (rawList.length > 0) {
          this.allMaps = rawList.map((m) => this.normalizeMapRecord(m));
          return this.allMaps;
        }
      } catch (e) {}
    }
    return this.allMaps;
  },

  normalizeMapRecord(m) {
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
  },

  bindLanguageButtons(onLangChange) {
    if (!window.I18N || !window.I18N[this.currentLang]) this.currentLang = "zh_cn_en";
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang && window.I18N && window.I18N[lang]) {
          this.applyLanguage(lang);
          if (onLangChange) onLangChange();
        }
      });
    });
    this.applyLanguage(this.currentLang);
  },

  applyLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem(STORAGE_KEY_LANG_MAP, lang);
    document.documentElement.lang = this.t("htmlLang");

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.t(key);
    });
  },

  bindInspectorModal(onPoolToggleCallback) {
    const modal = document.getElementById("mapInspectorModal");
    if (!modal) return;
    const closeFn = () => modal.classList.add("hidden");
    const btn1 = document.getElementById("closeInspectorBtn");
    const btn2 = document.getElementById("closeInspectorBtn2");
    if (btn1) btn1.addEventListener("click", closeFn);
    if (btn2) btn2.addEventListener("click", closeFn);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeFn();
    });

    const toggleBtn = document.getElementById("inspectorTogglePoolBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (!this.currentlyInspectedMap) return;
        const slug = this.currentlyInspectedMap.slug;
        const isDisabled = !!this.poolState.disabledMapSlugs[slug];
        if (isDisabled) {
          delete this.poolState.disabledMapSlugs[slug];
        } else {
          this.poolState.disabledMapSlugs[slug] = true;
          if (!this.poolState.disableReasons[slug]) {
            this.poolState.disableReasons[slug] = "手动移出池外 / Excluded";
          }
        }
        this.saveState();
        this.openInspector(slug, 0);
        if (onPoolToggleCallback) onPoolToggleCallback();
      });
    }
  },

  openInspector(slug, imgIndex = 0) {
    const m = this.allMaps.find((item) => item.slug === slug);
    if (!m) return;
    this.currentlyInspectedMap = m;

    const modal = document.getElementById("mapInspectorModal");
    if (!modal) return;

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

    document.getElementById("insUsaOobHeader").textContent = `🔵 ${usaSide?.label || "USA"} 参战编制 (${usaSide?.slot_count || 0} 槽)`;
    document.getElementById("insCsaOobHeader").textContent = `⚪ ${csaSide?.label || "CSA"} 参战编制 (${csaSide?.slot_count || 0} 槽)`;
    document.getElementById("insUsaUnits").innerHTML = this.renderSideBranchesHtml(usaSide);
    document.getElementById("insCsaUnits").innerHTML = this.renderSideBranchesHtml(csaSide);

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
          imgContainer.innerHTML = `<div style="padding:36px 20px; text-align:center; color:#9aa3b2;">未找到本地地图图片 <code>${this.escapeHtml(primarySrc)}</code><br/><br/>请确认已将 <code>maps_web/</code> 或 <code>maps/</code> 放入仓库根目录。</div>`;
        }
      };
      imgContainer.innerHTML = "";
      imgContainer.appendChild(imgEl);
    } else {
      imgContainer.innerHTML = `<div style="padding:36px 20px; text-align:center; color:#9aa3b2;">该地图无内置图片记录</div>`;
    }

    if (images.length > 1) {
      thumbsBar.classList.remove("hidden");
      thumbsBar.innerHTML = images.map((im, idx) => `
        <button type="button" class="thumb-pill ${idx === imgIndex ? "active" : ""}" onclick="window.WoRMapCore.openInspector('${m.slug}', ${idx})">
          ${this.escapeHtml(im.label || `图 #${idx + 1}`)}
        </button>
      `).join("");
    } else {
      thumbsBar.classList.add("hidden");
    }

    const toggleBtn = document.getElementById("inspectorTogglePoolBtn");
    if (toggleBtn) {
      const isDisabled = !!this.poolState.disabledMapSlugs[m.slug];
      if (isDisabled) {
        toggleBtn.textContent = "✅ 将此地图放回抽取池 Enable in Pool";
        toggleBtn.className = "btn btn-primary";
      } else {
        toggleBtn.textContent = "🚫 将此地图移出抽取池 Exclude from Pool";
        toggleBtn.className = "btn btn-danger-outline";
      }
    }

    modal.classList.remove("hidden");
  },

  renderSideBranchesHtml(sideObj) {
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
              <strong>▪ ${this.escapeHtml(slot.pool_name)}</strong><span class="pool-badge">Pool (${slot.member_count})</span>
              <div class="weapon-sub">${this.escapeHtml(previewUnits + more)}</div>
            </div>
          `;
        }
        const wList = (slot.weapons || []).map((w) => w.quantity > 1 ? `${w.name} ×${w.quantity}` : w.name).join(" / ");
        return `
          <div style="margin-bottom:5px;">
            <strong>▪ ${this.escapeHtml(slot.name)}</strong>
            ${wList ? `<div class="weapon-sub">${this.escapeHtml(wList)}</div>` : ""}
          </div>
        `;
      }).join("");

      return `
        <div class="branch-title">${this.escapeHtml(br.branch_name || br.branch)} (${br.slot_count})</div>
        ${slotsHtml}
      `;
    }).join("");
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
};
