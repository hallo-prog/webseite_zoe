// Lightweight route prefetch helpers
// Each entry returns the dynamic import Promise used by React.lazy elsewhere.
// Safe to call multiple times; native module caching avoids duplicate work.

const loaders = {
  Home: () => import('@/pages/HomeV4'),
  WhyUs: () => import('@/pages/WhyUs'),
  Technology: () => import('@/pages/Technology'),
  Projects: () => import('@/pages/Projects'),
  About: () => import('@/pages/About'),
  Pricing: () => import('@/pages/Pricing'),
  Financing: () => import('@/pages/Financing'),
  Service: () => import('@/pages/Service'),
  Faq: () => import('@/pages/Faq'),
  SuccessStories: () => import('@/pages/SuccessStories'),
  Blog: () => import('@/pages/Blog'),
  BlogPost: () => import('@/pages/BlogPost'),
  Guide: () => import('@/pages/Guide'),
  Calculator: () => import('@/pages/Calculator'),
  Deals: () => import('@/pages/Deals'),
  Contact: () => import('@/pages/Contact_new'),
  Imprint: () => import('@/pages/Imprint'),
  Privacy: () => import('@/pages/Privacy')
};

export function prefetchRoute(key) {
  const l = loaders[key];
  if (l) {
    try { l(); } catch (e) { /* noop */ }
  }
}

// Network aware staggered warm-up for a list of keys
export function idleWarmRoutes(keys, { delay = 150, startAfter = 1200 } = {}) {
  if (typeof window === 'undefined') return;
  const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
  const saveData = conn?.saveData;
  const slow = conn && /(2g)/i.test(conn.effectiveType || '');
  if (saveData || slow) return; // respect data saver / very slow
  const run = () => {
    keys.forEach((k, i) => setTimeout(() => prefetchRoute(k), i * delay));
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: startAfter + keys.length * delay });
  } else {
    setTimeout(run, startAfter);
  }
}
