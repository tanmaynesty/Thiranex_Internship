import { createElement } from '../utils/dom.js';
import { categories, getProductsByCategory, searchProducts } from '../data/products.js';
import { ProductGrid } from '../components/ProductCard.js';

export function ProductsPage(_params, search) {
  const params = new URLSearchParams(search);
  const category = params.get('category') ?? 'all';
  const query = params.get('q') ?? '';

  let filtered = getProductsByCategory(category);
  if (query) {
    const searched = searchProducts(query);
    const ids = new Set(searched.map((p) => p.id));
    filtered = filtered.filter((p) => ids.has(p.id));
  }

  const container = createElement('div', { className: 'page products-page' }, [
    createElement('div', { className: 'page-header' }, [
      createElement('h1', {}, ['Product Catalog']),
      createElement('p', {}, [`Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`]),
    ]),
    createElement('div', { className: 'products-toolbar' }, [
      createElement('div', { className: 'search-bar' }, [
        createElement('input', {
          type: 'search',
          id: 'product-search',
          placeholder: 'Search products…',
          value: query,
          'aria-label': 'Search products',
        }),
      ]),
      createElement(
        'div',
        { className: 'category-filters' },
        categories.map((cat) =>
          createElement(
            'button',
            {
              className: `filter-btn${cat.id === category ? ' active' : ''}`,
              type: 'button',
              dataset: { category: cat.id },
            },
            [cat.label]
          )
        )
      ),
    ]),
    createElement('div', { id: 'products-grid-container' }, [ProductGrid(filtered)]),
  ]);

  requestAnimationFrame(() => {
    const searchInput = container.querySelector('#product-search');
    const gridContainer = container.querySelector('#products-grid-container');

    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value;
      const activeCat =
        container.querySelector('.filter-btn.active')?.dataset.category ?? 'all';
      updateUrl(q, activeCat);
      renderGrid(q, activeCat);
    });

    container.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const q = searchInput?.value ?? '';
        updateUrl(q, btn.dataset.category);
        renderGrid(q, btn.dataset.category);
      });
    });

    function updateUrl(q, cat) {
      const url = new URL(window.location);
      if (q) url.searchParams.set('q', q);
      else url.searchParams.delete('q');
      if (cat && cat !== 'all') url.searchParams.set('category', cat);
      else url.searchParams.delete('category');
      history.replaceState(null, '', url);
    }

    function renderGrid(q, cat) {
      let items = getProductsByCategory(cat);
      if (q) {
        const searched = searchProducts(q);
        const ids = new Set(searched.map((p) => p.id));
        items = items.filter((p) => ids.has(p.id));
      }
      gridContainer.innerHTML = '';
      gridContainer.appendChild(ProductGrid(items));
    }
  });

  return container;
}
