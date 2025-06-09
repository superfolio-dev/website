import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
    expect(screen.getByText(/Ocorreu um erro inesperado/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Recarregar página' })).toBeInTheDocument()
  })

  it('has proper ARIA attributes for accessibility', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    )
  })
  it('reloads page when reload button is clicked', () => {
    const mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    })

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Recarregar página' }))
    expect(mockReload).toHaveBeenCalledOnce()
  })

  it('handles try again button click', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Should show error UI
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument()

    // Try again button should be present and clickable
    const tryAgainButton = screen.getByRole('button', { name: 'Tentar novamente' })
    expect(tryAgainButton).toBeInTheDocument()
    
    // Should not throw when clicked
    expect(() => fireEvent.click(tryAgainButton)).not.toThrow()
  })
  it('shows error details in development environment', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Detalhes do erro (apenas desenvolvimento)')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'PRE' && content.includes('Test error message')
    })).toBeInTheDocument()

    // Restore original environment
    process.env.NODE_ENV = originalEnv
  })

  it('hides error details in production environment', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Detalhes do erro (apenas desenvolvimento)')).not.toBeInTheDocument()
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument()

    // Restore original environment
    process.env.NODE_ENV = originalEnv
  })
})
