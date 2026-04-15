/* sidebar.js - injeta a sidebar em todas as páginas */

function renderSidebar(activePage) {
    const usuarioId = localStorage.getItem('usuarioId');

    const html = `
<aside class="sidebar">
<div class="sidebar-logo">
<img src="../img/logo-senac.png" alt="Senac TaskFlow">
</div>
 
      <span class="sidebar-label">Menu</span>
 
      <nav class="sidebar-nav">
<a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
<rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
</svg>
          Dashboard
</a>
<a href="index.html" class="nav-item ${activePage === 'tarefas' ? 'active' : ''}">
<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
<line x1="8" y1="18" x2="21" y2="18"/>
<line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
<line x1="3" y1="18" x2="3.01" y2="18"/>
</svg>
          Tarefas
</a>
</nav>
 
      <div class="sidebar-footer">
<div class="sidebar-avatar">U</div>
<div class="sidebar-user-info">
<div class="sidebar-user-name">Usuário</div>
<div class="sidebar-user-role">TaskFlow</div>
</div>
<button class="btn-logout" onclick="logout()" title="Sair">
<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
<polyline points="16 17 21 12 16 7"/>
<line x1="21" y1="12" x2="9" y2="12"/>
</svg>
</button>
</div>
</aside>
  `;

    document.body.insertAdjacentHTML('afterbegin', html);
    document.body.classList.add('has-sidebar');
}

function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'login.html';
}