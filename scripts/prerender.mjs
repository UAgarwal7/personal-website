// Fills each built page's empty root with its server-rendered markup, then
// removes the throwaway SSR bundle. Runs after both vite builds; see the
// "build" script in package.json and the page list in src/entry-server.tsx.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = `${root}dist-ssr`
const { files, render } = await import(`${ssrDir}/entry-server.js`)

const EMPTY_ROOT = '<div id="root"></div>'

for (const file of files) {
  const path = `${root}dist/${file}`
  const html = await readFile(path, 'utf8')
  if (!html.includes(EMPTY_ROOT)) {
    throw new Error(`${file}: expected an empty ${EMPTY_ROOT} to fill`)
  }
  // A function replacement, so `$` sequences in the markup are taken literally.
  const markup = render(file)
  await writeFile(path, html.replace(EMPTY_ROOT, () => `<div id="root">${markup}</div>`))
  console.log(`prerendered ${file}`)
}

await rm(ssrDir, { recursive: true, force: true })
