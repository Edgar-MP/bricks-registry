import { z } from 'zod'
import { blockSchema } from '../blocks/index.ts'

// Un crédito individual del bloque "Agradecimientos" (diseño Stitch: entidad +
// persona en dos columnas). Estructura fija del tipo, no un bloque — al igual
// que `post.categories`, es metadato de la entrada, no contenido compuesto.
const creditSchema = z.object({
  _uid: z.string(),
  entidad: z.string().meta({ widget: 'text', label: 'Entidad', localized: true }),
  persona: z.string().optional().meta({ widget: 'text', label: 'Persona', localized: true }),
})

// Foto-ensayo/reportaje (routing propia, /reportajes/:slug): portada +
// entradilla + autor de foto son campos fijos (aparecen siempre en cabecera,
// ver ReportajeLayout.astro); `blocks` deja que el editor componga el cuerpo
// con los bloques existentes (gallery para la galería de fotos, cta-banner
// para "VER GALERÍA COMPLETA", quote para destacados, text/image sueltos) —
// sin bloques nuevos específicos de este pack, misma filosofía que
// `carta`/`post`.
export const reportajeSchema = z.object({
  title: z.string().meta({ widget: 'text', label: 'Título', localized: true }),
  cover: z
    .uuid()
    .optional()
    .meta({ widget: 'media', label: 'Portada', mediaType: 'image' }),
  lead: z.string().meta({ widget: 'textarea', label: 'Entradilla', localized: true }),
  photographer: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Fotografía (autor)', localized: true }),
  credits: z
    .array(creditSchema)
    .default([])
    .meta({ widget: 'array', label: 'Agradecimientos' }),
  blocks: z.array(blockSchema).meta({ widget: 'blocks', label: 'Contenido' }),
})

export type Reportaje = z.infer<typeof reportajeSchema>
