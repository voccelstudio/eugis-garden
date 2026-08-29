const CONTACTO_KEY = 'eugi_contacto'
const LOGO_KEY = 'eugi_logo'

const DEFAULT_CONTACTO = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
}

export function loadContacto() {
  try {
    const raw = localStorage.getItem(CONTACTO_KEY)
    if (!raw) return { ...DEFAULT_CONTACTO }
    return { ...DEFAULT_CONTACTO, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_CONTACTO }
  }
}

export function saveContacto(contacto) {
  localStorage.setItem(CONTACTO_KEY, JSON.stringify(contacto))
}

export function loadLogo() {
  try {
    return localStorage.getItem(LOGO_KEY) || ''
  } catch {
    return ''
  }
}

export function saveLogo(dataUrl) {
  if (dataUrl) {
    localStorage.setItem(LOGO_KEY, dataUrl)
  } else {
    localStorage.removeItem(LOGO_KEY)
  }
}
