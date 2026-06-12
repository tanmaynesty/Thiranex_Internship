export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'home', label: 'Home & Living' },
  { id: 'accessories', label: 'Accessories' },
];

export const products = [
  {
    id: 'p1',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'electronics',
    price: 249.99,
    rating: 4.8,
    badge: 'Best Seller',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.',
    image: '/images/headphones.svg',
  },
  {
    id: 'p2',
    name: 'Smart Fitness Watch',
    category: 'electronics',
    price: 179.99,
    rating: 4.6,
    badge: 'New',
    description:
      'Track workouts, heart rate, sleep, and notifications with a vibrant AMOLED display and 7-day battery.',
    image: '/images/watch.svg',
  },
  {
    id: 'p3',
    name: 'Minimalist Leather Backpack',
    category: 'accessories',
    price: 89.99,
    rating: 4.7,
    badge: null,
    description:
      'Handcrafted full-grain leather backpack with padded laptop sleeve and water-resistant lining.',
    image: '/images/backpack.svg',
  },
  {
    id: 'p4',
    name: 'Organic Cotton T-Shirt',
    category: 'clothing',
    price: 34.99,
    rating: 4.5,
    badge: 'Eco',
    description:
      'Soft, breathable organic cotton tee with a relaxed fit. Available in multiple colors.',
    image: '/images/tshirt.svg',
  },
  {
    id: 'p5',
    name: 'Ceramic Pour-Over Coffee Set',
    category: 'home',
    price: 54.99,
    rating: 4.9,
    badge: 'Top Rated',
    description:
      'Artisan ceramic dripper, glass carafe, and reusable filter for the perfect morning brew.',
    image: '/images/coffee.svg',
  },
  {
    id: 'p6',
    name: 'Portable Bluetooth Speaker',
    category: 'electronics',
    price: 69.99,
    rating: 4.4,
    badge: null,
    description:
      'Compact waterproof speaker with 360° sound, 12-hour playtime, and built-in microphone.',
    image: '/images/speaker.svg',
  },
  {
    id: 'p7',
    name: 'Linen Blend Summer Dress',
    category: 'clothing',
    price: 79.99,
    rating: 4.3,
    badge: null,
    description:
      'Lightweight linen-cotton blend dress with adjustable straps. Perfect for warm weather.',
    image: '/images/dress.svg',
  },
  {
    id: 'p8',
    name: 'Scented Soy Candle Collection',
    category: 'home',
    price: 42.99,
    rating: 4.7,
    badge: 'Gift Set',
    description:
      'Set of three hand-poured soy candles in lavender, cedar, and citrus scents. 40-hour burn each.',
    image: '/images/candles.svg',
  },
  {
    id: 'p9',
    name: 'Polarized Sunglasses',
    category: 'accessories',
    price: 59.99,
    rating: 4.6,
    badge: null,
    description:
      'UV400 polarized lenses with lightweight acetate frames. Includes protective hard case.',
    image: '/images/sunglasses.svg',
  },
  {
    id: 'p10',
    name: 'Mechanical Keyboard',
    category: 'electronics',
    price: 129.99,
    rating: 4.8,
    badge: 'Pro Pick',
    description:
      'Hot-swappable mechanical keyboard with RGB backlight, PBT keycaps, and USB-C connectivity.',
    image: '/images/keyboard.svg',
  },
  {
    id: 'p11',
    name: 'Wool Blend Winter Scarf',
    category: 'clothing',
    price: 44.99,
    rating: 4.5,
    badge: null,
    description:
      'Soft merino wool blend scarf with a classic plaid pattern. Generously sized for layering.',
    image: '/images/scarf.svg',
  },
  {
    id: 'p12',
    name: 'Indoor Plant Starter Kit',
    category: 'home',
    price: 38.99,
    rating: 4.4,
    badge: 'Beginner',
    description:
      'Three low-maintenance plants with ceramic pots, soil, and a care guide for new plant parents.',
    image: '/images/plants.svg',
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(query) {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );
}
