import { z } from 'zod'
import { blockBase } from './base.ts'
import { linkValue } from '../link-field.ts'

export const heroBlock = blockBase.extend({
  type: z.literal('hero'),
  title: z.string().meta({ widget: 'text', label: 'Título', localized: true }),
  subtitle: z.string().optional().meta({ widget: 'textarea', label: 'Subtítulo', localized: true }),
  image: z
    .uuid()
    .optional()
    .meta({ widget: 'media', label: 'Imagen de fondo', mediaType: 'image' }),
  ctaLabel: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Texto del botón', localized: true }),
  // localized SIN fallback (decisión 24, como el slug): un enlace sin
  // traducción para el idioma pedido no hereda el de otro idioma — se pinta
  // sin enlace (ver resolveLocalized en i18n.ts). Tipo compartido (decisión
  // 25): url + destino (misma pestaña/nueva) van juntos, un solo campo
  // objeto en vez de dos sueltos (ver link-field.ts).
  cta: linkValue.optional().meta({ widget: 'link', label: 'Enlace del botón', localized: true }),
  variant: z.enum(['centered', 'split']).meta({ widget: 'select', label: 'Variante' }),
})

export type HeroBlock = z.infer<typeof heroBlock>

// Instancia de ejemplo (tarea 34): forma FLAT (un solo idioma, la que valida
// el propio schema), no la de almacenamiento — la usan el menú de añadir
// bloque del admin y, más adelante, la web de docs (tarea 69). Cero magia:
// exportado explícito junto al schema, validado en test contra `heroBlock`.
export const heroSample: HeroBlock = {
  _uid: 'sample',
  type: 'hero',
  hidden: false,
  title: 'Un título que capta la atención',
  subtitle: 'Un subtítulo con algo más de contexto',
  variant: 'centered',
}

// Migraciones de contenido por salto de versión MAJOR (decisión 15): función
// pura instancia → instancia.
export const heroMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {
  // v2: `ctaTarget` pasó a ser obligatorio — un bloque publicado antes de
  // esto no lo tiene.
  v2: (block) => ({ ctaTarget: 'same-tab', ...block }),
  // v3: `ctaUrl` (mapa localizado de string) + `ctaTarget` (string global) se
  // fusionan en `cta` (mapa localizado de { url, target }) — decisión 25,
  // url y destino son un único concepto, no dos campos sueltos.
  v3: (block) => {
    const { ctaUrl, ctaTarget, ...rest } = block
    if (ctaUrl == null) return rest
    const urlMap = (typeof ctaUrl === 'object' ? ctaUrl : {}) as Record<string, string>
    const target = typeof ctaTarget === 'string' ? ctaTarget : 'same-tab'
    const cta = Object.fromEntries(
      Object.entries(urlMap).map(([locale, url]) => [locale, { url, target }]),
    )
    return Object.keys(cta).length > 0 ? { ...rest, cta } : rest
  },
}
