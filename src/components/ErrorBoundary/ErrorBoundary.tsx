import { Component, type PropsWithChildren } from 'react'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * Error boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleResetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary} role="alert">
          <div className={styles.errorContent}>
            <h2 className={styles.title}>Algo deu errado</h2>
            <p className={styles.message}>
              Ocorreu um erro inesperado. Tente uma das opções abaixo para continuar.
            </p>
            <div className={styles.actions}>
              <button 
                className={styles.button}
                onClick={this.handleResetError}
                type="button"
              >
                Tentar novamente
              </button>
              <button 
                className={styles.buttonSecondary}
                onClick={this.handleReload}
                type="button"
              >
                Recarregar página
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Detalhes do erro (apenas desenvolvimento)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
