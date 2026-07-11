import { z } from 'zod'
import { blockBase } from './base.ts'

// Listado de platos por secciones libres (el editor pone el título de cada
// una: "Entrantes", "Primeros"...) en vez de un enum fijo — así una sección
// puede agrupar como el restaurante quiera, no solo por `curso`. Cada
// sección elige a mano qué entradas `plato` van dentro (referencia múltiple,
// mismo mecanismo que `post.categories` — decisión 8/13, se hidrata a un
// nivel sin tocar el core).
const seccion = z.object({
  titulo: z.string().meta({ widget: 'text', label: 'Título de la sección', localized: true }),
  fotoDestacada: z
    .uuid()
    .optional()
    .meta({ widget: 'media', label: 'Foto destacada', mediaType: 'image' }),
  platos: z
    .array(z.uuid())
    .default([])
    .meta({ widget: 'reference', label: 'Platos', refType: 'plato', multiple: true }),
})

export const menuPlatosBlock = blockBase.extend({
  type: z.literal('menu-platos'),
  titulo: z.string().optional().meta({ widget: 'text', label: 'Título', localized: true }),
  // Sin .min(1): un bloque recién añadido debe poder guardarse sin secciones
  // todavía (mismo criterio que faq.items/gallery.images).
  secciones: z.array(seccion).default([]).meta({ widget: 'array', label: 'Secciones' }),
})

export type MenuPlatosBlock = z.infer<typeof menuPlatosBlock>

export const menuPlatosSample: MenuPlatosBlock = {
  _uid: 'sample',
  type: 'menu-platos',
  hidden: false,
  titulo: 'Nuestra carta',
  secciones: [],
}

export const menuPlatosMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
