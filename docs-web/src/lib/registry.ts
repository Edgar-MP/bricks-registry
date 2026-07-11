import registryJson from '../../../registry.json'

export interface RegistryBlock {
  kind?: string
  version: string
  description: string
  category: string
  files: Array<{ from: string; to: string }>
}

// Los paquetes (kind: 'pack', punto 90 de fase-L) no son bloques renderizables
// — mismo filtro que scripts/assemble.mjs.
export function listBlocks(): Array<[string, RegistryBlock]> {
  return Object.entries(registryJson.blocks as Record<string, RegistryBlock>).filter(
    ([, block]) => block.kind !== 'pack',
  )
}
