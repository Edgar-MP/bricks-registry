// Mismo cálculo que scripts/assemble.mjs y packages/cli/lib/register-block.js
// en bricks-cms (contrato de packages/schema/docs/BLOCKS.md).
export interface BlockNames {
  camel: string
  pascal: string
}

export function deriveNames(type: string): BlockNames {
  const parts = type.split('-')
  if (parts.some((p) => !p)) throw new Error(`tipo de bloque inválido: '${type}'`)
  const camel = parts.map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join('')
  const pascal = parts.map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  return { camel, pascal }
}
