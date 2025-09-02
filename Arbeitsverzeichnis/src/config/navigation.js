/**
 * Site Navigation Configuration
 * 
 * Centralized navigation structure for consistent navigation across components.
 * This configuration is used by the main navigation, mobile menu, and footer.
 */

import { useTranslation } from 'react-i18next';

/**
 * Get primary navigation structure
 * @param {function} t - Translation function from useTranslation hook
 * @returns {Array} Navigation links with dropdowns
 */
export function getPrimaryNavigation(t) {
  return [
    { 
      name: t('nav.start'), 
      path: "Home",
      type: 'link'
    },
    {
      name: t('nav.why'),
      type: 'dropdown',
      dropdown: [
        { name: "Unser Versprechen", path: "WhyUs" },
        { name: "Technologie", path: "Technology" },
        { name: "Projekte", path: "Projects" },
        { name: "Über Uns", path: "About" },
      ]
    },
    {
      name: t('nav.info'),
      type: 'dropdown',
      dropdown: [
        { name: "Preise & Kosten", path: "Pricing" },
        { name: "Finanzierung & Förderung", path: "Financing" },
        { name: "Service & Wartung", path: "Service" },
        { name: "FAQ", path: "Faq" },
      ]
    },
    {
      name: t('nav.exp'),
      type: 'dropdown',
      dropdown: [
        { name: "Erfolgsgeschichten", path: "SuccessStories" },
        { name: "Solar-Ratgeber", path: "Blog" },
        { name: "Kostenloser Guide", path: "Guide" },
      ]
    },
    { 
      name: t('nav.calc'), 
      path: "Calculator",
      type: 'link'
    },
  ];
}

/**
 * Get secondary navigation (CTA buttons in header/mobile)
 * @param {function} t - Translation function
 * @returns {Array} Secondary navigation items
 */
export function getSecondaryNavigation(t) {
  return [
    {
      name: "Rechner",
      path: "Calculator",
      variant: "outline",
      type: "button"
    },
    {
      name: "Kontakt",
      path: "Contact",
      variant: "primary",
      type: "button"
    }
  ];
}

/**
 * Get footer navigation structure
 * @param {function} t - Translation function
 * @returns {object} Footer navigation sections
 */
export function getFooterNavigation(t) {
  return {
    company: {
      title: "Unternehmen",
      links: [
        { name: "Über uns", path: "About" },
        { name: "Projekte", path: "Projects" },
        { name: "Technologie", path: "Technology" },
        { name: "Erfolgsgeschichten", path: "SuccessStories" },
      ]
    },
    services: {
      title: "Services",
      links: [
        { name: "Solaranlagen", path: "Home" },
        { name: "Preise & Kosten", path: "Pricing" },
        { name: "Finanzierung", path: "Financing" },
        { name: "Service & Wartung", path: "Service" },
        { name: "Solar-Rechner", path: "Calculator" },
      ]
    },
    support: {
      title: "Support",
      links: [
        { name: "FAQ", path: "Faq" },
        { name: "Kontakt", path: "Contact" },
        { name: "Blog", path: "Blog" },
        { name: "Kostenloser Guide", path: "Guide" },
      ]
    },
    legal: {
      title: "Rechtliches",
      links: [
        { name: "Impressum", path: "Imprint" },
        { name: "Datenschutz", path: "Privacy" },
      ]
    }
  };
}

/**
 * React hook for navigation data
 * @returns {object} All navigation structures
 */
export function useNavigation() {
  const { t } = useTranslation();
  
  return {
    primary: getPrimaryNavigation(t),
    secondary: getSecondaryNavigation(t),
    footer: getFooterNavigation(t),
  };
}

/**
 * Get breadcrumb navigation for a specific page
 * @param {string} currentPath - Current page path
 * @param {function} t - Translation function
 * @returns {Array} Breadcrumb trail
 */
export function getBreadcrumbs(currentPath, t) {
  const breadcrumbs = [
    { name: t('nav.start'), path: "Home" }
  ];

  // Add specific breadcrumbs based on current path
  const pathMap = {
    'WhyUs': [{ name: "Warum ZOE", path: "WhyUs" }],
    'Technology': [{ name: "Technologie", path: "Technology" }],
    'Projects': [{ name: "Projekte", path: "Projects" }],
    'About': [{ name: "Über Uns", path: "About" }],
    'Pricing': [{ name: "Preise", path: "Pricing" }],
    'Financing': [{ name: "Finanzierung", path: "Financing" }],
    'Service': [{ name: "Service", path: "Service" }],
    'Faq': [{ name: "FAQ", path: "Faq" }],
    'SuccessStories': [{ name: "Erfolgsgeschichten", path: "SuccessStories" }],
    'Blog': [{ name: "Blog", path: "Blog" }],
    'Guide': [{ name: "Guide", path: "Guide" }],
    'Calculator': [{ name: "Rechner", path: "Calculator" }],
    'Contact': [{ name: "Kontakt", path: "Contact" }],
    'Imprint': [{ name: "Impressum", path: "Imprint" }],
    'Privacy': [{ name: "Datenschutz", path: "Privacy" }],
  };

  if (pathMap[currentPath]) {
    breadcrumbs.push(...pathMap[currentPath]);
  }

  return breadcrumbs;
}

// Navigation utilities
export const NAV_UTILS = {
  /**
   * Check if a navigation item is currently active
   * @param {string} itemPath - Path to check
   * @param {string} currentPath - Current page path  
   * @returns {boolean}
   */
  isActive: (itemPath, currentPath) => {
    return itemPath === currentPath;
  },

  /**
   * Find navigation item by path
   * @param {string} path - Path to find
   * @param {function} t - Translation function
   * @returns {object|null} Navigation item
   */
  findByPath: (path, t) => {
    const nav = getPrimaryNavigation(t);
    
    // Check direct links
    const directLink = nav.find(item => item.path === path);
    if (directLink) return directLink;
    
    // Check dropdown items
    for (const item of nav) {
      if (item.dropdown) {
        const dropdownItem = item.dropdown.find(subItem => subItem.path === path);
        if (dropdownItem) return { ...dropdownItem, parent: item.name };
      }
    }
    
    return null;
  }
};