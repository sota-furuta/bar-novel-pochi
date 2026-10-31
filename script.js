// BAR NOVEL — pochi edition

// ヘッダー: スクロールで背景を濃くする
const header = document.getElementById("siteHeader");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// メニュー: DRINK / FOOD タブ切り替え
const tabs = document.querySelectorAll(".menu-tab");
const panels = document.querySelectorAll(".menu-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    panels.forEach((p) => {
      const active = p.dataset.panel === tab.dataset.tab;
      p.classList.toggle("is-active", active);
      p.hidden = !active;
    });
  });
});

// セクション: スクロールでふわっと表示
const revealTargets = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-shown");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-shown"));
}
