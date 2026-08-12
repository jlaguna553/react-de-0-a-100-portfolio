import { useState } from 'react'

// ============================================================================
// 3. ESTADO (useState) Y EVENTOS
// ============================================================================
// useState devuelve un par [valorActual, funciónParaCambiarlo].
// Cuando llamas al "setter", React vuelve a ejecutar el componente
// (un "re-render") con el nuevo valor. Nunca mutes el estado directamente
// (nada de contador++), siempre usa la función setter.
export default function EstadoYEventos() {
  const [contador, setContador] = useState(0)
  const [texto, setTexto] = useState('')

  function incrementar() {
    // Forma funcional: usar el valor PREVIO garantiza que funcione bien
    // incluso si React agrupa varias actualizaciones juntas.
    setContador((prev) => prev + 1)
  }

  return (
    <div>
      <section style={{ marginBottom: 20 }}>
        <p>
          Contador: <strong>{contador}</strong>
        </p>
        <button onClick={incrementar}>+1</button>{' '}
        <button onClick={() => setContador((prev) => prev - 1)}>-1</button>{' '}
        <button onClick={() => setContador(0)}>Reset</button>
      </section>

      <section>
        {/* Cada tecla dispara onChange -> actualiza el estado -> React
            re-renderiza -> el <input> muestra el nuevo valor de `texto`. */}
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe algo..."
        />
        <p>Escribiste {texto.length} caracteres: "{texto}"</p>
      </section>
    </div>
  )
}
