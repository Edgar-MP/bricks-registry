import { z } from 'zod'

// Mismo patrón que `plato.ts`: un solo tipo, `categoria` distingue vino de
// cerveza/refresco/etc. `variantesPrecio` (copa/botella, tercio/jarra…) usa
// la misma forma genérica que `plato` — un solo mecanismo para ambos, no un
// campo por categoría de bebida.
const precioVariante = z.object({
  etiqueta: z.string().meta({ widget: 'text', label: 'Etiqueta', localized: true }),
  precio: z.number().meta({ widget: 'number', label: 'Precio' }),
})

export const bebidaSchema = z.object({
  nombre: z.string().meta({ widget: 'text', label: 'Nombre', localized: true }),
  descripcion: z
    .string()
    .optional()
    .meta({ widget: 'textarea', label: 'Descripción', localized: true }),
  categoria: z
    .enum(['vino', 'cerveza', 'refresco', 'zumo', 'agua', 'cafe', 'coctel'])
    .meta({ widget: 'select', label: 'Categoría' }),
  foto: z.uuid().optional().meta({ widget: 'media', label: 'Foto', mediaType: 'image' }),
  variantesPrecio: z
    .array(precioVariante)
    .default([])
    .meta({ widget: 'array', label: 'Precios (copa, botella, tamaño…)' }),
})

export type Bebida = z.infer<typeof bebidaSchema>
