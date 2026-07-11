import { z } from 'zod'
import { blockBase } from './base.ts'

// Mismo patrón que menu-platos.ts (secciones libres + referencia múltiple),
// aplicado a `bebida` en vez de `plato`.
const seccion = z.object({
  titulo: z.string().meta({ widget: 'text', label: 'Título de la sección', localized: true }),
  fotoDestacada: z
    .uuid()
    .optional()
    .meta({ widget: 'media', label: 'Foto destacada', mediaType: 'image' }),
  bebidas: z
    .array(z.uuid())
    .default([])
    .meta({ widget: 'reference', label: 'Bebidas', refType: 'bebida', multiple: true }),
})

export const menuBebidasBlock = blockBase.extend({
  type: z.literal('menu-bebidas'),
  titulo: z.string().optional().meta({ widget: 'text', label: 'Título', localized: true }),
  secciones: z.array(seccion).default([]).meta({ widget: 'array', label: 'Secciones' }),
})

export type MenuBebidasBlock = z.infer<typeof menuBebidasBlock>

export const menuBebidasSample: MenuBebidasBlock = {
  _uid: 'sample',
  type: 'menu-bebidas',
  hidden: false,
  titulo: 'Bebidas',
  secciones: [],
}

export const menuBebidasMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
