// Config separada requerida por `astro-expressive-code` cuando se usa el
// componente <Code> directamente (import { Code } from
// 'astro-expressive-code/components'): las opciones con funciones (aquí
// `customizeTheme`) no son serializables dentro de astro.config.mjs.
export default {
  themes: ['github-light', 'github-dark'],
  // El dark mode del site es por atributo `data-theme` en <html> (no media
  // query ni clase .dark, ver vendor/styles/global.css) — renombrar los temas
  // a 'light'/'dark' hace que el selector por defecto de EC
  // (`[data-theme='${theme.name}']`) case exactamente con nuestro atributo.
  customizeTheme: (theme) => {
    theme.name = theme.type
  },
}
