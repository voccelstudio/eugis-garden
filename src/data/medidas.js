// Determina si un item debe usar un input numérico editable en lugar del
// stepper + / -. Aplica a medidas (m², m³, ml) y a items marcados editable:
// por ejemplo macetas, donde conviene tipear la cantidad directamente.
export function isEditable(item) {
  return item != null && (item.editable === true || ['m²', 'm³', 'ml'].includes(item.unidad))
}
