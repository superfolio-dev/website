import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TemplateSelection } from './TemplateSelection'

describe('TemplateSelection', () => {
  it('renders page title in Portuguese', () => {
    render(<TemplateSelection />)
    expect(screen.getByText('Escolha seu template')).toBeInTheDocument()
  })

  it('displays template description in Portuguese', () => {
    render(<TemplateSelection />)
    expect(
      screen.getByText(
        'Selecione o template que melhor representa seu estilo profissional'
      )
    ).toBeInTheDocument()
  })

  it('renders template grid with test id', () => {
    render(<TemplateSelection />)
    expect(screen.getByTestId('template-grid')).toBeInTheDocument()
  })

  it('displays template card with correct information', () => {
    render(<TemplateSelection />)

    expect(screen.getByText('Desenvolvedor Moderno')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(
      screen.getByText('Design moderno e profissional')
    ).toBeInTheDocument()
  })

  it('opens preview modal when template is clicked', () => {
    render(<TemplateSelection />)

    const templateCard = screen.getByTestId('template-card')
    fireEvent.click(templateCard)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByText('Preview: Desenvolvedor Moderno')
    ).toBeInTheDocument()
  })

  it('opens preview modal when preview button is clicked', () => {
    render(<TemplateSelection />)

    const previewButton = screen.getByText('Visualizar')
    fireEvent.click(previewButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', () => {
    render(<TemplateSelection />)

    // Open modal
    const templateCard = screen.getByTestId('template-card')
    fireEvent.click(templateCard)

    // Close modal
    const closeButton = screen.getByLabelText('Fechar preview')
    fireEvent.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('closes modal when overlay is clicked', () => {
    render(<TemplateSelection />)

    // Open modal
    const templateCard = screen.getByTestId('template-card')
    fireEvent.click(templateCard)

    // Click overlay by getting the modal and finding the overlay element
    const modal = screen.getByRole('dialog')
    const overlay = modal.firstChild as HTMLElement
    fireEvent.click(overlay)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has accessible template selection buttons', () => {
    render(<TemplateSelection />)

    const selectButton = screen.getByText('Escolher template')
    expect(selectButton).toBeInTheDocument()
    expect(selectButton).toHaveAttribute('type', 'button')
  })

  it('displays customizable options correctly', () => {
    render(<TemplateSelection />)

    expect(screen.getByText('Personalizável:')).toBeInTheDocument()
    expect(screen.getByText('Cores')).toBeInTheDocument()
    expect(screen.getByText('Tipografia')).toBeInTheDocument()
  })

  it('has correct aria labels for accessibility', () => {
    render(<TemplateSelection />)

    const previewButton = screen.getByLabelText(
      'Visualizar template Desenvolvedor Moderno'
    )
    expect(previewButton).toBeInTheDocument()
  })
})
