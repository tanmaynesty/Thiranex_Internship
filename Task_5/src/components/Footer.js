import { createElement } from '../utils/dom.js';

export function Footer() {
  return createElement('footer', { className: 'site-footer' }, [
    createElement('div', { className: 'footer-inner' }, [
      createElement('div', { className: 'footer-brand' }, [
        createElement('strong', {}, ['Thiranex Shop']),
        createElement('p', {}, ['Quality products, curated for you.']),
      ]),
      createElement('div', { className: 'footer-links' }, [
        createElement('a', { href: '/products', 'data-link': '' }, ['Browse Products']),
        createElement('a', { href: '/about', 'data-link': '' }, ['About Us']),
        createElement('a', { href: '/cart', 'data-link': '' }, ['Your Cart']),
      ]),
      createElement('p', { className: 'footer-copy' }, [
        `© ${new Date().getFullYear()} Thiranex Shop. Capstone Project.`,
      ]),
    ]),
  ]);
}
