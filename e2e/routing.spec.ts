import { test, expect } from '@playwright/test'

test.describe('SuperFolio Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('should navigate to templates page from landing page', async ({ page }) => {
    // Check that we're on the landing page
    await expect(page).toHaveTitle(/SuperFolio - Crie seu portfólio perfeito/)
    await expect(page.getByText('Estamos construindo algo incrível')).toBeVisible()

    // Click on the "Visualizar Templates" button
    await page.getByText('Visualizar Templates').click()

    // Should navigate to /templates
    await expect(page).toHaveURL('/templates')
    await expect(page.getByText('Escolha seu template')).toBeVisible()
  })
  test('should navigate using navigation menu', async ({ page }) => {
    // Navigation should be visible
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Click on Templates in navigation - be more specific to avoid conflicts
    await page.getByRole('navigation').getByRole('link', { name: 'Templates' }).click()

    // Should navigate to templates page
    await expect(page).toHaveURL('/templates')
    await expect(page.getByText('Escolha seu template')).toBeVisible()

    // Navigate back to home
    await page.getByRole('navigation').getByRole('link', { name: 'Início' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByText(/Estamos construindo algo incrível/)).toBeVisible()
  })
  test('should have active navigation states', async ({ page }) => {
    // Home should be active by default
    const homeLink = page.getByRole('navigation').getByRole('link', { name: 'Início' })
    await expect(homeLink).toHaveClass(/active/)

    // Navigate to templates
    await page.getByRole('navigation').getByRole('link', { name: 'Templates' }).click()
    
    // Templates should now be active
    const templatesLink = page.getByRole('navigation').getByRole('link', { name: 'Templates' })
    await expect(templatesLink).toHaveClass(/active/)
  })

  test('should display templates page content correctly', async ({ page }) => {
    await page.goto('/templates')

    // Check page title and content
    await expect(page.getByText('Escolha seu template')).toBeVisible()
    await expect(page.getByText(/Selecione o template que melhor representa/)).toBeVisible()
    
    // Should display template cards
    await expect(page.getByTestId('template-grid')).toBeVisible()
    await expect(page.getByTestId('template-card')).toHaveCount(1) // Currently only one template
  })
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigation should still be visible and functional
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('navigation').getByText('SuperFolio')).toBeVisible()
    
    // Navigate to templates
    await page.getByRole('navigation').getByRole('link', { name: 'Templates' }).click()
    await expect(page).toHaveURL('/templates')
    await expect(page.getByText('Escolha seu template')).toBeVisible()
  })
  test('should handle direct navigation to templates route', async ({ page }) => {
    // Navigate directly to templates page
    await page.goto('/templates')

    // Should show templates page content
    await expect(page.getByText('Escolha seu template')).toBeVisible()
    await expect(page.getByTestId('template-grid')).toBeVisible()
    
    // Navigation should show templates as active
    const templatesLink = page.getByRole('navigation').getByRole('link', { name: 'Templates' })
    await expect(templatesLink).toHaveClass(/active/)
  })
})
