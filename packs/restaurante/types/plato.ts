import { z } from 'zod'

// Un solo tipo de contenido para las 4 fases del menú (decisión: evitar 4
// tipos casi idénticos, `curso` es el único campo que los distingue). Sin
// routing (registrado como `routing: null` en el manifiesto): no tiene página
// propia, se lista desde los bloques `menu-platos` de las cartas.
const precioVariante = z.object({
  etiqueta: z.string().meta({ widget: 'text', label: 'Etiqueta', localized: true }),
  precio: z.number().meta({ widget: 'number', label: 'Precio' }),
})

export const platoSchema = z.object({
  nombre: z.string().meta({ widget: 'text', label: 'Nombre', localized: true }),
  descripcion: z
    .string()
    .optional()
    .meta({ widget: 'textarea', label: 'Descripción', localized: true }),
  curso: z
    .enum(['entrante', 'primero', 'segundo', 'postre'])
    .meta({ widget: 'select', label: 'Curso' }),
  foto: z.uuid().optional().meta({ widget: 'media', label: 'Foto', mediaType: 'image' }),
  // v1 texto libre (no existe widget de multi-selección de valores simples,
  // solo `select` de uno y `array` de objetos con subcampos): mejora de
  // plataforma pendiente, no de este paquete.
  alergenos: z
    .string()
    .optional()
    .meta({ widget: 'textarea', label: 'Alérgenos', localized: true }),
  // Sin .min(1): un plato recién creado debe poder guardarse sin precio
  // todavía (mismo criterio que `faq.items`/`gallery.images`).
  variantesPrecio: z
    .array(precioVariante)
    .default([])
    .meta({ widget: 'array', label: 'Precios (ración, completo…)' }),
})

export type Plato = z.infer<typeof platoSchema>
