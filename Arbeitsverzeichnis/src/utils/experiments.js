// Simple client-side experiment helper (query param / localStorage) – basis für A/B Tests
export function useExperiment(key, variants = ['A','B']) {
  // decide variant once per session for deterministic tracking
  if (typeof window === 'undefined') return variants[0];
  try {
    const param = new URLSearchParams(window.location.search).get(key);
    const storeKey = `exp_${key}`;
    if (param && variants.includes(param)) {
      window.localStorage.setItem(storeKey, param);
      return param;
    }
    const stored = window.localStorage.getItem(storeKey);
    if (stored && variants.includes(stored)) return stored;
    const pick = variants[Math.floor(Math.random()*variants.length)];
    window.localStorage.setItem(storeKey, pick);
    return pick;
  } catch {
    return variants[0];
  }
}
