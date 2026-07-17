# photo-grid

Galería editorial brutalista, pensada para foto-ensayos/reportajes
documentales. A diferencia de `gallery` (core): pie de foto y crédito van
**siempre visibles** bajo cada imagen (no solo en un lightbox), con un índice
numerado por foto. Sin lightbox — el punto es leer el pie de foto en
contexto, no ampliar la imagen.

## Campos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `images` | array de `{ image, caption?, credit? }` | Fotos del ensayo, en orden |
| `columns` | `2` \| `3` | Columnas en escritorio |

`credit` es el crédito de ESA foto (fotógrafo), distinto del crédito general
de portada de un `reportaje` (campo `photographer` del tipo, ver pack
`reportajes`) — un foto-ensayo puede combinar fotos de varios autores.

## Instalar

```sh
bricks add photo-grid
```

Copia `schema.ts` → `packages/schema/src/blocks/photo-grid.ts` y
`PhotoGridBlock.astro` → `apps/front/src/components/blocks/PhotoGridBlock.astro`.

### Hidratación de `content.ts`

`images[].image` es un campo `media` DENTRO de un array (`widget: 'array'`),
igual que `menu-platos`/`menu-bebidas` del pack `restaurante`: demasiado
variable para generarse de forma fiable, así que `bricks add` avisa al
terminar y hay que añadirlo a mano:

```ts
export type HydratedPhotoGridBlock = Omit<PhotoGridBlock, 'images'> & {
  images: (Omit<PhotoGridBlock['images'][number], 'image'> & { image: HydratedAsset | null })[]
}
```

Y añadir `HydratedPhotoGridBlock` a la unión `HydratedBlock` (y a la lista de
exclusión de `Exclude<Block, ...>`), mismo patrón que `HydratedGalleryBlock`.

## Dependencias del proyecto destino

`packages/schema/src/blocks/base.ts`, `apps/front/src/components/OptimizedImage.astro`.
