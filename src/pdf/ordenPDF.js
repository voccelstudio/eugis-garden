import { jsPDF } from 'jspdf'

const MARGIN = 14
const PAGE_W = 210
const PAGE_H = 297
const CONTENT_W = PAGE_W - MARGIN * 2

const VERDE = [16, 122, 87]
const GRIS = [120, 120, 120]
const NEGRO = [40, 40, 40]

function urlToDataUrl(url) {
  return new Promise((resolve) => {
    if (!url) return resolve(null)
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        try {
          const c = document.createElement('canvas')
          const max = 600
          let { width, height } = img
          const scale = Math.min(1, max / Math.max(width, height))
          c.width = Math.round(width * scale)
          c.height = Math.round(height * scale)
          const ctx = c.getContext('2d')
          ctx.drawImage(img, 0, 0, c.width, c.height)
          resolve(c.toDataURL('image/jpeg', 0.7))
        } catch {
          resolve(null)
        }
      }
      img.onerror = () => resolve(null)
      img.src = url
    } catch {
      resolve(null)
    }
  })
}

function ensurePage(doc, y, needed = 30) {
  if (y + needed > PAGE_H - MARGIN) {
    doc.addPage()
    return MARGIN
  }
  return y
}

function drawHeader(doc, logo) {
  if (logo) {
    try {
      doc.addImage(logo, 'PNG', MARGIN, MARGIN, 30, 30)
    } catch {
      try {
        doc.addImage(logo, 'JPEG', MARGIN, MARGIN, 30, 30)
      } catch {
        /* sin logo */
      }
    }
  }
}

function numeroOrden() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const base = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  try {
    const key = 'eugi_orden_counter'
    const today = `${pad(d.getDate())}${pad(d.getMonth() + 1)}${String(d.getFullYear()).slice(2)}`
    const stored = localStorage.getItem(key)
    let { date, seq } = stored ? JSON.parse(stored) : { date: '', seq: 0 }
    if (date !== today) {
      seq = 0
      date = today
    }
    seq += 1
    localStorage.setItem(key, JSON.stringify({ date, seq }))
    return `${base}-${String(seq).padStart(3, '0')}`
  } catch {
    return `${base}-001`
  }
}

function formatFecha() {
  const d = new Date()
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${meses[d.getMonth()]}/${d.getFullYear()}`
}

export function generateNumeroOrden() {
  return numeroOrden()
}

export async function generateOrdenPDF({ plantas, contacto, logo, numero, observaciones, fotos }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  drawHeader(doc, logo)

  // Encabezado - nombre y contacto
  const name = contacto.nombre || 'Eugí\'s Garden'
  doc.setFontSize(20)
  doc.setTextColor(...NEGRO)
  doc.setFont('helvetica', 'bold')
  doc.text(name, MARGIN, logo ? MARGIN + 12 : MARGIN + 10)

  doc.setFontSize(9)
  doc.setTextColor(...GRIS)
  doc.setFont('helvetica', 'normal')
  let cy = logo ? MARGIN + 18 : MARGIN + 18
  if (contacto.email) {
    doc.text(`Email: ${contacto.email}`, MARGIN, cy)
    cy += 5
  }
  if (contacto.telefono) {
    doc.text(`Tel: ${contacto.telefono}`, MARGIN, cy)
    cy += 5
  }
  if (contacto.direccion) {
    doc.text(`Dir: ${contacto.direccion}`, MARGIN, cy)
    cy += 5
  }

  // Título
  let yPos = Math.max(cy + 8, 50)
  doc.setFontSize(15)
  doc.setTextColor(...VERDE)
  doc.setFont('helvetica', 'bold')
  doc.text('ORDEN DE TRABAJO', MARGIN, yPos)

  // Número y fecha
  doc.setFontSize(10)
  doc.setTextColor(...NEGRO)
  doc.setFont('helvetica', 'normal')
  doc.text(`N° ${numero}`, PAGE_W - MARGIN, yPos, { align: 'right' })
  doc.text(`Fecha: ${formatFecha()}`, PAGE_W - MARGIN, yPos + 5, { align: 'right' })

  yPos += 10
  doc.setDrawColor(16, 122, 87)
  doc.setLineWidth(0.6)
  doc.line(MARGIN, yPos, PAGE_W - MARGIN, yPos)
  yPos += 4

  // Tabla de plantas
  const colX = [MARGIN, MARGIN + 10, MARGIN + 110, MARGIN + 150]
  const tableW = CONTENT_W
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.setFillColor(...VERDE)
  doc.rect(MARGIN, yPos, tableW, 8, 'F')
  const headers = ['#', 'Planta', 'Cant.', 'Observaciones']
  headers.forEach((h, i) => doc.text(h, colX[i] + 2, yPos + 5.5))
  yPos += 8

  doc.setFontSize(9)
  plantas.forEach((it, idx) => {
    yPos = ensurePage(doc, yPos, 8)
    const fill = idx % 2 === 0 ? [243, 245, 242] : [255, 255, 255]
    doc.setFillColor(...fill)
    doc.rect(MARGIN, yPos, tableW, 8, 'F')
    doc.setTextColor(...NEGRO)
    doc.text(String(idx + 1), colX[0] + 2, yPos + 5.5)
    doc.text(it.plant.nombre, colX[1] + 2, yPos + 5.5)
    doc.text(String(it.qty), colX[2] + 2, yPos + 5.5)
    const obs = (observaciones && observaciones[it.plant.id]) || ''
    doc.text(obs || '-', colX[3] + 2, yPos + 5.5, { maxWidth: tableW - (colX[3] - MARGIN) - 4 })
    yPos += 8
  })

  // Total de plantas
  yPos = ensurePage(doc, yPos, 10)
  const totalQty = plantas.reduce((a, it) => a + it.qty, 0)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...VERDE)
  doc.text(`Total: ${totalQty} ${totalQty === 1 ? 'planta' : 'plantas'}`, PAGE_W - MARGIN, yPos + 4, { align: 'right' })
  yPos += 12

  // Registro fotográfico
  const conFoto = []
  for (const it of plantas) {
    const fotoUrl = (fotos && fotos[it.plant.id]) || ''
    const dataUrl = fotoUrl ? await urlToDataUrl(fotoUrl) : null
    conFoto.push({ it, dataUrl })
  }
  const conFotoReal = conFoto
  if (conFotoReal.some((c) => c.dataUrl)) {
    yPos = ensurePage(doc, yPos, 14)
    doc.setFontSize(12)
    doc.setTextColor(...VERDE)
    doc.setFont('helvetica', 'bold')
    doc.text('Registro fotográfico', MARGIN, yPos)
    yPos += 6

    const photoW = 54
    const photoH = 40
    const gap = 6
    let x = MARGIN
    for (const item of conFotoReal) {
      if (!item.dataUrl) continue
      if (x + photoW > PAGE_W - MARGIN) {
        x = MARGIN
        yPos = ensurePage(doc, yPos, photoH + 12)
      }
      try {
        doc.addImage(item.dataUrl, 'JPEG', x, yPos, photoW, photoH)
      } catch {
        try {
          doc.addImage(item.dataUrl, 'PNG', x, yPos, photoW, photoH)
        } catch {
          continue
        }
      }
      doc.setFontSize(7.5)
      doc.setTextColor(...GRIS)
      doc.text(item.it.plant.nombre, x, yPos + photoH + 3, { maxWidth: photoW })
      x += photoW + gap + 5
    }
  }

  doc.setFontSize(8)
  doc.setTextColor(...GRIS)
  doc.text(
    `Documento generado el ${new Date().toLocaleString('es-PY')}`,
    PAGE_W / 2,
    PAGE_H - 8,
    { align: 'center' },
  )

  doc.save(`orden-de-trabajo-${numero}.pdf`)
}
