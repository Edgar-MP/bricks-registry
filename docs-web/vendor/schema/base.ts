// VENDORIZADO desde bricks-cms/packages/schema/src/base.ts — copia manual,
// no hay mecanismo automático de sync. Si el original cambia en bricks-cms,
// hay que volver a copiarlo aquí a mano (ver docs-web/README.md).

import { z } from 'zod'

// Campos de plataforma comunes a TODA instancia de bloque (no son contenido
// que rellene el editor). El `type` NO va aquí: cada bloque declara el suyo.
// `hidden` (decisión 23): ocultar un bloque sin borrarlo. No es un campo de
// formulario más (igual que `_uid`) — vive en `PLATFORM_FIELDS` de introspect.ts
// y se controla desde un botón dedicado (ojo) en el panel de ajustes, nunca
// desde el form automático. El delivery lo filtra SIEMPRE (draft y published):
// un bloque oculto no llega ni a la preview ni a la web.
export const blockBase = z.object({
  _uid: z.string(),
  hidden: z.boolean().default(false),
})
