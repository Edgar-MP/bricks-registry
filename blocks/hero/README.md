# hero

Cabecera de página: título, subtítulo, imagen de fondo opcional y botón de
llamada a la acción. Dos variantes: `centered` (imagen de fondo con overlay,
texto centrado encima) y `split` (imagen y texto en columnas, se apilan en
móvil).

> Nota: `hero` viene incluido como bloque **core** en bricks-cms — no hace
> falta instalarlo en un proyecto nuevo. Se mantiene aquí como bloque de
> ejemplo para validar el mecanismo de `bricks add` (fase L, tarea 66/67).
> Los bloques reales de marketplace (fase K) se irán publicando aquí.

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto, localizado | Título principal |
| `subtitle` | texto largo, localizado, opcional | Subtítulo |
| `image` | media (imagen), opcional | Imagen de fondo / lateral |
| `ctaLabel` | texto, localizado, opcional | Texto del botón |
| `cta` | enlace, localizado, opcional | URL + destino (misma pestaña / nueva) |
| `variant` | `centered` \| `split` | Disposición visual |

## Instalar

```sh
bricks add hero
```

Copia `schema.ts` → `packages/schema/src/blocks/hero.ts` y `HeroBlock.astro`
→ `apps/front/src/components/blocks/HeroBlock.astro`. Después, registro
manual (a propósito, estilo shadcn/ui):

1. Añadir `heroBlock`/`heroMigrations`/`heroSample` a
   `packages/schema/src/blocks/index.ts`.
2. Añadir el caso `'hero'` al resolver en
   `apps/front/src/components/blocks/BlockBody.astro`.

## Dependencias del proyecto destino

Este bloque asume que el proyecto ya tiene (son infraestructura compartida,
no ficheros del bloque): `packages/schema/src/blocks/base.ts`,
`packages/schema/src/link-field.ts`, `apps/front/src/components/ui/Button.astro`
y `apps/front/src/components/OptimizedImage.astro`.
