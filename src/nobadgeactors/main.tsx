import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import { NoBadgeActorsPage } from './NoBadgeActorsPage'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <NoBadgeActorsPage />
  </StrictMode>
)

// Built pages arrive prerendered (scripts/prerender.mjs); the dev server serves
// an empty root, which would fail hydration.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
