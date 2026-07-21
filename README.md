# Personal site

Source for my personal site — Utsav Agarwal.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- Static output, deployed to Vercel

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Other commands

```bash
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Layout

```
src/
  content/     # site content as typed data — edit here, not in components
  components/  # section components, each owning its own id and spacing
  index.css    # design tokens (@theme) + base styles
```

Content is kept as typed constants separate from the components that render it, so
updating experience or projects never means touching JSX.

## Design

Restrained editorial: warm paper background, serif headlines against a sans body,
whitespace instead of rules. Two weights only (400/500), sentence case throughout.
Type is Fraunces (serif) and Inter (sans), served from Google Fonts.
