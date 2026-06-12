const listeners = new Set();

const cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem('thiranex-cart');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function persistCart() {
  localStorage.setItem('thiranex-cart', JSON.stringify(cart));
}

function notify() {
  listeners.forEach((fn) => fn(getCartSummary()));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getCartItems() {
  return { ...cart };
}

export function getCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function getCartTotal(products) {
  return Object.entries(cart).reduce((total, [id, qty]) => {
    const product = products.find((p) => p.id === id);
    return total + (product ? product.price * qty : 0);
  }, 0);
}

export function getCartSummary() {
  return { items: getCartItems(), count: getCartCount() };
}

export function addToCart(productId, quantity = 1) {
  cart[productId] = (cart[productId] ?? 0) + quantity;
  persistCart();
  notify();
}

export function removeFromCart(productId) {
  delete cart[productId];
  persistCart();
  notify();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  cart[productId] = quantity;
  persistCart();
  notify();
}

export function clearCart() {
  Object.keys(cart).forEach((key) => delete cart[key]);
  persistCart();
  notify();
}
