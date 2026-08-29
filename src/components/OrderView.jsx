import { useState } from 'react'

export default function OrderView({ items, fotos, onFoto, onAdd, onSub, onRemove, onBack }) {
  const [editingId, setEditingId] = useState(null)
  const [pendingUrl, setPendingUrl] = useState('')

  const beginEdit = (id, current) => {
    setEditingId(id)
    setPendingUrl(current || '')
  }

  const saveFoto = (id) => {
    onFoto(id, pendingUrl.trim())
    setEditingId(null)
    setPendingUrl('')
  }

  return (
    <div className="h-screen flex flex-col bg-[#f3f5f2] text-gray-800 select-none">
      <header className="flex items-center justify-between px-4 py-3 bg-emerald-700 text-white">
        <button
          onClick={onBack}
          className="flex items-center gap-1 font-semibold active:scale-95 transition"
        >
          <span className="text-lg leading-none">←</span> Volver al catálogo
        </button>
        <h1 className="font-bold text-lg">Selección de plantas</h1>
        <span className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <div className="text-4xl mb-2">🌿</div>
            <p>No hay plantas seleccionadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((it) => {
              const id = it.plant.id
              const foto = fotos[id] || ''
              const isEditing = editingId === id
              return (
                <div key={id} className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
                  {/* Foto o input */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                    {foto ? (
                      <img src={foto} alt={it.plant.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl opacity-50">🖼️</span>
                    )}
                    {foto && (
                      <button
                        onClick={() => beginEdit(id, foto)}
                        className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        Cambiar foto
                      </button>
                    )}
                    {!foto && (
                      <button
                        onClick={() => beginEdit(id, '')}
                        className="absolute bottom-2 right-2 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        + Subir foto
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 p-3 flex-1">
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight">{it.plant.nombre}</h3>
                      <p className="text-[12px] italic text-gray-500">{it.plant.cientifico}</p>
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
                          className="w-full border border-gray-300 rounded-lg px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
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
                            className="flex-1 bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg py-2 active:scale-95"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-1 py-1">
                        <button
                          onClick={() => onSub(it.plant)}
                          className="w-9 h-9 rounded-full bg-white ring-1 ring-gray-200 active:scale-95 text-lg font-bold grid place-items-center text-gray-700"
                        >
                          −
                        </button>
                        <span className="font-bold w-7 text-center">{it.qty}</span>
                        <button
                          onClick={() => onAdd(it.plant)}
                          className="w-9 h-9 rounded-full bg-emerald-600 text-white active:scale-95 text-lg font-bold grid place-items-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(it.plant)}
                        className="text-gray-400 hover:text-red-500 text-sm font-medium"
                      >
                        Quitar
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
