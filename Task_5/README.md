# Thiranex Shop — E-Commerce Capstone

A production-ready e-commerce product catalog built with vanilla JavaScript, Vite, and modern web development practices.

**Live Demo:** [https://thiranex-shop.vercel.app](https://thiranex-shop.vercel.app)

## Features

- **Modular Architecture** — ES modules with separated components, pages, state, and utilities
- **Client-Side Routing** — History API router with dynamic product detail routes
- **Shopping Cart** — Persistent cart state via localStorage with quantity management
- **Product Catalog** — 12 products across 4 categories with search and filter
- **Optimized Assets** — Vite minification, lazy-loaded SVG images, code splitting
- **Responsive Design** — Mobile-first layout that works on all screen sizes

## Project Structure

```
Task 5/
├── public/
│   ├── favicon.svg
│   └── images/          # Optimized SVG product images
├── src/
│   ├── components/      # Reusable UI (Header, Footer, ProductCard)
│   ├── data/            # Product catalog data
│   ├── pages/           # Route page modules
│   ├── state/           # Cart state management
│   ├── styles/          # Global CSS
│   ├── utils/           # DOM helpers
│   ├── router.js        # Client-side router
│   └── main.js          # Application entry point
├── index.html
├── vite.config.js
├── vercel.json          # SPA routing for Vercel
└── netlify.toml         # SPA routing for Netlify
```

## Getting Started

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
```

## Deployment

### Vercel (Recommended)

1. Push this folder to a GitHub repository
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — click Deploy
4. `vercel.json` handles SPA routing automatically

### Netlify

1. Push to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`, Publish directory: `dist`
4. `netlify.toml` handles SPA routing

### CLI Deploy

```bash
npx vercel --prod        # Vercel
npx netlify deploy --prod --dir=dist   # Netlify (after build)
```

## Routes

| Path | Page |
|------|------|
| `/` | Home with featured products |
| `/products` | Full catalog with search & filters |
| `/product/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/about` | About & technical overview |

## Tech Stack

- **Vanilla JavaScript** (ES Modules)
- **Vite** — Dev server, bundling, minification
- **CSS3** — Custom properties, Grid, Flexbox
- **History API** — Client-side routing without a framework
