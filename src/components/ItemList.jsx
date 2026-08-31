import { isEditable } from '../data/medidas'

function fmt(n) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

export default function ItemList({ item, qty, onAdd, onSub, onSetQty }) {
  const editable = isEditable(item)

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-[#241c21] shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 px-3 py-3">
      {/* Ícono */}
      <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center text-2xl">
        {item.icono || '🏷️'}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold leading-tight text-gray-900 dark:text-white text-[15px]">{item.nombre}</h3>
          {!editable && (
            <span className="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">{item.unidad}</span>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {item.detalle ? `${item.detalle} · ${item.unidad}` : item.unidad}
          {item.descripcion ? ` · ${item.descripcion}` : ''}
        </div>
      </div>

      {/* Cantidad */}
      <div className="shrink-0">
        {editable ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAdd(item)}
              className="flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-3.5 py-2 text-sm transition"
            >
              <span className="text-lg leading-none">+</span> Agregar
            </button>
            <label className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <span className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  inputMode="decimal"
                  value={qty > 0 ? qty : ''}
                  placeholder="0"
                  onChange={(e) => onSetQty(item, e.target.value)}
                  className="w-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full pl-3 pr-9 py-2 text-sm font-semibold text-right outline-none focus:ring-2 focus:ring-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{item.unidad}</span>
              </span>
            </label>
          </div>
        ) : qty > 0 ? (
          <div className="flex items-center gap-2 bg-emerald-600 text-white rounded-full px-1 py-1">
            <button
              onClick={() => onSub(item)}
              className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-lg font-bold grid place-items-center transition"
              aria-label={`Quitar ${item.nombre}`}
            >
              −
            </button>
            <span className="font-bold text-lg min-w-[2ch] text-center">{fmt(qty)}</span>
            <button
              onClick={() => onAdd(item)}
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-lg font-bold grid place-items-center transition"
              aria-label={`Agregar ${item.nombre}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-3.5 py-2 text-sm transition"
          >
            <span className="text-lg leading-none">+</span> Agregar
          </button>
        )}
      </div>
    </div>
  )
}
