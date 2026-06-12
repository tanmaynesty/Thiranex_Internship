import { createElement } from '../utils/dom.js';
import { products } from '../data/products.js';
import { ProductGrid } from '../components/ProductCard.js';

export function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const fallback = products.slice(0, 4);
  const displayProducts = featured.length >= 4 ? featured : fallback;

  return createElement('div', { className: 'page home-page' }, [
    createElement('section', { className: 'hero' }, [
      createElement('div', { className: 'hero-content' }, [
        createElement('span', { className: 'hero-tag' }, ['New Collection 2026']),
        createElement('h1', {}, ['Discover Products You\'ll Love']),
        createElement('p', { className: 'hero-subtitle' }, [
          'Browse our curated catalog of electronics, clothing, home goods, and accessories — all in one place.',
        ]),
        createElement('div', { className: 'hero-actions' }, [
          createElement('a', { href: '/products', 'data-link': '', className: 'btn btn-primary btn-lg' }, [
            'Shop Now',
          ]),
          createElement('a', { href: '/about', 'data-link': '', className: 'btn btn-outline btn-lg' }, [
            'Learn More',
          ]),
        ]),
      ]),
      createElement('div', { className: 'hero-stats' }, [
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, [String(products.length)]),
          createElement('span', {}, ['Products']),
        ]),
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, ['4.7']),
          createElement('span', {}, ['Avg Rating']),
        ]),
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, ['Free']),
          createElement('span', {}, ['Shipping $50+']),
        ]),
      ]),
    ]),
    createElement('section', { className: 'section' }, [
      createElement('div', { className: 'section-header' }, [
        createElement('h2', {}, ['Featured Products']),
        createElement('a', { href: '/products', 'data-link': '', className: 'link-arrow' }, [
          'View all →',
        ]),
      ]),
      ProductGrid(displayProducts),
    ]),
    createElement('section', { className: 'section features-section' }, [
      createElement('h2', {}, ['Why Shop With Us']),
      createElement('div', { className: 'features-grid' }, [
        createElement('div', { className: 'feature-card' }, [
          createElement('span', { className: 'feature-icon' }, ['🚚']),
          createElement('h3', {}, ['Fast Delivery']),
          createElement('p', {}, ['Free shipping on orders over $50.']),
        ]),
        createElement('div', { className: 'feature-card' }, [
          createElement('span', { className: 'feature-icon' }, ['🔒']),
          createElement('h3', {}, ['Secure Checkout']),
          createElement('p', {}, ['Your data is protected with industry-standard encryption.']),
        ]),
        createElement('div', { className: 'feature-card' }, [
          createElement('span', { className: 'feature-icon' }, ['↩️']),
          createElement('h3', {}, ['Easy Returns']),
          createElement('p', {}, ['30-day hassle-free return policy on all items.']),
        ]),
      ]),
    ]),
  ]);
}
