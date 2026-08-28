import { categoriaLabel } from '../data/plants'

const luzLabel = { sol: '☀️ Sol directo', media: '🌤️ Media sombra', sombra: '🌳 Sombra' }
const riegoLabel = { bajo: '💧 Riego bajo', medio: '💧 Riego medio', alto: '💧 Riego alto' }
const mantLabel = { bajo: 'Mantenimiento bajo', medio: 'Mantenimiento medio', alto: 'Mantenimiento alto' }
const petLabel = { true: '🐾 Apto mascotas', false: '🎯 No apto mascotas' }

function Tag({ children, active = false }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[13px] font-medium whitespace-nowrap ${
        active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {children}
    </span>
  )
}

export default function PlantCard({ plant, qty, onAdd, onSub }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      {/* Foto / placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
        {plant.imagen ? (
          <img src={plant.imagen} alt={plant.nombre} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl opacity-60">{categoriasIcon[plant.categoria] || '🌿'}</span>
        )}
        <span className="absolute top-2 left-2 rounded-full bg-black/55 text-white text-xs px-2.5 py-1 font-medium">
          {categoriaLabel(plant.categoria)}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <div>
          <h3 className="text-[17px] font-bold leading-tight text-gray-900">{plant.nombre}</h3>
          <p className="text-[12px] italic text-gray-500">{plant.cientifico}</p>
        </div>

        <p className="text-[13px] leading-snug text-gray-600 line-clamp-2">{plant.descripcion}</p>

        <div className="flex flex-wrap gap-1.5 mt-0.5">
          <Tag active>{luzLabel[plant.luz]}</Tag>
          <Tag>{riegoLabel[plant.riego]}</Tag>
          <Tag>{plant.petFriendly ? petLabel.true : petLabel.false}</Tag>
          <Tag>{mantLabel[plant.mantenimiento]}</Tag>
        </div>

        {/* Costo + stepper */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="text-sm">
            <span className="text-gray-400 text-xs">Precio</span>
            <div className="font-bold text-gray-900">
              {plant.precio.toLocaleString('es-PY')} <span className="text-xs font-medium text-gray-500">Gs</span>
            </div>
          </div>

          {qty > 0 ? (
            <div className="flex items-center gap-3 bg-emerald-600 text-white rounded-full px-1 py-1">
              <button
                onClick={() => onSub(plant)}
                className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-xl font-bold grid place-items-center transition"
                aria-label={`Quitar ${plant.nombre}`}
              >
                −
              </button>
              <span className="font-bold text-lg min-w-[2ch] text-center">{qty}</span>
              <button
                onClick={() => onAdd(plant)}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-xl font-bold grid place-items-center transition"
                aria-label={`Agregar ${plant.nombre}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(plant)}
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

const categoriasIcon = {
  arboles: '🌳',
  arbustos: '🌿',
  cubresuelos: '🍀',
  florales: '🌸',
  suculentas: '🌵',
  gramineas: '🎋',
}
