// ============================================================================
// FUNDAMENTO 3 — JAVASCRIPT: EL LENGUAJE
// ============================================================================
// Abre la consola del navegador (F12) y recarga. Cada sección imprime lo que
// explica. Lo marcado con ⚠️ es lo que más duele si no lo entiendes ANTES de
// React: React se construye entero sobre estas reglas.
// ============================================================================

console.log('%c1. Variables y ámbito', 'font-weight:bold;font-size:14px')

// ----------------------------------------------------------------------------
// 1. VARIABLES: const, let y (nunca) var
// ----------------------------------------------------------------------------
const PI = 3.1416 // no se puede reasignar
let contador = 0 // sí se puede reasignar
contador = contador + 1

// var existe pero NO lo uses: ignora el ámbito de bloque y se puede
// redeclarar sin error, lo que causa bugs difíciles de rastrear.
// Regla de trabajo: usa `const` SIEMPRE. Cámbialo a `let` solo cuando el
// compilador te obligue porque necesitas reasignar. Esto hace obvio, de un
// vistazo, qué cosas cambian en tu programa.

// Ámbito de bloque: una variable declarada dentro de { } no existe fuera.
{
  const secreta = 'solo vivo dentro de estas llaves'
  console.log(secreta)
}
// console.log(secreta)  ← ReferenceError: secreta is not defined

// ⚠️ `const` NO significa "inmutable": significa "no puedes reasignar la
// variable". El CONTENIDO de un objeto o array declarado con const sí se
// puede modificar. Esto sorprende a todo el mundo:
const config = { tema: 'claro' }
config.tema = 'oscuro' // ✅ permitido: mutas el objeto, no la variable
// config = {}          // ❌ TypeError: Assignment to constant variable

// ----------------------------------------------------------------------------
// 2. TIPOS
// ----------------------------------------------------------------------------
console.log('%c2. Tipos', 'font-weight:bold;font-size:14px')

// PRIMITIVOS (7): string, number, boolean, null, undefined, symbol, bigint
const texto = 'hola' // string
const numero = 42 // number (no hay int/float aparte: todo es number)
const decimal = 3.14
const verdadero = true // boolean
const nada = null // "vacío a propósito" — lo pone el programador
let sinAsignar // undefined — "todavía no tiene valor" — lo pone JS

// OBJETOS (todo lo demás): objetos, arrays, funciones, fechas...
const persona = { nombre: 'Ana', edad: 30 }
const numeros = [1, 2, 3]

console.log(typeof texto, typeof numero, typeof verdadero, typeof sinAsignar)
console.log(typeof persona, typeof numeros) // ⚠️ ambos dicen "object"
console.log(Array.isArray(numeros)) // ← la forma correcta de detectar un array
console.log(typeof null) // ⚠️ "object": un bug histórico de JS que nunca se arregló

// ----------------------------------------------------------------------------
// 3. ⚠️ VALOR vs REFERENCIA — el concepto que hace o rompe tu React
// ----------------------------------------------------------------------------
console.log('%c3. Valor vs referencia ⚠️', 'font-weight:bold;font-size:14px')

// Los PRIMITIVOS se copian por VALOR: dos cajas independientes.
let a = 10
let b = a
b = 99
console.log('primitivos →', a, b) // 10 99  (a no se enteró)

// Los OBJETOS y ARRAYS se copian por REFERENCIA: las dos variables son dos
// etiquetas pegadas a la MISMA caja.
const original = { nombre: 'Ana' }
const alias = original
alias.nombre = 'Beatriz'
console.log('referencia →', original.nombre) // "Beatriz" ⚠️ cambió el original

// Para copiar de verdad (copia superficial) se usa el spread `...`:
const copia = { ...original }
copia.nombre = 'Carla'
console.log('tras copia →', original.nombre, copia.nombre) // "Beatriz" "Carla" ✅

const numerosCopia = [...numeros]
numerosCopia.push(4)
console.log('arrays →', numeros, numerosCopia) // [1,2,3]  [1,2,3,4] ✅

// "Superficial" quiere decir que solo copia el primer nivel: los objetos
// anidados se siguen compartiendo.
const usuario = { nombre: 'Ana', direccion: { ciudad: 'Madrid' } }
const usuarioCopia = { ...usuario }
usuarioCopia.direccion.ciudad = 'Lima'
console.log('anidado →', usuario.direccion.ciudad) // "Lima" ⚠️ ¡se compartió!
// Solución: copiar también el nivel de adentro
const copiaProfunda = { ...usuario, direccion: { ...usuario.direccion } }
copiaProfunda.direccion.ciudad = 'Bogotá'
console.log('profunda →', usuario.direccion.ciudad) // "Lima" ✅ ya no se contagia
// (Para casos complejos existe structuredClone(objeto).)

// POR QUÉ TE IMPORTA: React decide si repintar comparando referencias
// (¿es el mismo objeto que antes?). Si mutas el estado en lugar de crear un
// objeto nuevo, la referencia no cambió, React concluye "nada cambió" y tu
// pantalla se queda congelada. De ahí sale la regla:
//    tareas.push(nueva)          ❌ muta → React no se entera
//    setTareas([...tareas, nueva]) ✅ objeto nuevo → React repinta

// ----------------------------------------------------------------------------
// 4. OPERADORES, COMPARACIONES, TRUTHY/FALSY
// ----------------------------------------------------------------------------
console.log('%c4. Comparaciones', 'font-weight:bold;font-size:14px')

console.log(1 == '1') // true  ⚠️ == convierte tipos antes de comparar
console.log(1 === '1') // false ✅ === compara valor Y tipo. USA SIEMPRE ===
console.log(0 == false) // true  ⚠️
console.log(0 === false) // false ✅

// FALSY: solo estos 6 valores son "falsos" en un if. Todo lo demás es truthy.
//    false, 0, '' (string vacío), null, undefined, NaN
// ⚠️ Ojo: [] y {} son TRUTHY. Un array vacío no es falso.
console.log(Boolean([]), Boolean({}), Boolean('0')) // true true true

// Para saber si un array está vacío, mira su longitud:
const lista = []
if (lista.length === 0) console.log('la lista está vacía')

// || devuelve el primer valor truthy; ?? devuelve el primero que no sea
// null/undefined. La diferencia importa cuando 0 o '' son valores válidos:
const cantidad = 0
console.log(cantidad || 10) // 10 ⚠️ 0 es falsy, así que se descartó
console.log(cantidad ?? 10) // 0  ✅ 0 no es null ni undefined

// ?. (encadenamiento opcional): corta la evaluación si algo es null/undefined
// en vez de lanzar "Cannot read properties of undefined".
const respuesta = { datos: null }
console.log(respuesta.datos?.usuario?.nombre) // undefined, sin explotar

// Ternario: la única forma de hacer un if/else dentro de una expresión.
// En React lo vas a usar constantemente dentro del JSX.
const edad = 20
console.log(edad >= 18 ? 'mayor de edad' : 'menor de edad')

// ----------------------------------------------------------------------------
// 5. FUNCIONES
// ----------------------------------------------------------------------------
console.log('%c5. Funciones', 'font-weight:bold;font-size:14px')

// a) Declaración clásica
function sumar(a, b) {
  return a + b
}

// b) Expresión de función (guardada en una variable)
const restar = function (a, b) {
  return a - b
}

// c) Arrow function — la que domina el código moderno y todo React
const multiplicar = (a, b) => a * b // return implícito si no hay llaves
const cuadrado = (n) => n * n // un solo parámetro
const saludar = () => console.log('¡Hola!') // sin parámetros

// Con llaves, el return es obligatorio:
const dividir = (a, b) => {
  if (b === 0) return null
  return a / b
}

// ⚠️ Para devolver un OBJETO desde una arrow corta, envuélvelo en paréntesis,
// o JS interpreta las llaves como el cuerpo de la función:
const crearPunto = (x, y) => ({ x, y })

console.log(sumar(2, 3), restar(5, 1), multiplicar(3, 4), cuadrado(6), crearPunto(1, 2))

// Parámetros por defecto y parámetros REST
const crearTarea = (titulo, prioridad = 'normal') => ({ titulo, prioridad })
const sumarTodo = (...numeros) => numeros.reduce((acc, n) => acc + n, 0)
console.log(crearTarea('Estudiar'), sumarTodo(1, 2, 3, 4)) // {…}  10

// FUNCIONES DE ORDEN SUPERIOR: en JS una función es un valor más. Puedes
// pasarla como argumento y devolverla desde otra función. Esta idea es la base
// de .map(), de los manejadores de eventos y de todo React.
const aplicarDosVeces = (fn, valor) => fn(fn(valor))
console.log(aplicarDosVeces(cuadrado, 3)) // 81

// ⚠️ Pasar la función NO es lo mismo que ejecutarla:
//    onClick={borrar}    → React la llamará cuando haya clic  ✅
//    onClick={borrar()}  → se ejecuta AHORA, al renderizar     ❌
//    onClick={() => borrar(id)} → se necesita pasar argumentos ✅

// CLOSURE: una función "recuerda" las variables del ámbito donde fue creada,
// incluso después de que ese ámbito terminó. Es la magia detrás de useState.
function crearContador() {
  let cuenta = 0 // vive mientras exista la función devuelta
  return () => ++cuenta
}
const contar = crearContador()
console.log(contar(), contar(), contar()) // 1 2 3

// `this` en arrow functions: no tienen `this` propio, lo heredan del entorno.
// Esta es una de las razones por las que el React moderno abandonó las clases
// y se pasó a las funciones + hooks. En la práctica: si usas siempre arrow
// functions, `this` deja de ser un problema.

// ----------------------------------------------------------------------------
// 6. OBJETOS
// ----------------------------------------------------------------------------
console.log('%c6. Objetos', 'font-weight:bold;font-size:14px')

const tarea = {
  id: 'a1',
  titulo: 'Aprender JavaScript',
  completada: false,
  etiquetas: ['estudio', 'urgente'],
  // Método (función dentro de un objeto)
  describir() {
    return `${this.titulo} (${this.completada ? 'hecha' : 'pendiente'})`
  },
}

console.log(tarea.titulo) // acceso con punto
console.log(tarea['titulo']) // acceso con corchetes (para claves dinámicas)
const clave = 'completada'
console.log(tarea[clave]) // ← aquí los corchetes son imprescindibles
console.log(tarea.describir())

// DESTRUCTURING: extraer propiedades en variables de una sola línea.
// En React lo verás en cada componente: function TaskCard({ task, onToggle })
const { titulo, completada, prioridad = 'normal' } = tarea
console.log(titulo, completada, prioridad) // prioridad usa el valor por defecto

// Renombrar al desestructurar:
const { titulo: nombreTarea } = tarea
console.log(nombreTarea)

// SPREAD para actualizar sin mutar. Este patrón exacto es el 90% de las
// actualizaciones de estado en React:
const tareaActualizada = { ...tarea, completada: true }
console.log(tarea.completada, tareaActualizada.completada) // false true

// Propiedad abreviada: si la variable se llama igual que la clave
const id = 'b2'
const otraTarea = { id, titulo: 'Otra' } // === { id: id, titulo: 'Otra' }
console.log(otraTarea)

// Recorrer objetos
console.log(Object.keys(tarea)) // ['id','titulo',...]
console.log(Object.values(otraTarea)) // ['b2','Otra']
console.log(Object.entries(otraTarea)) // [['id','b2'], ['titulo','Otra']]

// ----------------------------------------------------------------------------
// 7. ⚠️ ARRAYS — el corazón de React
// ----------------------------------------------------------------------------
console.log('%c7. Arrays ⚠️', 'font-weight:bold;font-size:14px')

const tareas = [
  { id: 1, titulo: 'Leer', completada: true, prioridad: 'alta' },
  { id: 2, titulo: 'Escribir', completada: false, prioridad: 'normal' },
  { id: 3, titulo: 'Correr', completada: false, prioridad: 'alta' },
]

// .map() → transforma CADA elemento y devuelve un array NUEVO del mismo tamaño.
// Es, literalmente, cómo React convierte datos en interfaz.
const titulos = tareas.map((t) => t.titulo)
console.log('map →', titulos)

// .filter() → devuelve un array nuevo SOLO con los que cumplen la condición.
const pendientes = tareas.filter((t) => !t.completada)
console.log('filter →', pendientes.length)

// .find() → el PRIMER elemento que cumple (o undefined). Devuelve el elemento,
// no un array. .findIndex() devuelve su posición (o -1).
console.log('find →', tareas.find((t) => t.id === 2))

// .some() / .every() → booleanos
console.log('some →', tareas.some((t) => t.completada)) // ¿hay alguna hecha?
console.log('every →', tareas.every((t) => t.completada)) // ¿están todas hechas?

// .reduce() → colapsa el array en UN valor (número, objeto, lo que sea).
// (acumulador, elementoActual) => nuevoAcumulador, y un valor inicial.
const totalAltas = tareas.reduce((acc, t) => (t.prioridad === 'alta' ? acc + 1 : acc), 0)
console.log('reduce →', totalAltas)

// Agrupar con reduce (patrón muy frecuente):
const porPrioridad = tareas.reduce((acc, t) => {
  acc[t.prioridad] = [...(acc[t.prioridad] ?? []), t.titulo]
  return acc
}, {})
console.log('agrupado →', porPrioridad)

// Encadenar es lo normal: cada método devuelve un array nuevo.
const resumen = tareas
  .filter((t) => !t.completada)
  .map((t) => t.titulo.toUpperCase())
  .join(', ')
console.log('encadenado →', resumen)

// ⚠️ MUTAN vs NO MUTAN — memoriza esta tabla; es la causa de la mitad de los
// bugs de React de los principiantes:
//
//   MUTAN (❌ nunca sobre el estado)   |   DEVUELVEN UNO NUEVO (✅ seguros)
//   ---------------------------------- | ----------------------------------
//   push, pop, shift, unshift          |   map, filter, slice, concat
//   splice                             |   [...array, x]  (spread)
//   sort, reverse                      |   [...array].sort()  ← copia primero
//
const mutable = [3, 1, 2]
const ordenado = [...mutable].sort((a, b) => a - b) // ✅ copia y ordena
console.log('sort seguro →', mutable, ordenado) // [3,1,2]  [1,2,3]

// Las 4 operaciones sobre listas, en versión inmutable (justo lo que harás
// dentro de setState en React):
const agregar = (lista, item) => [...lista, item]
const eliminar = (lista, id) => lista.filter((x) => x.id !== id)
const actualizar = (lista, id, cambios) =>
  lista.map((x) => (x.id === id ? { ...x, ...cambios } : x))
const insertarAlInicio = (lista, item) => [item, ...lista]

console.log('agregar →', agregar(tareas, { id: 4, titulo: 'Nueva' }).length)
console.log('eliminar →', eliminar(tareas, 1).length)
console.log('actualizar →', actualizar(tareas, 2, { completada: true })[1])
console.log('insertar →', insertarAlInicio(tareas, { id: 0 })[0].id)
console.log('original intacto →', tareas.length) // 3 ✅ nada se mutó

// Destructuring de arrays: por POSICIÓN, no por nombre. Por eso puedes llamar
// como quieras a las dos variables de useState:
const [primero, segundo] = titulos
console.log(primero, segundo)
// const [valor, setValor] = useState(0)   ← es exactamente esto

// ----------------------------------------------------------------------------
// 8. STRINGS Y NÚMEROS
// ----------------------------------------------------------------------------
console.log('%c8. Strings y números', 'font-weight:bold;font-size:14px')

const nombre = 'Ana'
console.log(`Hola, ${nombre}. Tienes ${tareas.length} tareas.`) // template literal
console.log(`Multilínea
sin concatenar nada`)

console.log('  espacios  '.trim())
console.log('a,b,c'.split(',')) // ['a','b','c']
console.log(['a', 'b'].join('-')) // 'a-b'
console.log('JavaScript'.includes('Script')) // true
console.log('JavaScript'.slice(0, 4)) // 'Java'
console.log('hola'.toUpperCase(), 'HOLA'.toLowerCase())
console.log('tarea'.replace('t', 'T'))

console.log(Number('42') + 1) // 43   (sin Number: '42' + 1 === '421' ⚠️)
console.log(parseInt('42px', 10)) // 42
console.log((3.14159).toFixed(2)) // '3.14'  (ojo: devuelve string)
console.log(Math.round(4.6), Math.max(1, 9, 3), Math.random() < 2)

// ----------------------------------------------------------------------------
// 9. CONTROL DE FLUJO
// ----------------------------------------------------------------------------
const puntos = 85
if (puntos >= 90) console.log('A')
else if (puntos >= 80) console.log('B')
else console.log('C')

// for...of recorre VALORES de un array (prefiérelo al for clásico)
for (const t of tareas) {
  if (t.completada) continue // salta al siguiente
  console.log('pendiente:', t.titulo)
}

// for...in recorre CLAVES de un objeto
for (const clave in otraTarea) console.log(clave, '=', otraTarea[clave])

// ----------------------------------------------------------------------------
// 10. ERRORES
// ----------------------------------------------------------------------------
console.log('%c10. Errores', 'font-weight:bold;font-size:14px')

function dividirSeguro(a, b) {
  if (b === 0) throw new Error('No se puede dividir entre cero')
  return a / b
}

try {
  dividirSeguro(10, 0)
} catch (error) {
  console.log('capturado →', error.message)
} finally {
  console.log('finally se ejecuta pase lo que pase')
}

// ----------------------------------------------------------------------------
// 11. MÓDULOS ES (la sintaxis que usarás en todo el proyecto React)
// ----------------------------------------------------------------------------
// Este archivo NO es un módulo (se carga con <script defer> para que funcione
// abriéndolo con doble clic). Así se ve la sintaxis real:
//
//   // utilidades.js
//   export const sumar = (a, b) => a + b        // export nombrado (varios por archivo)
//   export default function App() {}            // export por defecto (uno por archivo)
//
//   // main.js
//   import App from './App.jsx'                 // el default: el nombre lo eliges tú
//   import { sumar, restar } from './utilidades.js'   // nombrados: nombre exacto, con llaves
//   import App, { sumar } from './App.jsx'      // ambos a la vez
//
// Cada módulo tiene su propio ámbito: nada se filtra entre archivos si no lo
// exportas explícitamente. Requiere <script type="module"> o un empaquetador
// como Vite (que es lo que usa el proyecto React).

// ----------------------------------------------------------------------------
// 12. CLASES (útil reconocerlas; React moderno ya no las necesita)
// ----------------------------------------------------------------------------
class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }
  hablar() {
    return `${this.nombre} hace un ruido`
  }
}
class Perro extends Animal {
  hablar() {
    return `${this.nombre} ladra`
  }
}
console.log(new Perro('Rex').hablar())
// Verás clases en tutoriales viejos de React ("class components"). Hoy todo se
// escribe con funciones y hooks; entender clases no es requisito para React.

console.log('%c✅ Fin. Ahora abre 04-js-dom', 'color:green;font-weight:bold')
