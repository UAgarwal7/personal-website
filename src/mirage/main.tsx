import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { MiragePage } from './MiragePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MiragePage />
  </StrictMode>,
)
