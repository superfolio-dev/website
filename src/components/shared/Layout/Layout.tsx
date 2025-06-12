import { Outlet } from 'react-router-dom'
import { Navigation } from '../Navigation'
import styles from './Layout.module.css'

/**
 * Layout principal da aplicação
 * Inclui navegação e área de conteúdo para as páginas
 */
export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
