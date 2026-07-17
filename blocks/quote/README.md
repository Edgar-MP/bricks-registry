# quote

Cita o pull-quote para separar tramos largos de texto. Dos variantes:
`plain` (discreta, mismo estilo que una cita del rich text) y `boxed`
(destacado editorial a toda anchura, pensado para resaltar una frase entre
bloques de texto/imagen — no para sustituir una cita corta dentro de un
párrafo, que ya cubre el rich text).

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `text` | texto largo, localizado | Cita |
| `author` | texto, localizado, opcional | Autor o fuente |
| `variant` | `plain` \| `boxed` | Tratamiento visual |

## Instalar

```sh
bricks add quote
```

Copia `schema.ts` → `packages/schema/src/blocks/quote.ts` y `QuoteBlock.astro`
→ `apps/front/src/components/blocks/QuoteBlock.astro`. Sin campos
`media`/`reference`: no requiere hidratación en `content.ts`. Auto-registro
(salvo `--manual`): añade `quoteBlock`/`quoteMigrations`/`quoteSample` a
`packages/schema/src/blocks/index.ts` y el caso `'quote'` al resolver en
`apps/front/src/components/blocks/BlockBody.astro`.

## Dependencias del proyecto destino

Ninguna más allá de `packages/schema/src/blocks/base.ts` (todo bloque la
asume) — no usa `Button`/`OptimizedImage` ni otra infraestructura compartida.
