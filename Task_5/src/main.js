import { createElement } from './utils/dom.js';
import { createRouter } from './router.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { AboutPage } from './pages/AboutPage.js';
import './styles/main.css';

const app = document.getElementById('app');

app.appendChild(Header());
app.appendChild(createElement('main', { id: 'page-content', className: 'main-content' }));
app.appendChild(Footer());

const router = createRouter({
  '/': () => HomePage(),
  '/products': (_params, search) => ProductsPage(_params, search),
  '/product/:id': (params) => ProductDetailPage(params),
  '/cart': () => CartPage(),
  '/about': () => AboutPage(),
});

router.init();
