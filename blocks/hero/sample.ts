// Instancia de ejemplo para preview en vivo (tarea 69) y para el menú "Añadir
// bloque" del admin. Forma FLAT (un solo idioma), no la de almacenamiento —
// debe validar contra `heroBlock` (ver schema.ts). Cero magia: mantenido a
// mano junto al schema, igual que `heroSample` en el monorepo de origen.
export const sample = {
  _uid: 'sample',
  type: 'hero',
  hidden: false,
  title: 'Un título que capta la atención',
  subtitle: 'Un subtítulo con algo más de contexto',
  variant: 'centered',
}
