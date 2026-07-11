// VENDORIZADO desde bricks-cms/packages/schema/src/link-field.ts — copia manual,
// no hay mecanismo automático de sync. Si el original cambia en bricks-cms,
// hay que volver a copiarlo aquí a mano (ver docs-web/README.md).

import { z } from 'zod'

// Tipo compartido para "un enlace" (decisión 25): url + destino (misma
// pestaña / nueva) van SIEMPRE juntos, así que es un único campo objeto en
// vez de dos campos sueltos duplicados en cada bloque que necesite un
// enlace (hero.cta, image.link…). Widget dedicado 'link' en el admin (un
// input de texto + un select, ver form/LinkInput.tsx) — introspect.ts no
// necesita saber que por dentro es un objeto, solo lee widget/label/localized
// como en cualquier otro campo.
//
// SIN validar formato de la url (decisión 25): rutas relativas, anclas
// (#section), mailto:, tel:… — `z.url()` los rechazaba todos.
export const linkValue = z.object({
  url: z.string(),
  target: z.enum(['same-tab', 'new-tab']),
})

export type LinkValue = z.infer<typeof linkValue>
