import { createElement, formatPrice, renderStars } from '../utils/dom.js';
import { getProductById } from '../data/products.js';
import { addToCart } from '../state/cart.js';

export function ProductDetailPage({ id }) {
  const product = getProductById(id);

  if (!product) {
    return createElement('div', { className: 'page empty-state' }, [
      createElement('h1', {}, ['Product Not Found']),
      createElement('p', {}, ['The product you\'re looking for doesn\'t exist.']),
      createElement('a', { href: '/products', 'data-link': '', className: 'btn btn-primary' }, [
        'Back to Products',
      ]),
    ]);
  }

  const container = createElement('div', { className: 'page product-detail-page' }, [
    createElement('a', { href: '/products', 'data-link': '', className: 'back-link' }, ['← Back to Products']),
    createElement('div', { className: 'product-detail' }, [
      createElement('div', { className: 'product-detail-image' }, [
        product.badge ? createElement('span', { className: 'product-badge' }, [product.badge]) : null,
        createElement('img', {
          src: product.image,
          alt: product.name,
          width: '600',
          height: '600',
        }),
      ]),
      createElement('div', { className: 'product-detail-info' }, [
        createElement('span', { className: 'product-category' }, [product.category]),
        createElement('h1', {}, [product.name]),
        createElement('div', { className: 'product-rating-lg' }, [
          renderStars(product.rating),
          ` ${product.rating} / 5`,
        ]),
        createElement('p', { className: 'product-price-lg' }, [formatPrice(product.price)]),
        createElement('p', { className: 'product-description' }, [product.description]),
        createElement('div', { className: 'quantity-row' }, [
          createElement('label', { for: 'qty-input' }, ['Quantity']),
          createElement('input', {
            type: 'number',
            id: 'qty-input',
            min: '1',
            max: '99',
            value: '1',
          }),
        ]),
        createElement(
          'button',
          {
            className: 'btn btn-primary btn-lg',
            id: 'add-to-cart-btn',
            type: 'button',
          },
          ['Add to Cart']
        ),
      ]),
    ]),
  ]);

  requestAnimationFrame(() => {
    const btn = container.querySelector('#add-to-cart-btn');
    const qtyInput = container.querySelector('#qty-input');

    btn?.addEventListener('click', () => {
      const qty = Math.max(1, parseInt(qtyInput?.value ?? '1', 10) || 1);
      addToCart(product.id, qty);
      btn.textContent = `Added ${qty} to Cart ✓`;
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
      }, 1500);
    });
  });

  return container;
}
