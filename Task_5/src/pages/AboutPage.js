import { createElement } from '../utils/dom.js';
import { products, categories } from '../data/products.js';

export function AboutPage() {
  const catCount = categories.length - 1;

  return createElement('div', { className: 'page about-page' }, [
    createElement('div', { className: 'page-header' }, [
      createElement('h1', {}, ['About Thiranex Shop']),
      createElement('p', {}, ['A capstone project demonstrating full-stack web development skills.']),
    ]),
    createElement('div', { className: 'about-content' }, [
      createElement('section', { className: 'about-section' }, [
        createElement('h2', {}, ['Our Mission']),
        createElement('p', {}, [
          'Thiranex Shop is a modern e-commerce product catalog built as a web development capstone. It showcases modular architecture, client-side routing, state management, and production-ready deployment.',
        ]),
      ]),
      createElement('section', { className: 'about-section' }, [
        createElement('h2', {}, ['Technical Highlights']),
        createElement('ul', { className: 'tech-list' }, [
          createElement('li', {}, ['Modular ES module architecture with reusable components']),
          createElement('li', {}, ['History API–based client-side router with dynamic routes']),
          createElement('li', {}, ['Persistent cart state with localStorage']),
          createElement('li', {}, ['Vite build pipeline with minified, optimized assets']),
          createElement('li', {}, ['Responsive design with lazy-loaded WebP images']),
          createElement('li', {}, ['Deployed to a modern hosting platform with SPA routing']),
        ]),
      ]),
      createElement('section', { className: 'about-section stats-bar' }, [
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, [String(products.length)]),
          createElement('span', {}, ['Products']),
        ]),
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, [String(catCount)]),
          createElement('span', {}, ['Categories']),
        ]),
        createElement('div', { className: 'stat' }, [
          createElement('strong', {}, ['100%']),
          createElement('span', {}, ['Client-Side']),
        ]),
      ]),
      createElement('a', { href: '/products', 'data-link': '', className: 'btn btn-primary btn-lg' }, [
        'Start Shopping',
      ]),
    ]),
  ]);
}
