import { deriveNames } from './derive-names.ts'

// El componente generado (.generated/components/blocks/*.astro) se resuelve
// por glob porque el nombre depende del bloque en cuestión — no hay un import
// estático fijo posible. `import.meta.glob` resuelve el patrón relativo a
// ESTE fichero (no al que llama a la función), así que es seguro compartirlo
// entre la página de bloque y la ruta de preview.
const blockModules = import.meta.glob('../../.generated/components/blocks/*.astro', {
  eager: true,
}) as Record<string, { default: unknown }>

export function resolveBlockComponent(name: string): unknown {
  const { pascal } = deriveNames(name)
  const entry = Object.entries(blockModules).find(([modPath]) =>
    modPath.endsWith(`/${pascal}Block.astro`),
  )
  if (!entry) throw new Error(`no se encontró el componente generado de '${name}'`)
  return entry[1].default
}
