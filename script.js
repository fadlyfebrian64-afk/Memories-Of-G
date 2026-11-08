"use strict";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };

/* ---------- foto + cadangan otomatis bila file belum ada ---------- */
const av = (n, i) => {
  const h = (i * 47) % 360, ini = n.split(" ").map(w => w[0]).slice(0, 2).join("");
  return "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},70%,72%)"/><stop offset="1" stop-color="hsl(${h + 50},60%,42%)"/></linearGradient></defs><rect width="200" height="240" fill="url(#g)"/><text x="100" y="140" font-size="64" text-anchor="middle" fill="#fff" font-family="Georgia">${ini}</text></svg>`);
};
const EXT = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".jpg.jpeg", ".jpeg.jpg", ".jpg.jpg", ".jpeg.jpeg", ".jpg.png", ".png.jpg", ".png.jpeg", ".JPG.jpeg", ".JPEG.jpeg", ".jpg.JPG"];
function imgErr(el) {   // coba format lain (.jpeg, .png, ...) sebelum memakai gambar cadangan
  const n = +(el.dataset.t || 1);
  if (n < EXT.length) { el.dataset.t = n + 1; el.src = el.dataset.b + EXT[n]; return; }
  el.onerror = null; el.src = av(el.dataset.n, +el.dataset.i);
}
const img = (src, n, i, alt = n) => `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" data-b="${src.replace(/\.(jpe?g|png|webp)$/i, "")}" data-n="${n}" data-i="${i}" onerror="imgErr(this)">`;

/* ---------- elemen melayang ---------- */
(() => {
  const box = $("#float"), sym = ["♪", "✦", "✿", "★", "♡", "🎓", "📷", "✎"];
  const cols = ["#c4a8ff", "#f0c79b", "#9ad9cf"];
  for (let i = 0; i < 4; i++)
    box.insertAdjacentHTML("beforeend", `<div class="fl" style="left:${rnd(0, 90)}%;top:${rnd(0, 80)}%;--k:${rnd(10, 30)}"><i class="orb" style="--s:${rnd(200, 360)}px;--c:${cols[i % 3]};--d:${rnd(10, 18)}s;--dl:-${rnd(0, 8)}s;--x:${rnd(-80, 80)}px;--rot:0deg"></i></div>`);
  for (let i = 0; i < 16; i++) {
    const frame = i % 4 === 0;
    box.insertAdjacentHTML("beforeend", `<div class="fl" style="left:${rnd(2, 95)}%;top:${rnd(5, 92)}%;--k:${rnd(-40, 40)};font-size:${rnd(16, 34)}px;color:var(--${["gold", "mint", "lav"][i % 3]});opacity:${rnd(.25, .6)}"><i class="${frame ? "frm" : ""}" style="--d:${rnd(5, 11)}s;--dl:-${rnd(0, 6)}s;--x:${rnd(-50, 50)}px;--rot:${rnd(-25, 25)}deg">${frame ? "" : sym[i % sym.length]}</i></div>`);
  }
  const fl = $("#float"), nav = $("#nav"); let px = 0, py = 0, mx = 0, tick = false;
  addEventListener("pointermove", e => {      // dibatasi 1x per frame supaya ringan
    px = e.clientX; py = e.clientY;
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      fl.style.setProperty("--px", px / innerWidth - .5);
      fl.style.setProperty("--py", py / innerHeight - .5);
      nav.style.setProperty("--mx", (px - nav.getBoundingClientRect().left) + "px");
      tick = false;
    });
  }, { passive: true });
})();

/* ---------- beranda ---------- */
$("#sekolah").textContent = KELAS.sekolah;
$("#thn").textContent = new Date().getFullYear();
(() => {
  let k = 0; const t = $("#typed"); t.textContent = KELAS.frasa[0];
  setInterval(() => { t.style.opacity = 0; setTimeout(() => { k = (k + 1) % KELAS.frasa.length; t.textContent = KELAS.frasa[k]; t.style.opacity = 1; }, 400); }, 3400);
  const hari = Math.max(0, Math.floor((Date.now() - new Date(KELAS.mulai)) / 864e5));
  const st = [[KELAS.siswa.length, "siswa"], [KELAS.wali.length, "wali kelas"], [3, "tahun"], [hari, "hari sejak hari pertama"]];
  $("#stats").innerHTML = st.map(s => `<div><b data-n="${s[0]}">0</b><small>${s[1]}</small></div>`).join("");
  $$("#stats b").forEach(b => { const n = +b.dataset.n, t0 = performance.now(); (function f(t) { const p = Math.min(1, (t - t0) / 1600); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); });
  const H = KELAS.hero || [];   // foto polaroid beranda: atur di data.js bagian "hero"
  $("#stack").innerHTML = H.map((h, i) => `<div class="pol" style="--r:${[-9, -3, 4, 10, -6, 7][i % 6]}">${img(h.foto, h.cap, i + 20)}${h.cap}</div>`).join("");
})();

/* ---------- konfeti ---------- */
function confetti() {
  const c = ["#f0c79b", "#c4a8ff", "#9ad9cf", "#ff7a9c", "#fff"];
  for (let i = 0; i < 60; i++) {
    const s = document.createElement("i"); s.className = "cf";
    s.style.cssText = `left:${rnd(0, 100)}vw;background:${c[i % 5]};animation-delay:${rnd(0, .6)}s;animation-duration:${rnd(1.8, 3)}s;border-radius:${i % 2 ? "50%" : "2px"}`;
    document.body.append(s); setTimeout(() => s.remove(), 4000);
  }
}
$("#kejutan").onclick = () => { confetti(); const s = KELAS.siswa[Math.random() * 40 | 0]; openModal(KELAS.siswa.indexOf(s)); };

/* ---------- wali kelas ---------- */
$("#waliGrid").innerHTML = KELAS.wali.map((w, i) => `<article class="flip" tabindex="0" role="button" aria-label="Balik kartu ${w.nama}"><div class="in"><div class="front glass">${img(w.foto, w.nama, i + 90)}<h3>${w.nama}</h3><p>${w.peran} · ${w.mapel}</p></div><div class="back glass"><p>“${w.pesan}”</p><small>Ketuk untuk kembali</small></div></div></article>`).join("");
$$(".flip").forEach(f => { f.onclick = () => f.classList.toggle("on"); f.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f.click(); } }; });

/* ---------- siswa ---------- */
const S = KELAS.siswa; let fav = new Set(load("favG", [])), onlyFav = false, urut = [...S.keys()], cur = 0;
function renderS() {
  const q = $("#cari").value.toLowerCase();
  const l = urut.filter(i => S[i].nama.toLowerCase().includes(q) && (!onlyFav || fav.has(i)));
  $("#siswaGrid").innerHTML = l.map(i => `<button class="sis glass" data-i="${i}">${img(S[i].foto, S[i].nama, i)}<b>${S[i].nama}</b><i class="heart ${fav.has(i) ? "on" : ""}" data-h="${i}">♥</i></button>`).join("") || `<p class="kosong">Tidak ada yang cocok. Coba nama lain.</p>`;
}
$("#siswaGrid").onclick = e => {
  const h = e.target.closest("[data-h]"), b = e.target.closest(".sis");
  if (h) { e.stopPropagation(); const i = +h.dataset.h; fav.has(i) ? fav.delete(i) : fav.add(i); save("favG", [...fav]); h.classList.toggle("on"); if (onlyFav) renderS(); }
  else if (b) openModal(+b.dataset.i);
};
$("#cari").oninput = renderS;
$("#acak").onclick = () => { urut.sort(() => Math.random() - .5); renderS(); };
$("#favOnly").onclick = e => { onlyFav = !onlyFav; e.target.classList.toggle("on", onlyFav); renderS(); };
function openModal(i) {
  cur = (i + S.length) % S.length; const s = S[cur];
  $("#mBody").innerHTML = `<div class="mrow">${img(s.foto, s.nama, cur)}<div><h3>${s.nama}</h3><p>Absen ${cur + 1}</p><q>${s.kata}</q></div></div>`;
  if (!$("#modal").open) $("#modal").showModal();
}
$("#modal").onclick = e => { if (e.target === e.currentTarget || e.target.dataset.x !== undefined) e.currentTarget.close(); const d = e.target.dataset.d; if (d) openModal(cur + +d); };
renderS();

/* ---------- tebak siapa ---------- */
let qs = 0, qt = 0;
function quiz() {
  const a = Math.random() * S.length | 0, o = new Set([a]); while (o.size < 4) o.add(Math.random() * S.length | 0);
  $("#qFoto").innerHTML = img(S[a].foto, "?", a, "Foto siswa yang harus ditebak");
  $("#qOpt").innerHTML = [...o].sort(() => Math.random() - .5).map(i => `<button data-i="${i}">${S[i].nama}</button>`).join("");
  $("#qOpt").onclick = e => {
    const b = e.target.closest("button"); if (!b || b.disabled) return;
    const ok = +b.dataset.i === a; qt++; if (ok) { qs++; confetti(); }
    $$("#qOpt button").forEach(x => { x.disabled = true; if (+x.dataset.i === a) x.classList.add("ok"); });
    if (!ok) b.classList.add("no");
    $("#qSkor").textContent = `Skor ${qs}/${qt}`; setTimeout(quiz, 1400);
  };
}
quiz();

/* ---------- galeri + lightbox ---------- */
let gi = 0, items = [], li = 0, show = null;
$("#tabs").innerHTML = KELAS.galeri.map((g, i) => `<button class="chip" data-t="${i}">${g.label} · ${g.momen.length}</button>`).join("");
function tab(i) {
  gi = i; const g = KELAS.galeri[i];
  $$("#tabs .chip").forEach((c, k) => c.classList.toggle("on", k === i));
  items = g.momen.map((m, k) => ({ src: `img/galeri/${g.kode}-${k + 1}.jpg`, cap: `${g.label} · ${m}`, k }));
  $("#masonry").innerHTML = items.map((it, k) => `<figure data-k="${k}">${img(it.src, it.cap, k + i * 8 + 5)}<figcaption>${it.cap}</figcaption></figure>`).join("");
}
$("#tabs").onclick = e => { const b = e.target.closest("[data-t]"); if (b) tab(+b.dataset.t); };
$("#masonry").onclick = e => { const f = e.target.closest("figure"); if (f) openLb(+f.dataset.k); };
function openLb(k) {
  li = (k + items.length) % items.length; const it = items[li];
  $("#lbBody").innerHTML = `${img(it.src, it.cap, li + gi * 8 + 5)}<p>${it.cap}</p>`;
  if (!$("#lb").open) $("#lb").showModal();
}
function stopShow() { clearInterval(show); show = null; $("#slide").textContent = "▶ Slideshow"; }
$("#lb").onclick = e => { if (e.target === e.currentTarget || e.target.dataset.x !== undefined) e.currentTarget.close(); const d = e.target.dataset.l; if (d) openLb(li + +d); };
$("#lb").onclose = stopShow;
$("#slide").onclick = () => { if (show) return stopShow(); $("#slide").textContent = "⏸ Jeda"; show = setInterval(() => openLb(li + 1), 2800); };
addEventListener("keydown", e => { if ($("#lb").open) { if (e.key === "ArrowRight") openLb(li + 1); if (e.key === "ArrowLeft") openLb(li - 1); } else if ($("#modal").open) { if (e.key === "ArrowRight") openModal(cur + 1); if (e.key === "ArrowLeft") openModal(cur - 1); } });
tab(0);

/* ---------- linimasa ---------- */
$("#tl").innerHTML = KELAS.linimasa.map(m => `<article class="glass"><small>${m.t}</small><h3>${m.j}</h3><p>${m.i}</p></article>`).join("");

/* ---------- pemutar musik ---------- */
const T = KELAS.lagu, au = new Audio(); au.volume = .7;
let ti = 0, playing = false, shuf = false, fake = false, tick = 0, ctx, master, sy;
const fmt = s => isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
$("#viz").innerHTML = "<i></i>".repeat(28);
$("#plist").innerHTML = T.map((t, i) => `<li data-i="${i}">${t.judul} — ${t.artis}</li>`).join("");
function ui() {
  $("#pp").textContent = playing ? "⏸" : "▶"; $("#navMusik").classList.toggle("on", playing);
  document.body.classList.toggle("main", playing);
}
function synth() {      // melodi bawaan bila file mp3 belum ditaruh
  clearInterval(sy); ctx = ctx || new AudioContext(); ctx.resume();
  if (!master) { master = ctx.createGain(); master.connect(ctx.destination); }
  master.gain.value = au.volume * .5;
  const sc = [0, 2, 4, 7, 9, 12, 9, 7], root = [261.6, 293.7, 329.6][ti % 3]; let k = 0;
  sy = setInterval(() => {
    const f = root * 2 ** (sc[(k * 3 + (k >> 2)) % 8] / 12), o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime; k++;
    o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.0001, n);
    g.gain.exponentialRampToValueAtTime(.45, n + .05); g.gain.exponentialRampToValueAtTime(.0001, n + 1.2);
    o.connect(g); g.connect(master); o.start(); o.stop(n + 1.3);
  }, 420);
}
function useFake() { fake = true; if (playing) synth(); }
function play() { playing = true; ui(); fake ? synth() : au.play().catch(useFake); }
function pause() { playing = false; ui(); au.pause(); clearInterval(sy); }
function setTrack(i) {
  ti = (i + T.length) % T.length; fake = false; tick = 0; clearInterval(sy); au.src = T[ti].file;
  $("#jdl").textContent = T[ti].judul; $("#art").textContent = T[ti].artis;
  $$("#plist li").forEach((l, k) => l.classList.toggle("on", k === ti)); if (playing) play();
}
const next = () => setTrack(shuf ? Math.random() * T.length | 0 : ti + 1);
au.onerror = () => { if (!fake) useFake(); }; au.onended = next;
$("#pp").onclick = () => playing ? pause() : play();
$("#navMusik").onclick = $("#pp").onclick;
$("#next").onclick = next; $("#prev").onclick = () => setTrack(ti - 1);
$("#shuf").onclick = e => { shuf = !shuf; e.currentTarget.classList.toggle("on", shuf); };
$("#plist").onclick = e => { const l = e.target.closest("li"); if (l) { playing = true; setTrack(+l.dataset.i); } };
$("#vol").oninput = e => { au.volume = +e.target.value; if (master) master.gain.value = au.volume * .5; };
$("#prog").onclick = e => { const r = e.offsetX / e.currentTarget.clientWidth; fake ? tick = r * 120 : au.currentTime = r * (au.duration || 0); };
setInterval(() => {
  if (!playing) return $$("#viz i").forEach(b => b.style.transform = "scaleY(.13)");
  let c, d; if (fake) { tick += .25; c = tick; d = 120; if (tick >= d) next(); } else { c = au.currentTime; d = au.duration; }
  $("#fill").style.width = (d ? c / d * 100 : 0) + "%"; $("#cur").textContent = fmt(c); $("#dur").textContent = fmt(d);
  $$("#viz i").forEach(b => b.style.transform = `scaleY(${rnd(.13, 1)})`);
}, 250);
setTrack(0);

/* ---------- buku kenangan ---------- */
let notes = load("pesanG", [{ n: "Kelas G", m: "Tulis pesan pertamamu di sini. Pesan tersimpan di peramban ini." }]);
function renderN() {
  $("#pList").innerHTML = notes.map((p, i) => `<div class="note glass"><button data-del="${i}" aria-label="Hapus pesan">×</button><p>“${p.m}”</p><small>${p.n}</small></div>`).join("");
}
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
$("#form").onsubmit = e => { e.preventDefault(); notes.unshift({ n: esc($("#pNama").value.trim()), m: esc($("#pIsi").value.trim()) }); save("pesanG", notes); renderN(); e.target.reset(); confetti(); };
$("#pList").onclick = e => { const d = e.target.dataset.del; if (d !== undefined) { notes.splice(+d, 1); save("pesanG", notes); renderN(); } };
renderN();

/* ---------- navigasi, tema, progres ---------- */
const links = $$(".links a"), pill = $(".pill");
function movePill(a) { pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px"; a.scrollIntoView({ inline: "center", block: "nearest" }); }
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { const a = links.find(l => l.hash === "#" + en.target.id); if (a) movePill(a); } }), { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach(s => io.observe(s));
addEventListener("load", () => movePill(links[0]));
addEventListener("scroll", () => {
  const h = document.documentElement; $("#bar").style.width = scrollY / (h.scrollHeight - innerHeight) * 100 + "%";
  $("#top").classList.toggle("show", scrollY > 600);
}, { passive: true });
$("#top").onclick = () => scrollTo({ top: 0 });
const tm = load("temaG", "gelap"); document.documentElement.dataset.tema = tm;
$("#tema").onclick = () => { const t = document.documentElement.dataset.tema === "gelap" ? "terang" : "gelap"; document.documentElement.dataset.tema = t; save("temaG", t); };