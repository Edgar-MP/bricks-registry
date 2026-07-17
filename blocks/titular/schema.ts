import { z } from 'zod'
import { blockBase } from './base.ts'

// Titular de sección brutalista: rompe tramos largos de texto en un
// foto-ensayo/artículo con un titular a gran tamaño (Anton, mayúsculas vía el
// tema), distinto de `quote` (que atribuye una frase a alguien) — este bloque
// no lleva autor, es un titular/subtítulo editorial puro.
export const titularBlock = blockBase.extend({
  type: z.literal('titular'),
  kicker: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Antetítulo (kicker)', localized: true }),
  text: z.string().meta({ widget: 'text', label: 'Titular', localized: true }),
  // 'plain' = texto negro sobre el fondo de la página (como un subtítulo de
  // sección); 'inverted' = banda a toda anchura, fondo negro y texto blanco
  // (banner editorial, mismo contraste que el masthead).
  variant: z.enum(['plain', 'inverted']).meta({ widget: 'select', label: 'Variante' }),
})

export type TitularBlock = z.infer<typeof titularBlock>

// Instancia de ejemplo (misma convención que quote.ts).
export const titularSample: TitularBlock = {
  _uid: 'sample',
  type: 'titular',
  hidden: false,
  text: 'Un titular que rompe el texto',
  variant: 'plain',
}

// v1: sin migraciones todavía.
export const titularMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
