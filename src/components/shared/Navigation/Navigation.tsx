import { Link, useLocation } from 'react-router-dom'
import styles from './Navigation.module.css'

/**
 * Componente de navegação principal do SuperFolio
 * Exibe o logo e links de navegação
 */
export const Navigation = () => {
  const location = useLocation()

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.logoText}>SuperFolio</h1>
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === '/' ? styles.active : ''
            }`}
          >
            Início
          </Link>
          <Link
            to="/templates"
            className={`${styles.navLink} ${
              location.pathname === '/templates' ? styles.active : ''
            }`}
          >
            Templates
          </Link>
        </div>
      </div>
    </nav>
  )
}
