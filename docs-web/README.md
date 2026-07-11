# docs-web

Web pública de documentación de bloques (fase L, tarea 69): una página por
bloque del catálogo (`../registry.json`) con preview en vivo del componente
`.astro` real, selector de variantes, tabla de campos y el comando
`bricks add <nombre>` copiable.

## Cómo funciona

Los ficheros de bloque en `../blocks/<nombre>/` están escritos para la ruta
que tendrán en un proyecto real tras `bricks add` (p. ej. `schema.ts` importa
`./base.ts` y `../link-field.ts` como si viviera en
`packages/schema/src/blocks/`), no para su ubicación de almacenamiento en
este repo. Por eso, antes de `dev`/`build`, `scripts/assemble.mjs` genera
`.generated/` (no versionada): copia cada bloque a la ruta que tendría en un
proyecto real, junto a `vendor/` (copias vendorizadas y mantenidas a mano de
`base.ts`, `link-field.ts`, `introspect.ts`, y los componentes UI/richtext
compartidos que los bloques asumen ya presentes). Nunca se modifica ningún
fichero de bloque — solo se copian.

Añadir un bloque nuevo a `../registry.json`/`../blocks/` hace que su página
aparezca sola en el siguiente build, sin tocar nada de `docs-web/`.

## Desarrollo

```sh
npm install
npm run dev     # corre assemble.mjs y levanta astro dev
npm run build   # corre assemble.mjs y astro build (dist/, deploy estático)
```

## Mantenimiento de `vendor/`

Los ficheros en `vendor/` son copias manuales de piezas de bricks-cms
(`packages/schema/src/{blocks/base,link-field,introspect}.ts`,
`apps/front/src/components/{ui/Button,OptimizedImage,richtext/*}.astro`,
`apps/front/src/styles/global.css`). Si el original cambia en bricks-cms, hay
que volver a copiarlo aquí a mano — no hay sincronización automática.
Superficie pequeña (8 ficheros), cambia poco.
