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

> La foto de cada miembro (`miembro.foto`) **no** se pinta en el listado: es
> un campo `media` dentro de una referencia ya hidratada a un nivel, así que
> llega como un uuid sin resolver (decisión 13, un solo nivel de hidratación)
> — mismo límite ya documentado para `plato.foto`/`bebida.foto` en
> `menu-platos`/`menu-bebidas`. Las redes sociales sí se pintan (son texto
> plano del propio campo `redSocial.url`, no una referencia anidada).

## Instalar

```sh
pnpm bricks add personal
```

Copia los 3 archivos y auto-registra el tipo `miembro` + el bloque `equipo`,
incluida su hidratación en `apps/front/src/lib/content.ts`
(`HydratedEquipoBlock`, generada automáticamente por tener `miembros` un
campo `reference` directo — ver `packages/cli/docs/PACKS.md`, "Hidratación
automática de content.ts"). Prettier + `tsc --noEmit` + `astro check`
validan todo; revierte si algo falla. Sin pasos manuales.

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

Se desinstala solo, incluida la reversión de `HydratedEquipoBlock` en
`content.ts` — sin pasos manuales.

## Dependencias del proyecto destino

Igual que `hero`/`restaurante`: `packages/schema/src/blocks/base.ts`,
`apps/front/src/components/ui/Card.astro`.
