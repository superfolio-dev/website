import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from './Navigation'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navigation', () => {
  it('renders logo and navigation links', () => {
    renderWithRouter(<Navigation />)

    expect(screen.getByText('SuperFolio')).toBeInTheDocument()
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Templates')).toBeInTheDocument()
  })

  it('has correct link destinations', () => {
    renderWithRouter(<Navigation />)

    const homeLink = screen.getByText('Início')
    const templatesLink = screen.getByText('Templates')
    const logoLink = screen.getByText('SuperFolio')

    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
    expect(templatesLink.closest('a')).toHaveAttribute('href', '/templates')
    expect(logoLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const homeLink = screen.getByRole('link', { name: 'Início' })
    const templatesLink = screen.getByRole('link', { name: 'Templates' })

    expect(homeLink).toBeInTheDocument()
    expect(templatesLink).toBeInTheDocument()
  })

  it('shows text content in Portuguese', () => {
    renderWithRouter(<Navigation />)

    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Templates')).toBeInTheDocument()
  })
})
