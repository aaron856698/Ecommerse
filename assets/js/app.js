// Sample product catalog (AI placeholder images)
let PRODUCTS = [
  {
    id: 'rem-001',
    title: 'Remera Blanca',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/remera blanca.png'
  },
  {
    id: 'rem-002',
    title: 'Remera Negra',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/remera negra.png'
  },
  {
    id: 'rem-003',
    title: 'Remera Verde Manzana',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/verde manzana.png'
  },
  {
    id: 'rem-004',
    title: 'Remera Azul Clásico',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/azul clasico.png'
  },
  {
    id: 'rem-005',
    title: 'Remera Azul Marino',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/azul marino.png'
  },
  {
    id: 'rem-006',
    title: 'Remera Azul',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/azul.png'
  },
  {
    id: 'rem-007',
    title: 'Remera Gris Claro',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/gris claro.png'
  },
  {
    id: 'rem-008',
    title: 'Remera Gris Topo',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/gris topo.png'
  },
  {
    id: 'rem-009',
    title: 'Remera Verde Manzana',
    description: 'Remera unisex 100% algodón peinado 24/1. Suave y respirable.',
    price: 8000,
    category: 'remeras',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'assets/imagenes/verde manzana.png'
  },
  {
    id: 'gor-001',
    title: 'Gorra Azul Clásica',
    description: 'Gorra ajustable, diseño clásico. Ajuste cómodo y duradero.',
    price: 7500,
    category: 'gorras',
    sizes: ['Única'],
    image: 'assets/gorritas-img/gorra azul clasica.png'
  },
  {
    id: 'gor-002',
    title: 'Gorra Blanca Trucker',
    description: 'Gorra trucker estilo clásico. Panel frontal rígido, parte trasera ajustable.',
    price: 6000,
    category: 'gorras',
    sizes: ['Única'],
    image: 'assets/gorritas-img/gorra blanca.png'
  },
  {
    id: 'gor-003',
    title: 'Gorra Negra Trucker',
    description: 'Gorra trucker estilo clásico. Panel frontal rígido, parte trasera ajustable.',
    price: 6000,
    category: 'gorras',
    sizes: ['Única'],
    image: 'assets/gorritas-img/gorra negra .png'
  },
  {
    id: 'gor-004',
    title: 'Gorra Roja',
    description: 'Gorra ajustable, diseño moderno. Ajuste cómodo y duradero.',
    price: 10000,
    category: 'gorras',
    sizes: ['Única'],
    image: 'assets/gorritas-img/gorra roja.png'
  },
  {
    id: 'gor-005',
    title: 'Gorra Trucker Azul',
    description: 'Gorra trucker estilo clásico. Panel frontal rígido, parte trasera ajustable.',
    price: 6000,
    category: 'gorras',
    sizes: ['Única'],
    image: 'assets/gorritas-img/gorra trucker azul.png'
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

const IMAGE_FALLBACK = {
  remeras: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=60',
  shorts: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=60',
  pantalones: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=60',
  default: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=60'
};

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function computeSubtotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

function computeBulkDiscount(items) {
  // Separar remeras y gorras
  const remerasItems = items.filter(it => it.id && it.id.startsWith('rem-'));
  const gorrasItems = items.filter(it => it.id && it.id.startsWith('gor-'));
  
  const remerasQty = remerasItems.reduce((q, it) => q + it.quantity, 0);
  const gorrasQty = gorrasItems.reduce((q, it) => q + it.quantity, 0);
  
  const remerasSubtotal = remerasItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const gorrasSubtotal = gorrasItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  
  let rate = 0;
  let label = '';
  let amount = 0;
  
  // Descuento para REMERAS (precio fijo)
  if (remerasQty === 2) {
    const precioNormal = 16000; // 2 × 8000
    const precioPromocional = 15000;
    if (remerasSubtotal >= precioNormal) {
      amount = precioNormal - precioPromocional; // $1.000
      rate = 0.0625; // 6.25%
      label = `6.25% OFF (2 remeras) - Ahorro: $${formatPrice(amount)}`;
    }
  } else if (remerasQty === 3) {
    const precioNormal = 24000; // 3 × 8000
    const precioPromocional = 21000;
    if (remerasSubtotal >= precioNormal) {
      amount = precioNormal - precioPromocional; // $3.000
      rate = 0.125; // 12.5%
      label = `12.5% OFF (3 remeras) - Ahorro: $${formatPrice(amount)}`;
    }
  }
  
  // Descuento para GORRAS (porcentaje por cantidad)
  let gorrasDiscount = 0;
  let gorrasLabel = '';
  
  if (gorrasQty === 2) {
    // 2 gorras → 6.25% de descuento
    gorrasDiscount = gorrasSubtotal * 0.0625;
    gorrasLabel = `6.25% OFF (2 gorras) - Ahorro: $${formatPrice(gorrasDiscount)}`;
  } else if (gorrasQty === 3) {
    // 3 gorras → 12.5% de descuento
    gorrasDiscount = gorrasSubtotal * 0.125;
    gorrasLabel = `12.5% OFF (3 gorras) - Ahorro: $${formatPrice(gorrasDiscount)}`;
  }
  
  // Combinar descuentos si hay ambos
  if (remerasQty > 0 && gorrasQty > 0) {
    const totalDiscount = amount + gorrasDiscount;
    const totalSubtotal = remerasSubtotal + gorrasSubtotal;
    if (totalDiscount > 0) {
      amount = totalDiscount;
      rate = amount / totalSubtotal;
      const porcentaje = Math.round(rate * 100 * 10) / 10;
      label = `${porcentaje}% OFF (${remerasQty} remera${remerasQty > 1 ? 's' : ''}, ${gorrasQty} gorra${gorrasQty > 1 ? 's' : ''}) - Ahorro: $${formatPrice(amount)}`;
    }
  } else if (gorrasQty > 0 && gorrasDiscount > 0) {
    // Solo gorras con descuento
    amount = gorrasDiscount;
    rate = amount / gorrasSubtotal;
    label = gorrasLabel;
  }
  // Si solo hay remeras, el descuento ya está calculado arriba
  
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
  const count = cart.reduce((acc, it) => acc + it.quantity, 0);
  const badges = Array.from(document.querySelectorAll('#cartBadge, .cart-badge'));
  badges.forEach(b => { if (b) b.textContent = String(count); });
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
    ${discount.amount > 0 ? `<div><span class="discount-pill">${discount.label}</span> <b>- $${formatPrice(discount.amount)}</b></div>` : ''}
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
  // Si no hay tamaño pero el producto tiene solo un tamaño, usarlo automáticamente
  if (!size && product && product.sizes && product.sizes.length === 1) {
    size = product.sizes[0];
  }
  
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
    const totalItems = cart.reduce((acc, it) => acc + it.quantity, 0);
    const remerasQty = cart.filter(it => it.id && it.id.startsWith('rem-')).reduce((q, it) => q + it.quantity, 0);
    const gorrasQty = cart.filter(it => it.id && it.id.startsWith('gor-')).reduce((q, it) => q + it.quantity, 0);
    
    let extra = '';
    if (d.amount > 0) {
      const total = computeSubtotal(cart) - d.amount;
      extra = `
        <br><br>
        <div class="text-center">
          <div class="small text-muted">Se aplicó descuento:</div>
          <div class="fw-bold text-success">${d.label}</div>
          <div class="small mt-2">Total en carrito: <span class="fw-bold">$${formatPrice(total)}</span></div>
        </div>
      `;
    } else {
      extra = `<br><small>Total en carrito: <b>${totalItems}</b> ítem(s)</small>`;
    }
    
    Swal.fire({
      title: 'Agregado al carrito',
      html: `${product.title} - Talla <b>${size}</b> x${quantity}${extra}`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }
}

// Product grid
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col';
  col.innerHTML = `
    <div class="card product-card h-100 d-flex flex-column">
      <img src="${product.image}" class="card-img-top product-thumb" alt="${product.title}" data-open-modal="${product.id}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK[product.category]||IMAGE_FALLBACK.default}'">
      <div class="card-body d-flex flex-column flex-grow-0">
        <h3 class="h6 card-title mb-2">${product.title}</h3>
        <div class="h5 mb-2">$${formatPrice(product.price)}</div>
        <button class="btn btn-outline-primary w-100 mt-auto" data-open-modal="${product.id}">Ver detalles</button>
      </div>
    </div>
  `;
  return col;
}

function renderGrid(items) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  if (!items.length) {
    const col = document.createElement('div');
    col.className = 'col-12';
    col.innerHTML = '<div class="p-4 text-center border rounded-3 bg-white">No se encontraron productos</div>';
    grid.appendChild(col);
    return;
  }
  items.forEach((p) => grid.appendChild(createProductCard(p)));
}

function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    console.error('Producto no encontrado:', productId);
    return;
  }
  
  currentProduct = product;
  selectedSize = null;
  
  // Verificar que los elementos del modal existan
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  const qtyInput = document.getElementById('qtyInput');
  const modalDiscount = document.getElementById('modalDiscount');
  const sizesWrap = document.getElementById('modalSizes');
  
  if (!modalImage || !modalTitle || !modalDescription || !modalPrice || !qtyInput || !sizesWrap) {
    console.error('Elementos del modal no encontrados');
    return;
  }
  
  modalImage.src = product.image;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatPrice(product.price);
  qtyInput.value = 1;
  if (modalDiscount) modalDiscount.style.display = 'none';

  sizesWrap.innerHTML = '';
  
  // Si solo hay un tamaño, seleccionarlo automáticamente ANTES de crear los botones
  if (product.sizes.length === 1) {
    selectedSize = product.sizes[0];
  }
  
  product.sizes.forEach((s) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary btn-sm';
    btn.textContent = s;
    
    // Si este es el tamaño seleccionado automáticamente, marcarlo como activo
    if (s === selectedSize) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      selectedSize = s;
      [...sizesWrap.children].forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
    });
    sizesWrap.appendChild(btn);
  });

  const modalElement = document.getElementById('productModal');
  if (!modalElement) {
    console.error('Modal no encontrado');
    return;
  }
  
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
  
  // Actualizar precio inicial
  updateModalPrice();

  // Inject Product JSON-LD for SEO
  try {
    const existing = document.getElementById('jsonld-product');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-product';
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.image,
      brand: { '@type': 'Brand', name: 'BA Style' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'ARS',
        price: String(product.price),
        availability: 'https://schema.org/InStock'
      }
    };
    script.textContent = JSON.stringify(data);
    document.body.appendChild(script);
  } catch (_) { /* ignore */ }
}

function updateModalPrice() {
  if (!currentProduct) return;
  
  const qty = Math.max(1, Number(document.getElementById('qtyInput').value || 1));
  const priceEl = document.getElementById('modalPrice');
  const discountEl = document.getElementById('modalDiscount');
  
  // Calcular precio total
  const totalPrice = currentProduct.price * qty;
  priceEl.textContent = formatPrice(totalPrice);
  
  // Verificar si es una remera o gorra y calcular descuento
  if (currentProduct.id && (currentProduct.id.startsWith('rem-') || currentProduct.id.startsWith('gor-'))) {
    // Simular carrito temporal para calcular descuento
    const tempCart = [{
      id: currentProduct.id,
      price: currentProduct.price,
      quantity: qty
    }];
    const discount = computeBulkDiscount(tempCart);
    
    if (discount.amount > 0) {
      const finalPrice = totalPrice - discount.amount;
      discountEl.style.display = 'block';
      discountEl.innerHTML = `
        <div class="text-success fw-semibold">
          <span class="discount-pill">${discount.label}</span>
        </div>
        <div class="text-muted small">Precio final: <span class="fw-bold text-dark">$${formatPrice(finalPrice)}</span></div>
      `;
    } else {
      discountEl.style.display = 'none';
    }
  } else {
    discountEl.style.display = 'none';
  }
}

// Search and filters
function applySearch(term) {
  const t = normalize(term);
  if (!t) { renderGrid(PRODUCTS); return; }
  // Mapear búsquedas por categoría
  if (/(^|\s)(remera|remeras)(\s|$)/.test(t)) {
    // Navegar al catálogo de remeras
    window.location.href = 'catalog.html?cat=remeras';
    return;
  }
  if (/(^|\s)(short|shorts)(\s|$)/.test(t)) {
    window.location.href = 'catalog.html?cat=shorts';
    return;
  }
  if (/(^|\s)(pantalon|pantalones)(\s|$)/.test(t)) {
    window.location.href = 'catalog.html?cat=pantalones';
    return;
  }
  if (/(^|\s)(oferta|ofertas)(\s|$)/.test(t)) {
    window.location.href = 'catalog.html?cat=ofertas';
    return;
  }
  // Búsqueda por texto en título/descripcion
  const filtered = PRODUCTS.filter((p) =>
    normalize(p.title).includes(t) || normalize(p.description).includes(t)
  );
  renderGrid(filtered);
}

// Events
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  // Try load from products.json
  fetch('products.json').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
    if (Array.isArray(data) && data.length) {
      PRODUCTS = data;
    }
    try { window.PRODUCTS_READY = true; window.dispatchEvent(new Event('productsReady')); } catch(_){}
    if (!window.CATALOG_FILTER_MODE) {
      // Separar remeras y gorras
      const remeras = PRODUCTS.filter(p => p.category === 'remeras');
      const gorras = PRODUCTS.filter(p => p.category === 'gorras');
      
      // Renderizar remeras en la sección principal
      let limit = 8;
      try {
        const w = window.innerWidth;
        if (w < 768) limit = 4;          // mobile
        else if (w < 1200) limit = 6;    // tablet
        else limit = 8;                  // desktop
      } catch(_){}
      
      const remerasToShow = window.HOME_TOP4 ? remeras.slice(0, limit) : remeras;
      renderGrid(remerasToShow);
      
      // Mostrar botón "Ver más" solo en móvil si hay más remeras que el límite
      const verMasBtn = document.getElementById('verMasRemeras');
      const btnVerMas = document.getElementById('btnVerMasRemeras');
      if (verMasBtn && btnVerMas && window.HOME_TOP4 && remeras.length > limit) {
        try {
          const w = window.innerWidth;
          if (w < 768) {
            verMasBtn.style.display = 'block';
            btnVerMas.addEventListener('click', () => {
              renderGrid(remeras);
              verMasBtn.style.display = 'none';
            });
          }
        } catch(_){}
      }
      
      // Renderizar gorras en su sección
      if (gorras.length > 0) {
        const gorrasGrid = document.getElementById('gorrasGrid');
        if (gorrasGrid) {
          gorrasGrid.innerHTML = '';
          gorras.forEach((p) => gorrasGrid.appendChild(createProductCard(p)));
          
          // Agregar imagen de gorras juntas al final (ocupa espacio de 3 cards)
          const imageCol = document.createElement('div');
          imageCol.className = 'col-12 col-md-9 col-lg-9';
          imageCol.innerHTML = `
            <div class="card product-card h-100" style="border: 1px solid #dfd3bf; background: var(--paper); padding: 0; margin: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <img src="assets/imagenes/gorras juntas.png" alt="Gorras" style="width: 100%; height: 100%; object-fit: contain; display: block; padding: 10px;">
            </div>
          `;
          gorrasGrid.appendChild(imageCol);
        }
      }
    }
  }).catch(()=>{
    try { window.PRODUCTS_READY = true; window.dispatchEvent(new Event('productsReady')); } catch(_){}
    if (!window.CATALOG_FILTER_MODE) {
      // Separar remeras y gorras
      const remeras = PRODUCTS.filter(p => p.category === 'remeras');
      const gorras = PRODUCTS.filter(p => p.category === 'gorras');
      
      // Renderizar remeras en la sección principal
      let limit = 8;
      try {
        const w = window.innerWidth;
        if (w < 768) limit = 4; else if (w < 1200) limit = 6; else limit = 8;
      } catch(_){}
      
      const remerasToShow = window.HOME_TOP4 ? remeras.slice(0, limit) : remeras;
      renderGrid(remerasToShow);
      
      // Mostrar botón "Ver más" solo en móvil si hay más remeras que el límite
      const verMasBtn = document.getElementById('verMasRemeras');
      const btnVerMas = document.getElementById('btnVerMasRemeras');
      if (verMasBtn && btnVerMas && window.HOME_TOP4 && remeras.length > limit) {
        try {
          const w = window.innerWidth;
          if (w < 768) {
            verMasBtn.style.display = 'block';
            btnVerMas.addEventListener('click', () => {
              renderGrid(remeras);
              verMasBtn.style.display = 'none';
            });
          }
        } catch(_){}
      }
      
      // Renderizar gorras en su sección
      if (gorras.length > 0) {
        const gorrasGrid = document.getElementById('gorrasGrid');
        if (gorrasGrid) {
          gorrasGrid.innerHTML = '';
          gorras.forEach((p) => gorrasGrid.appendChild(createProductCard(p)));
          
          // Agregar imagen de gorras juntas al final (ocupa espacio de 3 cards)
          const imageCol = document.createElement('div');
          imageCol.className = 'col-12 col-md-9 col-lg-9';
          imageCol.innerHTML = `
            <div class="card product-card h-100" style="border: 1px solid #dfd3bf; background: var(--paper); padding: 0; margin: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <img src="assets/imagenes/gorras juntas.png" alt="Gorras" style="width: 100%; height: 100%; object-fit: contain; display: block; padding: 10px;">
            </div>
          `;
          gorrasGrid.appendChild(imageCol);
        }
      }
    }
  });
  renderCart();

  // Newsletter y Opiniones eliminados a pedido (sección quitada)

  // Delegate open modal from any product grid (remeras y gorras)
  function setupModalDelegate(gridId) {
    const grid = document.getElementById(gridId);
    if (grid) {
      grid.addEventListener('click', (e) => {
        const target = e.target.closest('[data-open-modal]');
        if (!target) return;
        const id = target.getAttribute('data-open-modal');
        openProductModal(id);
      });
    }
  }
  
  setupModalDelegate('productsGrid');
  setupModalDelegate('gorrasGrid');

  // Quantity controls in modal
  document.getElementById('qtyMinus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    const v = Math.max(1, Number(input.value) - 1);
    input.value = v;
    updateModalPrice();
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    input.value = Number(input.value) + 1;
    updateModalPrice();
  });
  
  // También actualizar cuando cambia el input directamente
  document.getElementById('qtyInput').addEventListener('input', () => {
    updateModalPrice();
  });

  // Add to cart from modal
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const qty = Math.max(1, Number(document.getElementById('qtyInput').value || 1));
    // Si no hay tamaño seleccionado pero el producto tiene solo un tamaño, usarlo
    if (!selectedSize && currentProduct && currentProduct.sizes && currentProduct.sizes.length === 1) {
      selectedSize = currentProduct.sizes[0];
    }
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
    if (action === 'del') {
      const removed = cart[index];
      cart.splice(index, 1);
      if (window.Swal) {
        Swal.fire({
          title: 'Compra cancelada',
          text: removed ? `${removed.title} eliminado del carrito` : 'Producto eliminado del carrito',
          icon: 'info',
          timer: 1400,
          showConfirmButton: false
        });
      }
    }
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
  const categoriasEl = document.getElementById('categorias');
  if (categoriasEl) {
    categoriasEl.addEventListener('click', (e) => {
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
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

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


