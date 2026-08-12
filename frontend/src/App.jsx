import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/Navbar.jsx'
import Dashboard from './paginas/Dashboard.jsx'
import Tareas from './paginas/Tareas.jsx'
import TareaDetalle from './paginas/TareaDetalle.jsx'
import Aprende from './paginas/Aprende.jsx'
import NoEncontrado from './paginas/NoEncontrado.jsx'

// App.jsx es el componente "raíz" de la aplicación. Su trabajo es decidir
// QUÉ página mostrar según la URL actual. Esto se llama "enrutamiento"
// (routing) y es lo que convierte varias "pantallas" independientes en
// una sola aplicación de una sola página (SPA = Single Page Application).
export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>
        {/* <Routes> mira la URL actual y renderiza la primera <Route> que
            coincida. Es literalmente un switch/case para páginas. */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tareas" element={<Tareas />} />
          {/* ":id" es un parámetro dinámico: /tareas/3, /tareas/abc, etc.
              Lo leemos dentro de TareaDetalle con useParams(). */}
          <Route path="/tareas/:id" element={<TareaDetalle />} />
          <Route path="/aprende" element={<Aprende />} />
          {/* Ruta comodín: si nada coincide, mostramos un 404 */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
    </div>
  )
}
