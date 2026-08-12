import { createContext, useContext, useState } from 'react'

// ============================================================================
// 8. CONTEXT API — un segundo ejemplo, aislado, además del ThemeContext
// real que usa toda la app (ver src/context/ThemeContext.jsx).
// ============================================================================
const IdiomaContext = createContext(null)

const TEXTOS = {
  es: { saludo: 'Hola', despedida: 'Adiós' },
  en: { saludo: 'Hello', despedida: 'Goodbye' },
}

function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState('es')
  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma, textos: TEXTOS[idioma] }}>
      {children}
    </IdiomaContext.Provider>
  )
}

// Sin Context, tendrías que pasar `idioma` y `textos` como props a través
// de CADA componente intermedio, aunque no los usen ("prop drilling").
// Con Context, cualquier descendiente los lee directamente.
function Saludo() {
  const { textos } = useContext(IdiomaContext)
  return <p style={{ fontSize: 20 }}>{textos.saludo} 👋</p>
}

function Despedida() {
  const { textos } = useContext(IdiomaContext)
  return <p style={{ fontSize: 20 }}>{textos.despedida} 👋</p>
}

function SelectorIdioma() {
  const { idioma, setIdioma } = useContext(IdiomaContext)
  return (
    <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  )
}

export default function ContextAPIDemo() {
  return (
    <IdiomaProvider>
      <SelectorIdioma />
      <Saludo />
      <Despedida />
    </IdiomaProvider>
  )
}
