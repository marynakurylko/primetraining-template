document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (selector, path) => {
    const el = document.querySelector(selector);
    if (el) {
      try {
        const res = await fetch(path);
        const html = await res.text();
        el.innerHTML = html;
        if (selector === "#site-modal") {
          initModal();
        }
      } catch (err) {
        el.innerHTML = "<p>ERROR</p>";
      }
    }
  };

  loadComponent("#site-header", "components/header.html");
  loadComponent("#site-footer", "components/footer.html");
  loadComponent("#site-modal", "components/modal-reserve.html");

  const initFadeIn = () => {
    const fadeBlocks = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeBlocks.forEach((block) => observer.observe(block));
  };

  const loadPage = async () => {
    const hash = window.location.hash || "#home";
    const page = hash.replace("#", "");
    const path = `pages/${page}.html`;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("Not found");
      const html = await res.text();
      document.querySelector("#page-content").innerHTML = html;

      initFadeIn();
      initModal();
    } catch (err) {
      document.querySelector("#page-content").innerHTML =
        "<p>Page Not Found :(</p>";
    }
  };

  loadPage();

  window.addEventListener("hashchange", loadPage);
});

// ===== MODAL LOGIC =====
function initModal() {
  const modal = document.getElementById("reserve-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".close");
  const openBtns = document.querySelectorAll(".open-reserve");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("11111");
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}
