import { StrictMode, type ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { ProjectsPage } from './projects/ProjectsPage'
import { DashcamPage } from './dashcam/DashcamPage'
import { MqttPage } from './mqtt/MqttPage'
import { MiragePage } from './mirage/MiragePage'
import { NotFoundPage } from './notfound/NotFoundPage'

// Build-time prerender: scripts/prerender.mjs renders each page into its built
// HTML file so link previews and non-JS crawlers see the content, and the
// client then hydrates it. A new page must be added here AND to the inputs in
// vite.config.ts, or it ships with an empty root.
const pages: Record<string, ComponentType> = {
  'index.html': App,
  'projects.html': ProjectsPage,
  'dashcam.html': DashcamPage,
  'mqtt.html': MqttPage,
  'mirage.html': MiragePage,
  '404.html': NotFoundPage,
}

export const files = Object.keys(pages)

export function render(file: string): string {
  const Page = pages[file]
  if (!Page) throw new Error(`No page registered for ${file}`)
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
