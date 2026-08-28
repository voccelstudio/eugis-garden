import { categories, luzOptions, riegoOptions, tamanoOptions, mantenimientoOptions } from '../data/plants'

function SelectorGroup({ title, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition active:scale-95 ${
              value === o.id
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FiltersBar({
  categoria,
  setCategoria,
  luz,
  setLuz,
  riego,
  setRiego,
  tamano,
  setTamano,
  mantenimiento,
  setMantenimiento,
  busqueda,
  setBusqueda,
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Categorías */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoria(c.id)}
            className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition active:scale-95 flex items-center gap-1.5 ${
              categoria === c.id
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar planta por nombre o nombre científico..."
          className="w-full rounded-full bg-white ring-1 ring-gray-200 py-3 pl-11 pr-4 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Filtros técnicos */}
      <div className="grid grid-cols-2 gap-3">
        <SelectorGroup title="Mantenimiento" options={mantenimientoOptions} value={mantenimiento} onChange={setMantenimiento} />
        <SelectorGroup title="Exposición" options={luzOptions} value={luz} onChange={setLuz} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SelectorGroup title="Riego" options={riegoOptions} value={riego} onChange={setRiego} />
        <SelectorGroup title="Tamaño (maturez)" options={tamanoOptions} value={tamano} onChange={setTamano} />
      </div>
    </div>
  )
}
