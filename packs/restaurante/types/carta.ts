import { z } from 'zod'
import { blockSchema } from '../blocks/index.ts'

// Misma forma que `page`/`post` (título + bloques): el editor compone la
// carta a mano con los bloques existentes, incluidos `menu-platos` /
// `menu-bebidas` / `carta-embed` de este mismo paquete. Sin campo propio de
// listado automático — así no hace falta layout ni endpoint nuevos, cae al
// `PageLayout` genérico del front (ver `EntryRenderer.astro`).
export const cartaSchema = z.object({
  title: z.string().meta({ widget: 'text', label: 'Título', localized: true }),
  blocks: z.array(blockSchema).meta({ widget: 'blocks', label: 'Contenido' }),
})

export type Carta = z.infer<typeof cartaSchema>
