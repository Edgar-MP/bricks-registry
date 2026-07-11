# restaurante

Vertical de restaurante: una carta (página con routing propia), platos y
bebidas (contenido estructurado, sin routing) y 3 bloques para componer el
menú: `carta-embed` (resumen/teaser de una carta), `menu-platos` y
`menu-bebidas` (listados por secciones).

## Tipos de contenido

### `carta` (`/carta/:slug`)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto, localizado | Título de la carta |
| `blocks` | bloques | Contenido — aquí se añaden `menu-platos`/`menu-bebidas`/`carta-embed` |

Misma forma que `page`/`post` (título + bloques): no tiene layout propio, cae
al `PageLayout` genérico del front.

### `plato` (sin routing)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | texto, localizado | Nombre del plato |
| `descripcion` | texto largo, localizado, opcional | Descripción |
| `curso` | `entrante`\|`primero`\|`segundo`\|`postre` | Fase del menú |
| `foto` | media (imagen), opcional | Foto del plato |
| `alergenos` | texto largo, localizado, opcional | Texto libre (v1, ver "Fuera de alcance") |
| `variantesPrecio` | array de `{ etiqueta, precio }` | Ej. "Ración"/8.5, "Completo"/14 |

Un solo tipo para las 4 fases del menú (`curso` las distingue) — evita 4
tipos casi idénticos.

### `bebida` (sin routing)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | texto, localizado | Nombre de la bebida |
| `descripcion` | texto largo, localizado, opcional | Descripción |
| `categoria` | `vino`\|`cerveza`\|`refresco`\|`zumo`\|`agua`\|`cafe`\|`coctel` | Categoría |
| `foto` | media (imagen), opcional | Foto |
| `variantesPrecio` | array de `{ etiqueta, precio }` | Ej. "Copa"/3, "Botella"/15; "Tercio"/2.5, "Jarra"/6 |

## Bloques

### `carta-embed`

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `carta` | referencia a `carta` | Qué carta resumir |
| `url` | url, opcional | Enlace manual a la carta completa |
| `ctaLabel` | texto, localizado, opcional | Texto del botón (solo se pinta si hay `url`) |

Pinta el título de la carta y un extracto de su primer bloque de texto, si lo
tiene. **No enlaza solo** a `/carta/:slug`: una referencia se hidrata a un
nivel (id + campos de contenido propios, sin slug/url — el slug vive en
`entry_slugs`, una tabla aparte). Para enlazar a la carta desde el menú de
navegación del sitio, usa el mecanismo ya existente (`site-config` → menú).

### `menu-platos` / `menu-bebidas`

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `titulo` | texto, localizado, opcional | Título del bloque |
| `secciones` | array de secciones | Ver abajo |

Cada sección: `titulo` (texto), `fotoDestacada` (media, opcional), y
`platos`/`bebidas` (referencia múltiple) — el editor elige a mano qué
entradas van en cada sección. Mismo mecanismo que `post.categories`
(referencia múltiple hidratada a un nivel), sin tocar el core.

> La foto de cada plato/bebida individual (`plato.foto`/`bebida.foto`) **no**
> se pinta en el listado: una referencia anidada dentro de otra referencia ya
> resuelta no se hidrata más adentro (decisión 13 — un solo nivel), así que
> llegaría como un id sin resolver. La foto por sección (`fotoDestacada`) sí
> funciona, porque es un campo del propio bloque, no de la referencia.

## Instalar

```sh
pnpm bricks add restaurante
```

Copia los 10 archivos y auto-registra los 3 tipos + 3 bloques (prettier +
`tsc --noEmit` + `astro check`, revierte todo si algo falla).

### Paso manual: vistas hidratadas del front

Los 3 bloques tienen campos `reference`, así que `apps/front/src/lib/content.ts`
necesita sus `Hydrated*Block` a mano (igual que `HydratedHeroBlock`) antes de
poder usarlos en el front:

```ts
import type { CartaEmbedBlock, MenuPlatosBlock, MenuBebidasBlock, Carta, Plato, Bebida } from '@bricks/schema'

type HydratedRef<T> = (T & { id: string; type: string }) | null

export type HydratedCartaEmbedBlock = Omit<CartaEmbedBlock, 'carta'> & {
  carta: HydratedRef<Carta>
}
export type HydratedMenuPlatosBlock = Omit<MenuPlatosBlock, 'secciones'> & {
  secciones: (Omit<MenuPlatosBlock['secciones'][number], 'fotoDestacada' | 'platos'> & {
    fotoDestacada?: HydratedAsset | null
    platos: HydratedRef<Plato>[]
  })[]
}
export type HydratedMenuBebidasBlock = Omit<MenuBebidasBlock, 'secciones'> & {
  secciones: (Omit<MenuBebidasBlock['secciones'][number], 'fotoDestacada' | 'bebidas'> & {
    fotoDestacada?: HydratedAsset | null
    bebidas: HydratedRef<Bebida>[]
  })[]
}
```

Y añadir los 3 tipos a la unión `HydratedBlock` (y a la lista de exclusión de
`Exclude<Block, ...>`), mismo patrón que `HydratedHeroBlock`/
`HydratedGalleryBlock` ya existentes.

## Fuera de alcance (v1)

- **Alérgenos como texto libre**: no existe un widget de selección múltiple
  de valores simples en el admin (solo `select` de uno o `array` de objetos
  con subcampos) — un checklist de los 14 alérgenos UE necesitaría un widget
  nuevo, que es mejora de plataforma, no de este paquete.
- **Sin seed/contenido de ejemplo**: el CLI no tiene sesión/acceso a BD.
- **Sin `installed_packs`/versionado**: igual que el resto de paquetes v1.
- **Foto por plato/bebida individual en el listado**: ver nota más arriba
  (límite real de la hidratación a un nivel, no un descuido).

## Desinstalar

```sh
pnpm bricks remove restaurante --force
```

Como los 3 bloques usan `reference`, primero hay que revertir a mano los
`Hydrated*Block` añadidos en `content.ts` (la unión `Block` los sigue
importando desde `@bricks/schema` hasta que se borren, y `astro check`
fallará si no se hace) — mismo límite ya documentado para cualquier bloque
con campos `media`/`reference` (`hero`, `image`, `gallery`, `cta-banner`).

## Dependencias del proyecto destino

Igual que `hero`/`tabs`: `packages/schema/src/blocks/base.ts`,
`apps/front/src/components/ui/Button.astro`,
`apps/front/src/components/OptimizedImage.astro`.
