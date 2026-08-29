export default function ItemCard({ item, qty, onAdd, onSub }) {
  const subtitulo = item.detalle ? `${item.detalle} · ${item.unidad}` : item.unidad
  return (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-[#241c21] shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
      {/* Placeholder de ícono */}
      <div className="relative aspect-[16/6] bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
        <span className="text-5xl opacity-70">{item.icono || '🏷️'}</span>
        <span className="absolute top-2 right-2 rounded-full bg-black/55 text-white text-xs px-2.5 py-1 font-medium">
          {item.unidad}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <div>
          <h3 className="text-[17px] font-bold leading-tight text-gray-900 dark:text-white">{item.nombre}</h3>
          {subtitulo && (
            <p className="text-[12px] italic text-gray-500 dark:text-gray-400">{subtitulo}</p>
          )}
        </div>

        {item.descripcion && (
          <p className="text-[13px] leading-snug text-gray-600 dark:text-gray-300 line-clamp-2">{item.descripcion}</p>
        )}

        {/* Stepper */}
        <div className="mt-auto pt-2 flex items-center justify-end gap-2">
          {qty > 0 ? (
            <div className="flex items-center gap-3 bg-emerald-600 text-white rounded-full px-1 py-1">
              <button
                onClick={() => onSub(item)}
                className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-xl font-bold grid place-items-center transition"
                aria-label={`Quitar ${item.nombre}`}
              >
                −
              </button>
              <span className="font-bold text-lg min-w-[2ch] text-center">{qty}</span>
              <button
                onClick={() => onAdd(item)}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-xl font-bold grid place-items-center transition"
                aria-label={`Agregar ${item.nombre}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(item)}
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-4 py-2.5 transition"
            >
              <span className="text-lg leading-none">+</span> Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
