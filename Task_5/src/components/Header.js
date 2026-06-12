import { createElement } from '../utils/dom.js';
import { getCartCount, subscribe } from '../state/cart.js';

export function Header() {
  const cartBadge = createElement('span', { className: 'cart-badge', id: 'cart-badge' }, [
    String(getCartCount()),
  ]);

  const nav = createElement('nav', { className: 'nav' }, [
    createElement('a', { href: '/', 'data-link': '', className: 'nav-link' }, ['Home']),
    createElement('a', { href: '/products', 'data-link': '', className: 'nav-link' }, ['Products']),
    createElement('a', { href: '/about', 'data-link': '', className: 'nav-link' }, ['About']),
    createElement('a', { href: '/cart', 'data-link': '', className: 'nav-link cart-link' }, [
      'Cart ',
      cartBadge,
    ]),
  ]);

  const header = createElement('header', { className: 'site-header' }, [
    createElement('a', { href: '/', 'data-link': '', className: 'logo' }, [
      createElement('span', { className: 'logo-icon' }, ['🛍️']),
      ' Thiranex Shop',
    ]),
    nav,
  ]);

  subscribe(({ count }) => {
    const badge = header.querySelector('#cart-badge');
    if (badge) {
      badge.textContent = String(count);
      badge.classList.toggle('hidden', count === 0);
    }
  });

  return header;
}
