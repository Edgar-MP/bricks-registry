# tabs

Pestañas con contenido richtext por pestaña. Dos variantes visuales:
`underline` (subrayado bajo la pestaña activa) y `pill` (fondo sólido en la
pestaña activa). Progresivo: la primera pestaña se ve sin JS; la
conmutación entre pestañas es una mejora que se añade con un script mínimo
(patrón ARIA APG de tabs, navegación con flechas incluida).

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `tabs` | array de `{ label, content }` | Una entrada por pestaña. `label` es texto localizado; `content` es richtext localizado. |
| `variant` | `underline` \| `pill` | Estilo visual de las pestañas |

## Instalar

```sh
bricks add tabs
```

Copia `schema.ts` → `packages/schema/src/blocks/tabs.ts` y `TabsBlock.astro`
→ `apps/front/src/components/blocks/TabsBlock.astro`. Después, registro
manual (a propósito, estilo shadcn/ui):

1. Añadir `tabsBlock`/`tabsMigrations`/`tabsSample` a
   `packages/schema/src/blocks/index.ts`.
2. Añadir el caso `'tabs'` al resolver en
   `apps/front/src/components/blocks/BlockBody.astro`.

## Dependencias del proyecto destino

Este bloque asume que el proyecto ya tiene (infraestructura compartida, no
ficheros del bloque): `packages/schema/src/blocks/base.ts` y el componente
`apps/front/src/components/richtext/RichText.astro`.
