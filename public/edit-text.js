/* Shared App Shell Utilities + Docked Theme Switcher + Opt-in Draft Text Editor (?edit=1).
 *
 * 1. Docked Light/Dark Theme Switcher: mounts cleanly inside .app-bar .right, .ob-bar .right,
 *    .nav-right, or #authTopRight so it never overlaps page buttons or map controls.
 * 2. Keyboard & ARIA Popover Helpers: closes open dropdowns on Escape, keeps aria-expanded synced,
 *    and adds the <dialog closedby="any"> fallback for browsers without native closedBy.
 * 3. Live Auth & Cart Sync: syncs #profileMenu with /api/me (showing real signed-in account / shop
 *    dashboard + Sign out) and syncs cart badge counts from localStorage across screens.
 * 4. Draft "Edit text" Tool: gated behind ?edit=1 (or localStorage bazar-edit-tools=1) so live
 *    user pages stay clean and the 'E' key is never hijacked during normal browsing.
 */
(function () {
  var THEME_KEY = "bazar-theme";
  var CART_KEY = "bazar-cart";

  function ensureMeta(name, defaultContent) {
    var meta = document.querySelector('meta[name="' + name + '"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      meta.content = defaultContent;
      document.head.appendChild(meta);
    }
    return meta;
  }

  // Opt every screen into OS-level accessibility text scaling.
  ensureMeta("text-scale", "scale");

  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function currentResolvedTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch {}
    if (stored === "dark" || stored === "light") return stored;
    return systemPrefersDark() ? "dark" : "light";
  }

  function applyTheme(storedOrNull) {
    var meta = ensureMeta("color-scheme", "light dark");
    var resolved = storedOrNull || (systemPrefersDark() ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", resolved);
    meta.content = storedOrNull ? storedOrNull : "light dark";

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = resolved === "dark" ? "#10120e" : "#f4f0e6";

    var btn = document.getElementById("themeToggleBtn");
    if (btn) {
      var label = resolved === "dark" ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("aria-pressed", String(resolved === "dark"));
      btn.innerHTML = resolved === "dark"
        ? '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
        : '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }

    // Propagate theme into any same-origin preview iframes (e.g. preview.html on Safari)
    document.querySelectorAll("iframe").forEach(function (frame) {
      try {
        if (frame.contentDocument && frame.contentDocument.documentElement) {
          frame.contentDocument.documentElement.setAttribute("data-theme", resolved);
        }
      } catch {}
    });

    window.dispatchEvent(new CustomEvent("bazar-theme-change", { detail: { theme: resolved } }));
  }

  var initialStored = null;
  try {
    var qTheme = new URLSearchParams(window.location.search).get("theme");
    if (qTheme === "dark" || qTheme === "light") initialStored = qTheme;
    else initialStored = localStorage.getItem(THEME_KEY);
  } catch {}
  if (initialStored !== "dark" && initialStored !== "light") initialStored = null;

  var tBtn = document.getElementById("themeToggleBtn") || document.createElement("button");
  tBtn.id = "themeToggleBtn";
  tBtn.type = "button";
  tBtn.setAttribute("data-editor", "");
  tBtn.onclick = function () {
    var next = currentResolvedTheme() === "dark" ? "light" : "dark";
    var sys = systemPrefersDark() ? "dark" : "light";
    try {
      if (next === sys) localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {}
    applyTheme(next === sys ? null : next);
  };

  // Mount inside the header action cluster so it never overlaps page buttons or map controls.
  var host = document.querySelector(".app-bar .right, .ob-bar .right, .nav-right, #authTopRight");
  if (host) {
    if (!tBtn.parentNode) host.insertBefore(tBtn, host.firstChild);
  } else if (!tBtn.parentNode) {
    tBtn.classList.add("theme-floating");
    document.body.appendChild(tBtn);
  }
  applyTheme(initialStored);

  window.addEventListener("storage", function (ev) {
    if (ev.key === THEME_KEY) applyTheme(ev.newValue === "dark" || ev.newValue === "light" ? ev.newValue : null);
    if (ev.key === CART_KEY) syncSharedCartBadge();
  });
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      var st = null;
      try { st = localStorage.getItem(THEME_KEY); } catch {}
      if (!st) applyTheme(null);
    });
  }

  /* ───── Escape-to-close for all dropdowns + <dialog closedby="any"> fallback ───── */
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    document.querySelectorAll(".pop-menu.open, .lang-menu.open").forEach(function (menu) {
      menu.classList.remove("open");
      var wrap = menu.parentElement;
      var trigger = wrap && wrap.querySelector("button[aria-expanded]");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  });

  if (typeof HTMLDialogElement !== "undefined" && !("closedBy" in HTMLDialogElement.prototype)) {
    document.querySelectorAll("dialog[closedby='any']").forEach(function (dialog) {
      if (dialog.__bazarClosedByBound) return;
      dialog.__bazarClosedByBound = true;
      dialog.addEventListener("click", function (event) {
        if (event.target !== dialog) return;
        var rect = dialog.getBoundingClientRect();
        var inside = rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                     rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
        if (!inside) dialog.close();
      });
    });
  }

  /* ───── Shared Cart Count Badge Sync across screens ───── */
  function syncSharedCartBadge() {
    var badge = document.getElementById("sharedCartBadge");
    if (!badge) return;
    try {
      var raw = localStorage.getItem(CART_KEY);
      var list = raw ? JSON.parse(raw) : null;
      var count = Array.isArray(list)
        ? list.reduce(function (s, it) { return s + (Number(it.qty) || 1); }, 0)
        : 2;
      badge.textContent = String(count);
      badge.style.display = count > 0 ? "grid" : "none";
    } catch {}
  }
  syncSharedCartBadge();

  /* ───── Shared Auth-State Sync for Buyer Profile Menus (#profileMenu) ───── */
  var profileMenu = document.getElementById("profileMenu");
  if (profileMenu) {
    fetch("/api/me")
      .then(function (r) { return r.json(); })
      .then(function (me) {
        if (!me || !me.signedIn) return;
        var btn = profileMenu.parentElement && profileMenu.parentElement.querySelector(".profile-btn");
        var displayName = (me.profile && me.profile.full_name) || (me.shop && me.shop.name) || me.email || "Account";
        if (btn) {
          var initials = displayName.trim().split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
          if (initials) btn.textContent = initials;
          btn.setAttribute("aria-label", "Account menu (" + displayName + ")");
        }
        var extra = "";
        if (me.shop) {
          extra += '<a href="/dashboard">My Shop Dashboard</a>';
          extra += '<a href="/s/' + encodeURIComponent(me.shop.slug) + '">View Public Shop ↗</a>';
        } else {
          extra += '<a href="/onboarding">Open a Shop on Bazar</a>';
        }
        profileMenu.innerHTML =
          '<div style="padding:8px 10px 6px;border-bottom:1px solid var(--line);margin-bottom:4px;">' +
            '<b style="display:block;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
              displayName.replace(/[<>&"]/g, "") +
            '</b>' +
            '<span style="font-size:11px;color:var(--muted);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
              (me.email || "").replace(/[<>&"]/g, "") +
            '</span>' +
          '</div>' +
          extra +
          '<a href="/?filter=saved#pickedProducts">Saved Items</a>' +
          '<a href="/?drawer=orders">My Orders &amp; Cart</a>' +
          '<a href="/resell?view=escrow">My Resell &amp; Escrow</a>' +
          '<div class="pop-sep"></div>' +
          '<button type="button" id="sharedSignOutBtn" style="color:#b83232;">Sign out</button>';
        var so = document.getElementById("sharedSignOutBtn");
        if (so) {
          so.onclick = function () {
            fetch("/api/auth/sign-out", { method: "POST" }).finally(function () {
              window.location.reload();
            });
          };
        }
      })
      .catch(function () {});
  }

  window.BazarShell = {
    currentTheme: currentResolvedTheme,
    applyTheme: applyTheme,
    syncCartBadge: syncSharedCartBadge
  };

  /* ───── Saved Copy Overrides (always applied if previously saved) ───── */
  function KEY() {
    var l = "en";
    try { l = localStorage.getItem("bazar-lang") || "en"; } catch {}
    return "bazar-text:" + location.pathname + (l === "en" ? "" : ":" + l);
  }
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-text]"));
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY()) || "{}"); } catch {}
  nodes.forEach(function (n) {
    var k = n.getAttribute("data-text");
    if (saved[k] != null) n.innerHTML = saved[k];
  });

  /* ───── Opt-in Draft "Edit text" Tool (only when ?edit=1 or bazar-edit-tools=1) ───── */
  var editEnabled = false;
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") editEnabled = true;
    else if (params.get("edit") === "0") {
      localStorage.removeItem("bazar-edit-tools");
      editEnabled = false;
    } else if (localStorage.getItem("bazar-edit-tools") === "1") {
      editEnabled = true;
    }
  } catch {}

  if (!editEnabled) return;

  var style = document.createElement("style");
  style.textContent =
    "body.editing [data-text]{outline:2px dashed #d4f53c;outline-offset:3px;border-radius:4px;position:relative;cursor:text}" +
    "body.editing [data-text]:focus{outline-style:solid;background:rgb(212 245 60/.15)}" +
    "body.editing [data-text]::after{content:attr(data-text);position:absolute;left:-2px;top:-22px;font:600 10px/14px Inter,sans-serif;" +
    "background:#d4f53c;color:#0e0e0c;padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none;z-index:50;letter-spacing:0;text-transform:none}" +
    "#edit-bar{position:fixed;left:16px;bottom:calc(var(--tab-bar,0px) + env(safe-area-inset-bottom) + 12px);z-index:100;display:flex;gap:8px;font:600 13px/16px Inter,sans-serif}" +
    "#edit-bar button{border:0;border-radius:999px;padding:12px 16px;cursor:pointer;box-shadow:0 4px 12px rgb(14 14 12/.25)}" +
    "#edit-bar .on{background:#d4f53c;color:#0e0e0c}#edit-bar .off{background:#0e0e0c;color:#d4f53c;border:1px solid rgba(212,245,60,.35)}" +
    "#edit-bar .ghost{background:#fbf8f1;color:#0e0e0c}#edit-bar .hide{display:none}";
  document.head.appendChild(style);

  var bar = document.createElement("div");
  bar.id = "edit-bar";
  bar.setAttribute("data-editor", "");
  bar.innerHTML =
    '<button type="button" class="ghost hide" data-act="reset">Reset</button>' +
    '<button type="button" class="ghost hide" data-act="save">Save page</button>' +
    '<button type="button" class="off" data-act="toggle">Edit text</button>';
  document.body.appendChild(bar);

  var toggleBtn = bar.querySelector('[data-act="toggle"]');
  var extra = bar.querySelectorAll(".ghost");
  var on = false;

  function setMode(next) {
    on = next;
    document.body.classList.toggle("editing", on);
    nodes.forEach(function (n) { n.contentEditable = on ? "true" : "false"; n.spellcheck = on; });
    toggleBtn.textContent = on ? "Done" : "Edit text";
    toggleBtn.className = on ? "on" : "off";
    extra.forEach(function (b) { b.classList.toggle("hide", !on); });
  }

  function remember() {
    var out = {};
    nodes.forEach(function (n) { out[n.getAttribute("data-text")] = n.innerHTML; });
    try { localStorage.setItem(KEY(), JSON.stringify(out)); } catch {}
  }

  document.addEventListener("click", function (e) {
    if (on && e.target.closest("a,button") && !e.target.closest("[data-editor]")) e.preventDefault();
  }, true);
  document.addEventListener("input", function (e) {
    if (e.target.closest && e.target.closest("[data-text]")) remember();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && on && e.target.closest("[data-text]")) { e.preventDefault(); e.target.blur(); }
    if ((e.key === "e" || e.key === "E") && !on && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) setMode(true);
    if (e.key === "Escape" && on) setMode(false);
  });

  bar.addEventListener("click", function (e) {
    var act = e.target.getAttribute("data-act");
    if (act === "toggle") setMode(!on);
    if (act === "reset" && confirm("Put back the original words on this page?")) {
      try { localStorage.removeItem(KEY()); } catch {}
      location.reload();
    }
    if (act === "save") {
      setMode(false);
      var copy = document.documentElement.cloneNode(true);
      copy.querySelectorAll("[data-editor]").forEach(function (n) { n.remove(); });
      copy.querySelectorAll("[contenteditable]").forEach(function (n) {
        n.removeAttribute("contenteditable"); n.removeAttribute("spellcheck");
      });
      copy.querySelector("body").classList.remove("editing");
      copy.querySelectorAll("style").forEach(function (s) { if (s.textContent.indexOf("#edit-bar") > -1) s.remove(); });
      var html = "<!doctype html>\n" + copy.outerHTML;
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
      a.download = (location.pathname.split("/").pop() || "index.html");
      a.click();
    }
  });
})();
