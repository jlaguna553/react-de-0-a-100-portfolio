import { useState } from 'react'

const PRODUCTOS = [
  { id: 1, nombre: 'Teclado mecánico', stock: 5 },
  { id: 2, nombre: 'Mouse inalámbrico', stock: 0 },
  { id: 3, nombre: 'Monitor 27"', stock: 2 },
]

// ============================================================================
// 4. LISTAS (.map + key) Y RENDERIZADO CONDICIONAL
// ============================================================================
export default function ListasYCondicionales() {
  const [mostrarSoloDisponibles, setMostrarSoloDisponibles] = useState(false)

  const productos = mostrarSoloDisponibles
    ? PRODUCTOS.filter((p) => p.stock > 0)
    : PRODUCTOS

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mostrarSoloDisponibles}
          onChange={(e) => setMostrarSoloDisponibles(e.target.checked)}
        />{' '}
        Solo mostrar disponibles
      </label>

      <ul>
        {/* .map transforma cada elemento del array en JSX.
            `key` le dice a React qué elemento es cuál entre renders,
            para actualizar el DOM de forma eficiente (y evitar bugs). */}
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} —{' '}
            {/* Operador ternario: la forma más común de "if/else" en JSX */}
            {producto.stock > 0 ? (
              <span style={{ color: 'var(--success)' }}>{producto.stock} en stock</span>
            ) : (
              <span style={{ color: 'var(--danger)' }}>agotado</span>
            )}
            {/* Operador &&: renderiza algo SOLO si la condición es verdadera.
                Cuidado: si el valor de la izquierda es 0, React lo imprime.
                Por eso aquí comparamos con > 3 (boolean), no con producto.stock directo. */}
            {producto.stock > 3 && ' 🔥 ¡mucho stock!'}
          </li>
        ))}
      </ul>

      {productos.length === 0 && <p>No hay productos que mostrar.</p>}
    </div>
  )
}
