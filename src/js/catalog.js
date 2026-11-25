import { initialProducts } from "../data/mockData.js";

const PRODUCTS_KEY = "surfskate_products";
const CART_KEY = "surfskate_cart";

function loadProducts() {
  const saved = localStorage.getItem(PRODUCTS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialProducts;
    }
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  return initialProducts;
}

function addToCart(product) {
  const rawCart = localStorage.getItem(CART_KEY);
  const cart = rawCart ? JSON.parse(rawCart) : [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
    } else {
      alert("No hay más stock disponible para este producto.");
      return;
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert(`"${product.name}" agregado al carrito.`);
}

function renderCatalog(products) {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  if (!products.length) {
    grid.innerHTML = `<p>No se encontraron productos con esos filtros.</p>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (item) => `
      <article class="card">
        <img src="${item.imageUrl}" alt="${item.name}" />
        <div>
          <small>${item.brand} • ${item.sport}</small>
          <h3>${item.name}</h3>
          <p>${item.specs}</p>
          <p><strong>$${item.price}</strong> — Stock: ${item.stock}</p>
        </div>
        <button
          type="button"
          class="btn-primary"
          data-id="${item.id}"
          ${item.stock <= 0 ? "disabled" : ""}
        >
          ${item.stock > 0 ? "Agregar al carrito" : "Agotado"}
        </button>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = products.find((p) => p.id === btn.dataset.id);
      if (selected) addToCart(selected);
    });
  });
}

function initCatalog() {
  const allProducts = loadProducts();
  const searchInput = document.getElementById("search-input");
  const sportFilter = document.getElementById("sport-filter");
  const maxPriceFilter = document.getElementById("max-price-filter");

  const applyFilters = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const sport = sportFilter?.value || "";
    const maxPrice = parseFloat(maxPriceFilter?.value);

    const filtered = allProducts.filter((item) => {
      const matchesText =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query);
      const matchesSport = !sport || item.sport === sport;
      const matchesPrice = Number.isNaN(maxPrice) || item.price <= maxPrice;
      return matchesText && matchesSport && matchesPrice;
    });

    renderCatalog(filtered);
  };

  searchInput?.addEventListener("input", applyFilters);
  sportFilter?.addEventListener("change", applyFilters);
  maxPriceFilter?.addEventListener("input", applyFilters);

  renderCatalog(allProducts);
}

initCatalog();