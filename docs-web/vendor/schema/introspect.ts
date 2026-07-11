// VENDORIZADO desde bricks-cms/packages/schema/src/introspect.ts — copia manual,
// no hay mecanismo automático de sync. Si el original cambia en bricks-cms,
// hay que volver a copiarlo aquí a mano (ver docs-web/README.md).

import { z } from 'zod'
import { blockSchema } from './blocks/index.ts'

// Introspección de schemas para el renderizador automático de formularios
// (decisión 5): la UI NO deriva del tipo Zod (imposible: un z.string() puede ser
// texto, url o color) sino de la metadata EXPLÍCITA `widget`/`label` que cada
// campo declara. Este módulo es la única lectura runtime de esa metadata; la
// admin no toca los schemas directamente.

export interface FieldInfo {
  name: string
  widget: string
  label: string
  localized: boolean
  optional: boolean
  // Solo para widget 'select': los valores del enum.
  enumOptions: string[] | null
  // Solo para widget 'array': los campos de CADA item, introspeccionados del
  // schema del elemento (mismo fieldsOf recursivo, sin registro paralelo —
  // ver ArrayInput.tsx en el admin, gemelo de BlocksEditor pero para objetos
  // que no son bloques del lienzo, p. ej. `faq.items`, `gallery.images`).
  itemFields: FieldInfo[] | null
  // La metadata completa (mediaType, refType, multiple…) para widgets que
  // necesitan más contexto.
  meta: Record<string, unknown>
}

// Campos de plataforma que el editor no rellena (los pone la admin al crear la
// instancia, o se controlan con un botón dedicado, como `hidden`): se
// excluyen del formulario automático.
const PLATFORM_FIELDS = new Set(['_uid', 'type', 'hidden'])

// optional/default/nullable envuelven al schema real; la metadata puede estar
// en cualquiera de las capas. OJO: en Zod 4 los arrays también tienen .unwrap()
// (devuelve el elemento) y NO hay que atravesarlos.
const WRAPPER_TYPES = new Set(['optional', 'nullable', 'default', 'readonly'])

function unwrap(field: z.ZodType): z.ZodType {
  let current = field
  while (
    WRAPPER_TYPES.has((current.def as { type: string }).type) &&
    'unwrap' in current &&
    typeof (current as z.ZodOptional).unwrap === 'function'
  ) {
    current = (current as z.ZodOptional).unwrap() as z.ZodType
  }
  return current
}

function fieldInfo(name: string, field: z.ZodType): FieldInfo | null {
  const inner = unwrap(field)
  const meta = (field.meta?.() ?? inner.meta?.() ?? {}) as Record<string, unknown>
  if (typeof meta.widget !== 'string' || typeof meta.label !== 'string') {
    // Sin metadata explícita no hay formulario: mejor fallar visible en la
    // admin que adivinar un widget (decisión 5).
    return null
  }
  if (meta.widget === 'computed') {
    // Campo que rellena el delivery al hidratar (p. ej. `items` del bloque
    // `list`): vacío en almacenamiento, nunca se pinta en el formulario.
    return null
  }
  const def = field.def as { type: string }
  const innerDef = inner.def as { type: string }
  return {
    name,
    widget: meta.widget,
    label: meta.label,
    localized: meta.localized === true,
    optional: def.type === 'optional' || def.type === 'default',
    enumOptions: innerDef.type === 'enum' ? (inner as z.ZodEnum).options.map(String) : null,
    itemFields:
      meta.widget === 'array' && innerDef.type === 'array'
        ? fieldsOf((inner as z.ZodArray<z.ZodType>).element as z.ZodType)
        : null,
    meta,
  }
}

// Campos de formulario de un schema de objeto (tipo de contenido, envoltura o bloque).
export function fieldsOf(schema: z.ZodType): FieldInfo[] {
  const obj = unwrap(schema)
  if (!('shape' in obj)) return []
  const fields: FieldInfo[] = []
  for (const [name, field] of Object.entries((obj as z.ZodObject).shape)) {
    if (PLATFORM_FIELDS.has(name)) continue
    const info = fieldInfo(name, field as z.ZodType)
    if (info) fields.push(info)
  }
  return fields
}

// Inventario de bloques y sus campos, desde la discriminated union (la union ES
// el inventario; no hay registro paralelo).
export function blockTypes(): string[] {
  return blockSchema.options.map((option) => (option.shape.type as z.ZodLiteral<string>).value)
}

export function blockFieldsFor(type: string): FieldInfo[] {
  const option = blockSchema.options.find(
    (candidate) => (candidate.shape.type as z.ZodLiteral<string>).value === type,
  )
  return option ? fieldsOf(option) : []
}
