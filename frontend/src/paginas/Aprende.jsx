import { useState } from 'react'
import JSXBasico from '../ejemplos/01-JSXBasico.jsx'
import PropsDemo from '../ejemplos/02-Props.jsx'
import EstadoYEventos from '../ejemplos/03-EstadoYEventos.jsx'
import ListasYCondicionales from '../ejemplos/04-ListasYCondicionales.jsx'
import UseEffectDemo from '../ejemplos/05-UseEffect.jsx'
import FormulariosDemo from '../ejemplos/06-Formularios.jsx'
import CustomHookDemo from '../ejemplos/07-CustomHook.jsx'
import ContextAPIDemo from '../ejemplos/08-ContextAPI.jsx'

const LECCIONES = [
  {
    id: 'jsx',
    titulo: '1. JSX',
    archivo: 'src/ejemplos/01-JSXBasico.jsx',
    Componente: JSXBasico,
    explicacion:
      'JSX te deja escribir algo que parece HTML dentro de JavaScript. Por debajo, se compila a React.createElement(...). Cualquier cosa entre llaves { } es JavaScript puro.',
  },
  {
    id: 'props',
    titulo: '2. Props',
    archivo: 'src/ejemplos/02-Props.jsx',
    Componente: PropsDemo,
    explicacion:
      'Las props son la forma en que un componente padre le pasa datos a un hijo. Son de solo lectura y fluyen en una sola dirección (padre → hijo).',
  },
  {
    id: 'estado',
    titulo: '3. Estado y eventos',
    archivo: 'src/ejemplos/03-EstadoYEventos.jsx',
    Componente: EstadoYEventos,
    explicacion:
      'useState guarda datos que cambian con el tiempo. Cuando cambian, React vuelve a ejecutar el componente (re-render) para reflejar el nuevo valor en pantalla.',
  },
  {
    id: 'listas',
    titulo: '4. Listas y condicionales',
    archivo: 'src/ejemplos/04-ListasYCondicionales.jsx',
    Componente: ListasYCondicionales,
    explicacion:
      '.map() convierte arrays en JSX. El operador ternario (?:) y && controlan qué se muestra según condiciones.',
  },
  {
    id: 'efectos',
    titulo: '5. useEffect',
    archivo: 'src/ejemplos/05-UseEffect.jsx',
    Componente: UseEffectDemo,
    explicacion:
      'useEffect conecta React con el "mundo exterior": timers, fetch, el DOM directo, suscripciones. La función de limpieza (return) evita fugas de memoria.',
  },
  {
    id: 'formularios',
    titulo: '6. Formularios',
    archivo: 'src/ejemplos/06-Formularios.jsx',
    Componente: FormulariosDemo,
    explicacion:
      'Un formulario controlado mantiene el valor de cada input en el estado de React, permitiendo validar en tiempo real.',
  },
  {
    id: 'hooks',
    titulo: '7. Custom hooks',
    archivo: 'src/ejemplos/07-CustomHook.jsx',
    Componente: CustomHookDemo,
    explicacion:
      'Una función que empieza con "use" y puede usar otros hooks adentro. Sirve para reutilizar lógica con estado entre componentes distintos.',
  },
  {
    id: 'context',
    titulo: '8. Context API',
    archivo: 'src/ejemplos/08-ContextAPI.jsx',
    Componente: ContextAPIDemo,
    explicacion:
      'Comparte datos entre muchos componentes sin pasar props manualmente en cada nivel ("prop drilling"). Útil para temas, idioma, usuario autenticado, etc.',
  },
]

export default function Aprende() {
  const [activa, setActiva] = useState(LECCIONES[0].id)
  const leccion = LECCIONES.find((l) => l.id === activa)
  const { Componente } = leccion

  return (
    <div>
      <h1>Aprende React — ejemplos aislados</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Cada pestaña es un componente 100% independiente y funcional. Ábrelos
        en tu editor en <code>{leccion.archivo}</code> mientras los pruebas
        aquí — están fuertemente comentados.
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '16px 0' }}>
        {LECCIONES.map((l) => (
          <button
            key={l.id}
            onClick={() => setActiva(l.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: activa === l.id ? 'var(--primary)' : 'var(--bg-elevated)',
              color: activa === l.id ? '#fff' : 'var(--text)',
            }}
          >
            {l.titulo}
          </button>
        ))}
      </div>

      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 20,
        }}
      >
        <p style={{ marginTop: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {leccion.explicacion}
        </p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '14px 0' }} />
        <Componente />
      </div>
    </div>
  )
}
