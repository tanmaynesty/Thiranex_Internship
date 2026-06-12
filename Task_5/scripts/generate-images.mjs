import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const products = [
  { file: 'headphones', bg: '#1e293b', accent: '#3b82f6', label: '🎧' },
  { file: 'watch', bg: '#0f172a', accent: '#06b6d4', label: '⌚' },
  { file: 'backpack', bg: '#78350f', accent: '#d97706', label: '🎒' },
  { file: 'tshirt', bg: '#ecfdf5', accent: '#10b981', label: '👕', dark: true },
  { file: 'coffee', bg: '#fef3c7', accent: '#92400e', label: '☕', dark: true },
  { file: 'speaker', bg: '#18181b', accent: '#a855f7', label: '🔊' },
  { file: 'dress', bg: '#fdf2f8', accent: '#ec4899', label: '👗', dark: true },
  { file: 'candles', bg: '#fff7ed', accent: '#ea580c', label: '🕯️', dark: true },
  { file: 'sunglasses', bg: '#f0f9ff', accent: '#0284c7', label: '🕶️', dark: true },
  { file: 'keyboard', bg: '#27272a', accent: '#22c55e', label: '⌨️' },
  { file: 'scarf', bg: '#fef2f2', accent: '#dc2626', label: '🧣', dark: true },
  { file: 'plants', bg: '#f0fdf4', accent: '#16a34a', label: '🌿', dark: true },
];

for (const p of products) {
  const textColor = p.dark ? '#334155' : '#94a3b8';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg}"/>
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)"/>
  <circle cx="200" cy="180" r="90" fill="${p.accent}" opacity="0.15"/>
  <circle cx="200" cy="180" r="60" fill="${p.accent}" opacity="0.25"/>
  <text x="200" y="200" text-anchor="middle" dominant-baseline="central" font-size="72">${p.label}</text>
  <rect x="40" y="320" width="120" height="8" rx="4" fill="${p.accent}" opacity="0.6"/>
  <rect x="40" y="340" width="200" height="6" rx="3" fill="${textColor}" opacity="0.4"/>
  <rect x="40" y="358" width="160" height="6" rx="3" fill="${textColor}" opacity="0.25"/>
</svg>`;
  writeFileSync(join(outDir, `${p.file}.svg`), svg.trim());
}

console.log(`Generated ${products.length} product images in ${outDir}`);
