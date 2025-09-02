/**
 * A/B Testing Infrastructure
 * 
 * This utility provides a foundation for future A/B tests on headlines, CTAs, and forms.
 * It includes variant assignment, tracking, and local storage persistence.
 */

// Available A/B tests configuration
const AB_TESTS = {
  HERO_HEADLINE: {
    id: 'hero_headline_v1',
    variants: ['control', 'urgency', 'savings'],
    weights: [0.34, 0.33, 0.33], // Equal distribution
    active: false // Set to true when running tests
  },
  CTA_TEXT: {
    id: 'cta_text_v1',
    variants: ['control', 'action', 'benefit'],
    weights: [0.34, 0.33, 0.33],
    active: false
  },
  FORM_LAYOUT: {
    id: 'form_layout_v1',
    variants: ['control', 'minimal', 'trust'],
    weights: [0.34, 0.33, 0.33],
    active: false
  }
};

// Storage key prefix
const STORAGE_PREFIX = 'zoe_ab_';

/**
 * Get or assign variant for a specific test
 * @param {string} testKey - Key from AB_TESTS object
 * @returns {string} - Assigned variant name
 */
export function getVariant(testKey) {
  const test = AB_TESTS[testKey];
  if (!test || !test.active) {
    return 'control';
  }

  const storageKey = `${STORAGE_PREFIX}${test.id}`;
  
  // Check if variant already assigned
  const savedVariant = localStorage.getItem(storageKey);
  if (savedVariant && test.variants.includes(savedVariant)) {
    return savedVariant;
  }

  // Assign new variant based on weights
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (let i = 0; i < test.variants.length; i++) {
    cumulativeWeight += test.weights[i];
    if (random <= cumulativeWeight) {
      const variant = test.variants[i];
      localStorage.setItem(storageKey, variant);
      
      // Track assignment
      trackABEvent('variant_assigned', {
        test_id: test.id,
        variant: variant,
        timestamp: Date.now()
      });
      
      return variant;
    }
  }
  
  // Fallback to control
  return 'control';
}

/**
 * Track A/B test events
 * @param {string} eventName - Name of the event
 * @param {object} properties - Additional properties
 */
export function trackABEvent(eventName, properties = {}) {
  // Send to analytics (GA4, etc.)
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'ab_test',
      custom_parameter_1: properties.test_id,
      custom_parameter_2: properties.variant,
      ...properties
    });
  }

  // Also store locally for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[A/B Test]', eventName, properties);
  }
}

/**
 * Track conversion for A/B test
 * @param {string} testKey - Test key
 * @param {string} conversionType - Type of conversion (click, submit, etc.)
 */
export function trackConversion(testKey, conversionType = 'conversion') {
  const test = AB_TESTS[testKey];
  if (!test || !test.active) return;

  const variant = getVariant(testKey);
  trackABEvent('conversion', {
    test_id: test.id,
    variant: variant,
    conversion_type: conversionType,
    timestamp: Date.now()
  });
}

/**
 * Get all active A/B tests and their assigned variants
 * @returns {object} - Object with test keys and assigned variants
 */
export function getActiveVariants() {
  const variants = {};
  
  Object.keys(AB_TESTS).forEach(testKey => {
    const test = AB_TESTS[testKey];
    if (test.active) {
      variants[testKey] = getVariant(testKey);
    }
  });
  
  return variants;
}

/**
 * Reset all A/B test assignments (useful for testing)
 */
export function resetABTests() {
  Object.keys(AB_TESTS).forEach(testKey => {
    const test = AB_TESTS[testKey];
    localStorage.removeItem(`${STORAGE_PREFIX}${test.id}`);
  });
}

/**
 * React hook for A/B testing
 * @param {string} testKey - Test key from AB_TESTS
 * @returns {object} - { variant, trackConversion }
 */
export function useABTest(testKey) {
  const variant = getVariant(testKey);
  
  const trackTestConversion = (conversionType) => {
    trackConversion(testKey, conversionType);
  };
  
  return {
    variant,
    trackConversion: trackTestConversion
  };
}

// Example usage constants for common variations
export const VARIANTS = {
  HERO_HEADLINES: {
    control: "Solaranlage vom Marktführer",
    urgency: "Letzte Chance: 40% Förderung sichern", 
    savings: "Sparen Sie €3.000+ pro Jahr mit Solar"
  },
  CTA_TEXTS: {
    control: "Kostenlose Beratung",
    action: "Jetzt Termin buchen",
    benefit: "€3.000 sparen starten"
  }
};