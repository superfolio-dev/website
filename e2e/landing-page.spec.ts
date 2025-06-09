import { test, expect } from '@playwright/test'

test.describe('SuperFolio Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main landing page content', async ({ page }) => {
    // Check page title and meta tags
    await expect(page).toHaveTitle(/SuperFolio - Crie seu portfólio perfeito/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('SuperFolio')
    await expect(page.locator('.tagline')).toContainText('Crie seu portfólio perfeito')
    
    // Check hero section
    await expect(page.locator('.hero-title')).toContainText('Estamos construindo algo incrível')
    await expect(page.locator('.hero-description')).toContainText('O SuperFolio está sendo desenvolvido')
  })

  test('should display all feature cards', async ({ page }) => {
    const featureCards = page.locator('.feature-card')
    
    // Should have 3 feature cards
    await expect(featureCards).toHaveCount(3)
    
    // Check each feature card content
    await expect(featureCards.nth(0)).toContainText('Templates Modernos')
    await expect(featureCards.nth(0)).toContainText('Designs responsivos e profissionais')
    
    await expect(featureCards.nth(1)).toContainText('Fácil de Usar')
    await expect(featureCards.nth(1)).toContainText('Interface intuitiva para criar')
    
    await expect(featureCards.nth(2)).toContainText('Deploy Automático')
    await expect(featureCards.nth(2)).toContainText('Publique seu site automaticamente')
  })

  test('should display coming soon section', async ({ page }) => {
    await expect(page.locator('.coming-soon-title')).toContainText('Lançamento em breve')
    await expect(page.locator('.coming-soon-description')).toContainText('Estamos nos últimos ajustes')
    
    // Check status badge
    const statusBadge = page.locator('.status-badge')
    await expect(statusBadge).toBeVisible()
    await expect(statusBadge).toContainText('Em desenvolvimento')
    
    // Check status indicator animation
    const statusIndicator = page.locator('.status-indicator')
    await expect(statusIndicator).toBeVisible()
  })

  test('should display footer information', async ({ page }) => {
    await expect(page.locator('.footer')).toContainText('© 2025 SuperFolio')
    await expect(page.locator('.footer-tagline')).toContainText('Transformando ideias em portfólios')
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /O SuperFolio está sendo desenvolvido/)
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /SuperFolio - Crie seu portfólio perfeito/)
    
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /O SuperFolio está sendo desenvolvido/)
    
    // Check language
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  })

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that main elements are still visible
    await expect(page.locator('.logo')).toBeVisible()
    await expect(page.locator('.hero-title')).toBeVisible()
    await expect(page.locator('.feature-card')).toHaveCount(3)
    
    // Check that feature cards stack vertically on mobile
    const featureCards = page.locator('.feature-card')
    const firstCardBox = await featureCards.nth(0).boundingBox()
    const secondCardBox = await featureCards.nth(1).boundingBox()
    
    // On mobile, second card should be below first card
    expect(secondCardBox?.y).toBeGreaterThan(firstCardBox?.y || 0)
  })

  test('should have smooth animations and interactions', async ({ page }) => {
    // Test feature card hover effects
    const firstFeatureCard = page.locator('.feature-card').first()
    
    // Hover over the card
    await firstFeatureCard.hover()
    
    // Card should be visible and interactive
    await expect(firstFeatureCard).toBeVisible()
    
    // Check that animations don't break layout
    await expect(page.locator('.features-preview')).toBeVisible()
  })
})
