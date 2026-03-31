const html = document.documentElement;

/**
 * Apply theme to <html> element and persist to localStorage.
 * @param {"dark"|"light"} theme
 */
function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem("mode", theme);
  updateThemeIcons(theme);
}

/** Sync the sun/moon icon visibility with the current theme. */
function updateThemeIcons(theme) {
  document.querySelectorAll("[data-icon-sun]").forEach((el) => {
    el.classList.toggle("hidden", theme !== "dark");
  });
  document.querySelectorAll("[data-icon-moon]").forEach((el) => {
    el.classList.toggle("hidden", theme === "dark");
  });
}

/** Return the resolved theme from storage or system preference. */
function resolvedTheme() {
  const stored = localStorage.getItem("mode");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Initialise — must run before paint to avoid flash
(function initTheme() {
  applyTheme(resolvedTheme());
})();

document.addEventListener("DOMContentLoaded", () => {
  // Bind toggle buttons
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = html.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
    });
  });

  /* ── 2. Mobile Sidebar ──────────────────────────────────────────────────── */

  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const openBtn = document.getElementById("sidebar-open");
  const closeBtn = document.getElementById("sidebar-close");

  if (!sidebar) {
    return;
  }

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    openBtn?.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    openBtn?.setAttribute("aria-expanded", "false");
  }

  openBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);

  // Close sidebar when viewport goes to desktop
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) {
      closeSidebar();
      document.body.classList.remove("overflow-hidden");
    }
  });

  /* ── 3. Active Nav Link ─────────────────────────────────────────────────── */

  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")?.replace(/\/$/, "");
    if (href && (currentPath === href || currentPath.startsWith(href + "/"))) {
      link.classList.add("active");
    }
  });
});
