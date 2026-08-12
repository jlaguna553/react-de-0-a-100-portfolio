import { useEffect, useState } from 'react'

// ============================================================================
// 5. useEffect — "efectos secundarios" (todo lo que sale del render puro:
// fetch, timers, suscripciones, manipular el DOM directamente, etc.)
// ============================================================================
export default function UseEffectDemo() {
  const [segundos, setSegundos] = useState(0)
  const [activo, setActivo] = useState(true)

  // Efecto con CLEANUP: si no limpiáramos el interval, cada vez que este
  // componente se vuelva a montar (o `activo` cambie) crearíamos un
  // interval nuevo sin destruir el anterior -> fuga de memoria.
  useEffect(() => {
    if (!activo) return

    const id = setInterval(() => {
      setSegundos((prev) => prev + 1)
    }, 1000)

    // Esta función se ejecuta automáticamente antes de que el efecto
    // vuelva a correr, o cuando el componente se desmonta.
    return () => clearInterval(id)
  }, [activo]) // Se re-ejecuta cada vez que `activo` cambia

  // Efecto que sincroniza React con el título de la pestaña del navegador
  // (el "mundo exterior" a React). Se ejecuta en cada cambio de `segundos`.
  useEffect(() => {
    document.title = `${segundos}s — Aprendiendo React`
    return () => {
      document.title = 'TaskFlow — Aprende React de 0 a 100'
    }
  }, [segundos])

  return (
    <div>
      <p>
        Cronómetro: <strong>{segundos}s</strong> (mira el título de la pestaña)
      </p>
      <button onClick={() => setActivo((a) => !a)}>
        {activo ? 'Pausar' : 'Reanudar'}
      </button>{' '}
      <button onClick={() => setSegundos(0)}>Reiniciar</button>

      <p style={{ marginTop: 16, color: 'var(--text-muted)', fontSize: 13 }}>
        Dependencias del efecto: <code>[activo]</code>. Cambia de estado con
        el botón y observa en el código cómo el intervalo anterior se limpia
        antes de crear uno nuevo.
      </p>
    </div>
  )
}
