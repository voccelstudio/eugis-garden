// Determina si un item debe usar un input numérico editable en lugar del
// stepper + / -. Aplica a medidas (m², m³, ml) y a items marcados editable:
// por ejemplo macetas, donde conviene tipear la cantidad directamente.
export function isEditable(item) {
  return item != null && (item.editable === true || ['m²', 'm³', 'ml'].includes(item.unidad))
}

// Formatea cantidades evitando ruido de decimales en floats (p. ej. 0.1 + 0.2).
export function fmt(n) {
  if (typeof n !== 'number' || isNaN(n)) return '0'
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}
