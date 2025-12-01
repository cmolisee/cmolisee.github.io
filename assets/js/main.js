const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebar-toggle-mobile');
const sidebarUnderlay = document.getElementById('sidebar-underlay');

function toggleMobileSidebar(event) {
  toggle.toggleAttribute('aria-expanded');
  sidebar.toggleAttribute('aria-hidden');
  sidebarUnderlay.classList.toggle('hidden');
}

function initMobileSidebar() {
  toggle.addEventListener('click', toggleMobileSidebar);
}


initMobileSidebar();
