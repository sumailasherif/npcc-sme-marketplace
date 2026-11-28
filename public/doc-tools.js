/* Bazar document tools — shared by dashboard.html and resell.html.
 *
 *   BazarDocs.openCamera({ title })      live camera, returns a JPEG data URL (or null)
 *   BazarDocs.pickFiles({ accept, multiple, capture })   file picker, returns File[]
 *   BazarDocs.fileToDataURL(file)
 *   BazarDocs.readImage(src, onProgress)  reads the text in a photo (Tesseract.js)
 *   BazarDocs.readPDF(file, onProgress)   reads the text in a PDF (PDF.js; scanned pages are OCR'd)
 *   BazarDocs.parseInvoice(text)          finds supplier, invoice no, date, total, VAT
 *   BazarDocs.invoicePDF(invoice)         creates and saves an invoice PDF (jsPDF)
 *   BazarDocs.statementPDF(statement)     creates and saves a business statement PDF
 *
 * Everything runs in the browser: photos and PDFs are never uploaded anywhere.
 * Libraries load only when first needed. All free, no API keys.
 */
(function () {
  var LIBS = {
    tesseract: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
    pdfjs: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
    jspdf: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
    autotable: "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"
  };
  var loaded = {};
  function loadScript(url) {
    if (!loaded[url]) {
      loaded[url] = new Promise(function (ok, fail) {
        var s = document.createElement("script");
        s.src = url; s.async = true;
        s.onload = ok; s.onerror = function () { fail(new Error("Couldn't load " + url)); };
        document.head.appendChild(s);
      });
    }
    return loaded[url];
  }

  /* ───────────── Camera ───────────── */
  var css = document.createElement("style");
  css.textContent =
    "#bzCam{border:1px solid var(--line,#e8e2d3);border-radius:22px;padding:0;background:var(--card,#fbf8f1);color:var(--black,#0e0e0c);width:min(94vw,460px);box-shadow:0 24px 60px rgba(14,14,12,.35)}" +
    "#bzCam::backdrop{background:rgba(14,14,12,.6);backdrop-filter:blur(3px)}" +
    "#bzCam .h{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:var(--cream,#f4f0e6);border-bottom:1px solid var(--line,#e8e2d3);font-weight:700}" +
    "#bzCam .h button{width:36px;height:36px;border-radius:999px;border:0;background:none;font-size:16px;cursor:pointer}" +
    "#bzCam .v{position:relative;margin:14px;border-radius:16px;overflow:hidden;background:#0e0e0c;aspect-ratio:3/4;max-height:60svh;display:grid;place-items:center}" +
    "#bzCam video{width:100%;height:100%;object-fit:cover;display:block}" +
    "#bzCam .frame{position:absolute;inset:8%;border:2px dashed #d4f53c;border-radius:12px;pointer-events:none}" +
    "#bzCam .msg{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;color:#d4f53c;font-size:13px;font-weight:600}" +
    "#bzCam .a{display:flex;gap:8px;padding:0 14px 14px}" +
    "#bzCam .a button{flex:1;min-height:46px;border-radius:999px;border:1px solid var(--line,#e8e2d3);background:var(--cream,#f4f0e6);font:inherit;font-size:13px;font-weight:700;cursor:pointer}" +
    "#bzCam .a .shot{background:#0e0e0c;color:#d4f53c;border-color:#0e0e0c}" +
    "#bzCam .a button:disabled{opacity:.45;cursor:default}";
  document.head.appendChild(css);

  var camDlg = null, camStream = null, camFacing = "environment", camResolve = null;
  function buildCam() {
    camDlg = document.createElement("dialog");
    camDlg.id = "bzCam";
    camDlg.innerHTML =
      '<div class="h"><span id="bzCamTitle">Camera</span><button type="button" aria-label="Close" data-x>✕</button></div>' +
      '<div class="v"><video autoplay playsinline muted></video><div class="frame"></div><div class="msg" id="bzCamMsg">Starting camera…</div></div>' +
      '<div class="a"><button type="button" data-flip>Switch camera</button><button type="button" class="shot" data-shot disabled>Capture</button></div>' +
      '<div class="a" id="bzCamAlt" hidden><button type="button" data-alt>Use phone camera / choose a photo</button></div>';
    document.body.appendChild(camDlg);
    camDlg.querySelector("[data-x]").onclick = function () { finishCam(null); };
    camDlg.querySelector("[data-flip]").onclick = function () { camFacing = camFacing === "environment" ? "user" : "environment"; startStream(); };
    camDlg.querySelector("[data-shot]").onclick = function () {
      var v = camDlg.querySelector("video");
      var c = document.createElement("canvas");
      c.width = v.videoWidth; c.height = v.videoHeight;
      c.getContext("2d").drawImage(v, 0, 0);
      finishCam(c.toDataURL("image/jpeg", 0.92));
    };
    camDlg.querySelector("[data-alt]").onclick = function () {
      pickFiles({ accept: "image/*", capture: "environment" }).then(function (files) {
        if (!files.length) return;
        fileToDataURL(files[0]).then(finishCam);
      });
    };
    camDlg.addEventListener("cancel", function (e) { e.preventDefault(); finishCam(null); });
  }
  function stopStream() {
    if (camStream) { camStream.getTracks().forEach(function (t) { t.stop(); }); camStream = null; }
  }
  function startStream() {
    var msg = camDlg.querySelector("#bzCamMsg"), shot = camDlg.querySelector("[data-shot]");
    var v = camDlg.querySelector("video");
    stopStream();
    shot.disabled = true; msg.hidden = false; msg.textContent = "Starting camera…";
    camDlg.querySelector("#bzCamAlt").hidden = true;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      msg.textContent = "This browser can't open the camera here.";
      camDlg.querySelector("#bzCamAlt").hidden = false;
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: camFacing, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false })
      .then(function (stream) {
        camStream = stream;
        v.srcObject = stream;
        v.onloadedmetadata = function () { v.play(); shot.disabled = false; msg.hidden = true; };
      })
      .catch(function (err) {
        msg.textContent = err && err.name === "NotAllowedError"
          ? "Camera is blocked. Allow it in your browser's site settings, or use the button below."
          : "No camera found. Use the button below to choose a photo.";
        camDlg.querySelector("#bzCamAlt").hidden = false;
      });
  }
  function finishCam(result) {
    stopStream();
    if (camDlg.open) camDlg.close();
    if (camResolve) { var r = camResolve; camResolve = null; r(result); }
  }
  function openCamera(opts) {
    if (!camDlg) buildCam();
    camDlg.querySelector("#bzCamTitle").textContent = (opts && opts.title) || "Camera";
    camDlg.showModal();
    startStream();
    return new Promise(function (ok) { camResolve = ok; });
  }

  /* ───────────── Files ───────────── */
  function pickFiles(opts) {
    opts = opts || {};
    return new Promise(function (ok) {
      var inp = document.createElement("input");
      inp.type = "file";
      if (opts.accept) inp.accept = opts.accept;
      if (opts.multiple) inp.multiple = true;
      if (opts.capture) inp.setAttribute("capture", opts.capture);
      inp.style.display = "none";
      inp.onchange = function () { ok(Array.prototype.slice.call(inp.files || [])); inp.remove(); };
      document.body.appendChild(inp);
      inp.click();
    });
  }
  function fileToDataURL(file) {
    return new Promise(function (ok, fail) {
      var r = new FileReader();
      r.onload = function () { ok(r.result); };
      r.onerror = fail;
      r.readAsDataURL(file);
    });
  }

  /* ───────────── Reading text (OCR + PDF) ───────────── */
  function readImage(src, onProgress) {
    return loadScript(LIBS.tesseract).then(function () {
      return window.Tesseract.recognize(src, "eng", {
        logger: function (m) {
          if (onProgress && m.status === "recognizing text") onProgress(m.progress, "Reading text…");
          else if (onProgress && /load/.test(m.status)) onProgress(0.05, "Loading reader (first time only)…");
        }
      });
    }).then(function (res) { return res.data.text || ""; });
  }

  function readPDF(file, onProgress) {
    return loadScript(LIBS.pdfjs).then(function () {
      var pdfjs = window.pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
      return file.arrayBuffer().then(function (buf) { return pdfjs.getDocument({ data: buf }).promise; });
    }).then(function (pdf) {
      var pages = Math.min(pdf.numPages, 5), out = [], chain = Promise.resolve();
      for (var p = 1; p <= pages; p++) {
        (function (n) {
          chain = chain.then(function () { return pdf.getPage(n); }).then(function (page) {
            if (onProgress) onProgress((n - 1) / pages, "Reading page " + n + " of " + pages + "…");
            return page.getTextContent().then(function (tc) {
              // Rebuild lines from text items (PDF text has positions, not lines).
              var lines = {}, keys = [];
              tc.items.forEach(function (it) {
                var y = Math.round(it.transform[5]);
                if (!lines[y]) { lines[y] = []; keys.push(y); }
                lines[y].push(it.str);
              });
              keys.sort(function (a, b) { return b - a; });
              var text = keys.map(function (k) { return lines[k].join(" "); }).join("\n");
              if (text.replace(/\s/g, "").length > 20) return text;
              // Scanned PDF (just a picture): render the page and read it like a photo.
              var vp = page.getViewport({ scale: 2 });
              var c = document.createElement("canvas");
              c.width = vp.width; c.height = vp.height;
              return page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise
                .then(function () { return readImage(c.toDataURL("image/png"), onProgress); });
            });
          }).then(function (t) { out.push(t); });
        })(p);
      }
      return chain.then(function () { if (onProgress) onProgress(1, "Done"); return out.join("\n"); });
    });
  }

  /* ───────────── Understanding an invoice ───────────── */
  function money(s) {
    if (!s) return null;
    var n = parseFloat(String(s).replace(/[^\d.,]/g, "").replace(/,(?=\d{3}\b)/g, "").replace(/,/g, "."));
    return isNaN(n) ? null : n;
  }
  function parseInvoice(text) {
    var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    // Amount on the last line matching `re`. Prefers money with decimals (660.00) over
    // ID numbers (a VAT registration "VAT27012345"); ignores percentages ("VAT 15%").
    function amountOn(re) {
      var fallback = null;
      for (var i = lines.length - 1; i >= 0; i--) {
        if (!re.test(lines[i])) continue;
        var clean = lines[i].replace(/\d+(?:[.,]\d+)?\s*%/g, "").replace(/[A-Z]{2,}\d{5,}/g, "");
        var dec = clean.match(/\d[\d ,]*[.,]\d{2}\b/g);
        if (dec) return money(dec[dec.length - 1]);
        var ints = clean.match(/\b\d{1,3}(?:[ ,]\d{3})+\b|\b\d{1,6}\b/g);
        if (ints && fallback == null) fallback = money(ints[ints.length - 1]);
      }
      return fallback;
    }
    var total = amountOn(/\b(grand\s*total|total\s*(due|ttc|amount)?|amount\s*due|net\s*payable|montant\s*total)\b/i);
    var vat = amountOn(/\b(vat|tva|tax)\b/i);
    var subtotal = amountOn(/\b(sub\s*-?total|sous[- ]total|total\s*ht|net\s*amount)\b/i);
    if (total == null) {
      // Fall back to the biggest amount on the page.
      var all = (text.match(/\d[\d ,]*[.,]\d{2}\b/g) || []).map(money).filter(function (n) { return n != null; });
      if (all.length) total = Math.max.apply(null, all);
    }
    var vatEstimated = false;
    if (vat == null && total != null) { vat = Math.round(total * 15 / 115 * 100) / 100; vatEstimated = true; } // Mauritius VAT 15%, price incl. VAT
    var dateM = text.match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})\b/) ||
                text.match(/\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{4})\b/i);
    var date = "";
    if (dateM) {
      var months = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
      var d = +dateM[1], m = isNaN(+dateM[2]) ? months[dateM[2].slice(0, 3).toLowerCase()] : +dateM[2], y = +dateM[3];
      if (y < 100) y += 2000;
      if (m > 12 && d <= 12) { var t = d; d = m; m = t; }
      if (m >= 1 && m <= 12 && d >= 1 && d <= 31) date = y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    }
    var noM = text.match(/\b(?:invoice|inv|facture|bill|receipt|re[cç]u)[ \t]*(?:no\.?|n[o°º]\.?|number|#)?[ \t]*[:#]?[ \t]*([A-Z0-9\-\/]*\d[A-Z0-9\-\/]*)/i);
    var supplier = "";
    for (var i = 0; i < Math.min(lines.length, 6); i++) {
      if (/[a-z]{3,}/i.test(lines[i]) && !/invoice|facture|receipt|tax|date|tel|phone|vat|brn/i.test(lines[i])) { supplier = lines[i].replace(/[^\w&'’.,\- ]/g, "").trim(); break; }
    }
    return {
      supplier: supplier, invoiceNo: noM ? noM[1] : "", date: date,
      total: total, vat: vat, vatEstimated: vatEstimated, subtotal: subtotal,
      found: [total != null, !!date, !!noM, !!supplier].filter(Boolean).length   // how many fields were read (0–4)
    };
  }

  /* ───────────── PDF creation ───────────── */
  var LIME = [212, 245, 60], BLACK = [14, 14, 12], CREAM = [244, 240, 230], MUTED = [107, 102, 90];
  function rs(n) { return "Rs " + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  function loadPdfLibs() {
    return loadScript(LIBS.jspdf).then(function () { return loadScript(LIBS.autotable); }).then(function () { return window.jspdf.jsPDF; });
  }
  function header(doc, title, biz) {
    var W = doc.internal.pageSize.getWidth();
    doc.setFillColor.apply(doc, BLACK); doc.rect(0, 0, W, 30, "F");
    doc.setFillColor.apply(doc, LIME); doc.roundedRect(14, 9, 26, 12, 2, 2, "F");
    doc.setTextColor.apply(doc, BLACK); doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text("bazar", 18, 17.3);
    doc.setTextColor(251, 248, 241); doc.setFontSize(15); doc.text(title, W - 14, 14, { align: "right" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(207, 199, 180);
    doc.text((biz.name || "") + (biz.place ? "  |  " + biz.place : ""), W - 14, 21, { align: "right" });
  }
  function footer(doc, biz) {
    var n = doc.getNumberOfPages(), W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    for (var i = 1; i <= n; i++) {
      doc.setPage(i);
      doc.setFontSize(8); doc.setTextColor.apply(doc, MUTED);
      doc.text("Generated with Bazar" + (biz.brn ? "  |  BRN " + biz.brn : "") + (biz.vatNo ? "  |  VAT " + biz.vatNo : ""), 14, H - 8);
      doc.text("Page " + i + " of " + n, W - 14, H - 8, { align: "right" });
    }
  }

  function invoicePDF(inv) {
    return loadPdfLibs().then(function (jsPDF) {
      var doc = new jsPDF({ unit: "mm", format: "a4" }), W = doc.internal.pageSize.getWidth();
      var biz = inv.business || {};
      header(doc, "INVOICE", biz);
      doc.setTextColor.apply(doc, BLACK); doc.setFontSize(10);
      doc.setFont("helvetica", "bold"); doc.text("Bill to", 14, 44);
      doc.setFont("helvetica", "normal"); doc.text(inv.customer || "Customer", 14, 50);
      if (inv.customerContact) doc.text(inv.customerContact, 14, 55);
      var meta = [["Invoice no", inv.number], ["Date", fmtDate(inv.date)], ["Due", fmtDate(inv.due) || "On receipt"], ["Payment", inv.method || "-"]];
      meta.forEach(function (m, i) {
        doc.setFont("helvetica", "bold"); doc.text(m[0], W - 70, 44 + i * 6);
        doc.setFont("helvetica", "normal"); doc.text(String(m[1] || ""), W - 14, 44 + i * 6, { align: "right" });
      });
      var rows = inv.items.map(function (it) { return [it.desc, String(it.qty), rs(it.price), rs(it.qty * it.price)]; });
      doc.autoTable({
        startY: 72, head: [["Item", "Qty", "Unit price", "Amount"]], body: rows,
        styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: BLACK, textColor: LIME }, alternateRowStyles: { fillColor: CREAM },
        columnStyles: { 1: { halign: "center", cellWidth: 18 }, 2: { halign: "right", cellWidth: 34 }, 3: { halign: "right", cellWidth: 36 } }
      });
      var y = doc.lastAutoTable.finalY + 8;
      var lines = [["Subtotal", rs(inv.subtotal)], ["VAT " + (inv.vatRate || 0) + "%", rs(inv.vat)]];
      lines.forEach(function (l, i) {
        doc.setFont("helvetica", "normal"); doc.text(l[0], W - 70, y + i * 6); doc.text(l[1], W - 14, y + i * 6, { align: "right" });
      });
      y += 15;
      doc.setFillColor.apply(doc, LIME); doc.roundedRect(W - 84, y - 6, 70, 11, 2, 2, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor.apply(doc, BLACK);
      doc.text("Total", W - 80, y + 1.5); doc.text(rs(inv.total), W - 17, y + 1.5, { align: "right" });
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor.apply(doc, MUTED);
      if (inv.notes) doc.text(doc.splitTextToSize(inv.notes, W - 28), 14, y + 18);
      footer(doc, biz);
      doc.save((inv.number || "invoice") + ".pdf");
    });
  }

  /* statement: { business, from, to, entries:[{date,ref,type:'sale'|'expense',party,category,item,qty,amount,vat,method,status}] } */
  function statementPDF(st) {
    return loadPdfLibs().then(function (jsPDF) {
      var doc = new jsPDF({ unit: "mm", format: "a4" }), W = doc.internal.pageSize.getWidth();
      var biz = st.business || {};
      var E = st.entries.filter(function (e) { return e.date >= st.from && e.date <= st.to; })
        .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      var sales = E.filter(function (e) { return e.type === "sale"; }), costs = E.filter(function (e) { return e.type === "expense"; });
      function sum(list, k) { return list.reduce(function (s, e) { return s + (e[k] || 0); }, 0); }
      var revenue = sum(sales, "amount"), vatOut = sum(sales, "vat"), spend = sum(costs, "amount"), vatIn = sum(costs, "vat");
      var paid = sales.filter(function (e) { return e.status !== "overdue" && e.status !== "unpaid"; });
      var owed = sales.filter(function (e) { return e.status === "overdue" || e.status === "unpaid"; });
      var netProfit = (revenue - vatOut) - (spend - vatIn);

      header(doc, "BUSINESS STATEMENT", biz);
      doc.setTextColor.apply(doc, BLACK); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
      doc.text("Period: " + fmtDate(st.from) + "  to  " + fmtDate(st.to), 14, 42);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor.apply(doc, MUTED);
      doc.text("Generated " + fmtDate(new Date().toISOString().slice(0, 10)) + "  |  " + E.length + " transactions", 14, 48);

      // Summary tiles
      var tiles = [
        ["Revenue (incl. VAT)", rs(revenue)], ["Expenses (incl. VAT)", rs(spend)], ["Net profit (excl. VAT)", rs(netProfit)],
        ["VAT collected", rs(vatOut)], ["VAT paid on costs", rs(vatIn)], ["Net VAT due", rs(vatOut - vatIn)],
        ["Orders / invoices", String(sales.length)], ["Average sale", rs(sales.length ? revenue / sales.length : 0)], ["Unpaid", rs(sum(owed, "amount"))]
      ];
      var tw = (W - 28 - 8) / 3;
      tiles.forEach(function (t, i) {
        var x = 14 + (i % 3) * (tw + 4), yy = 54 + Math.floor(i / 3) * 20;
        var key = i === 2 || i === 5;
        doc.setFillColor.apply(doc, key ? LIME : CREAM); doc.roundedRect(x, yy, tw, 17, 2, 2, "F");
        doc.setFontSize(8); doc.setTextColor.apply(doc, MUTED); doc.text(t[0], x + 3, yy + 5.5);
        doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.setTextColor.apply(doc, BLACK); doc.text(t[1], x + 3, yy + 13);
        doc.setFont("helvetica", "normal");
      });

      function group(list, key) {
        var g = {};
        list.forEach(function (e) { var k = e[key] || "Other"; if (!g[k]) g[k] = { n: 0, amt: 0, vat: 0 }; g[k].n++; g[k].amt += e.amount; g[k].vat += e.vat || 0; });
        return Object.keys(g).map(function (k) { return [k, g[k].n, g[k].amt, g[k].vat]; }).sort(function (a, b) { return b[2] - a[2]; });
      }
      function section(title, head, body, startY) {
        var y0 = startY || doc.lastAutoTable.finalY + 10;
        if (y0 > doc.internal.pageSize.getHeight() - 40) { doc.addPage(); y0 = 20; }
        doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor.apply(doc, BLACK); doc.text(title, 14, y0);
        doc.autoTable({
          startY: y0 + 3, head: [head], body: body.length ? body : [["No entries in this period"].concat(head.slice(1).map(function () { return ""; }))],
          styles: { font: "helvetica", fontSize: 9, cellPadding: 2.4 }, headStyles: { fillColor: BLACK, textColor: LIME },
          alternateRowStyles: { fillColor: CREAM }, margin: { left: 14, right: 14 },
          didParseCell: function (d) { if (d.section === "body" && d.column.index >= head.length - 2 && /^Rs|^\d/.test(String(d.cell.raw))) d.cell.styles.halign = "right"; }
        });
      }
      function money3(rows) { return rows.map(function (r) { return [r[0], String(r[1]), rs(r[2]), rs(r[3])]; }); }

      section("Sales by category", ["Category", "Sales", "Amount", "VAT"], money3(group(sales, "category")), 120);
      section("Sales by payment method", ["Method", "Sales", "Amount", "VAT"], money3(group(paid.concat(owed), "method")));
      var items = {};
      sales.forEach(function (e) { var k = e.item || e.category; if (!items[k]) items[k] = { q: 0, amt: 0 }; items[k].q += e.qty || 1; items[k].amt += e.amount; });
      var top = Object.keys(items).map(function (k) { return [k, items[k].q, items[k].amt]; }).sort(function (a, b) { return b[2] - a[2]; }).slice(0, 10);
      section("Top items", ["Item", "Qty sold", "Amount"], top.map(function (r) { return [r[0], String(r[1]), rs(r[2])]; }));
      section("Expenses by category", ["Category", "Bills", "Amount", "VAT"], money3(group(costs, "category")));
      section("Unpaid and overdue invoices", ["Date", "Invoice", "Customer", "Amount"],
        owed.map(function (e) { return [fmtDate(e.date), e.ref, e.party, rs(e.amount)]; }));
      section("All transactions", ["Date", "Ref", "Type", "Customer / supplier", "Category", "Method", "Amount"],
        E.map(function (e) { return [fmtDate(e.date), e.ref, e.type === "sale" ? "Sale" : "Expense", e.party, e.category, e.method || "", (e.type === "expense" ? "-" : "") + rs(e.amount)]; }));
      footer(doc, biz);
      doc.save("Bazar-statement-" + st.from + "-to-" + st.to + ".pdf");
      return { revenue: revenue, spend: spend, netProfit: netProfit, vatDue: vatOut - vatIn, count: E.length };
    });
  }

  window.BazarDocs = {
    openCamera: openCamera, pickFiles: pickFiles, fileToDataURL: fileToDataURL,
    readImage: readImage, readPDF: readPDF, parseInvoice: parseInvoice,
    invoicePDF: invoicePDF, statementPDF: statementPDF, rs: rs, fmtDate: fmtDate
  };
})();
