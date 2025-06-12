import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

/**
 * Landing page para SuperFolio
 * Exibe mensagem de construção e informações de lançamento
 */
export const Landing = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>SuperFolio</h1>
            <p className={styles.tagline}>Crie seu portfólio perfeito</p>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.heroSection}>
            <h2 className={styles.heroTitle}>
              Estamos construindo algo{' '}
              <span className={styles.highlight}>incrível</span>
            </h2>
            <p className={styles.heroDescription}>
              O SuperFolio está sendo desenvolvido para ajudar desenvolvedores,
              designers e freelancers a criarem portfólios profissionais de
              forma rápida e fácil.
            </p>
          </div>

          <div className={styles.featuresPreview}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3>Templates Modernos</h3>
              <p>Designs responsivos e profissionais prontos para usar</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Fácil de Usar</h3>
              <p>Interface intuitiva para criar seu portfólio em minutos</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Deploy Automático</h3>
              <p>Publique seu site automaticamente com um clique</p>
            </div>
          </div>

          <div className={styles.comingSoon}>
            <h3 className={styles.comingSoonTitle}>Lançamento em breve</h3>
            <p className={styles.comingSoonDescription}>
              Estamos nos últimos ajustes para entregar a melhor experiência
              possível. Acompanhe nosso progresso e seja o primeiro a saber
              quando estivermos prontos!
            </p>

            <div className={styles.statusBadge}>
              <span className={styles.statusIndicator}></span>
              Em desenvolvimento
            </div>

            {/* Preview access button */}
            <div className={styles.previewAccess}>
              <Link to="/templates" className={styles.previewButton}>
                Visualizar Templates
              </Link>
              <p className={styles.previewNote}>
                Experimente nossos templates em desenvolvimento
              </p>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2025 SuperFolio. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  )
}
