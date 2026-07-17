import { z } from 'zod'
import { blockBase } from './base.ts'
import { linkValue } from '../link-field.ts'

// Hero editorial brutalista (fork Gasteizko Jaiak, diseño Stitch): DISTINTO
// del `hero` core (centrado/split, un único bloque con la imagen de fondo o
// al lado). Este replica exactamente el hero del mockup real: antetítulo +
// titular + entradilla + crédito de foto en una caja de color a todo ancho,
// y la imagen destacada FUERA de la caja, a todo ancho, debajo — con efecto
// blanco y negro → color al pasar el ratón (detalle del diseño original).
export const heroEditorialBlock = blockBase.extend({
  type: z.literal('hero-editorial'),
  kicker: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Antetítulo (ej. "Fiesta Mayor 2026")', localized: true }),
  title: z.string().meta({ widget: 'text', label: 'Titular', localized: true }),
  lead: z.string().optional().meta({ widget: 'textarea', label: 'Entradilla', localized: true }),
  photoCredit: z
    .string()
    .optional()
    .meta({ widget: 'text', label: 'Crédito de foto (ej. "Foto: Jon Ander Bengoetxea")', localized: true }),
  image: z
    .uuid()
    .optional()
    .meta({ widget: 'media', label: 'Imagen destacada', mediaType: 'image' }),
  // Enlace opcional para que todo el hero navegue a la crónica/reportaje
  // completo que está destacando — sin enlace, el hero no es clicable (uso
  // puramente editorial, como portada).
  link: linkValue.optional().meta({ widget: 'link', label: 'Enlace (opcional)', localized: true }),
})

export type HeroEditorialBlock = z.infer<typeof heroEditorialBlock>

// Instancia de ejemplo (misma convención que hero.ts).
export const heroEditorialSample: HeroEditorialBlock = {
  _uid: 'sample',
  type: 'hero-editorial',
  hidden: false,
  kicker: 'Fiesta Mayor 2026',
  title: 'La celebración vuelve a las calles: crónica de un inicio espectacular',
  lead: 'Vitoria-Gasteiz se prepara para una semana de tradición y fiesta.',
}

// v1: sin migraciones todavía.
export const heroEditorialMigrations: Record<
  string,
  (block: Record<string, unknown>) => Record<string, unknown>
> = {}
