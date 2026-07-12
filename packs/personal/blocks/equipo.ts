import { z } from 'zod'
import { blockBase } from './base.ts'

// Lista plana de miembros (referencia múltiple, mismo mecanismo que
// `post.categories`/`menu-platos.secciones.platos`, hidratada a un nivel):
// el orden de visualización es el orden de selección del editor, sin campo
// `orden` aparte. Sin agrupar por sección/departamento — decisión: mantener
// el paquete sencillo, ampliable después si hace falta.
export const equipoBlock = blockBase.extend({
  type: z.literal('equipo'),
  titulo: z.string().optional().meta({ widget: 'text', label: 'Título', localized: true }),
  miembros: z
    .array(z.uuid())
    .default([])
    .meta({ widget: 'reference', label: 'Miembros', refType: 'miembro', multiple: true }),
})

export type EquipoBlock = z.infer<typeof equipoBlock>

export const equipoSample: EquipoBlock = {
  _uid: 'sample',
  type: 'equipo',
  hidden: false,
  titulo: 'Nuestro equipo',
  miembros: [],
}

export const equipoMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
