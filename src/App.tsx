import './App.css'

/**
 * Development landing page for SuperFolio
 * Displays construction message and coming soon information
 */
function App() {
  return (
    <div className="landing-page">
      <div className="container">
        <header className="header">
          <div className="logo-container">
            <h1 className="logo">SuperFolio</h1>
            <p className="tagline">Crie seu portfólio perfeito</p>
          </div>
        </header>

        <main className="main-content">
          <div className="hero-section">
            <h2 className="hero-title">
              Estamos construindo algo <span className="highlight">incrível</span>
            </h2>
            <p className="hero-description">
              O SuperFolio está sendo desenvolvido para ajudar desenvolvedores, designers e freelancers 
              a criarem portfólios profissionais de forma rápida e fácil.
            </p>
          </div>

          <div className="features-preview">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Templates Modernos</h3>
              <p>Designs responsivos e profissionais prontos para usar</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fácil de Usar</h3>
              <p>Interface intuitiva para criar seu portfólio em minutos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Deploy Automático</h3>
              <p>Publique seu site automaticamente com um clique</p>
            </div>
          </div>

          <div className="coming-soon">
            <h3 className="coming-soon-title">Lançamento em breve</h3>
            <p className="coming-soon-description">
              Estamos nos últimos ajustes para entregar a melhor experiência possível.
              Acompanhe nosso progresso e seja o primeiro a saber quando estivermos prontos!
            </p>
            
            <div className="status-badge">
              <span className="status-indicator"></span>
              Em desenvolvimento
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2025 SuperFolio. Todos os direitos reservados.</p>
          <p className="footer-tagline">Transformando ideias em portfólios impressionantes</p>
        </footer>
      </div>
    </div>
  )
}

export default App
