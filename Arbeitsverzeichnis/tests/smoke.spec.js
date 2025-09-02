/**
 * Smoke UI Tests
 * 
 * Basic functional tests to ensure the UI renders correctly and 
 * important ARIA roles are present. These tests catch major regressions.
 */

import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Basic UI Functionality', () => {
  
  test('homepage loads and displays key elements', async ({ page }) => {
    await page.goto('/');

    // Check that basic page structure is present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check hero section
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Solar|ZOE/i);

    // Check primary CTA is present
    const ctaButton = page.locator('button, a').filter({ hasText: /Kontakt|Beratung|Anfrage/i }).first();
    await expect(ctaButton).toBeVisible();
  });

  test('navigation is functional', async ({ page }) => {
    await page.goto('/');

    // Test main navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Test that navigation links work
    const whyUsLink = page.locator('a').filter({ hasText: /Warum|WhyUs/i }).first();
    if (await whyUsLink.count() > 0) {
      await whyUsLink.click();
      await expect(page).toHaveURL(/warum|why/i);
    }
  });

  test('contact page form is accessible', async ({ page }) => {
    await page.goto('/kontakt');

    // Check form is present
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check required form fields have labels
    const nameInput = page.locator('input[name*="name" i], input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();

    if (await nameInput.count() > 0) {
      await expect(nameInput).toBeVisible();
    }
    
    if (await emailInput.count() > 0) {
      await expect(emailInput).toBeVisible();
    }

    // Check submit button is present
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitButton).toBeVisible();
  });

  test('accessibility landmarks are present', async ({ page }) => {
    await page.goto('/');

    // Check for proper landmarks
    await expect(page.locator('[role="banner"], header')).toBeVisible();
    await expect(page.locator('[role="main"], main')).toBeVisible();
    await expect(page.locator('[role="navigation"], nav')).toBeVisible();
    await expect(page.locator('[role="contentinfo"], footer')).toBeVisible();
  });

  test('skip link works', async ({ page }) => {
    await page.goto('/');

    // Focus the skip link (it should become visible)
    const skipLink = page.locator('a').filter({ hasText: /skip|inhalt/i }).first();
    
    if (await skipLink.count() > 0) {
      await skipLink.focus();
      await expect(skipLink).toBeVisible();
      
      // Click skip link
      await skipLink.click();
      
      // Check that main content area is focused
      const mainContent = page.locator('[id*="main"], main').first();
      await expect(mainContent).toBeFocused();
    }
  });

  test('buttons have proper focus states', async ({ page }) => {
    await page.goto('/');

    // Find the first button
    const button = page.locator('button').first();
    await expect(button).toBeVisible();

    // Tab to the button and check focus
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    
    // Check that some button receives focus
    await expect(focusedElement).toBeVisible();
  });

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for mobile menu trigger (hamburger menu)
    const mobileMenuTrigger = page.locator('button').filter({ 
      hasText: /menu|navigation/i 
    }).or(page.locator('button[aria-label*="menu" i]'))
     .or(page.locator('[class*="hamburger"]'))
     .first();

    if (await mobileMenuTrigger.count() > 0) {
      // Open mobile menu
      await mobileMenuTrigger.click();

      // Check that mobile navigation becomes visible
      const mobileNav = page.locator('[class*="mobile"], [class*="drawer"]').first();
      await expect(mobileNav).toBeVisible({ timeout: 1000 });
    }
  });

  test('pages have proper titles and meta descriptions', async ({ page }) => {
    const pages = [
      { path: '/', title: /ZOE|Solar|Home/i },
      { path: '/warum-zoe', title: /Warum|Why/i },
      { path: '/projekte', title: /Projekte|Projects/i },
      { path: '/kontakt', title: /Kontakt|Contact/i },
    ];

    for (const pageTest of pages) {
      await page.goto(pageTest.path);
      
      // Check title
      const title = await page.title();
      expect(title).toMatch(pageTest.title);

      // Check meta description exists
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
    }
  });

  test('calculator widget loads (if present)', async ({ page }) => {
    await page.goto('/rechner');

    // Check if calculator elements are present
    const calculatorInputs = page.locator('input[type="number"], input[type="range"]');
    
    if (await calculatorInputs.count() > 0) {
      await expect(calculatorInputs.first()).toBeVisible();
      
      // Test basic calculator interaction
      await calculatorInputs.first().fill('100');
      
      // Check for results area
      const results = page.locator('[class*="result"], [class*="output"]');
      if (await results.count() > 0) {
        await expect(results.first()).toBeVisible();
      }
    }
  });

  test('error handling for 404 pages', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    
    // Should either redirect or show 404 page
    const currentUrl = page.url();
    const pageContent = await page.textContent('body');
    
    // Check that we either got redirected or see appropriate error content
    const hasErrorContent = pageContent.includes('404') || 
                           pageContent.includes('Not Found') || 
                           pageContent.includes('Seite nicht gefunden') ||
                           currentUrl.includes('404');
    
    expect(hasErrorContent || response?.status() === 404).toBeTruthy();
  });
});

test.describe('Performance Smoke Tests', () => {
  test('page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds (generous for CI environments)
    expect(loadTime).toBeLessThan(5000);
  });

  test('images have proper alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that at least some images have alt text
      const imagesWithAlt = images.filter('[alt]:not([alt=""])');
      const imagesWithAltCount = await imagesWithAlt.count();
      
      // At least 80% of images should have alt text
      expect(imagesWithAltCount / imageCount).toBeGreaterThan(0.8);
    }
  });
});