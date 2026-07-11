// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'

// Site estático (deploy como app en Coolify, tarea 69) — sin adapter, no
// necesita SSR: cada página de bloque sale de getStaticPaths() a partir de
// registry.json. Antes de dev/build corre scripts/assemble.mjs
// (predev/prebuild en package.json), que ensambla `.generated/` — este
// config asume que ya existe.
export default defineConfig({
  // Sin opciones aquí a propósito: usar <Code> de
  // 'astro-expressive-code/components' exige que la config (con la función
  // customizeTheme, no serializable) viva SOLO en ec.config.mjs — pasarla
  // también aquí duplica la config y rompe el build.
  integrations: [expressiveCode()],
  vite: { plugins: [tailwindcss()] },
  // Mismo mecanismo que apps/front/astro.config.mjs en bricks-cms (self-hosted,
  // CLS ~0): --font-inter, referenciada por --font-sans/--font-heading en
  // vendor/styles/global.css.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
})
