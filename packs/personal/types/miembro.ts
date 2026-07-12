import { z } from 'zod'

// Sin routing (registrado como `routing: null` en el manifiesto): no tiene
// página propia, se lista desde el bloque `equipo` — mismo criterio que
// `plato`/`bebida` del paquete restaurante.
const redSocial = z.object({
  red: z
    .enum(['linkedin', 'twitter', 'instagram', 'facebook', 'web'])
    .meta({ widget: 'select', label: 'Red' }),
  url: z.string().meta({ widget: 'url', label: 'URL' }),
})

export const miembroSchema = z.object({
  // Nombre propio: no se traduce entre idiomas.
  nombre: z.string().meta({ widget: 'text', label: 'Nombre' }),
  puesto: z.string().meta({ widget: 'text', label: 'Puesto', localized: true }),
  foto: z.uuid().optional().meta({ widget: 'media', label: 'Foto', mediaType: 'image' }),
  bio: z
    .string()
    .optional()
    .meta({ widget: 'textarea', label: 'Biografía', localized: true }),
  // Datos de contacto: técnicos/canónicos, no editoriales — sin `localized`.
  email: z.string().optional().meta({ widget: 'text', label: 'Email' }),
  telefono: z.string().optional().meta({ widget: 'text', label: 'Teléfono' }),
  // Sin .min(1): un miembro recién creado debe poder guardarse sin redes
  // todavía (mismo criterio que faq.items/gallery.images/plato.variantesPrecio).
  redesSociales: z
    .array(redSocial)
    .default([])
    .meta({ widget: 'array', label: 'Redes sociales' }),
})

export type Miembro = z.infer<typeof miembroSchema>
