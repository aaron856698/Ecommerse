// Sample product catalog (AI placeholder images)
const PRODUCTS = [
  {
    id: 'rem-001',
    title: 'Remera BA Street Blanca',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 17990,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/rem-001/800/600'
  },
  {
    id: 'rem-002',
    title: 'Remera Oversize Negra',
    description: 'Corte oversize, tela pesada premium. Ideal para streetwear.',
    price: 21990,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/rem-002/800/600'
  },
  {
    id: 'rem-003',
    title: 'Remera Logo BA Style',
    description: 'Estampa frontal BA Style en serigrafía premium.',
    price: 19990,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/rem-003/800/600'
  },
  {
    id: 'sho-101',
    title: 'Short Runner Gris',
    description: 'Short deportivo liviano con bolsillos. Secado rápido.',
    price: 14990,
    category: 'shorts',
    sizes: ['S', 'M', 'L'],
    image: 'https://picsum.photos/seed/sho-101/800/600'
  },
  {
    id: 'sho-102',
    title: 'Short Cargo Verde',
    description: 'Cargo urbano con múltiples bolsillos y ajuste elástico.',
    price: 23990,
    category: 'shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/sho-102/800/600'
  },
  {
    id: 'pan-201',
    title: 'Pantalón Jogger Negro',
    description: 'Jogger urbano con puño elastizado y ajuste en cintura.',
    price: 28990,
    category: 'pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/pan-201/800/600'
  },
  {
    id: 'pan-202',
    title: 'Pantalón Cargo Arena',
    description: 'Cargo cómodo con bolsillos laterales, ideal para street.',
    price: 31990,
    category: 'pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/pan-202/800/600'
  }
];

// Config
const WHATSAPP_PHONE = '5491112345678'; // Reemplazar por tu número

// State
let cart = loadCart();
let currentProduct = null;
let selectedSize = null;

// Helpers
function formatPrice(n) {
  return new Intl.NumberFormat('es-AR').format(n);
}

function computeSubtotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

function computeBulkDiscount(items) {
  const qty = items.reduce((q, it) => q + it.quantity, 0);
  const subtotal = computeSubtotal(items);
  let rate = 0;
  let label = '';
  if (qty >= 4) { rate = 0.35; label = '35% OFF llevando 4+'; }
  else if (qty === 3) { rate = 0.25; label = '25% OFF llevando 3'; }
  else if (qty === 2) { rate = 0.15; label = '15% OFF llevando 2'; }
  const amount = Math.round(subtotal * rate);
  return { rate, amount, label };
}

function saveCart() {
  localStorage.setItem('ba_style_cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const raw = localStorage.getItem('ba_style_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = cart.reduce((acc, it) => acc + it.quantity, 0);
  badge.textContent = String(count);
}

function renderCart() {
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  list.innerHTML = '';
  cart.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'd-flex align-items-center gap-3 p-2 border rounded-3 bg-white';
    row.innerHTML = `
      <img class="cart-thumb" src="${item.image}" alt="${item.title}">
      <div class="flex-grow-1">
        <div class="fw-semibold">${item.title}</div>
        <div class="small text-muted">Talla: ${item.size}</div>
        <div class="small">$${formatPrice(item.price)} x ${item.quantity}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary" data-action="dec" data-index="${idx}">-</button>
        <span class="min-w-40 text-center">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary" data-action="inc" data-index="${idx}">+</button>
        <button class="btn btn-sm btn-outline-danger" data-action="del" data-index="${idx}"><i class="bi bi-trash"></i></button>
      </div>
    `;
    list.appendChild(row);
  });
  const subtotal = computeSubtotal(cart);
  const discount = computeBulkDiscount(cart);
  const total = Math.max(0, subtotal - discount.amount);
  const summary = document.createElement('div');
  summary.className = 'cart-summary mb-2';
  summary.innerHTML = `
    <div><b>Subtotal:</b> $${formatPrice(subtotal)}</div>
    ${discount.amount ? `<div><span class="discount-pill">${discount.label}</span> <b>- $${formatPrice(discount.amount)}</b></div>` : ''}
  `;
  list.prepend(summary);
  totalEl.textContent = formatPrice(total);
  updateCartBadge();
}

function buildWhatsappMessage() {
  let lines = [];
  lines.push('Hola! Quiero hacer un pedido en BA Style');
  lines.push('');
  if (!cart.length) {
    lines.push('(Carrito vacío)');
  } else {
    lines.push('Pedido:');
    cart.forEach((it, i) => {
      const sub = it.price * it.quantity;
      lines.push(`${i + 1}. ${it.title} - Talla ${it.size} x${it.quantity} - $${formatPrice(sub)}`);
    });
    const subtotal = computeSubtotal(cart);
    const discount = computeBulkDiscount(cart);
    const total = Math.max(0, subtotal - discount.amount);
    lines.push('');
    lines.push(`Subtotal: $${formatPrice(subtotal)}`);
    if (discount.amount) lines.push(`Descuento ${discount.label}: -$${formatPrice(discount.amount)}`);
    lines.push(`Total: $${formatPrice(total)}`);
  }
  lines.push('');
  lines.push('Punto de encuentro: La Plata y alrededores.');
  return lines.join('\n');
}

function addToCart(product, size, quantity) {
  if (!size) {
    if (window.Swal) {
      Swal.fire({
        title: 'Elegí un talle',
        text: 'Seleccioná la talla antes de agregar al carrito',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
    }
    return;
  }
  const existing = cart.find((it) => it.id === product.id && it.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size,
      quantity
    });
  }
  saveCart();
  renderCart();
  if (window.Swal) {
    const d = computeBulkDiscount(cart);
    const extra = d.amount ? `<br><small>Se aplicó <b>${d.label}</b></small>` : '';
    Swal.fire({
      title: 'Agregado al carrito',
      html: `${product.title} - Talla <b>${size}</b>${extra}`,
      icon: 'success',
      timer: 1600,
      showConfirmButton: false
    });
  }
}

// Product grid
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col';
  col.innerHTML = `
    <div class="card product-card h-100">
      <img src="${product.image}" class="card-img-top product-thumb" alt="${product.title}" data-open-modal="${product.id}">
      <div class="card-body d-flex flex-column">
        <h3 class="h6 card-title">${product.title}</h3>
        <div class="mt-auto">
          <div class="h5 mb-2">$${formatPrice(product.price)}</div>
          <button class="btn btn-outline-primary w-100" data-open-modal="${product.id}">Ver detalles</button>
        </div>
      </div>
    </div>
  `;
  return col;
}

function renderGrid(items) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  items.forEach((p) => grid.appendChild(createProductCard(p)));
}

function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  currentProduct = product;
  selectedSize = null;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = formatPrice(product.price);
  document.getElementById('qtyInput').value = 1;

  const sizesWrap = document.getElementById('modalSizes');
  sizesWrap.innerHTML = '';
  product.sizes.forEach((s) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary btn-sm';
    btn.textContent = s;
    btn.addEventListener('click', () => {
      selectedSize = s;
      [...sizesWrap.children].forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
    });
    sizesWrap.appendChild(btn);
  });

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

// Search and filters
function applySearch(term) {
  const t = term.trim().toLowerCase();
  if (!t) { renderGrid(PRODUCTS); return; }
  const filtered = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(t) || p.description.toLowerCase().includes(t)
  );
  renderGrid(filtered);
}

// Events
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderGrid(PRODUCTS);
  renderCart();

  // Delegate open modal from grid
  document.getElementById('productsGrid').addEventListener('click', (e) => {
    const target = e.target.closest('[data-open-modal]');
    if (!target) return;
    const id = target.getAttribute('data-open-modal');
    openProductModal(id);
  });

  // Quantity controls in modal
  document.getElementById('qtyMinus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    const v = Math.max(1, Number(input.value) - 1);
    input.value = v;
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    input.value = Number(input.value) + 1;
  });

  // Add to cart from modal
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const qty = Math.max(1, Number(document.getElementById('qtyInput').value || 1));
    addToCart(currentProduct, selectedSize, qty);
  });

  // Cart actions
  document.getElementById('cartItems').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const index = Number(btn.getAttribute('data-index'));
    if (Number.isNaN(index)) return;
    if (action === 'inc') cart[index].quantity += 1;
    if (action === 'dec') cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    if (action === 'del') cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  // Checkout simple handler
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!cart.length) {
      if (window.Swal) Swal.fire({ title: 'Carrito vacío', text: 'Agregá productos para continuar', icon: 'info' });
      return;
    }
    const msg = encodeURIComponent(buildWhatsappMessage());
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
    window.open(url, '_blank');
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  document.getElementById('searchBtn').addEventListener('click', () => applySearch(searchInput.value));
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') applySearch(searchInput.value); });

  // Categories
  document.getElementById('categorias').addEventListener('click', (e) => {
    const link = e.target.closest('[data-category]');
    if (!link) return;
    const cat = link.getAttribute('data-category');
    // actualizar querystring
    const url = new URL(window.location.href);
    url.searchParams.set('cat', cat);
    history.replaceState(null, '', url.toString());

    if (cat === 'ofertas') {
      renderGrid(PRODUCTS.filter((p) => p.price <= 20000));
    } else if (cat === 'novedades') {
      renderGrid([...PRODUCTS].reverse());
    } else {
      renderGrid(PRODUCTS.filter((p) => p.category === cat));
    }
    // Scroll a grilla
    const section = document.getElementById('mas-vendidos');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // aplicar filtro inicial por querystring
  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get('cat');
  if (initialCat) {
    const evt = new Event('click');
    // render según categoría inicial sin animación
    if (initialCat === 'ofertas') {
      renderGrid(PRODUCTS.filter((p) => p.price <= 20000));
    } else if (initialCat === 'novedades') {
      renderGrid([...PRODUCTS].reverse());
    } else if (['remeras', 'shorts'].includes(initialCat)) {
      renderGrid(PRODUCTS.filter((p) => p.category === initialCat));
    }
    document.getElementById('mas-vendidos').scrollIntoView({ behavior: 'instant', block: 'start' });
  }
});


