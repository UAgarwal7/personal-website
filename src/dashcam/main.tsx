import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { DashcamPage } from './DashcamPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashcamPage />
  </StrictMode>,
)
