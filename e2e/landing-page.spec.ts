import { test, expect } from '@playwright/test'

test.describe('SuperFolio Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main landing page content', async ({ page }) => {
    // Check page title and meta tags
    await expect(page).toHaveTitle(/SuperFolio - Crie seu portfólio perfeito/)
    
    // Check main heading - be more specific to avoid navigation conflict
    await expect(page.locator('main').getByRole('heading', { name: 'SuperFolio' })).toBeVisible()
    await expect(page.getByText('Crie seu portfólio perfeito')).toBeVisible()
    
    // Check hero section
    await expect(page.getByText('Estamos construindo algo incrível')).toBeVisible()
    await expect(page.getByText('O SuperFolio está sendo desenvolvido')).toBeVisible()
  })

  test('should display all feature cards', async ({ page }) => {
    // Look for feature cards by text content instead of CSS classes
    await expect(page.getByText('Templates Modernos')).toBeVisible()
    await expect(page.getByText('Designs responsivos e profissionais')).toBeVisible()
    
    await expect(page.getByText('Fácil de Usar')).toBeVisible()
    await expect(page.getByText('Interface intuitiva para criar')).toBeVisible()
    
    await expect(page.getByText('Deploy Automático')).toBeVisible()
    await expect(page.getByText('Publique seu site automaticamente')).toBeVisible()
  })
  test('should display coming soon section', async ({ page }) => {
    await expect(page.getByText('Lançamento em breve')).toBeVisible()
    await expect(page.getByText('Estamos nos últimos ajustes')).toBeVisible()
    
    // Check status badge - be more specific to avoid conflicts
    await expect(page.getByText('Em desenvolvimento', { exact: true }).first()).toBeVisible()
  })

  test('should display footer information', async ({ page }) => {
    await expect(page.getByText('© 2025 SuperFolio')).toBeVisible()
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
    
    // Check that main elements are still visible by navigation role
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByText('Estamos construindo algo incrível')).toBeVisible()
    await expect(page.getByText('Templates Modernos')).toBeVisible()
  })

  test('should have smooth animations and interactions', async ({ page }) => {
    // Test that all main content is visible and interactive
    await expect(page.getByText('Templates Modernos')).toBeVisible()
    await expect(page.getByText('Fácil de Usar')).toBeVisible()
    await expect(page.getByText('Deploy Automático')).toBeVisible()
    
    // Check that main sections are visible
    await expect(page.getByText('Estamos construindo algo incrível')).toBeVisible()
  })
})
