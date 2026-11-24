window.addEventListener("DOMContentLoaded", async () => {
  const core = window.WoRMapCore;
  core.loadState();
  core.bindLanguageButtons(() => refreshPoolUI());
  core.bindInspectorModal(() => refreshPoolUI());

  await core.loadDatabase();
  bindPoolEvents();
  refreshPoolUI();
});

function bindPoolEvents() {
  const core = window.WoRMapCore;

  document.querySelectorAll(".mode-pill-card").forEach((card) => {
    card.addEventListener("click", () => {
      core.poolState.selectedMode = card.getAttribute("data-mode") || "skirmish";
      core.poolState.selectedCampaign = "ALL";
      core.saveState();
      refreshPoolUI();
    });
  });

  document.querySelectorAll(".camp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      core.poolState.selectedCampaign = btn.getAttribute("data-camp") || "ALL";
      core.saveState();
      refreshPoolUI();
    });
  });

  document.getElementById("enableAllBtn").addEventListener("click", () => {
    core.allMaps.filter((m) => m.mode === core.poolState.selectedMode).forEach((m) => {
      delete core.poolState.disabledMapSlugs[m.slug];
      delete core.poolState.disableReasons[m.slug];
    });
    core.poolState.drawHistory = core.poolState.drawHistory.filter(
      (h) => String(h.mode).toLowerCase() !== core.poolState.selectedMode
    );
    core.saveState();
    refreshPoolUI();
  });

  document.getElementById("exportMapCfgBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(core.poolState, null, 2)], { type: "application/json" });
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
        if (data.disabledMapSlugs) core.poolState.disabledMapSlugs = data.disabledMapSlugs;
        if (data.disableReasons) core.poolState.disableReasons = data.disableReasons;
        if (data.selectedMode) core.poolState.selectedMode = data.selectedMode;
        if (Array.isArray(data.drawHistory)) core.poolState.drawHistory = data.drawHistory;
        core.saveState();
        refreshPoolUI();
      } catch (err) {
        alert("Invalid JSON file");
      }
      importInput.value = "";
    };
    reader.readAsText(file);
  });
}

function refreshPoolUI() {
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

  const modeMaps = core.allMaps.filter((m) => m.mode === core.poolState.selectedMode);
  const activeInMode = modeMaps.filter((m) => !core.poolState.disabledMapSlugs[m.slug]);
  const disabledInMode = modeMaps.filter((m) => core.poolState.disabledMapSlugs[m.slug]);

  const statsEl = document.getElementById("poolStatsLabel");
  if (statsEl) {
    statsEl.textContent = `在池 Active: ${activeInMode.length} / ${modeMaps.length} (已移出 Excluded: ${disabledInMode.length})`;
  }

  renderPoolTable(modeMaps);
  renderDisabledNotice(disabledInMode);
}

function renderPoolTable(modeMaps) {
  const core = window.WoRMapCore;
  const tbody = document.getElementById("mapPoolTbody");
  if (!tbody) return;

  if (core.allMaps.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">未检测到 maps.json 或 maps_merged.json，请将地图数据文件放入仓库根目录后刷新！</td></tr>`;
    return;
  }

  const filtered = modeMaps.filter((m) => {
    if (core.poolState.selectedCampaign === "ALL") return true;
    return m.campaign === core.poolState.selectedCampaign;
  });

  tbody.innerHTML = filtered.map((m) => {
    const isDisabled = !!core.poolState.disabledMapSlugs[m.slug];
    const reason = core.poolState.disableReasons[m.slug] || "";
    const att = m.attacker ? m.attacker.toUpperCase() : "Neutral";
    const def = m.defender ? m.defender.toUpperCase() : "Neutral";
    const ticketHtml = m.usa_tickets !== null
      ? `<span style="color:var(--usa-light); font-weight:700;">USA ${m.usa_tickets}</span> / <span style="color:var(--csa-light); font-weight:700;">CSA ${m.csa_tickets}</span><div style="font-size:0.74rem; color:var(--gold-accent);">Final Push: ${core.escapeHtml(m.final_push)}</div>`
      : `<span style="color:var(--text-muted); font-size:0.8rem;">无固定票数</span>`;

    return `
      <tr class="${isDisabled ? "row-disabled" : ""}">
        <td>
          <label class="switch">
            <input type="checkbox" id="chk_${m.slug}" name="chk_${m.slug}" ${!isDisabled ? "checked" : ""} onchange="toggleMapPoolStatus('${m.slug}', this.checked)" />
            <span class="slider"></span>
          </label>
          <div style="font-size:0.74rem; margin-top:3px; color:${isDisabled ? "#e06c75" : "#6fd08c"};">
            ${isDisabled ? "已关闭 Excluded" : "在池中 Active"}
          </div>
        </td>
        <td>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
            <strong class="map-name-link" onclick="window.WoRMapCore.openInspector('${m.slug}', 0)">${core.escapeHtml(m.name)}</strong>
            <button type="button" class="inspect-btn" onclick="window.WoRMapCore.openInspector('${m.slug}', 0)">检视 🔍</button>
          </div>
        </td>
        <td>${core.escapeHtml(m.campaign_name || m.campaign)}</td>
        <td>
          <span style="font-size:0.82rem;">攻 Att: <strong>${core.escapeHtml(att)}</strong></span><br/>
          <span style="font-size:0.78rem; color:var(--text-muted);">守 Def: ${core.escapeHtml(def)}</span>
        </td>
        <td><strong>${m.unit_slots || "-"}</strong> 槽<br/><span style="font-size:0.74rem; color:var(--text-muted);">(${m.available_units || "-"} 单位)</span></td>
        <td>${ticketHtml}</td>
        <td>
          <input type="text" id="reason_${m.slug}" name="reason_${m.slug}" class="reason-input"
            placeholder="备注原因，如：上周刚打过 / 失衡..."
            value="${core.escapeHtml(reason)}"
            oninput="updatePoolReason('${m.slug}', this.value)" />
        </td>
      </tr>
    `;
  }).join("");
}

window.toggleMapPoolStatus = function (slug, isEnabled) {
  const core = window.WoRMapCore;
  if (isEnabled) {
    delete core.poolState.disabledMapSlugs[slug];
  } else {
    core.poolState.disabledMapSlugs[slug] = true;
  }
  core.saveState();
  refreshPoolUI();
};

window.updatePoolReason = function (slug, val) {
  const core = window.WoRMapCore;
  core.poolState.disableReasons[slug] = val;
  core.saveState();
  const modeMaps = core.allMaps.filter((m) => m.mode === core.poolState.selectedMode);
  const disabledInMode = modeMaps.filter((m) => core.poolState.disabledMapSlugs[m.slug]);
  renderDisabledNotice(disabledInMode);
};

function renderDisabledNotice(disabledList) {
  const core = window.WoRMapCore;
  const box = document.getElementById("disabledNoticeBox");
  const listEl = document.getElementById("disabledNoticeList");
  if (!box || !listEl) return;

  if (disabledList.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  listEl.innerHTML = disabledList.map((m) => {
    const reason = core.poolState.disableReasons[m.slug] ? ` — ${core.poolState.disableReasons[m.slug]}` : "";
    return `<li><strong>[${core.escapeHtml(m.campaign_name || m.campaign)}] ${core.escapeHtml(m.name)}</strong>${core.escapeHtml(reason)}</li>`;
  }).join("");
}
