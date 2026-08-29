import { useMemo, useState } from 'react'
import { plants } from './data/plants'
import FiltersBar from './components/FiltersBar'
import PlantCard from './components/PlantCard'
import ShoppingList from './components/ShoppingList'
import OrderView from './components/OrderView'
import SettingsView from './components/SettingsView'
import { loadContacto, loadLogo, saveContacto, saveLogo } from './store'

export default function App() {
  const [categoria, setCategoria] = useState('todos')
  const [luz, setLuz] = useState('todos')
  const [riego, setRiego] = useState('todos')
  const [tamano, setTamano] = useState('todos')
  const [mantenimiento, setMantenimiento] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [list, setList] = useState({}) // id -> cantidad
  const [fotos, setFotos] = useState({}) // id -> url de imagen
  const [observaciones, setObservaciones] = useState({}) // id -> texto
  const [listOpen, setListOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [contacto, setContacto] = useState(() => loadContacto())
  const [logo, setLogo] = useState(() => loadLogo())

  const filtered = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return plants.filter((p) => {
      if (categoria !== 'todos' && p.categoria !== categoria) return false
      if (luz !== 'todos' && p.luz !== luz) return false
      if (riego !== 'todos' && p.riego !== riego) return false
      if (tamano !== 'todos' && p.tamano !== tamano) return false
      if (mantenimiento !== 'todos' && p.mantenimiento !== mantenimiento) return false
      if (q && !`${p.nombre} ${p.cientifico}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [categoria, luz, riego, tamano, mantenimiento, busqueda])

  const listItems = useMemo(
    () =>
      Object.entries(list)
        .map(([id, qty]) => ({ plant: plants.find((p) => p.id === id), qty }))
        .filter((it) => it.plant && it.qty > 0),
    [list],
  )

  const totalCount = listItems.reduce((acc, it) => acc + it.qty, 0)

  const add = (plant) => {
    setList((l) => ({ ...l, [plant.id]: (l[plant.id] || 0) + 1 }))
  }
  const sub = (plant) => {
    setList((l) => {
      const next = { ...l, [plant.id]: (l[plant.id] || 0) - 1 }
      if (next[plant.id] <= 0) delete next[plant.id]
      return next
    })
  }
  const remove = (plant) => {
    setList((l) => {
      const next = { ...l }
      delete next[plant.id]
      return next
    })
    setFotos((f) => {
      const next = { ...f }
      delete next[plant.id]
      return next
    })
    setObservaciones((o) => {
      const next = { ...o }
      delete next[plant.id]
      return next
    })
  }
  const setFoto = (id, url) => {
    setFotos((f) => ({ ...f, [id]: url }))
  }
  const clear = () => {
    setList({})
    setFotos({})
    setObservaciones({})
  }

  const setObservacion = (id, texto) => {
    setObservaciones((o) => ({ ...o, [id]: texto }))
  }

  const handleSaveSettings = (nuevoContacto, nuevoLogo) => {
    setContacto(nuevoContacto)
    setLogo(nuevoLogo)
    saveContacto(nuevoContacto)
    saveLogo(nuevoLogo)
  }

  return (
    <div className="h-screen flex flex-col bg-[#f3f5f2] text-gray-800 select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white ring-1 ring-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <div>
            <h1 className="font-bold text-lg leading-none text-gray-900">Eugí's Garden</h1>
            <p className="text-xs text-gray-500">Catálogo de plantas</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className="grid place-items-center w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-xl transition"
            aria-label="Configuración"
          >
            ⚙️
          </button>
          <button
            onClick={() => setListOpen(true)}
            className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-full transition"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Selección</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full grid place-items-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Filtros */}
      <div className="shrink-0 bg-white/80 backdrop-blur px-4 py-2 border-b border-gray-200">
        <FiltersBar
          categoria={categoria}
          setCategoria={setCategoria}
          luz={luz}
          setLuz={setLuz}
          riego={riego}
          setRiego={setRiego}
          tamano={tamano}
          setTamano={setTamano}
          mantenimiento={mantenimiento}
          setMantenimiento={setMantenimiento}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </div>

      {/* Catálogo */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm text-gray-500 font-medium">
            {filtered.length} {filtered.length === 1 ? 'planta' : 'plantas'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <PlantCard key={p.id} plant={p} qty={list[p.id] || 0} onAdd={add} onSub={sub} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <div className="text-4xl mb-2">🔍</div>
            <p>No se encontraron plantas con esos filtros.</p>
          </div>
        )}
      </main>

      {/* Panel lateral de lista */}
      {listOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setListOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[min(480px,92vw)] shadow-2xl">
            <ShoppingList
              items={listItems}
              onAdd={add}
              onSub={sub}
              onRemove={remove}
              onClear={clear}
              onContinue={() => {
                setListOpen(false)
                setOrderOpen(true)
              }}
            />
          </div>
        </div>
      )}

      {/* Sección de selección final */}
      {orderOpen && (
        <OrderView
          items={listItems}
          fotos={fotos}
          observaciones={observaciones}
          onFoto={setFoto}
          onObservacion={setObservacion}
          onAdd={add}
          onSub={sub}
          onRemove={remove}
          onBack={() => setOrderOpen(false)}
          contacto={contacto}
          logo={logo}
        />
      )}

      {/* Configuración */}
      {settingsOpen && (
        <SettingsView
          initial={contacto}
          logo={logo}
          onSave={handleSaveSettings}
          onBack={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}
