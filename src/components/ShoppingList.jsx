import { isEditable } from '../data/medidas'

function subtitulo(item) {
  return (item && item.cientifico) || (item && item.detalle) || (item && item.unidad) || ''
}

export default function ShoppingList({ items, onAdd, onSub, onSetQty, onRemove, onClear, onContinue }) {
  const totalCount = items.reduce((acc, it) => acc + it.qty, 0)

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e181c]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-emerald-700 text-white">
        <h2 className="font-bold text-lg">Selección</h2>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold underline underline-offset-2"
          >
            Vaciar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-500 py-12">
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-sm">Todavía no agregaste nada.</p>
            <p className="text-sm">Tocá "+ Agregar" en las secciones.</p>
          </div>
        ) : (
          items.map((it) => (
            <div key={it.item.id} className="flex flex-col rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-[#241c21] p-3 gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white text-[15px] truncate">{it.item.nombre}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 italic truncate">
                    {it.item.icono} {subtitulo(it.item)}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(it.item)}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 text-lg leading-none p-1"
                  aria-label={`Eliminar ${it.item.nombre}`}
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                {isEditable(it.item) ? (
                  <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Cant.</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      inputMode="decimal"
                      value={it.qty > 0 ? it.qty : ''}
                      placeholder="0"
                      onChange={(e) => onSetQty(it.item, e.target.value)}
                      className="w-20 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-right outline-none focus:ring-2 focus:ring-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 w-10">{it.item.unidad}</span>
                  </label>
                ) : (
                  <>
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-1 py-1">
                      <button
                        onClick={() => onSub(it.item)}
                        className="w-9 h-9 rounded-full bg-white dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-600 active:scale-95 text-lg font-bold grid place-items-center text-gray-700 dark:text-gray-100"
                        aria-label={`Quitar ${it.item.nombre}`}
                      >
                        −
                      </button>
                      <span className="font-bold w-7 text-center text-gray-900 dark:text-white">{it.qty}</span>
                      <button
                        onClick={() => onAdd(it.item)}
                        className="w-9 h-9 rounded-full bg-emerald-600 text-white active:scale-95 text-lg font-bold grid place-items-center"
                        aria-label={`Agregar ${it.item.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {it.qty} {it.item.unidad ? it.item.unidad : it.qty === 1 ? 'unidad' : 'unidades'}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-[#1e181c] gap-3">
        <div className="text-gray-600 dark:text-gray-300 text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span>{' '}
          {totalCount === 1 ? 'artículo' : 'artículos'} en total
        </div>
        <button
          onClick={onContinue}
          disabled={items.length === 0}
          className="bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-full active:scale-95 transition shadow"
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}
