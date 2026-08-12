import { useEffect, useState } from 'react'

// ============================================================================
// 7. CUSTOM HOOKS — extraer lógica con estado a una función reutilizable
// ============================================================================
// Este hook sincroniza un valor de useState con localStorage automáticamente.
// Cualquier componente puede usarlo como si fuera un useState normal,
// pero "gratis" obtiene persistencia entre recargas de página.
function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave)
    return guardado !== null ? JSON.parse(guardado) : valorInicial
  })

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])

  return [valor, setValor]
}

// Un segundo custom hook, más simple, que compone con el anterior:
// los hooks pueden usar OTROS hooks (¡pero solo hooks, y solo en el
// nivel superior del componente/hook, nunca dentro de un if o un loop!).
function useContador(inicial = 0) {
  const [valor, setValor] = useLocalStorage('demo-contador-persistente', inicial)
  const incrementar = () => setValor((v) => v + 1)
  const reset = () => setValor(inicial)
  return { valor, incrementar, reset }
}

export default function CustomHookDemo() {
  const { valor, incrementar, reset } = useContador(0)

  return (
    <div>
      <p>
        Valor persistente: <strong>{valor}</strong>
      </p>
      <button onClick={incrementar}>+1</button> <button onClick={reset}>Reset</button>
      <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: 13 }}>
        Recarga la página (F5): el valor sigue ahí porque vive en
        localStorage gracias al custom hook <code>useLocalStorage</code>.
      </p>
    </div>
  )
}
