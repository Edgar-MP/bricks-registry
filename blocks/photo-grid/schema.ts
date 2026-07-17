import { z } from 'zod'
import { blockBase } from './base.ts'

const photoGridImage = z.object({
  image: z.uuid().meta({ widget: 'media', label: 'Imagen', mediaType: 'image' }),
  caption: z.string().optional().meta({ widget: 'text', label: 'Pie de foto', localized: true }),
  // Crédito del fotógrafo POR foto (a diferencia de `gallery` core, pensado
  // para foto-ensayos donde cada imagen puede tener un autor distinto —
  // `reportaje.photographer` es el crédito general de portada, este es el de
  // cada imagen del cuerpo).
  credit: z.string().optional().meta({ widget: 'text', label: 'Crédito (fotógrafo)', localized: true }),
})

// Galería editorial brutalista: a diferencia de `gallery` (core, pie de foto
// solo visible en el lightbox), aquí pie + crédito van SIEMPRE visibles bajo
// cada foto — pensado para foto-ensayos/reportajes documentales, no para
// grids decorativos de marketing. Sin lightbox: el punto es leer el pie de
// foto en contexto, no ampliar la imagen.
export const photoGridBlock = blockBase.extend({
  type: z.literal('photo-grid'),
  images: z.array(photoGridImage).default([]).meta({ widget: 'array', label: 'Imágenes' }),
  columns: z.enum(['2', '3']).meta({ widget: 'select', label: 'Columnas' }),
})

export type PhotoGridBlock = z.infer<typeof photoGridBlock>

// Instancia de ejemplo (misma convención que gallery.ts): sin imágenes
// (necesitarían uuids de asset reales), forma válida igual por el default([]).
export const photoGridSample: PhotoGridBlock = {
  _uid: 'sample',
  type: 'photo-grid',
  hidden: false,
  images: [],
  columns: '2',
}

export const photoGridMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
