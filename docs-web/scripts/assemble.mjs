#!/usr/bin/env node
// Ensambla docs-web/.generated/ (nunca versionada, ver .gitignore) a partir de
// ../blocks/*/ (bricks-registry) + vendor/ (infra compartida vendorizada
// desde bricks-cms). Reproduce cómo queda un proyecto real tras `bricks add`
// — cada schema.ts aterriza junto a su `base.ts`/`link-field.ts`, cada
// *.astro junto a los componentes compartidos que su import por alias `@/`
// espera — sin tocar NUNCA el contenido de un fichero de bloque ni del
// vendor: solo se copian. Corre antes de `astro dev`/`astro build`
// (predev/prebuild en package.json); si falta, `.generated/` no existe y el
// build de Astro falla con imports que no resuelven — esa es la señal de que
// hay que correr este script primero.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const docsWebRoot = path.resolve(here, '..')
const registryRoot = path.resolve(docsWebRoot, '..')
const generatedRoot = path.join(docsWebRoot, '.generated')
const vendorRoot = path.join(docsWebRoot, 'vendor')

// Mismo cálculo kebab→camelCase/PascalCase que packages/cli/lib/register-block.js
// en bricks-cms (contrato documentado en packages/schema/docs/BLOCKS.md): un
// bloque de registro exporta `{camel}Block`/`{camel}Sample`/`{camel}Migrations`.
function deriveNames(type) {
  const parts = type.split('-')
  if (parts.some((p) => !p)) throw new Error(`tipo de bloque inválido: '${type}'`)
  const camel = parts.map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join('')
  const pascal = parts.map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  return { camel, pascal }
}

async function copyFile(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true })
  await fs.copyFile(from, to)
}

async function main() {
  await fs.rm(generatedRoot, { recursive: true, force: true })

  const registry = JSON.parse(await fs.readFile(path.join(registryRoot, 'registry.json'), 'utf8'))
  // Los paquetes (kind: 'pack', punto 90) no son bloques renderizables: fuera
  // de alcance de esta web, igual que en bricks add (bricks.js: autoRegister).
  const blocks = Object.entries(registry.blocks).filter(([, block]) => block.kind !== 'pack')

  const schemaBlocksDir = path.join(generatedRoot, 'schema', 'blocks')
  const componentsBlocksDir = path.join(generatedRoot, 'components', 'blocks')

  const imports = []
  const union = []
  const samples = []
  const descriptions = []

  for (const [name, block] of blocks) {
    const { camel, pascal } = deriveNames(name)

    // No se asume el nombre de fichero: se lee de `files` (misma fuente que
    // usa `bricks add`), solo se reconoce por extensión.
    const schemaFile = block.files.find((f) => f.from.endsWith('/schema.ts'))
    const astroFile = block.files.find((f) => f.from.endsWith('.astro'))
    if (!schemaFile || !astroFile) {
      throw new Error(`bloque '${name}': registry.json no declara schema.ts/*.astro en 'files'`)
    }

    await copyFile(
      path.join(registryRoot, schemaFile.from),
      path.join(schemaBlocksDir, `${name}.ts`),
    )
    await copyFile(
      path.join(registryRoot, astroFile.from),
      path.join(componentsBlocksDir, `${pascal}Block.astro`),
    )

    imports.push(`import { ${camel}Block, ${camel}Sample } from './${name}.ts'`)
    union.push(`  ${camel}Block,`)
    samples.push(`  ${JSON.stringify(name)}: ${camel}Sample,`)
    descriptions.push(`  ${JSON.stringify(name)}: ${JSON.stringify(block.description)},`)
  }

  // Generado (no vendorizado): la union/los mapas se recalculan en cada
  // ensamblado a partir del registry.json actual — añadir un bloque nuevo no
  // requiere tocar nada aquí, solo volver a correr `assemble`.
  const indexSource = `import { z } from 'zod'
${imports.join('\n')}

export const blockSchema = z.discriminatedUnion('type', [
${union.join('\n')}
])

export const blockSamples: Record<string, Record<string, unknown>> = {
${samples.join('\n')}
}

export const blockDescriptions: Record<string, string> = {
${descriptions.join('\n')}
}
`
  await fs.mkdir(schemaBlocksDir, { recursive: true })
  await fs.writeFile(path.join(schemaBlocksDir, 'index.ts'), indexSource)

  // Infra compartida vendorizada, en las rutas exactas que los imports de los
  // bloques esperan (alias `@/` → .generated/components, relativos dentro de
  // schema/blocks/*.ts → ./base.ts y ../link-field.ts).
  await copyFile(
    path.join(vendorRoot, 'schema', 'base.ts'),
    path.join(schemaBlocksDir, 'base.ts'),
  )
  await copyFile(
    path.join(vendorRoot, 'schema', 'link-field.ts'),
    path.join(generatedRoot, 'schema', 'link-field.ts'),
  )
  await copyFile(
    path.join(vendorRoot, 'schema', 'introspect.ts'),
    path.join(generatedRoot, 'schema', 'introspect.ts'),
  )
  await copyFile(
    path.join(vendorRoot, 'components', 'ui', 'Button.astro'),
    path.join(generatedRoot, 'components', 'ui', 'Button.astro'),
  )
  await copyFile(
    path.join(vendorRoot, 'components', 'OptimizedImage.astro'),
    path.join(generatedRoot, 'components', 'OptimizedImage.astro'),
  )
  await copyFile(
    path.join(vendorRoot, 'components', 'richtext', 'RichText.astro'),
    path.join(generatedRoot, 'components', 'richtext', 'RichText.astro'),
  )
  await copyFile(
    path.join(vendorRoot, 'components', 'richtext', 'MarkedText.astro'),
    path.join(generatedRoot, 'components', 'richtext', 'MarkedText.astro'),
  )

  console.log(`✓ .generated/ ensamblado (${blocks.length} bloque(s)).`)
}

main().catch((error) => {
  console.error(`✗ assemble falló: ${error.message}`)
  process.exit(1)
})
