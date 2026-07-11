import type { FieldInfo } from '@/schema/introspect.ts'

// Foto real de placeholder (Picsum Photos, servicio público gratuito tipo
// "Lorem Ipsum" para fotos — sin API key, hotlink directo) para cualquier
// campo `widget: 'media'`, en vez de un SVG gris. Seed fija por bloque+campo
// para que el resultado sea reproducible entre builds.
//
// Se aplica SIEMPRE, exista o no valor en el `sample` — los samples dejan los
// campos de imagen opcionales sin definir (p. ej. hero.ts), pero el preview
// de documentación debe mostrar cómo se ve el bloque CON imagen (es su
// elemento visual principal), no el caso vacío.
function placeholderAsset(seed: string) {
  return {
    url: `https://picsum.photos/seed/${seed}/800/450`,
    alt: '',
    width: 800,
    height: 450,
    variants: {},
  }
}

export function hydrateSample(
  sample: Record<string, unknown>,
  fields: FieldInfo[],
): Record<string, unknown> {
  const hydrated = { ...sample }
  for (const field of fields) {
    if (field.widget === 'media') {
      hydrated[field.name] = placeholderAsset(`bricks-registry-${sample.type}-${field.name}`)
    }
  }
  return hydrated
}
