# hero-editorial

Hero de portada brutalista (fork Gasteizko Jaiak, diseño Claude Design): dos
columnas a igual altura — IZQUIERDA caja de color con antetítulo + titular +
entradilla + crédito de foto; DERECHA imagen a sangre con efecto blanco y
negro → color al pasar el ratón. Distinto del `hero` core (centrado/split):
este es el hero real de la home del diseño, para portadas editoriales.

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `kicker` | texto, localizado, opcional | Antetítulo (ej. "Fiesta Mayor 2026") |
| `title` | texto, localizado | Titular |
| `lead` | texto largo, localizado, opcional | Entradilla |
| `photoCredit` | texto, localizado, opcional | Crédito de foto (ej. "Foto: Jon Ander Bengoetxea") |
| `image` | media (imagen), opcional | Imagen destacada, a todo ancho debajo de la caja |
| `link` | enlace, localizado, opcional | Si se rellena, todo el hero navega a la crónica/reportaje completo |

## Instalar

```sh
bricks add hero-editorial
```

Copia `schema.ts` → `packages/schema/src/blocks/hero-editorial.ts` y
`HeroEditorialBlock.astro` → `apps/front/src/components/blocks/HeroEditorialBlock.astro`.
Auto-registro (salvo `--manual`): añade `heroEditorialBlock`/
`heroEditorialMigrations`/`heroEditorialSample` a
`packages/schema/src/blocks/index.ts`, el caso `'hero-editorial'` en
`apps/front/src/components/blocks/BlockBody.astro`, y (por tener un campo
`image` directo) `HydratedHeroEditorialBlock` en `apps/front/src/lib/content.ts`.

## Dependencias del proyecto destino

`packages/schema/src/blocks/base.ts`, `packages/schema/src/link-field.ts`,
`apps/front/src/components/OptimizedImage.astro`.
