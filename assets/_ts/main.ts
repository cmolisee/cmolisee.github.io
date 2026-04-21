type themeType = "dark" | "light";

const html = document.documentElement;

function applyTheme(theme: themeType): void {
  const func = theme === "dark" ? "add" : "remove";
  html.classList[func]("dark");
  localStorage.setItem("mode", theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme: themeType): void {
  document.querySelectorAll("[data-icon-sun]").forEach((el) => {
    el.classList.toggle("hidden", theme !== "dark");
  });
  document.querySelectorAll("[data-icon-moon]").forEach((el) => {
    el.classList.toggle("hidden", theme === "dark");
  });
}

function resolvedTheme(): themeType {
  const stored = localStorage.getItem("mode");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const openBtn = document.getElementById("sidebar-open");
  const closeBtn = document.getElementById("sidebar-close");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  if (!sidebar) return;

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = html.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
    });
  });

  function openSidebar(): void {
    if (!sidebar) return;
    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    openBtn?.setAttribute("aria-expanded", "true");
  }

  function closeSidebar(): void {
    if (!sidebar) return;
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    openBtn?.setAttribute("aria-expanded", "false");
  }

  openBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);

  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) {
      closeSidebar();
      document.body.classList.remove("overflow-hidden");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")?.replace(/\/$/, "");
    if (href && (currentPath === href || currentPath.startsWith(href + "/"))) {
      link.classList.add("active");
    }
  });
});

applyTheme(resolvedTheme());
