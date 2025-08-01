document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (selector, path) => {
    const el = document.querySelector(selector);
    if (el) {
      try {
        const res = await fetch(path);
        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        el.innerHTML = "<p>Помилка завантаження</p>";
      }
    }
  };

  loadComponent("#site-header", "components/header.html");
  loadComponent("#site-footer", "components/footer.html");

  const loadPage = async () => {
    const hash = window.location.hash || "#home";
    const page = hash.replace("#", "");
    const path = `pages/${page}.html`;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("Not found");
      const html = await res.text();
      document.querySelector("#page-content").innerHTML = html;
    } catch (err) {
      document.querySelector("#page-content").innerHTML =
        "<p>Page Not Found :(</p>";
    }
  };

  loadPage();

  window.addEventListener("hashchange", loadPage);
});
