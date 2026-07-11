import { blockFieldsFor, type FieldInfo } from '@/schema/introspect.ts'
import { blockSamples } from '@/schema/blocks/index.ts'
import { hydrateSample } from './hydrate.ts'

export interface VariantInfo {
  fields: FieldInfo[]
  baseSample: Record<string, unknown>
  variantField: FieldInfo | undefined
  values: Array<string | null>
}

// Selector de variantes: cualquier campo `widget: 'select'` con enum (hoy
// siempre se llama `variant`, pero no se asume el nombre — ver introspect.ts).
// Compartido entre la página de bloque (pestañas + iframes) y la ruta de
// preview (getStaticPaths), para no duplicar la detección.
export function getVariantInfo(name: string): VariantInfo {
  const fields = blockFieldsFor(name)
  const baseSample = blockSamples[name] as Record<string, unknown>
  const variantField = fields.find((f) => f.widget === 'select' && f.enumOptions != null)
  const values = variantField?.enumOptions ?? [null]
  return { fields, baseSample, variantField, values }
}

export function slugFor(value: string | null): string {
  return value ?? 'default'
}

export function sampleForVariant(name: string, value: string | null): Record<string, unknown> {
  const { fields, baseSample, variantField } = getVariantInfo(name)
  const sample = value && variantField ? { ...baseSample, [variantField.name]: value } : baseSample
  return hydrateSample(sample, fields)
}
