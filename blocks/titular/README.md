# titular

Titular de sección brutalista: rompe tramos largos de texto en un artículo o
foto-ensayo con un titular a gran tamaño. Distinto de `quote` — no atribuye la
frase a nadie (sin campo `author`), es un titular/subtítulo editorial puro.

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `kicker` | texto, localizado, opcional | Antetítulo pequeño encima del titular |
| `text` | texto, localizado | Titular |
| `variant` | `plain` \| `inverted` | `plain`: texto negro sobre el fondo de la página. `inverted`: banda a toda anchura, fondo negro y texto blanco |

## Instalar

```sh
bricks add titular
```

Copia `schema.ts` → `packages/schema/src/blocks/titular.ts` y
`TitularBlock.astro` → `apps/front/src/components/blocks/TitularBlock.astro`.
Sin campos `media`/`reference`: no requiere hidratación en `content.ts`.

## Dependencias del proyecto destino

Ninguna más allá de `packages/schema/src/blocks/base.ts`.
