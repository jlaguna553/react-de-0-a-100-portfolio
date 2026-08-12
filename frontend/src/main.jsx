import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

// Este es el ÚNICO lugar donde "conectamos" React con el HTML real.
// ReactDOM.createRoot toma el <div id="root"> de index.html y le dice
// a React: "a partir de aquí, tú mandas".
//
// <BrowserRouter> habilita la navegación entre páginas sin recargar el navegador.
// <ThemeProvider> es nuestro Context API para tema claro/oscuro, disponible
// para TODA la app porque envuelve a <App />.
// <React.StrictMode> ejecuta algunas comprobaciones extra en desarrollo
// (por ejemplo, invoca ciertos efectos dos veces) para ayudarte a detectar bugs.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
