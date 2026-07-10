import { z } from 'zod'
import { blockBase } from './base.ts'

// Nodo de rich text de TipTap (mismo patrón recursivo que faq.ts/text.ts):
// el contenido de cada pestaña es richtext, no texto plano.
type RichTextNode = {
  type: string
  attrs?: Record<string, unknown>
  content?: RichTextNode[]
  text?: string
  marks?: { type: string; attrs?: Record<string, unknown> }[]
}

const richTextNode: z.ZodType<RichTextNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.string(), z.unknown()).optional(),
    content: z.array(richTextNode).optional(),
    text: z.string().optional(),
    marks: z
      .array(z.object({ type: z.string(), attrs: z.record(z.string(), z.unknown()).optional() }))
      .optional(),
  }),
)

const tabItem = z.object({
  label: z.string().meta({ widget: 'text', label: 'Pestaña', localized: true }),
  content: richTextNode.meta({ widget: 'richtext', label: 'Contenido', localized: true }),
})

export const tabsBlock = blockBase.extend({
  type: z.literal('tabs'),
  // Sin .min(1): igual que faq.items, un bloque recién añadido debe poder
  // guardarse como borrador vacío (lección del ROADMAP).
  tabs: z.array(tabItem).default([]).meta({ widget: 'array', label: 'Pestañas' }),
  variant: z.enum(['underline', 'pill']).meta({ widget: 'select', label: 'Variante' }),
})

export type TabsBlock = z.infer<typeof tabsBlock>

// Instancia de ejemplo (tarea 34 / menú "Añadir bloque" / preview de la web
// de docs, tarea 69): forma FLAT, validada contra `tabsBlock`.
export const tabsSample: TabsBlock = {
  _uid: 'sample',
  type: 'tabs',
  hidden: false,
  variant: 'underline',
  tabs: [
    {
      label: 'Características',
      content: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Contenido de ejemplo.' }] }],
      },
    },
    {
      label: 'Precio',
      content: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Otro contenido.' }] }],
      },
    },
  ],
}

// v1: sin migraciones todavía.
export const tabsMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
