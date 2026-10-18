import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import './styles/global.css'
import App from './App.jsx'

// scripts/prerender.mjs leaves a snapshot for crawlers without JavaScript; React starts from an empty root
const root = document.getElementById('root')
if (root.hasAttribute('data-prerendered')) {
  root.replaceChildren()
  root.removeAttribute('data-prerendered')
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)
