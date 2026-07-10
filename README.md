# bricks-registry

Catálogo externo de bloques instalables para [bricks-cms](https://github.com/Edgar-MP/bricks-cms)
(modelo copy-and-own, estilo shadcn/ui). El CLI (`packages/cli` en bricks-cms)
y el marketplace del admin consultan este repo por HTTP para listar y
descargar bloques — el proyecto destino no depende de este repo en tiempo de
build, solo en el momento de `bricks add`.

## Estructura

```
registry.json           # catálogo: nombre, versión, categoría, ficheros
registry.schema.json    # validación del catálogo
blocks/
  <nombre>/
    schema.ts           # schema Zod del bloque (packages/schema/src/blocks/*)
    <Nombre>Block.astro # componente de render (apps/front/.../blocks/*)
    sample.ts           # instancia de ejemplo (preview / menú admin)
    README.md           # descripción corta, campos, cómo instalar
```

`docs-web/` (web pública de documentación de bloques con preview en vivo)
llegará en una fase posterior de este mismo repo.

## Versionado

Sin publicación a npm: el CLI descarga los ficheros por HTTP directamente de
`raw.githubusercontent.com/Edgar-MP/bricks-registry/<tag>/...`. Cada versión
publicada de un bloque corresponde a un tag git de este repo (ej. `v0.1.0`).
Sin autenticación (repo público).

## Añadir un bloque nuevo al catálogo

1. Crear `blocks/<nombre>/` con `schema.ts`, `<Nombre>Block.astro`,
   `sample.ts`, `README.md`.
2. Añadir la entrada en `registry.json` (validar contra `registry.schema.json`).
3. Publicar un tag git.

**Requisito para el auto-registro:** `bricks add` completa el registro en el
proyecto destino automáticamente (por defecto — `--manual` lo desactiva). Para
que funcione, `schema.ts` **debe exportar** `{nombre}Block`, `{nombre}Migrations`
(aunque sea `{}` vacío) y `{nombre}Sample`, con `{nombre}` = el tipo en
camelCase (`tabs` → `tabsBlock`/`tabsMigrations`/`tabsSample`; `file-download` →
`fileDownloadBlock`/…). Si no se sigue la convención, la validación posterior
falla y el CLI cae al registro manual sin dejar el proyecto destino roto.

## Modelo copy-and-own

Instalar un bloque (`bricks add <nombre>`) copia sus ficheros al proyecto
destino. A partir de ahí son tuyos: las actualizaciones nunca son
automáticas, y el componente visual nunca se sobrescribe.
