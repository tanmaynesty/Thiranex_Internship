import { createElement, formatPrice, renderStars } from '../utils/dom.js';
import { addToCart } from '../state/cart.js';

export function ProductCard(product) {
  const card = createElement('article', { className: 'product-card' }, [
    createElement('a', { href: `/product/${product.id}`, 'data-link': '', className: 'product-card-link' }, [
      createElement('div', { className: 'product-image-wrap' }, [
        product.badge
          ? createElement('span', { className: 'product-badge' }, [product.badge])
          : null,
        createElement('img', {
          src: product.image,
          alt: product.name,
          loading: 'lazy',
          width: '400',
          height: '400',
        }),
      ]),
      createElement('div', { className: 'product-info' }, [
        createElement('span', { className: 'product-category' }, [product.category]),
        createElement('h3', { className: 'product-name' }, [product.name]),
        createElement('div', { className: 'product-meta' }, [
          createElement('span', { className: 'product-rating', title: `${product.rating} stars` }, [
            renderStars(product.rating),
            ` ${product.rating}`,
          ]),
          createElement('span', { className: 'product-price' }, [formatPrice(product.price)]),
        ]),
      ]),
    ]),
    createElement(
      'button',
      {
        className: 'btn btn-primary btn-add-cart',
        type: 'button',
        onClick: (e) => {
          e.preventDefault();
          addToCart(product.id);
          const btn = e.currentTarget;
          btn.textContent = 'Added ✓';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.disabled = false;
          }, 1200);
        },
      },
      ['Add to Cart']
    ),
  ]);

  return card;
}

export function ProductGrid(products) {
  if (products.length === 0) {
    return createElement('div', { className: 'empty-state' }, [
      createElement('p', {}, ['No products found. Try a different search or filter.']),
    ]);
  }

  return createElement(
    'div',
    { className: 'product-grid' },
    products.map((p) => ProductCard(p))
  );
}
