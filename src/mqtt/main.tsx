import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { MqttPage } from './MqttPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MqttPage />
  </StrictMode>,
)
