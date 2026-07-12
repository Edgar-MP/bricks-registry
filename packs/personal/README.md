# personal

Equipo/personal de una empresa: una ficha de persona (contenido estructurado,
sin routing) y un bloque para listarlas en cualquier página ("Nuestro
equipo").

## Tipos de contenido

### `miembro` (sin routing)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | texto | Nombre de la persona (no localizado, nombre propio) |
| `puesto` | texto, localizado | Cargo/puesto, ej. "Director" |
| `foto` | media (imagen), opcional | Foto de la persona |
| `bio` | texto largo, localizado, opcional | Biografía corta |
| `email` | texto, opcional | Contacto (no localizado) |
| `telefono` | texto, opcional | Contacto (no localizado) |
| `redesSociales` | array de `{ red, url }` | `red`: `linkedin`\|`twitter`\|`instagram`\|`facebook`\|`web` |

## Bloques

### `equipo`

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `titulo` | texto, localizado, opcional | Título del bloque |
| `miembros` | referencia múltiple a `miembro` | Lista plana; el orden de visualización es el orden de selección del editor |

Sin agrupación por sección/departamento (decisión: paquete sencillo,
ampliable después si hace falta — ver "Fuera de alcance").

> Las redes sociales de cada miembro se pintan como enlaces de texto; la foto
> de cada miembro (`miembro.foto`) sí se pinta en el listado porque es un
> campo directo de la referencia hidratada a un nivel (a diferencia del caso
> `plato.foto` en `menu-platos`, que no se pinta por estar anidado dentro de
> una sección — aquí `miembros` es una referencia directa del bloque, sin
> sección intermedia).

## Instalar

```sh
pnpm bricks add personal
```

Copia los 3 archivos y auto-registra el tipo `miembro` + el bloque `equipo`
(prettier + `tsc --noEmit` + `astro check`, revierte todo si algo falla).

### Paso manual: vista hidratada del front

El bloque `equipo` tiene un campo `reference`, así que
`apps/front/src/lib/content.ts` necesita su `HydratedEquipoBlock` a mano
(igual que `HydratedCartaEmbedBlock`) antes de poder usarlo en el front:

```ts
import type { EquipoBlock, Miembro } from '@bricks/schema'

type HydratedRef<T> = (T & { id: string; type: string }) | null

export type HydratedEquipoBlock = Omit<EquipoBlock, 'miembros'> & {
  miembros: HydratedRef<Miembro>[]
}
```

Y añadir `HydratedEquipoBlock` a la unión `HydratedBlock` (y a la lista de
exclusión de `Exclude<Block, ...>`), mismo patrón que
`HydratedCartaEmbedBlock`/`HydratedHeroBlock` ya existentes.

## Fuera de alcance (v1)

- **Sin agrupación por departamento/sección**: si hace falta más adelante,
  seguir el patrón de `menu-platos.secciones` (secciones libres + referencia
  múltiple por sección) del paquete `restaurante`.
- **Sin página individual por miembro**: `routing: null`, solo se ve dentro
  del bloque `equipo` — mismo criterio que `plato`/`bebida`.
- **Sin seed/contenido de ejemplo**: el CLI no tiene sesión/acceso a BD.
- **Sin `installed_packs`/versionado**: igual que el resto de paquetes v1.

## Desinstalar

```sh
pnpm bricks remove personal --force
```

Como `equipo` usa `reference`, primero hay que revertir a mano el
`HydratedEquipoBlock` añadido en `content.ts` (la unión `Block` lo sigue
importando desde `@bricks/schema` hasta que se borre, y `astro check`
fallará si no se hace) — mismo límite ya documentado para cualquier bloque
con campos `media`/`reference` (`hero`, `image`, `gallery`, `cta-banner`,
`carta-embed`).

## Dependencias del proyecto destino

Igual que `hero`/`restaurante`: `packages/schema/src/blocks/base.ts`,
`apps/front/src/components/OptimizedImage.astro`,
`apps/front/src/components/ui/Card.astro`.
