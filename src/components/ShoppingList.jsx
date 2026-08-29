export default function ShoppingList({ items, onAdd, onSub, onRemove, onClear, onContinue }) {
  const totalCount = items.reduce((acc, it) => acc + it.qty, 0)

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-emerald-700 text-white">
        <h2 className="font-bold text-lg">Plantas seleccionadas</h2>
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
          <div className="text-center text-gray-400 py-12">
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-sm">Todavía no agregaste plantas.</p>
            <p className="text-sm">Tocá "+ Agregar" en el catálogo.</p>
          </div>
        ) : (
          items.map((it) => (
            <div key={it.plant.id} className="flex flex-col rounded-xl ring-1 ring-gray-200 p-3 gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-[15px] truncate">{it.plant.nombre}</div>
                  <div className="text-xs text-gray-500 italic truncate">{it.plant.cientifico}</div>
                </div>
                <button
                  onClick={() => onRemove(it.plant)}
                  className="text-gray-400 hover:text-red-500 text-lg leading-none p-1"
                  aria-label={`Eliminar ${it.plant.nombre}`}
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-1 py-1">
                  <button
                    onClick={() => onSub(it.plant)}
                    className="w-9 h-9 rounded-full bg-white ring-1 ring-gray-200 active:scale-95 text-lg font-bold grid place-items-center text-gray-700"
                    aria-label={`Quitar ${it.plant.nombre}`}
                  >
                    −
                  </button>
                  <span className="font-bold w-7 text-center">{it.qty}</span>
                  <button
                    onClick={() => onAdd(it.plant)}
                    className="w-9 h-9 rounded-full bg-emerald-600 text-white active:scale-95 text-lg font-bold grid place-items-center"
                    aria-label={`Agregar ${it.plant.nombre}`}
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  {it.qty} {it.qty === 1 ? 'unidad' : 'unidades'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50 gap-3">
        <div className="text-gray-600 text-sm">
          <span className="font-semibold text-gray-900">{totalCount}</span>{' '}
          {totalCount === 1 ? 'planta' : 'plantas'} en total
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
