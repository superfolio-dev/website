import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Landing, TemplateSelection } from './components'

/**
 * Aplicação principal SuperFolio com sistema de roteamento
 * Define as rotas e estrutura da aplicação
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="templates" element={<TemplateSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
