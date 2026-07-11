import type { FieldInfo } from '@/schema/introspect.ts'

// Ningún bloque core trae hoy un valor en un campo `widget: 'media'` en su
// sample (ver hero.ts/tabs.ts) — caso no ejercitado todavía. Si algún bloque
// futuro sí lo trae, sustituye el uuid crudo por un HydratedAsset fijo
// (placeholder estático en public/, sin CDN real) para que el componente
// (que espera el objeto hidratado, no el id) no rompa.
const PLACEHOLDER_ASSET = {
  url: '/placeholder.svg',
  alt: '',
  width: 800,
  height: 450,
  variants: {},
}

export function hydrateSample(
  sample: Record<string, unknown>,
  fields: FieldInfo[],
): Record<string, unknown> {
  const hydrated = { ...sample }
  for (const field of fields) {
    if (field.widget === 'media' && typeof hydrated[field.name] === 'string') {
      hydrated[field.name] = PLACEHOLDER_ASSET
    }
  }
  return hydrated
}
