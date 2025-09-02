/**
 * Visual Regression Testing Setup
 * 
 * Basic Playwright-based visual regression testing for key pages.
 * This setup provides a foundation for catching unintended visual changes.
 */

import { test, expect } from '@playwright/test';

// Configuration for visual tests
const PAGES_TO_TEST = [
  { name: 'home', path: '/' },
  { name: 'whyus', path: '/warum-zoe' },
  { name: 'technology', path: '/technologie' },
  { name: 'projects', path: '/projekte' },
  { name: 'pricing', path: '/preise' },
  { name: 'contact', path: '/kontakt' },
  { name: 'faq', path: '/faq' }
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },  
  { name: 'desktop', width: 1280, height: 720 }
];

// Test configuration
test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up common test conditions
    await page.addInitScript(() => {
      // Disable animations for consistent screenshots
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.appendChild(style);
    });
  });

  // Test each page at different viewport sizes
  for (const viewport of VIEWPORTS) {
    for (const pageConfig of PAGES_TO_TEST) {
      test(`${pageConfig.name} - ${viewport.name}`, async ({ page }) => {
        // Set viewport
        await page.setViewportSize({ 
          width: viewport.width, 
          height: viewport.height 
        });

        // Navigate to page
        await page.goto(pageConfig.path);

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        // Wait for any potential lazy loading
        await page.waitForTimeout(2000);

        // Take screenshot and compare
        await expect(page).toHaveScreenshot(
          `${pageConfig.name}-${viewport.name}.png`,
          {
            fullPage: true,
            threshold: 0.2, // Allow small differences (20%)
            animations: 'disabled'
          }
        );
      });
    }
  }

  // Test specific components in isolation
  test.describe('Component Visual Tests', () => {
    test('header states', async ({ page }) => {
      await page.goto('/');
      
      // Test initial header (above hero)
      const header = page.locator('header');
      await expect(header).toHaveScreenshot('header-initial.png');
      
      // Scroll to test sticky header
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(500);
      await expect(header).toHaveScreenshot('header-sticky.png');
    });

    test('button variants', async ({ page }) => {
      await page.goto('/kontakt');
      
      // Test different button states
      const buttons = page.locator('button[class*="btn-"]');
      await expect(buttons.first()).toHaveScreenshot('button-primary.png');
    });

    test('card components', async ({ page }) => {
      await page.goto('/projekte');
      
      // Test card components
      const cards = page.locator('[class*="card"]').first();
      await expect(cards).toHaveScreenshot('card-component.png');
    });
  });

  // Test dark mode and variants (if implemented)
  test.describe('Theme Variants', () => {
    test('type theme variant', async ({ page }) => {
      await page.goto('/');
      
      // Enable type theme
      await page.addInitScript(() => {
        document.documentElement.setAttribute('data-theme', 'type');
      });
      
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('home-type-theme.png', {
        fullPage: true,
        threshold: 0.3
      });
    });
  });

  // Test error states and edge cases
  test.describe('Edge Cases', () => {
    test('404 page', async ({ page }) => {
      await page.goto('/non-existent-page');
      await expect(page).toHaveScreenshot('404-page.png');
    });

    test('form validation states', async ({ page }) => {
      await page.goto('/kontakt');
      
      // Trigger validation by submitting empty form
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      await expect(page.locator('form')).toHaveScreenshot('form-validation.png');
    });
  });
});

// Utility function to update baseline screenshots
// Run with: npx playwright test --update-snapshots
test.describe.skip('Update Baselines', () => {
  // This describe block can be enabled when you want to update baseline images
  test('update all baselines', async ({ page }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ 
        width: viewport.width, 
        height: viewport.height 
      });

      for (const pageConfig of PAGES_TO_TEST) {
        await page.goto(pageConfig.path);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        await expect(page).toHaveScreenshot(
          `${pageConfig.name}-${viewport.name}.png`,
          { fullPage: true, threshold: 0.2 }
        );
      }
    }
  });
});