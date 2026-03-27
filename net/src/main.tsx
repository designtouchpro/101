import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

const Router = import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={import.meta.env.VITE_DEPLOY_TARGET === 'github-pages' ? '/' : import.meta.env.BASE_URL}>
      <App />
    </Router>
  </StrictMode>,
)
