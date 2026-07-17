# reportajes

Vertical editorial: foto-ensayos/reportajes con routing propia
(`/reportajes/:slug`), separados de las noticias (`post`, `/actualidad/:slug`)
en el fork Gasteizko Jaiak. Sin bloques nuevos: el cuerpo se compone con los
bloques ya existentes (`gallery`, `cta-banner`, `quote`, `text`, `image`).

## Tipo de contenido

### `reportaje` (`/reportajes/:slug`)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `title` | texto, localizado | Título del reportaje |
| `cover` | media (imagen), opcional | Portada — usada en tarjetas de listado (bloque `list`) y cabecera |
| `lead` | texto largo, localizado | Entradilla (resumen destacado bajo el título) |
| `photographer` | texto, localizado, opcional | Crédito de fotografía ("Foto: …") |
| `credits` | array de `{ entidad, persona }` | Agradecimientos (tabla en la cabecera) |
| `blocks` | bloques | Cuerpo — aquí se añaden `gallery`/`cta-banner`/`quote`/etc. |

`ReportajeLayout.astro` (en el fork, no en este paquete: es composición de
marca, no bloque reutilizable) pinta portada + título + entradilla +
fotógrafo + tabla de agradecimientos, y debajo los `blocks`.

## Instalar

```sh
pnpm bricks add reportajes
```

Copia `types/reportaje.ts` → `packages/schema/src/types/reportaje.ts` y
auto-registra el tipo (prettier + `tsc --noEmit` + `astro check`, revierte
todo si algo falla). Sin bloques propios que registrar — usa los del core.

### Después de instalar

`bricks add` registra el TIPO (routing, schema) pero no crea el layout de
front: hay que añadir `ReportajeLayout.astro` en
`apps/front/src/layouts/` y su caso en
`apps/front/src/components/EntryRenderer.astro`
(`entry.type === 'reportaje'`) a mano — es composición de marca del fork, no
algo que el paquete pueda traer (cada proyecto lo compone distinto).

## Fuera de alcance (v1)

- **Sin bloques propios**: se evaluó un bloque `galeria-reportaje` dedicado,
  pero `gallery` (core) ya cubre el caso — añadir uno nuevo habría sido
  duplicar funcionalidad sin necesidad real.
- **Sin `installed_packs`/versionado**: igual que el resto de paquetes v1.

## Desinstalar

```sh
pnpm bricks remove reportajes --force
```

Sin bloques que revertir a mano (a diferencia de `restaurante`): solo el tipo.
