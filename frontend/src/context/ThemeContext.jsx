import { createContext, useContext, useEffect, useState } from 'react'

// ============================================================================
// CONTEXT API — cómo compartir estado global sin pasar props manualmente
// por cada nivel del árbol de componentes ("prop drilling").
// ============================================================================
//
// 1. createContext crea un "canal" de datos.
const ThemeContext = createContext(null)

// 2. Un "Provider" es un componente que ENVUELVE partes de tu app y les
//    da acceso a un valor compartido. Cualquier componente hijo, sin importar
//    qué tan profundo esté anidado, puede leer ese valor con useContext.
export function ThemeProvider({ children }) {
  // Leemos la preferencia guardada (si existe) para que el tema persista
  // entre visitas. localStorage es una mini base de datos del navegador.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow-theme') || 'light'
  })

  // useEffect aquí sincroniza el estado de React con el "mundo exterior":
  // el atributo data-theme del <html> (que controla el CSS) y localStorage.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('taskflow-theme', theme)
  }, [theme]) // Se re-ejecuta solo cuando `theme` cambia

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // El "value" es lo que estará disponible para cualquier componente
  // que use useContext(ThemeContext).
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Un hook personalizado que envuelve useContext. Esto es un patrón muy
//    común: en vez de que cada componente escriba useContext(ThemeContext),
//    escriben useTheme(), que es más corto y además puede validar errores.
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un <ThemeProvider>')
  }
  return context
}
