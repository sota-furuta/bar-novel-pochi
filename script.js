// BAR NOVEL — bootstrap-design ブランチ（ポチ版フォーマット: 素のJS）

// ---------- アコーディオン（同時に開くのは1つだけ） ----------
const panelBtns = document.querySelectorAll("[data-panel-btn]");

function setPanel(id, open) {
  const btn = document.querySelector(`[data-panel-btn="${id}"]`);
  const body = document.querySelector(`[data-panel="${id}"]`);
  const panel = btn.closest(".panel");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  btn.classList.toggle("is-open", open);
  body.classList.toggle("is-open", open);
  panel.classList.toggle("is-open", open);
  if (open) {
    // 開いたら見出しが見える位置に軽くスクロール
    setTimeout(() => {
      const rect = panel.getBoundingClientRect();
      if (rect.top < 0) {
        window.scrollTo({ top: window.scrollY + rect.top - 84, behavior: "smooth" });
      }
    }, 480);
  }
}

function togglePanel(id) {
  const isOpen = document.querySelector(`[data-panel="${id}"]`).classList.contains("is-open");
  panelBtns.forEach((b) => setPanel(b.dataset.panelBtn, false));
  if (!isOpen) setPanel(id, true);
}

panelBtns.forEach((btn) => {
  btn.addEventListener("click", () => togglePanel(btn.dataset.panelBtn));
});

// ---------- ナビ: 押したら対象パネルを開く ----------
document.querySelectorAll("[data-open-panel]").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.openPanel;
    panelBtns.forEach((b) => setPanel(b.dataset.panelBtn, false));
    setPanel(id, true);
  });
});

// ハンバーガー（現デザインでは常時表示のため未使用だが、将来用に配線だけ残す）
const navToggle = document.getElementById("navToggle");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// ---------- メニュー: DRINK / FOOD タブ ----------
document.querySelectorAll("[data-menutab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-menutab]").forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    document.querySelectorAll("[data-menupane]").forEach((p) => {
      p.hidden = p.dataset.menupane !== tab.dataset.menutab;
    });
  });
});

// ---------- ギャラリー スライダー ----------
const track = document.getElementById("sliderTrack");
const slides = track.children.length;
const dotsWrap = document.getElementById("sliderDots");
let current = 0;
let timer = null;

for (let i = 0; i < slides; i++) {
  const d = document.createElement("button");
  d.type = "button";
  d.setAttribute("aria-label", `写真${i + 1}へ`);
  if (i === 0) d.classList.add("is-active");
  d.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(d);
}

function goTo(i) {
  current = (i + slides) % slides;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsWrap.querySelectorAll("button").forEach((d, j) => {
    d.classList.toggle("is-active", j === current);
  });
  restartAuto();
}

function restartAuto() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 10000);
}

document.getElementById("sliderPrev").addEventListener("click", () => goTo(current - 1));
document.getElementById("sliderNext").addEventListener("click", () => goTo(current + 1));
restartAuto();

// ---------- トップへ戻る ----------
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
