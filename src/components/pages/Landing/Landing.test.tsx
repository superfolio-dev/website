import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Landing } from './Landing'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Landing', () => {
  it('renders main landing page content', () => {
    renderWithRouter(<Landing />)

    expect(screen.getByText('SuperFolio')).toBeInTheDocument()
    expect(screen.getByText('Crie seu portfólio perfeito')).toBeInTheDocument()
    expect(screen.getByText('Estamos construindo algo')).toBeInTheDocument()
    expect(screen.getByText('incrível')).toBeInTheDocument()
  })

  it('displays all feature cards in Portuguese', () => {
    renderWithRouter(<Landing />)

    expect(screen.getByText('Templates Modernos')).toBeInTheDocument()
    expect(screen.getByText('Fácil de Usar')).toBeInTheDocument()
    expect(screen.getByText('Deploy Automático')).toBeInTheDocument()
  })

  it('shows coming soon section', () => {
    renderWithRouter(<Landing />)

    expect(screen.getByText('Lançamento em breve')).toBeInTheDocument()
    expect(screen.getByText(/Estamos nos últimos ajustes/)).toBeInTheDocument()
    expect(screen.getByText('Em desenvolvimento')).toBeInTheDocument()
  })

  it('has preview templates link', () => {
    renderWithRouter(<Landing />)

    const previewLink = screen.getByText('Visualizar Templates')
    expect(previewLink).toBeInTheDocument()
    expect(previewLink.closest('a')).toHaveAttribute('href', '/templates')
  })

  it('displays footer information', () => {
    renderWithRouter(<Landing />)

    expect(screen.getByText(/© 2025 SuperFolio/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Landing />)

    // Check that main heading is properly structured
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'SuperFolio'
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Estamos construindo algo incrível/
    )
  })
})
