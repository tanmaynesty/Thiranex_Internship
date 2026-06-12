class Router {
  constructor(routes) {
    this.routes = routes;
    this.notFound = routes['/404'] ?? (() => '<h1>404 — Page Not Found</h1>');
    this.beforeEach = null;
  }

  init() {
    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (!link) return;
      e.preventDefault();
      this.navigate(link.getAttribute('href'));
    });
    this.resolve();
  }

  navigate(path, replace = false) {
    if (path === window.location.pathname) return;
    if (replace) {
      history.replaceState(null, '', path);
    } else {
      history.pushState(null, '', path);
    }
    this.resolve();
  }

  async resolve() {
    const { pathname, search } = window.location;
    let handler = this.routes[pathname];

    if (!handler) {
      const dynamic = Object.entries(this.routes).find(([pattern]) => {
        if (!pattern.includes(':')) return false;
        const regex = new RegExp('^' + pattern.replace(/:\w+/g, '([^/]+)') + '$');
        return regex.test(pathname);
      });

      if (dynamic) {
        const regex = new RegExp('^' + dynamic[0].replace(/:\w+/g, '([^/]+)') + '$');
        const match = pathname.match(regex);
        const paramNames = [...dynamic[0].matchAll(/:(\w+)/g)].map((m) => m[1]);
        const params = Object.fromEntries(paramNames.map((name, i) => [name, match[i + 1]]));
        handler = () => dynamic[1](params, search);
      }
    }

    if (!handler) {
      handler = this.notFound;
    }

    const params = {};
    const content = await handler(params, search);
    const outlet = document.getElementById('page-content');
    if (outlet) {
      outlet.innerHTML = '';
      if (typeof content === 'string') {
        outlet.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        outlet.appendChild(content);
      } else if (content instanceof DocumentFragment) {
        outlet.appendChild(content);
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = this.getPageTitle(pathname);
  }

  getPageTitle(pathname) {
    const titles = {
      '/': 'Thiranex Shop | Home',
      '/products': 'Products | Thiranex Shop',
      '/cart': 'Cart | Thiranex Shop',
      '/about': 'About | Thiranex Shop',
    };
    if (pathname.startsWith('/product/')) return 'Product Details | Thiranex Shop';
    return titles[pathname] ?? 'Thiranex Shop';
  }
}

export function createRouter(routes) {
  return new Router(routes);
}
