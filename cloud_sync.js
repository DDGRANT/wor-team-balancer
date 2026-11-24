const STORAGE_KEY_ONLINE_SNAPSHOTS = "wor_online_snapshots_5w_v1";
const STORAGE_KEY_SYNC_CONFIG = "wor_sync_endpoint_cfg_v1";
const MAX_WEEKLY_SNAPSHOTS = 5; // 默认保存 5 周的数据

window.WoRCloudSync = {
  maxWeeks: MAX_WEEKLY_SNAPSHOTS,

  getCurrentSundayWeekKey(date = new Date()) {
    const d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    const dayOfWeek = d.getDay(); // 0 = Sunday
    const lastSunday = new Date(d.getTime() - dayOfWeek * 86400000);
    const yyyy = lastSunday.getFullYear();
    const mm = String(lastSunday.getMonth() + 1).padStart(2, "0");
    const dd = String(lastSunday.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}_00:00`;
  },

  collectLocalPayload() {
    const safeParse = (k, fallback) => {
      try {
        const raw = localStorage.getItem(k);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    };
    return {
      savedAt: new Date().toISOString(),
      savedAtLocal: new Date().toLocaleString("zh-CN", { hour12: false }),
      asiaRegimentsDb: safeParse("wor_asia_regiments_db_v1", []),
      matchLogs: safeParse("wor_match_winrate_logs_v1", []),
      balancerAutoSave: safeParse("wor_balancer_autosave_v10", null),
      mapPoolState: safeParse("wor_map_pool_state_v4", null)
    };
  },

  loadSnapshots() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ONLINE_SNAPSHOTS);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  },

  saveSnapshots(snaps) {
    // 默认保存 5 周的数据：按时间倒序保留最新 5 份周快照
    const trimmed = snaps.slice(0, MAX_WEEKLY_SNAPSHOTS);
    localStorage.setItem(STORAGE_KEY_ONLINE_SNAPSHOTS, JSON.stringify(trimmed));
    return trimmed;
  },

  getSyncConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SYNC_CONFIG);
      return raw ? JSON.parse(raw) : { githubRepo: "", githubPath: "data/online_snapshots_5w.json", githubToken: "" };
    } catch (e) {
      return { githubRepo: "", githubPath: "data/online_snapshots_5w.json", githubToken: "" };
    }
  },

  saveSyncConfig(cfg) {
    localStorage.setItem(STORAGE_KEY_SYNC_CONFIG, JSON.stringify(cfg));
  },

  async pushToGitHubIfConfigured(snapshots) {
    const cfg = this.getSyncConfig();
    if (!cfg.githubRepo || !cfg.githubToken || !cfg.githubPath) return { synced: false, reason: "未配置 GitHub 仓库/Token" };

    const apiUrl = `https://api.github.com/repos/${cfg.githubRepo.trim()}/contents/${cfg.githubPath.trim()}`;
    const contentB64 = btoa(unescape(encodeURIComponent(JSON.stringify({ retentionWeeks: MAX_WEEKLY_SNAPSHOTS, snapshots }, null, 2))));

    let sha = undefined;
    try {
      const getResp = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${cfg.githubToken.trim()}`, Accept: "application/vnd.github+json" }
      });
      if (getResp.ok) {
        const meta = await getResp.json();
        sha = meta.sha;
      }
    } catch (e) {}

    const putResp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cfg.githubToken.trim()}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `chore: auto-sync Sunday 00:00 snapshot (keep ${MAX_WEEKLY_SNAPSHOTS} weeks)`,
        content: contentB64,
        ...(sha ? { sha } : {})
      })
    });

    if (!putResp.ok) {
      return { synced: false, reason: `GitHub API 返回 ${putResp.status}` };
    }
    return { synced: true };
  },

  async uploadSnapshot(triggerSource = "manual") {
    const now = new Date();
    const weekKey = this.getCurrentSundayWeekKey(now);
    const payload = this.collectLocalPayload();
    const snaps = this.loadSnapshots();

    const record = {
      id: `snap_${Date.now()}`,
      weekKey,
      source: triggerSource,
      uploadedAt: now.toLocaleString("zh-CN", { hour12: false }),
      payload
    };

    const withoutSameWeek = snaps.filter((s) => s.weekKey !== weekKey);
    const updated = this.saveSnapshots([record, ...withoutSameWeek]);
    await this.pushToGitHubIfConfigured(updated);
    return { record, snapshots: updated };
  },

  async checkSundayZeroAutoUpload() {
    const now = new Date();
    const weekKey = this.getCurrentSundayWeekKey(now);
    const snaps = this.loadSnapshots();
    const alreadyUploadedThisWeek = snaps.some((s) => s.weekKey === weekKey && s.source === "sunday_00_auto");

    if (!alreadyUploadedThisWeek) {
      await this.uploadSnapshot("sunday_00_auto");
      return true;
    }
    return false;
  },

  restoreSnapshot(snapId) {
    const snaps = this.loadSnapshots();
    const target = snaps.find((s) => s.id === snapId);
    if (!target || !target.payload) return false;

    const p = target.payload;
    if (Array.isArray(p.asiaRegimentsDb)) {
      localStorage.setItem("wor_asia_regiments_db_v1", JSON.stringify(p.asiaRegimentsDb));
    }
    if (Array.isArray(p.matchLogs)) {
      localStorage.setItem("wor_match_winrate_logs_v1", JSON.stringify(p.matchLogs));
    }
    if (p.balancerAutoSave) {
      localStorage.setItem("wor_balancer_autosave_v10", JSON.stringify(p.balancerAutoSave));
    }
    if (p.mapPoolState) {
      localStorage.setItem("wor_map_pool_state_v4", JSON.stringify(p.mapPoolState));
    }
    return true;
  }
};
