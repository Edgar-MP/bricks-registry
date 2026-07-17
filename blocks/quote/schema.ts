import { z } from 'zod'
import { blockBase } from './base.ts'

export const quoteBlock = blockBase.extend({
  type: z.literal('quote'),
  text: z.string().meta({ widget: 'textarea', label: 'Cita', localized: true }),
  author: z.string().optional().meta({ widget: 'text', label: 'Autor/fuente', localized: true }),
  // 'plain' = cita discreta (como .rich-prose blockquote); 'boxed' = destacado
  // editorial a toda anchura, pensado para pull-quotes de artículo (ver
  // README: bloque pensado para separar tramos largos de texto, no para
  // sustituir la cita simple del rich text).
  variant: z.enum(['plain', 'boxed']).meta({ widget: 'select', label: 'Variante' }),
})

export type QuoteBlock = z.infer<typeof quoteBlock>

// Instancia de ejemplo (misma convención que hero.ts/tabs.ts): forma FLAT que
// valida el propio schema, la usan el menú de añadir bloque del admin y la
// preview de docs-web.
export const quoteSample: QuoteBlock = {
  _uid: 'sample',
  type: 'quote',
  hidden: false,
  text: 'Una cita que resume el tramo de texto que la rodea.',
  variant: 'boxed',
}

// v1: sin migraciones todavía (mismo patrón que tabs.ts).
export const quoteMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
