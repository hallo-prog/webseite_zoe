// Zentrale Tracking-Hilfen: vereinheitlicht DataLayer + Pixel Aufrufe nach Consent
export function hasConsent() {
  try { return localStorage.getItem('zoe_consent') === '1'; } catch { return false; }
}

export function track(event, data = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch {}
  if (!hasConsent()) return; // Zusätzliche Pixel nur bei Consent
  try { if (typeof window.gtag === 'function') window.gtag('event', event, data); } catch {}
  try { if (typeof window.fbq === 'function') window.fbq('trackCustom', event, data); } catch {}
  try { if (typeof window.lintrk === 'function') window.lintrk('track', { conversion_id: event, ...data }); } catch {}
}

export const trackCta = (place, action, extra={}) => track('cta_click', { place, action, ...extra });

// Conversion Tracking für Solar-Business
export const trackLead = (type, data={}) => track('lead_generated', { lead_type: type, ...data });
export const trackCalculator = (roofArea, consumption, savings) => track('calculator_used', { roof_area: roofArea, consumption, estimated_savings: savings });
export const trackContactForm = (formData) => track('contact_form_submitted', { ...formData });
export const trackPhoneCall = (source) => track('phone_call_initiated', { source });
export const trackProjectInquiry = (projectType, budget) => track('project_inquiry', { project_type: projectType, budget_range: budget });
export const trackAppointment = (date, service) => track('appointment_booked', { appointment_date: date, service_type: service });

// E-commerce Tracking für Solar-Packages
export const trackProductView = (productId, productName) => track('product_view', { product_id: productId, product_name: productName });
export const trackAddToCart = (productId, quantity, price) => track('add_to_cart', { product_id: productId, quantity, price });
export const trackPurchase = (transactionId, value, items) => track('purchase', { transaction_id: transactionId, value, items });

// User Journey Tracking
export const trackUserJourney = (step, data={}) => track('user_journey', { step, ...data });
export const trackEngagement = (element, action, data={}) => track('user_engagement', { element, action, ...data });

// Variant Tracking (Theme / Experiment)
export function trackVariant(event, data = {}) {
  try {
    const variant = document.documentElement.getAttribute('data-theme') || 'minimal';
    track(event, { variant, ...data });
  } catch { track(event, data); }
}

export const trackNav = (label, extra={}) => trackVariant('nav_click', { label, ...extra });
export const trackFooter = (label, extra={}) => trackVariant('footer_click', { label, ...extra });

// Design Migration Completion (one-off) – guard to avoid duplicate firing
let _designMigrationTracked = false;
export function trackDesignMigrationComplete(version='v3.3', extra={}) {
  if (_designMigrationTracked) return;
  _designMigrationTracked = true;
  track('design_migration_complete', { version, timestamp: Date.now(), ...extra });
}

// Variant Persistence & Setter
export function getVariant() {
  try { return localStorage.getItem('zoe_variant') || 'minimal'; } catch { return 'minimal'; }
}

export function setVariant(next) {
  try {
    const v = next || 'minimal';
    if (v === 'minimal') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', v);
    }
    localStorage.setItem('zoe_variant', v);
    trackVariant('variant_set', { to: v });
  } catch {}
}

export function toggleVariant() {
  const cur = getVariant();
  const order = ['minimal','warm','type'];
  const idx = order.indexOf(cur);
  const next = order[(idx + 1) % order.length] || 'minimal';
  setVariant(next);
  return next;
}

// Visual Layer Activation (Cinematic Warm) – call once after mount
export function trackVisualLayerActive(opts={}) {
  trackVariant('visual_layer_active', opts);
}

// FPS Heuristik (simple): measures a short window and returns avg; if low, consumer can disable grain
export async function measureFps(durationMs=600) {
  if (typeof window === 'undefined' || !window.requestAnimationFrame) return 60;
  return new Promise(resolve => {
    let frames = 0; let start;
    function step(ts){ if(!start) start = ts; frames++; if(ts - start < durationMs){ requestAnimationFrame(step);} else { const fps = frames * 1000 / (ts - start); resolve(fps); } }
    requestAnimationFrame(step);
  });
}
