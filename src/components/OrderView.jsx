import { useState } from 'react'
import { generateOrdenPDF, generateNumeroOrden } from '../pdf/ordenPDF'

function subtitulo(item) {
  return (item && item.cientifico) || (item && item.detalle) || ''
}

export default function OrderView({
  items,
  fotos,
  observaciones,
  onFoto,
  onObservacion,
  onAdd,
  onSub,
  onRemove,
  onBack,
  contacto,
  logo,
}) {
  const [editingId, setEditingId] = useState(null)
  const [pendingUrl, setPendingUrl] = useState('')
  const [generando, setGenerando] = useState(false)

  const beginEdit = (id, current) => {
    setEditingId(id)
    setPendingUrl(current || '')
  }

  const saveFoto = (id) => {
    onFoto(id, pendingUrl.trim())
    setEditingId(null)
    setPendingUrl('')
  }

  const handlePdf = async () => {
    if (items.length === 0) return
    setGenerando(true)
    try {
      await generateOrdenPDF({
        plantas: items,
        contacto,
        logo,
        numero: generateNumeroOrden(),
        observaciones,
        fotos,
      })
    } finally {
      setGenerando(false)
    }
  }

  return (
    <div className="h-dvh flex flex-col bg-[#fdeef5] dark:bg-[#171114] text-gray-800 dark:text-gray-100 select-none">
      <header className="flex items-center justify-between px-4 py-3 bg-emerald-700 text-white">
        <button
          onClick={onBack}
          className="flex items-center gap-1 font-semibold active:scale-95 transition"
        >
          <span className="text-lg leading-none">←</span> Volver
        </button>
        <h1 className="font-bold text-lg">Orden de trabajo</h1>
        <button
          onClick={handlePdf}
          disabled={items.length === 0 || generando}
          className="flex items-center gap-1.5 bg-white text-emerald-700 font-bold px-3 py-2 rounded-full text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition shadow"
        >
          {generando ? <span>Generando…</span> : <span>📄 PDF</span>}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-500 py-16">
            <div className="text-4xl mb-2">🌿</div>
            <p>No hay plantas seleccionadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((it) => {
              const id = it.item.id
              const foto = fotos[id] || ''
              const isEditing = editingId === id
              return (
                <div key={id} className="flex flex-col rounded-2xl bg-white dark:bg-[#241c21] shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
                  {/* Foto o input */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                    {foto ? (
                      <img src={foto} alt={it.item.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl opacity-50">🖼️</span>
                    )}
                    <button
                      onClick={() => beginEdit(id, foto)}
                      className="absolute bottom-2 right-2 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      {foto ? 'Cambiar foto' : '+ Subir foto'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 p-3 flex-1">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{it.item.nombre}</h3>
                      <p className="text-[12px] italic text-gray-500 dark:text-gray-400">
                        {it.item.icono} {subtitulo(it.item)} {it.item.unidad ? `· ${it.item.unidad}` : ''}
                      </p>
                    </div>

                    {isEditing && (
                      <div className="flex flex-col gap-1.5">
                        <input
                          autoFocus
                          value={pendingUrl}
                          onChange={(e) => setPendingUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveFoto(id)
                          }}
                          placeholder="Pegá el link de la foto (Imgur)"
                          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveFoto(id)}
                            className="flex-1 bg-emerald-600 text-white font-semibold text-sm rounded-lg py-2 active:scale-95"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-semibold text-sm rounded-lg py-2 active:scale-95"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                    <textarea
                      value={(observaciones && observaciones[id]) || ''}
                      onChange={(e) => onObservacion(id, e.target.value)}
                      placeholder="Observaciones (opcional)"
                      rows={2}
                      className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                    />

                    <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-1 py-1">
                        <button
                          onClick={() => onSub(it.item)}
                          aria-label={`Disminuir cantidad de ${it.item.nombre}`}
                          className="w-9 h-9 rounded-full bg-white dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-600 active:scale-95 text-lg font-bold grid place-items-center text-gray-700 dark:text-gray-100"
                        >
                          −
                        </button>
                        <span className="font-bold w-7 text-center text-gray-900 dark:text-white">{it.qty}</span>
                        <button
                          onClick={() => onAdd(it.item)}
                          aria-label={`Aumentar cantidad de ${it.item.nombre}`}
                          className="w-9 h-9 rounded-full bg-emerald-600 text-white active:scale-95 text-lg font-bold grid place-items-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(it.item)}
                        className="text-red-500 font-semibold text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
