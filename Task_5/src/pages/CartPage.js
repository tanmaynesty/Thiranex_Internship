import { createElement, formatPrice } from '../utils/dom.js';
import { products } from '../data/products.js';
import {
  getCartItems,
  getCartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../state/cart.js';

export function CartPage() {
  const cartItems = getCartItems();
  const entries = Object.entries(cartItems);

  if (entries.length === 0) {
    return createElement('div', { className: 'page cart-page' }, [
      createElement('div', { className: 'page-header' }, [
        createElement('h1', {}, ['Your Cart']),
      ]),
      createElement('div', { className: 'empty-state cart-empty' }, [
        createElement('span', { className: 'empty-icon' }, ['🛒']),
        createElement('h2', {}, ['Your cart is empty']),
        createElement('p', {}, ['Add some products to get started.']),
        createElement('a', { href: '/products', 'data-link': '', className: 'btn btn-primary' }, [
          'Browse Products',
        ]),
      ]),
    ]);
  }

  const total = getCartTotal(products);

  const container = createElement('div', { className: 'page cart-page' }, [
    createElement('div', { className: 'page-header' }, [
      createElement('h1', {}, ['Your Cart']),
      createElement('p', {}, [`${entries.length} item${entries.length !== 1 ? 's' : ''} in cart`]),
    ]),
    createElement('div', { className: 'cart-layout' }, [
      createElement(
        'div',
        { className: 'cart-items', id: 'cart-items-list' },
        entries.map(([id, qty]) => buildCartItem(id, qty))
      ),
      createElement('aside', { className: 'cart-summary' }, [
        createElement('h2', {}, ['Order Summary']),
        createElement('div', { className: 'summary-row' }, [
          createElement('span', {}, ['Subtotal']),
          createElement('strong', { id: 'cart-subtotal' }, [formatPrice(total)]),
        ]),
        createElement('div', { className: 'summary-row' }, [
          createElement('span', {}, ['Shipping']),
          createElement('strong', {}, [total >= 50 ? 'Free' : formatPrice(5.99)]),
        ]),
        createElement('div', { className: 'summary-row summary-total' }, [
          createElement('span', {}, ['Total']),
          createElement('strong', { id: 'cart-total' }, [
            formatPrice(total + (total >= 50 ? 0 : 5.99)),
          ]),
        ]),
        createElement('button', { className: 'btn btn-primary btn-lg btn-block', type: 'button' }, [
          'Proceed to Checkout',
        ]),
        createElement('button', {
          className: 'btn btn-ghost btn-block',
          id: 'clear-cart-btn',
          type: 'button',
        }, ['Clear Cart']),
      ]),
    ]),
  ]);

  requestAnimationFrame(() => {
    bindCartEvents(container);
  });

  return container;
}

function buildCartItem(id, qty) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  return createElement('article', { className: 'cart-item', dataset: { id } }, [
    createElement('img', {
      src: product.image,
      alt: product.name,
      loading: 'lazy',
      width: '80',
      height: '80',
    }),
    createElement('div', { className: 'cart-item-info' }, [
      createElement('a', {
        href: `/product/${product.id}`,
        'data-link': '',
        className: 'cart-item-name',
      }, [product.name]),
      createElement('span', { className: 'cart-item-price' }, [formatPrice(product.price)]),
    ]),
    createElement('div', { className: 'cart-item-actions' }, [
      createElement('button', { className: 'qty-btn', dataset: { action: 'decrease' }, type: 'button' }, ['−']),
      createElement('span', { className: 'qty-value' }, [String(qty)]),
      createElement('button', { className: 'qty-btn', dataset: { action: 'increase' }, type: 'button' }, ['+']),
      createElement('button', { className: 'remove-btn', dataset: { action: 'remove' }, type: 'button' }, ['Remove']),
    ]),
    createElement('strong', { className: 'cart-item-total' }, [formatPrice(product.price * qty)]),
  ]);
}

function bindCartEvents(container) {
  container.querySelector('#cart-items-list')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const item = btn.closest('.cart-item');
    const id = item?.dataset.id;
    if (!id) return;

    const qtyEl = item.querySelector('.qty-value');
    let qty = parseInt(qtyEl?.textContent ?? '1', 10);

    if (btn.dataset.action === 'increase') {
      updateQuantity(id, qty + 1);
    } else if (btn.dataset.action === 'decrease') {
      updateQuantity(id, qty - 1);
    } else if (btn.dataset.action === 'remove') {
      removeFromCart(id);
    }

    refreshCartPage(container);
  });

  container.querySelector('#clear-cart-btn')?.addEventListener('click', () => {
    clearCart();
    refreshCartPage(container);
  });
}

function refreshCartPage(container) {
  const outlet = document.getElementById('page-content');
  if (outlet) {
    outlet.innerHTML = '';
    outlet.appendChild(CartPage());
  }
}
