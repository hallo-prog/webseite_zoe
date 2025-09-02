// Central lightweight copy resolver for Section Library v2
// Usage: getCopy('hl.hero.primary') – returns string or placeholder warning in dev

const COPY = {};

export function registerCopy(namespace, obj) {
  COPY[namespace] = { ...(COPY[namespace]||{}), ...obj };
}

export function getCopy(key, fallback = '') {
  // key pattern: namespace.path.path
  const [ns, ...rest] = key.split('.');
  const path = rest.join('.');
  const base = COPY[ns];
  if (!base) return devFallback(key, fallback);
  const val = path.split('.').reduce((acc, part) => acc && acc[part], base);
  if (val == null) return devFallback(key, fallback);
  return val;
}

function devFallback(key, fb) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('[copy-miss]', key);
  }
  return fb || `{{${key}}}`;
}

export function injectCopy(obj) {
  Object.entries(obj).forEach(([ns, data]) => registerCopy(ns, data));
}

export default getCopy;