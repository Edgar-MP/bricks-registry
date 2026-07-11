// Los iframes de preview (mismo origen) no tienen altura intrínseca — un
// iframe con `display:none` (p. ej. una pestaña de variante oculta) no
// calcula layout interno, así que hay que releer la altura cada vez que se
// hace visible, no solo en su evento 'load'.
export function syncIframeHeight(iframe: HTMLIFrameElement) {
  try {
    const doc = iframe.contentDocument
    const height = doc?.documentElement.scrollHeight
    if (height && height > 0) iframe.style.height = `${height}px`
  } catch {
    // Mismo origen esperado siempre; si algo raro pasa, no romper la página.
  }
}
