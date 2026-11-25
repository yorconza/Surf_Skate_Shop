const SESSION_KEY = "surfskate_session";

export function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
}

function getBasePrefix() {
  return window.location.pathname.includes("/pages/") ? ".." : ".";
}

export function renderNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  const prefix = getBasePrefix();
  const user = getCurrentUser();

  const adminLinks =
    user?.role === "admin"
      ? `
        <a href="${prefix}/pages/crud-boards.html">CRUD Tablas</a>
        <a href="${prefix}/pages/crud-apparel.html">CRUD Ropa/Calzado</a>
        <a href="${prefix}/pages/crud-brands.html">CRUD Marcas</a>
        <a href="${prefix}/pages/crud-users.html">Clientes</a>
        <a href="${prefix}/pages/reports.html">Reportes</a>
      `
      : "";

  const authLinks = user
    ? `
      <a href="${prefix}/pages/profile.html">${user.name || "Perfil"}</a>
      <button type="button" id="btn-logout">Salir</button>
    `
    : `
      <a href="${prefix}/pages/login.html">Iniciar sesión</a>
      <a href="${prefix}/pages/register.html">Registrarse</a>
    `;

  container.innerHTML = `
    <nav class="navbar">
      <div class="nav-links">
        <a href="${prefix}/index.html"><strong>Surf &amp; Skate Shop</strong></a>
        <a href="${prefix}/pages/cart.html">Carrito</a>
        ${adminLinks}
        <a href="${prefix}/pages/about.html">Acerca de</a>
      </div>
      <div class="nav-links">
        ${authLinks}
      </div>
    </nav>
  `;

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setCurrentUser(null);
      window.location.href = `${prefix}/index.html`;
    });
  }
}

renderNavbar();