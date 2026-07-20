import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import SiteRoot from './SiteRoot.tsx'

const container = document.getElementById('root')!
const site = (
  <StrictMode>
    <SiteRoot pathname={window.location.pathname} />
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, site)
} else {
  createRoot(container).render(site)
}
