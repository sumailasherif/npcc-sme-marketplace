/* "Edit text" mode for the HTML drafts.
   Every piece of text carries data-text="name". Press the button (or E):
   - each text gets a dashed lime outline and a little tag with its name,
   - click any text and type to change it,
   - "Save page" downloads this page with your new words baked in.
   Unsaved edits are also kept in this browser so a reload doesn't lose them. */
(function () {
  // Global Dark / Light Mode Toggle (persisted in localStorage)
  var THEME_KEY = "bazar-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("themeToggleBtn");
    if (btn) {
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.innerHTML = t === "dark"
        ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
        : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }
  }
  var savedTheme = "light";
  try { savedTheme = localStorage.getItem(THEME_KEY) || "light"; } catch (e) {}
  var tBtn = document.createElement("button");
  tBtn.id = "themeToggleBtn";
  tBtn.type = "button";
  tBtn.onclick = function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  };
  document.body.appendChild(tBtn);
  applyTheme(savedTheme);
  // Edits are kept per language, so a French edit never shows up in English.
  function KEY() {
    var l = "en";
    try { l = localStorage.getItem("bazar-lang") || "en"; } catch (e) {}
    return "bazar-text:" + location.pathname + (l === "en" ? "" : ":" + l);
  }
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-text]"));

  // Bring back edits from an earlier visit.
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY()) || "{}"); } catch (e) {}
  nodes.forEach(function (n) {
    var k = n.getAttribute("data-text");
    if (saved[k] != null) n.innerHTML = saved[k];
  });

  var style = document.createElement("style");
  style.textContent =
    "body.editing [data-text]{outline:2px dashed #d4f53c;outline-offset:3px;border-radius:4px;position:relative;cursor:text}" +
    "body.editing [data-text]:focus{outline-style:solid;background:rgb(212 245 60/.15)}" +
    "body.editing [data-text]::after{content:attr(data-text);position:absolute;left:-2px;top:-22px;font:600 10px/14px Inter,sans-serif;" +
    "background:#d4f53c;color:#0e0e0c;padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none;z-index:50;letter-spacing:0;text-transform:none}" +
    "#edit-bar{position:fixed;left:16px;bottom:calc(var(--tab-bar,0px) + env(safe-area-inset-bottom) + 12px);z-index:100;display:flex;gap:8px;font:600 13px/16px Inter,sans-serif}" +
    "#edit-bar button{border:0;border-radius:999px;padding:12px 16px;cursor:pointer;box-shadow:0 4px 12px rgb(14 14 12/.25)}" +
    "#edit-bar .on{background:#d4f53c;color:#0e0e0c}#edit-bar .off{background:#0e0e0c;color:#d4f53c}" +
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
    try { localStorage.setItem(KEY(), JSON.stringify(out)); } catch (e) {}
  }

  // While editing, links and buttons must not navigate or submit.
  document.addEventListener("click", function (e) {
    if (on && e.target.closest("a,button") && !e.target.closest("[data-editor]")) e.preventDefault();
  }, true);
  document.addEventListener("input", function (e) {
    if (e.target.closest && e.target.closest("[data-text]")) remember();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && on && e.target.closest("[data-text]")) { e.preventDefault(); e.target.blur(); }
    if ((e.key === "e" || e.key === "E") && !on && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) setMode(true);
    if (e.key === "Escape" && on) setMode(false);
  });

  bar.addEventListener("click", function (e) {
    var act = e.target.getAttribute("data-act");
    if (act === "toggle") setMode(!on);
    if (act === "reset" && confirm("Put back the original words on this page?")) {
      try { localStorage.removeItem(KEY()); } catch (err) {}
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
