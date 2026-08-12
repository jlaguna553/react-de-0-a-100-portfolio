// ============================================================================
// FUNDAMENTO 5 — ASINCRONÍA, PROMESAS Y FETCH
// ============================================================================
// JavaScript tiene UN SOLO hilo: solo puede hacer una cosa a la vez. Si una
// petición a un servidor bloqueara ese hilo durante 2 segundos, la página se
// congelaría (no responderían ni los clics ni el scroll).
//
// La solución: las operaciones lentas (red, temporizadores, disco) se delegan
// al navegador, y JS sigue corriendo. Cuando la operación termina, su callback
// se pone en una cola y se ejecuta en cuanto el hilo queda libre. A ese
// mecanismo se le llama EVENT LOOP.
//
// Consecuencia práctica: el código NO se ejecuta siempre en el orden en que
// está escrito, y ese es el origen del 90% de la confusión al empezar.
// ============================================================================

const API = 'http://localhost:4000/api/tasks'

// ----------------------------------------------------------------------------
// 1. EL ORDEN DE EJECUCIÓN
// ----------------------------------------------------------------------------
document.querySelector('#btn-orden').addEventListener('click', () => {
  console.clear()
  console.log('1 — esta línea corre ya')

  setTimeout(() => console.log('3 — yo corro al final, aunque pedí 0 ms'), 0)

  Promise.resolve().then(() => console.log('2.5 — las promesas van antes que setTimeout'))

  console.log('2 — y esta también corre ya')

  console.log(
    '%c⚠️ Salida: 1, 2, 2.5, 3. Todo lo asíncrono espera a que termine el código síncrono.',
    'color:#d97706'
  )
})

// ----------------------------------------------------------------------------
// 2. PROMESAS
// ----------------------------------------------------------------------------
// Una promesa es un objeto que representa un valor que TODAVÍA NO EXISTE.
// Tiene tres estados: pendiente → cumplida (resolve) o rechazada (reject).
// Es una promesa de "esto va a terminar, bien o mal, y te aviso".

// Así se crea una a mano (rara vez lo harás: casi todas te las da una API):
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function tirarMoneda() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('cara') : reject(new Error('cruz'))
    }, 600)
  })
}

const estado = document.querySelector('#estado-promesa')

// FORMA A — .then() / .catch() / .finally()
document.querySelector('#btn-promesa').addEventListener('click', () => {
  estado.textContent = '⏳ esperando…'
  const inicio = Date.now()

  esperar(1500)
    .then(() => {
      estado.textContent = `✅ pasaron ${Date.now() - inicio} ms`
      return tirarMoneda() // devolver una promesa dentro de .then las encadena
    })
    .then((cara) => console.log('salió', cara))
    .catch((error) => console.log('falló:', error.message)) // atrapa cualquier fallo de la cadena
    .finally(() => console.log('terminó, con éxito o sin él'))
})

// FORMA B — async/await: el MISMO comportamiento, escrito como si fuera
// código secuencial normal. Es lo que se usa hoy y lo que verás en el proyecto.
//   - `async` delante de una función hace que devuelva siempre una promesa.
//   - `await` pausa ESA función (no la página) hasta que la promesa se resuelva.
//   - `await` solo se puede usar dentro de una función `async`.
//   - los errores se capturan con try/catch normal.

// ⚠️ Secuencial: cada await espera al anterior. Total ≈ 3 × 500 = 1500 ms.
document.querySelector('#btn-secuencial').addEventListener('click', async () => {
  const inicio = Date.now()
  estado.textContent = '⏳ en secuencia…'
  await esperar(500)
  await esperar(500)
  await esperar(500)
  estado.textContent = `🐢 secuencial: ${Date.now() - inicio} ms`
})

// ✅ Paralelo: se lanzan las tres a la vez y se espera a todas. Total ≈ 500 ms.
// Promise.all recibe un array de promesas y devuelve un array de resultados;
// si UNA falla, falla todo (para tolerar fallos usa Promise.allSettled).
document.querySelector('#btn-paralelo').addEventListener('click', async () => {
  const inicio = Date.now()
  estado.textContent = '⏳ en paralelo…'
  await Promise.all([esperar(500), esperar(500), esperar(500)])
  estado.textContent = `🚀 paralelo: ${Date.now() - inicio} ms`
})

// ----------------------------------------------------------------------------
// 3. FETCH — hablar con un servidor por HTTP
// ----------------------------------------------------------------------------
// fetch devuelve una promesa que se resuelve con un objeto Response.
// Hacen falta DOS awaits: uno para recibir la respuesta (cabeceras) y otro
// para leer el cuerpo y convertirlo de JSON a objeto de JavaScript.

const elCargando = document.querySelector('#cargando')
const elError = document.querySelector('#error')
const elTareas = document.querySelector('#tareas')

function mostrarCargando(activo) {
  elCargando.style.display = activo ? 'block' : 'none'
}
function mostrarError(mensaje) {
  elError.style.display = mensaje ? 'block' : 'none'
  elError.textContent = mensaje ?? ''
}

async function cargarTareas() {
  // Los TRES estados de toda petición. En React serán tres useState, y este
  // patrón exacto vive en frontend/src/hooks/useTasks.js.
  mostrarCargando(true)
  mostrarError(null)
  elTareas.innerHTML = ''

  try {
    const respuesta = await fetch(API)

    // ⚠️ TRAMPA CLÁSICA: fetch NO lanza error si el servidor responde 404 o
    // 500. Solo falla si no hubo red. Un 404 es una respuesta válida a nivel
    // de red. Hay que comprobar `response.ok` a mano, SIEMPRE.
    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`)
    }

    const tareas = await respuesta.json() // parsear el cuerpo JSON

    if (tareas.length === 0) {
      elTareas.innerHTML = '<li>No hay tareas todavía.</li>'
      return
    }

    // Datos → interfaz. Ahora a mano; en React será {tareas.map(...)}.
    for (const tarea of tareas) {
      const li = document.createElement('li')
      li.textContent = `${tarea.completed ? '✅' : '⬜'} ${tarea.title} — ${tarea.category}`
      elTareas.appendChild(li)
    }
  } catch (error) {
    // Aquí caen: fallos de red (backend apagado), errores de CORS, JSON
    // inválido, y los throw que hagas tú arriba.
    mostrarError(
      `❌ ${error.message}. ¿Está corriendo el backend en http://localhost:4000? ` +
        `Arráncalo con: cd backend && npm run dev`
    )
    console.error(error)
  } finally {
    // finally se ejecuta siempre: es el sitio correcto para apagar el spinner.
    mostrarCargando(false)
  }
}

document.querySelector('#btn-cargar').addEventListener('click', cargarTareas)

// POST: enviar datos. Hay que declarar el método, la cabecera Content-Type y
// convertir el objeto a string con JSON.stringify (el cuerpo viaja como texto).
document.querySelector('#btn-crear').addEventListener('click', async () => {
  mostrarError(null)
  try {
    const respuesta = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Tarea creada desde JS puro (${new Date().toLocaleTimeString()})`,
        category: 'estudio',
        priority: 'normal',
      }),
    })
    if (!respuesta.ok) throw new Error(`El servidor respondió ${respuesta.status}`)

    const creada = await respuesta.json()
    console.log('creada →', creada)
    await cargarTareas() // recargar la lista para ver el cambio
  } catch (error) {
    mostrarError(`❌ ${error.message}`)
  }
})

// Demostración de que un 404 NO hace saltar el catch por sí solo:
document.querySelector('#btn-error').addEventListener('click', async () => {
  mostrarError(null)
  try {
    const respuesta = await fetch(`${API}/id-que-no-existe`)
    console.log('¿llegó aquí sin lanzar error? →', respuesta.ok, respuesta.status)
    if (!respuesta.ok) throw new Error(`No encontrado (${respuesta.status})`)
  } catch (error) {
    mostrarError(`❌ ${error.message} — pero fíjate en la consola: el catch solo
      se activó porque comprobamos respuesta.ok a mano.`)
  }
})

// ----------------------------------------------------------------------------
// 4. LOS OTROS MÉTODOS HTTP (los mismos que usa el backend del proyecto)
// ----------------------------------------------------------------------------
//   GET     leer         fetch(url)
//   POST    crear        fetch(url, { method: 'POST',   headers, body })
//   PUT     actualizar   fetch(`${url}/${id}`, { method: 'PUT', headers, body })
//   DELETE  borrar       fetch(`${url}/${id}`, { method: 'DELETE' })
//
// Códigos de estado que debes reconocer:
//   200 OK · 201 Creado · 204 Sin contenido (típico de DELETE)
//   400 Petición mal formada · 401 Sin autenticar · 403 Sin permiso · 404 No existe
//   500 Error del servidor
//
// CORS: por seguridad, el navegador bloquea que una página de un origen pida
// datos a otro origen distinto, salvo que el SERVIDOR lo autorice con la
// cabecera Access-Control-Allow-Origin. Por eso backend/server.js usa
// app.use(cors()). Si ves "blocked by CORS policy", el arreglo va en el
// servidor, nunca en el cliente.

console.log('Listo. Pulsa los botones y observa la consola y la pestaña Network.')
