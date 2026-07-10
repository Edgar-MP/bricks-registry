// Instancia de ejemplo para preview en vivo (tarea 69) y el menú "Añadir
// bloque" del admin. Debe validar contra `tabsBlock` (ver schema.ts).
export const sample = {
  _uid: 'sample',
  type: 'tabs',
  hidden: false,
  variant: 'underline',
  tabs: [
    {
      label: 'Características',
      content: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Contenido de ejemplo.' }] }],
      },
    },
    {
      label: 'Precio',
      content: {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Otro contenido.' }] }],
      },
    },
  ],
}
