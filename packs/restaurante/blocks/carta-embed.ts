import { z } from 'zod'
import { blockBase } from './base.ts'

// Resumen/teaser de una `carta`: la referencia se hidrata a UN nivel (id +
// campos propios, sin slug/url — decisión 13), así que no puede construir
// solo el link a `/carta/:slug`. `url` es manual a propósito: el botón solo
// se pinta si el editor la rellena (no es obligatorio, no rompe nada).
export const cartaEmbedBlock = blockBase.extend({
  type: z.literal('carta-embed'),
  carta: z.uuid().meta({ widget: 'reference', label: 'Carta', refType: 'carta' }),
  url: z.string().optional().meta({ widget: 'url', label: 'Enlace a la carta completa' }),
  ctaLabel: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Texto del botón', localized: true }),
})

export type CartaEmbedBlock = z.infer<typeof cartaEmbedBlock>

// Instancia de ejemplo (tarea 34): `carta` necesita un uuid real, así que
// aquí es un placeholder — mismo patrón que `heroSample` sin campos que
// requieran datos ya creados.
export const cartaEmbedSample: CartaEmbedBlock = {
  _uid: 'sample',
  type: 'carta-embed',
  hidden: false,
  carta: '00000000-0000-0000-0000-000000000000',
}

export const cartaEmbedMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
