import { listAssets, type Asset } from '../../../assets'
import type { EntryPreviewProps } from '../../../form/entry-preview-registry'
import { useEffect, useState } from 'react'

// Preview en vivo de la tarjeta de un miembro (petición de producto): el
// campo Foto ya se ve al elegirla, pero no cómo queda junto al resto — mismo
// patrón que SerpPreview (solo lectura, lee directo del `content` del
// formulario, sin intentar igualar el theming exacto del front). Se registra
// en el barrel de admin vía `bricks add personal` (ver
// packages/cli/lib/register-admin-preview.js en bricks-cms), nunca se
// importa a mano.
const RED_LABEL: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  instagram: 'Instagram',
  facebook: 'Facebook',
  web: 'Web',
}

interface RedSocial {
  red: string
  url: string
}

function resolveText(value: unknown, locale: string, mainLocale: string): string {
  if (typeof value === 'string') return value
  const map = value as Record<string, unknown> | undefined
  const resolved = map?.[locale] ?? map?.[mainLocale]
  return typeof resolved === 'string' ? resolved : ''
}

export default function MiembroCardPreview({ content, locale, mainLocale }: EntryPreviewProps) {
  const [assets, setAssets] = useState<Asset[] | null>(null)

  useEffect(() => {
    listAssets()
      .then(setAssets)
      .catch(() => setAssets([]))
  }, [])

  const nombre = typeof content.nombre === 'string' ? content.nombre : ''
  const puesto = resolveText(content.puesto, locale, mainLocale)
  const bio = resolveText(content.bio, locale, mainLocale)
  const email = typeof content.email === 'string' ? content.email : ''
  const telefono = typeof content.telefono === 'string' ? content.telefono : ''
  const redes = Array.isArray(content.redesSociales) ? (content.redesSociales as RedSocial[]) : []
  const foto = assets?.find((asset) => asset.id === content.foto) ?? null

  return (
    <div className="mb-4 rounded-lg border border-[#e3e3e3] bg-white p-3">
      <p className="mb-2 text-xs font-medium text-[#8a8a8a]">Vista previa de la tarjeta</p>
      <div className="flex flex-col gap-3 rounded-lg border border-[#e3e3e3] p-4">
        <div className="flex items-center gap-3">
          {foto ? (
            <img src={foto.url} alt="" className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-[#d5d5d5] text-[10px] text-[#b5b5b5]">
              sin foto
            </span>
          )}
          <div>
            <p className="font-medium text-[#1a1a1a]">{nombre || '(sin nombre)'}</p>
            <p className="text-sm text-[#616161]">{puesto || '(sin puesto)'}</p>
          </div>
        </div>
        {bio && <p className="text-sm text-[#616161]">{bio}</p>}
        {(email || telefono) && (
          <p className="text-sm text-[#616161]">{[email, telefono].filter(Boolean).join(' · ')}</p>
        )}
        {redes.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {redes.map((red, i) => (
              <span key={i} className="text-sm text-[#005bd3]">
                {RED_LABEL[red.red] ?? red.red}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
