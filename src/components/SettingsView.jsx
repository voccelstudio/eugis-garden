import { useRef, useState } from 'react'

export default function SettingsView({ initial, logo, onSave, onBack }) {
  const [form, setForm] = useState({ ...initial })
  const [preview, setPreview] = useState(logo)
  const fileRef = useRef(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onPickFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSave = () => {
    onSave(form, preview)
  }

  const inputCls =
    'w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
  const labelCls = 'text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 block'

  return (
    <div className="h-dvh flex flex-col bg-[#fdeef5] dark:bg-[#171114] text-gray-800 dark:text-gray-100 select-none">
      <header className="flex items-center justify-between px-4 py-3 bg-emerald-700 text-white">
        <h1 className="font-bold text-lg">Configuración</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-1 font-semibold active:scale-95 transition"
        >
          Listo <span className="text-lg leading-none">✓</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Logo */}
        <section className="bg-white dark:bg-[#241c21] rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4">
          <h2 className="font-bold text-gray-900 dark:text-white mb-3">Logo del negocio</h2>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <span className="text-5xl opacity-40">🏪</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => fileRef.current && fileRef.current.click()}
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 text-sm active:scale-95 transition"
              >
                {preview ? 'Cambiar logo' : 'Cargar logo'}
              </button>
              {preview && (
                <button
                  onClick={() => setPreview('')}
                  className="text-sm text-red-500 font-semibold underline underline-offset-2"
                >
                  Quitar logo
                </button>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[240px]">
                Se guarda en el dispositivo. Formato JPG/PNG.
              </p>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
        </section>

        {/* Datos de contacto */}
        <section className="bg-white dark:bg-[#241c21] rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 p-4 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Datos de contacto</h2>

          <div>
            <label className={labelCls}>Nombre del negocio / contacto</label>
            <input className={inputCls} value={form.nombre} onChange={set('nombre')} placeholder="Ej: El Jardín de Eugenia" />
          </div>

          <div>
            <label className={labelCls}>Correo electrónico</label>
            <input className={inputCls} type="email" value={form.email} onChange={set('email')} placeholder="ejemplo@correo.com" />
          </div>

          <div>
            <label className={labelCls}>Teléfono</label>
            <input className={inputCls} type="tel" value={form.telefono} onChange={set('telefono')} placeholder="(+595) ..." />
          </div>

          <div>
            <label className={labelCls}>Dirección</label>
            <input className={inputCls} value={form.direccion} onChange={set('direccion')} placeholder="Dirección del negocio" />
          </div>
        </section>

        <button
          onClick={handleSave}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-3.5 rounded-2xl active:scale-[0.98] transition shadow"
        >
          Guardar cambios
        </button>
      </main>
    </div>
  )
}
