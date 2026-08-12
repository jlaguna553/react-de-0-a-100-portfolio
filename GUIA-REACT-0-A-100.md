# De 0 a 100: HTML, CSS, JavaScript y React — Guía completa

Esta guía acompaña al proyecto **TaskFlow** (carpetas `fundamentos/`,
`frontend/` y `backend/`). La idea es que leas cada sección y de inmediato
abras el archivo real que se menciona, para ver el concepto aplicado en código
de verdad — no en un ejemplo de juguete que nunca vuelves a usar.

La guía tiene tres partes, y **están en orden a propósito**:

| Parte | Secciones | Qué cubre | Dónde está el código |
|---|---|---|---|
| **I — Fundamentos** | 1–9 | La web, HTML, CSS y JavaScript. Sin frameworks. | `fundamentos/` (se abre con doble clic, no hay que instalar nada) |
| **II — React** | 10–27 | Componentes, estado, hooks, routing, datos | `frontend/` |
| **III — Full stack** | 28–32 | Backend, base de datos, despliegue, roadmap | `backend/` |

> **No te saltes la Parte I.** React no es un lenguaje: es una librería de
> JavaScript que dibuja HTML y lo estiliza con CSS. Cada problema que tengas en
> React será, en realidad, un hueco en uno de esos tres. Los conceptos marcados
> con ⚠️ en la Parte I son los que causan bugs de React reales, todos los días,
> en gente que se saltó los fundamentos.

Cómo correr las cosas:

- **Parte I**: nada que instalar. Abre `fundamentos/01-html/index.html` en el
  navegador. Lee [`fundamentos/README.md`](fundamentos/README.md).
- **Partes II y III**: sigue el `README.md` de la raíz, y con el proyecto
  corriendo abre `http://localhost:5173/aprende` mientras lees las secciones
  12 a 21: ahí tienes cada concepto aislado y funcionando.

---
---

# PARTE I — FUNDAMENTOS

---

## 1. Cómo funciona la web (el modelo mental)

Antes de escribir una línea de código, ten claro quién hace qué.

**Cliente y servidor.** Escribes una URL. Tu navegador (el *cliente*) envía una
petición **HTTP** a un *servidor*. El servidor responde con archivos: un
`.html`, unos `.css`, unos `.js`, imágenes. El navegador los lee y dibuja la
página. Cada `<img>`, cada `<link>`, cada `fetch()` es una petición más.

**Las tres capas.** Cada una tiene una responsabilidad, y mezclarlas es lo que
vuelve inmantenible un proyecto:

| Capa | Responsabilidad | Pregunta que responde |
|---|---|---|
| **HTML** | Estructura y significado | ¿Qué es esto? |
| **CSS** | Presentación | ¿Cómo se ve? |
| **JavaScript** | Comportamiento | ¿Qué pasa cuando el usuario interactúa? |

**Qué hace el navegador con el HTML.** Lo lee y construye el **DOM**
(*Document Object Model*): un árbol de objetos en memoria donde cada etiqueta
es un objeto de JavaScript con propiedades y métodos. La pantalla es un reflejo
de ese árbol. **Modificar el DOM modifica lo que se ve.** Toda la programación
front-end —incluida React— consiste en manipular ese árbol; la diferencia está
en si lo haces a mano o lo declaras.

**JavaScript corre en dos sitios**: en el navegador (dentro de una pestaña, con
acceso al DOM) y en el servidor mediante **Node.js** (sin DOM, pero con acceso
a archivos y a la red). El `frontend/` de este proyecto es lo primero; el
`backend/`, lo segundo. Mismo lenguaje, entornos distintos.

**Las herramientas que vas a usar todo el tiempo** son las *DevTools* del
navegador (`F12`):

- **Elements**: el DOM en vivo. Puedes editar HTML y CSS ahí mismo para probar.
- **Console**: mensajes de `console.log` y errores. También es una consola de
  JavaScript donde puedes escribir y ejecutar código al vuelo.
- **Network**: cada petición, su código de estado y su respuesta. Es el primer
  sitio al que ir cuando "no cargan los datos".
- **Application**: `localStorage`, cookies, caché.

📂 Empieza por `fundamentos/01-html/index.html`.

---

## 2. HTML — estructura y significado

📂 Archivo de referencia: `fundamentos/01-html/index.html` (comentado línea a
línea; ábrelo en el navegador y en el editor a la vez).

### La anatomía

```html
<etiqueta atributo="valor">contenido</etiqueta>
```

Algunos elementos no tienen contenido y se cierran solos (*void elements*):
`<img>`, `<input>`, `<br>`, `<meta>`.

Todo documento tiene el mismo esqueleto:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Título de la pestaña</title>
    <link rel="stylesheet" href="estilos.css" />
  </head>
  <body>
    <!-- lo que se ve -->
    <script src="app.js" defer></script>
  </body>
</html>
```

Tres líneas que la gente copia sin entender, y que importan:

- `lang="es"` — los lectores de pantalla eligen la voz y la pronunciación con
  esto.
- `<meta charset="UTF-8">` — sin esto, los acentos y emojis salen como
  símbolos rotos. Va **siempre primero**.
- `<meta name="viewport" ...>` — sin esto **no hay diseño responsive**: el móvil
  finge ser un escritorio de 980px y encoge todo.

### Semántica: usa la etiqueta que describe el contenido

Un `<div>` no significa nada. Un `<header>` significa "encabezado". Elegir bien
importa por tres razones concretas:

1. **Accesibilidad**: un lector de pantalla puede saltar directo al `<main>` o
   listar todos los encabezados.
2. **SEO**: los buscadores entienden la jerarquía de tu contenido.
3. **Tú mismo**, leyendo tu código dentro de seis meses.

Las principales: `<header>`, `<nav>`, `<main>` (solo uno por página),
`<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>` + `<figcaption>`.

**Regla**: usa `<div>` solo cuando no exista una etiqueta con significado —
normalmente, cuando el elemento existe únicamente para agrupar cosas y darles
estilo.

### Encabezados: un índice, no tamaños de letra

`<h1>` a `<h6>` forman el índice del documento. Nunca saltes un nivel (de `h2`
a `h4`) porque "se ve más pequeño": el tamaño es trabajo del CSS, la jerarquía
es trabajo del HTML.

### Formularios: la parte de HTML que más usarás en React

```html
<label for="titulo">Título</label>
<input type="text" id="titulo" name="titulo" required maxlength="80" />
```

- **Regla de oro**: cada `input` necesita su `<label>`, con `for` = `id` del
  input. Sin él, un lector de pantalla anuncia "campo de texto" y nada más. El
  `placeholder` **no** sustituye al label: desaparece al escribir.
- El atributo `name` es el nombre con el que viaja el dato al enviarse.
- `type` te da validación gratis del navegador: `email`, `number`, `url`,
  `tel`, `date`, `password`, `color`, `range`, `file`.
- `required`, `min`, `max`, `pattern`, `maxlength` validan **sin una línea de
  JavaScript**.
- Radios con el mismo `name` forman un grupo excluyente; los checkbox son
  independientes.
- ⚠️ Dentro de un `<form>`, un `<button>` sin `type` **es** un botón de envío y
  recarga la página. Si es un botón para JavaScript, pon `type="button"`.

### Accesibilidad: el mínimo no negociable

- `alt` en toda imagen (describe la imagen; no escribas "imagen de…").
- `<label>` en todo input.
- Usa `<button>` para acciones y `<a href>` para navegar. Un `<div onclick>` no
  recibe foco con `Tab` ni responde a `Enter`: es invisible para quien no usa
  ratón.
- No rompas el orden de los encabezados.
- Si un control no tiene texto visible (un botón que solo muestra 🗑), dale un
  `aria-label`.

### Errores comunes

1. **"Divitis"**: envolver todo en `<div>` habiendo `<nav>`, `<section>`,
   `<button>`.
2. `<div onclick>` en vez de `<button>`.
3. Olvidar `alt` y `<label>`.
4. Repetir un `id` (deben ser únicos en la página; para agrupar, `class`).
5. Anidar mal: `<p><div></div></p>` es inválido — un `<p>` solo admite
   contenido en línea.

---

## 3. CSS — presentación

📂 Archivos de referencia: `fundamentos/02-css/index.html` y
`fundamentos/02-css/estilos.css`.

### Cómo se aplica

Tres formas, en orden de preferencia:

1. **Archivo externo** con `<link rel="stylesheet" href="estilos.css">` — la
   única correcta en un proyecto real.
2. `<style>` dentro del `<head>` — para demos rápidas.
3. `style="..."` en el elemento (*estilo en línea*) — no se reutiliza y gana en
   especificidad. Úsalo solo para valores calculados en tiempo de ejecución (en
   React lo verás como ``style={{ width: `${porcentaje}%` }}``).

### Selectores, cascada y especificidad

Cuando dos reglas chocan, gana la de **mayor especificidad**; a igual
especificidad, gana la que aparece **después**. Ese es todo el misterio de la
"cascada".

| Peso | Selector | Ejemplo |
|---|---|---|
| 0-0-1 | etiqueta | `p`, `div` |
| 0-1-0 | clase, atributo, pseudo-clase | `.tarjeta`, `[type="text"]`, `:hover` |
| 1-0-0 | id | `#titulo` |
| — | estilo en línea | `style="..."` |
| — | `!important` | gana a todo — evítalo, es deuda técnica |

**Regla práctica**: estiliza casi siempre con **clases**. Los `id` son para
JavaScript y para anclas; su especificidad alta es difícil de anular después.

Combinadores: `A B` (descendiente), `A > B` (hijo directo), `A + B` (hermano
siguiente), `A ~ B` (hermanos siguientes).

Pseudo-clases (un *estado*): `:hover`, `:focus`, `:focus-visible`, `:active`,
`:disabled`, `:first-child`, `:nth-child(even)`, `:not(...)`.
Pseudo-elementos (una *parte virtual*): `::before`, `::after`, `::placeholder`.

### Herencia

`color`, `font-family` y `line-height` los heredan los hijos automáticamente;
`border`, `padding` y `background` no. Por eso la tipografía se define una vez
en `body` y ya.

### ⚠️ El box model

Toda caja tiene cuatro capas concéntricas: `content` → `padding` → `border` →
`margin`.

Por defecto, `width: 300px` mide **solo el contenido**: si añades `padding: 20px`
y `border: 2px`, la caja ocupa 344px reales. Es la frustración número uno de
todo principiante. La solución cabe en tres líneas y va en el 100% de los
proyectos profesionales:

```css
*, *::before, *::after { box-sizing: border-box; }
```

Ahora `width` incluye padding y borde.

### Unidades

| Unidad | Relativa a | Úsala para |
|---|---|---|
| `px` | nada (fija) | bordes, sombras |
| `rem` | tamaño de fuente de `<html>` (16px) | **tipografía y espaciado** |
| `em` | tamaño de fuente del propio elemento | dentro de un componente aislado |
| `%` | el contenedor padre | anchos fluidos |
| `vw` / `vh` | ancho / alto de la ventana | secciones a pantalla completa |
| `fr` | espacio libre | solo en Grid |
| `ch` | ancho del carácter "0" | `max-width: 65ch` = línea legible |

`rem` en vez de `px` para el texto tiene una consecuencia real: si el usuario
agranda la letra en su navegador, tu diseño escala con él.

### Display

- `block` — ocupa todo el ancho, respeta `width`/`height` (`div`, `p`, `h1`).
- `inline` — fluye con el texto, **ignora** `width`, `height` y márgenes
  verticales (`span`, `a`, `strong`).
- `inline-block` — fluye con el texto pero respeta `width`/`height`.
- `flex` / `grid` — convierte el elemento en contenedor de layout.
- `none` — lo saca del documento (ni ocupa espacio). Distinto de
  `visibility: hidden`, que oculta pero deja el hueco.

### Flexbox — layout en una dimensión

Tu herramienta del día a día: barras de navegación, filas de botones, centrar
cosas.

```css
.contenedor {
  display: flex;
  flex-direction: row;          /* o column: define el eje principal */
  justify-content: space-between; /* alineación en el EJE PRINCIPAL */
  align-items: center;            /* alineación en el EJE CRUZADO */
  gap: 16px;                      /* separación (mejor que márgenes) */
  flex-wrap: wrap;                /* permite saltar de línea */
}
.hijo { flex: 1; }                /* crece para repartirse el espacio sobrante */
```

Valores de `justify-content`: `flex-start`, `center`, `flex-end`,
`space-between`, `space-around`, `space-evenly`.

El centrado perfecto, que antes requería trucos:

```css
.caja { display: flex; align-items: center; justify-content: center; }
```

### Grid — layout en dos dimensiones

Para la rejilla general de la página y para galerías de tarjetas.

```css
.rejilla { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
```

El patrón más útil de todo CSS Grid — responsive **sin media queries**:

```css
.tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

Se lee: "columnas de mínimo 200px, mete tantas como quepan, que se repartan el
resto". Y con áreas nombradas el CSS se lee como un dibujo:

```css
.layout {
  display: grid;
  grid-template-areas:
    "cabecera cabecera"
    "menu     contenido"
    "pie      pie";
  grid-template-columns: 160px 1fr;
}
.menu { grid-area: menu; }
```

**Cuándo cuál**: Flexbox para una fila o una columna de elementos; Grid cuando
controlas filas *y* columnas a la vez. Se combinan sin problema.

### Position

| Valor | Comportamiento |
|---|---|
| `static` | por defecto; sigue el flujo |
| `relative` | se desplaza respecto a sí mismo, deja su hueco, y crea contexto para los `absolute` de dentro |
| `absolute` | sale del flujo; se posiciona respecto al ancestro posicionado más cercano |
| `fixed` | respecto a la ventana; no se mueve al hacer scroll |
| `sticky` | normal hasta llegar a su umbral, y ahí se pega |

`z-index` solo funciona en elementos posicionados.

### Responsive: mobile-first

Escribe primero los estilos del móvil (sin media query) y **añade** con
`min-width` lo que solo tiene sentido en pantallas grandes:

```css
.grid { grid-template-columns: 1fr; }
@media (min-width: 640px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 960px) { .grid { grid-template-columns: repeat(4, 1fr); } }
```

Y `clamp(mínimo, ideal, máximo)` da tipografía fluida sin media queries:
`font-size: clamp(1.5rem, 5vw, 3rem)`.

### Variables (custom properties)

```css
:root { --primary: #4f46e5; }
.boton { background: var(--primary); }
```

Cambiar `--primary` en un sitio repinta toda la app. Es exactamente la técnica
con la que `frontend/src/index.css` implementa el tema claro/oscuro del proyecto
React: `ThemeContext` cambia un atributo `data-theme` en `<html>` y las
variables se redefinen en bloque.

### Transiciones y estados

```css
.boton { transition: background-color .2s ease, transform .1s ease; }
.boton:hover  { background: var(--primary-hover); }
.boton:active { transform: scale(.97); }
.boton:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }
```

⚠️ **Nunca** escribas `outline: none` sin poner una alternativa visible: dejas
la página inservible para quien navega con `Tab`.

### Errores comunes

1. No poner `box-sizing: border-box`.
2. Pelearse con la especificidad a base de `!important` en vez de simplificar
   los selectores.
3. Usar `px` para todo, incluida la tipografía.
4. Maquetar con `position: absolute` lo que Flexbox o Grid resuelven solo.
5. Usar márgenes entre elementos flex/grid en vez de `gap`.
6. Escribir *desktop-first* con `max-width` y acabar peleando con la cascada.

---

## 4. JavaScript — el lenguaje

📂 Archivo de referencia: `fundamentos/03-js-lenguaje/lenguaje.js` (todo lo de
abajo, ejecutable, con la salida en la consola del navegador).

### Variables

```js
const PI = 3.1416   // no se puede reasignar
let contador = 0    // sí se puede reasignar
```

**Regla de trabajo**: usa `const` siempre; cámbialo a `let` solo cuando
necesites reasignar. Así, de un vistazo, sabes qué cambia en tu programa.
`var` existe, pero ignora el ámbito de bloque: no lo uses.

⚠️ `const` **no** significa inmutable. Significa "no puedes reasignar la
variable". El contenido de un objeto declarado con `const` sí se puede
modificar:

```js
const config = { tema: 'claro' }
config.tema = 'oscuro'   // ✅ permitido
config = {}              // ❌ TypeError
```

### Tipos

**Primitivos** (7): `string`, `number` (no hay int/float aparte), `boolean`,
`null`, `undefined`, `symbol`, `bigint`. **Objetos**: todo lo demás — objetos,
arrays, funciones, fechas.

`null` es "vacío a propósito" (lo pones tú); `undefined` es "todavía no tiene
valor" (lo pone JavaScript). `typeof null` devuelve `"object"`: un bug
histórico del lenguaje que nunca se arregló. Para detectar arrays,
`Array.isArray(x)` (porque `typeof [] === 'object'`).

### ⚠️ Valor vs referencia — el concepto que hace o rompe tu React

Los **primitivos** se copian por valor: dos cajas independientes.

```js
let a = 10, b = a
b = 99            // a sigue siendo 10
```

Los **objetos y arrays** se copian por **referencia**: dos etiquetas pegadas a
la misma caja.

```js
const original = { nombre: 'Ana' }
const alias = original
alias.nombre = 'Beatriz'
console.log(original.nombre)   // "Beatriz" ⚠️ cambió el original
```

Para copiar de verdad se usa el *spread*:

```js
const copia = { ...original }        // copia superficial
const otraLista = [...lista]
```

"Superficial" significa que solo copia el primer nivel: los objetos anidados se
siguen compartiendo. Para esos, copia también el nivel de adentro
(`{ ...user, direccion: { ...user.direccion } }`) o usa `structuredClone()`.

**Por qué te importa**: React decide si repintar comparando **referencias**
(¿es el mismo objeto que antes?). Si mutas el estado en vez de crear un objeto
nuevo, la referencia no cambia, React concluye "nada cambió", y tu pantalla se
queda congelada. De ahí sale la regla que verás en la sección 14:

```js
tareas.push(nueva)             // ❌ muta → React no se entera
setTareas([...tareas, nueva])  // ✅ array nuevo → React repinta
```

### Comparaciones y truthy/falsy

- Usa **siempre `===`**. `==` convierte tipos antes de comparar y produce
  perlas como `1 == '1'` → `true`, `0 == false` → `true`.
- **Falsy** son solo seis valores: `false`, `0`, `''`, `null`, `undefined`,
  `NaN`. ⚠️ `[]` y `{}` son **truthy**: para saber si un array está vacío,
  mira `array.length === 0`.
- `||` devuelve el primer valor truthy; `??` el primero que no sea
  `null`/`undefined`. La diferencia importa cuando `0` o `''` son válidos:
  `0 || 10` → `10`, pero `0 ?? 10` → `0`.
- `?.` (encadenamiento opcional) corta la evaluación en vez de lanzar
  "Cannot read properties of undefined": `respuesta.datos?.usuario?.nombre`.
- El **ternario** `condicion ? a : b` es la única forma de hacer un if/else
  dentro de una expresión — y por eso lo usarás constantemente dentro del JSX.

### Funciones

```js
function sumar(a, b) { return a + b }        // declaración
const restar = function (a, b) { return a - b }  // expresión
const multiplicar = (a, b) => a * b          // arrow: return implícito
const dividir = (a, b) => { return a / b }   // con llaves, return explícito
const crearPunto = (x, y) => ({ x, y })      // ⚠️ objeto: entre paréntesis
```

Las *arrow functions* dominan el código moderno y todo React. Parámetros por
defecto (`(titulo, prioridad = 'normal') => …`) y *rest*
(`(...numeros) => …`) completan el cuadro.

**Funciones de orden superior**: en JavaScript una función es un valor más;
puedes pasarla como argumento y devolverla. Esa idea es la base de `.map()`, de
los manejadores de eventos y de React entero.

⚠️ Pasar la función **no** es lo mismo que ejecutarla:

```jsx
onClick={borrar}            // ✅ React la llamará cuando haya clic
onClick={borrar()}          // ❌ se ejecuta ya, al renderizar
onClick={() => borrar(id)}  // ✅ cuando hay que pasar argumentos
```

**Closure**: una función recuerda las variables del ámbito donde se creó,
incluso después de que ese ámbito terminó. Es la mecánica detrás de `useState`.

Sobre `this`: las arrow functions no tienen `this` propio, lo heredan del
entorno. Si usas siempre arrows, `this` deja de ser un problema — y esa es una
de las razones por las que el React moderno abandonó las clases.

### Objetos

```js
const tarea = { id: 'a1', titulo: 'Aprender JS', completada: false }

tarea.titulo        // acceso con punto
tarea['titulo']     // con corchetes: imprescindible para claves dinámicas

const { titulo, prioridad = 'normal' } = tarea   // destructuring + valor por defecto
const { titulo: nombreTarea } = tarea            // renombrando

const actualizada = { ...tarea, completada: true }  // copiar cambiando un campo

const id = 'b2'
const otra = { id, titulo: 'Otra' }   // propiedad abreviada: { id: id, … }

Object.keys(tarea); Object.values(tarea); Object.entries(tarea)
```

El *destructuring* es lo que verás en la cabecera de cada componente de React:
`function TaskCard({ task, onToggle, onDelete })`. Y `{ ...tarea, campo: valor }`
es, literalmente, el 90% de las actualizaciones de estado que vas a escribir.

### ⚠️ Arrays — el corazón de React

```js
const titulos   = tareas.map(t => t.titulo)          // transforma → array nuevo
const pendientes= tareas.filter(t => !t.completada)  // selecciona → array nuevo
const uno       = tareas.find(t => t.id === 2)       // el primero que cumple (o undefined)
const pos       = tareas.findIndex(t => t.id === 2)  // su posición (o -1)
const hayAlguna = tareas.some(t => t.completada)     // booleano
const todas     = tareas.every(t => t.completada)    // booleano
const total     = tareas.reduce((acc, t) => acc + t.puntos, 0)  // colapsa a un valor
```

`.map()` es *el* método de React: convierte un array de datos en un array de
elementos de interfaz. `.forEach()` se le parece pero **no devuelve nada** —
sirve para efectos, no para transformar.

**La tabla que hay que memorizar**:

| Mutan (❌ nunca sobre el estado) | Devuelven uno nuevo (✅ seguros) |
|---|---|
| `push`, `pop`, `shift`, `unshift` | `map`, `filter`, `slice`, `concat` |
| `splice` | `[...array, x]` (spread) |
| `sort`, `reverse` | `[...array].sort()` ← copia primero |

Las cuatro operaciones sobre listas, en versión inmutable — exactamente lo que
escribirás dentro de un `setState`:

```js
const agregar    = (lista, item)        => [...lista, item]
const eliminar   = (lista, id)          => lista.filter(x => x.id !== id)
const actualizar = (lista, id, cambios) => lista.map(x => x.id === id ? { ...x, ...cambios } : x)
const alPrincipio= (lista, item)        => [item, ...lista]
```

El *destructuring* de arrays es por **posición**, no por nombre — por eso puedes
llamar como quieras a las dos variables de `useState`:

```js
const [primero, segundo] = miArray
const [valor, setValor]  = useState(0)   // es exactamente lo mismo
```

### Strings, números, control de flujo

```js
`Hola, ${nombre}. Tienes ${tareas.length} tareas.`   // template literal
'a,b,c'.split(','); ['a','b'].join('-'); '  x  '.trim()
'JavaScript'.includes('Script'); 'JavaScript'.slice(0, 4)
Number('42') + 1          // 43   ⚠️ sin Number: '42' + 1 === '421'
(3.14159).toFixed(2)      // '3.14' (ojo: devuelve string)

for (const t of tareas) { … }        // valores de un array
for (const clave in objeto) { … }    // claves de un objeto
```

### Errores y módulos

```js
try { … } catch (error) { console.log(error.message) } finally { … }
throw new Error('mensaje')
```

Módulos ES — la sintaxis de todo el proyecto React:

```js
export const sumar = (a, b) => a + b     // export nombrado (varios por archivo)
export default function App() {}         // export por defecto (uno por archivo)

import App from './App.jsx'              // el default: el nombre lo eliges tú
import { sumar, restar } from './utils.js'  // nombrados: nombre exacto, con llaves
```

Cada módulo tiene su propio ámbito: nada se filtra entre archivos si no lo
exportas.

### Clases

Existen (`class Perro extends Animal`), y las verás en tutoriales antiguos de
React ("class components"). Hoy todo se escribe con funciones y hooks:
**entender clases no es requisito para React**.

---

## 5. JavaScript — el DOM y los eventos

📂 Archivo de referencia: `fundamentos/04-js-dom/dom.js`. **Es el archivo más
importante para entender por qué existe React.**

### Seleccionar y modificar

```js
const el   = document.querySelector('#saludo')    // el primero (o null)
const list = document.querySelectorAll('.dato')   // todos → NodeList

el.textContent = 'texto plano'   // ✅ seguro
el.innerHTML   = '<b>ojo</b>'    // ⚠️ interpreta HTML
```

⚠️ Nunca pases a `innerHTML` texto escrito por un usuario sin sanitizar: es la
puerta de entrada a un ataque **XSS** (alguien escribe
`<img src=x onerror=…>` como título de tarea y ejecuta código en el navegador de
los demás). React escapa todo por defecto, y por eso la única forma de hacerlo
allí se llama, literalmente, `dangerouslySetInnerHTML`.

Una `NodeList` no es un array: tiene `forEach` pero no `map` ni `filter`. Para
convertirla, `[...nodeList]`.

### Eventos

```js
boton.addEventListener('click', (event) => { … })
```

Pasas la **función**, no su resultado (nada de `addEventListener('click', fn())`).

- `event.target` — dónde ocurrió el evento.
- `event.currentTarget` — dónde está puesto el listener.
- `event.preventDefault()` — cancela el comportamiento por defecto.
- `element.dataset.x` — lee un atributo `data-x` del HTML.

Los que usarás: `click`, `input` (en cada tecla), `change` (al perder el foco),
`submit`, `keydown`, `focus`, `blur`, `mouseenter`, `scroll`, `resize`.

Esta línea de aquí:

```js
entrada.addEventListener('input', (e) => { eco.textContent = e.target.value })
```

es, exactamente, lo que en React se escribe como
`onChange={(e) => setTexto(e.target.value)}`.

### Crear elementos y delegación

```js
const li = document.createElement('li')
li.textContent = 'Elemento'
lista.appendChild(li)
```

**Burbujeo**: un evento sube por los ancestros del elemento. Gracias a eso, un
solo listener en el `<ul>` atiende los clics de todos los `<li>`, incluidos los
que aún no existen. Eso es la **delegación de eventos**, y evita tener que
añadir y quitar listeners uno por uno (una fuente clásica de fugas de memoria).

### Formularios

```js
formulario.addEventListener('submit', (event) => {
  event.preventDefault()                 // ⚠️ sin esto, la página se recarga
  const valores = Object.fromEntries(new FormData(formulario))
  …
})
```

Escribirás ese `preventDefault()` en cada `onSubmit` de React.

### Clases, estilos y almacenamiento

```js
el.classList.add('x'); el.classList.remove('x')
el.classList.toggle('x'); el.classList.contains('x')
document.documentElement.style.setProperty('--bg', '#14151f')

localStorage.setItem('clave', JSON.stringify(objeto))
const dato = JSON.parse(localStorage.getItem('clave') ?? '[]')
```

`localStorage` solo guarda strings — de ahí el `JSON.stringify` / `JSON.parse`.
Sobrevive a recargas y a cerrar el navegador. No guardes ahí nada sensible.

### ⚠️ La moraleja

Fíjate en el patrón de todo `dom.js`: **"busca el elemento → cámbialo a mano"**,
en cada interacción. Con 3 elementos es manejable. Con 30 que dependen del mismo
dato, es un infierno de sincronización: basta con olvidar una línea para que una
parte de la pantalla muestre datos viejos.

Ese dolor exacto es el que resuelve React (sección 10).

---

## 6. JavaScript — asincronía y datos

📂 Archivo de referencia: `fundamentos/05-js-async/async.js`.

### Por qué existe la asincronía

JavaScript tiene **un solo hilo**: hace una cosa a la vez. Si una petición al
servidor bloqueara ese hilo dos segundos, la página se congelaría entera.

La solución: las operaciones lentas (red, temporizadores, disco) se delegan al
navegador y el hilo sigue libre; cuando terminan, su callback se encola y se
ejecuta en cuanto se pueda. A ese mecanismo se le llama **event loop**.

Consecuencia práctica, y origen del 90% de la confusión: **el código no se
ejecuta en el orden en que está escrito**. Todo lo asíncrono espera a que
termine el código síncrono.

### Promesas

Una promesa es un objeto que representa un valor que **todavía no existe**.
Tiene tres estados: pendiente → cumplida (`resolve`) o rechazada (`reject`).

```js
esperar(1500)
  .then(() => …)                       // cuando se cumple
  .catch((error) => …)                 // si falla cualquier eslabón de la cadena
  .finally(() => …)                    // pase lo que pase
```

### async / await

El mismo comportamiento, escrito como código secuencial normal. Es lo que se usa
hoy y lo que verás en el proyecto:

```js
async function cargar() {
  try {
    const datos = await pedirDatos()   // pausa ESTA función, no la página
    …
  } catch (error) { … }
}
```

- `async` hace que la función devuelva siempre una promesa.
- `await` solo puede usarse dentro de una función `async`.
- Los errores se capturan con `try/catch` normal.

⚠️ Secuencial vs paralelo:

```js
await esperar(500); await esperar(500); await esperar(500)   // 🐢 1500 ms
await Promise.all([esperar(500), esperar(500), esperar(500)]) // 🚀 500 ms
```

Si las peticiones no dependen unas de otras, lánzalas con `Promise.all`.

### fetch

```js
const respuesta = await fetch(url)          // 1º await: cabeceras
if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
const datos = await respuesta.json()        // 2º await: cuerpo
```

⚠️ **La trampa clásica**: `fetch` **no lanza error** si el servidor responde 404
o 500 — a nivel de red, esa es una respuesta perfectamente válida. Solo falla si
no hubo red. Hay que comprobar `respuesta.ok` a mano, **siempre**.

Enviar datos:

```js
await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Nueva tarea' }),   // el cuerpo viaja como texto
})
```

### Los tres estados de toda petición

**Cargando**, **error**, **datos**. Siempre los tres. Es el patrón que en la
sección 24 verás convertido en tres `useState` dentro de
`frontend/src/hooks/useTasks.js`.

### HTTP: lo mínimo que hay que reconocer

| Método | Intención |
|---|---|
| `GET` | leer |
| `POST` | crear |
| `PUT` / `PATCH` | actualizar (completo / parcial) |
| `DELETE` | borrar |

Códigos: **200** OK · **201** Creado · **204** Sin contenido (típico de DELETE)
· **400** Petición mal formada · **401** Sin autenticar · **403** Sin permiso ·
**404** No existe · **500** Error del servidor.

**CORS**: por seguridad, el navegador bloquea que una página pida datos a otro
origen distinto salvo que el **servidor** lo autorice con la cabecera
`Access-Control-Allow-Origin`. Por eso `backend/server.js` usa `app.use(cors())`.
Si ves *"blocked by CORS policy"*, el arreglo va en el servidor, nunca en el
cliente.

---

## 7. Las herramientas: Node, npm y Vite

Hasta aquí no ha hecho falta instalar nada. Para React sí, y conviene saber qué
es cada pieza antes de que te aparezcan errores en la terminal.

**Node.js** es JavaScript fuera del navegador. Lo necesitas por dos razones: el
backend corre sobre él, y las herramientas del frontend (Vite, el compilador de
JSX) también. Comprueba tu versión con `node --version` (necesitas 18+).

**npm** es el gestor de paquetes que viene con Node.

| Comando | Qué hace |
|---|---|
| `npm install` | instala todo lo que declara `package.json` en `node_modules/` |
| `npm install react` | añade una dependencia nueva |
| `npm run dev` | ejecuta el script `dev` definido en `package.json` |

**`package.json`** es el carnet de identidad del proyecto: nombre, scripts y
dependencias. **`package-lock.json`** fija las versiones exactas instaladas —
va al repositorio. **`node_modules/`** son los paquetes descargados: es enorme,
se regenera con `npm install` y **nunca** va al repositorio (por eso está en
`.gitignore`).

**Vite** es el servidor de desarrollo y empaquetador del frontend. Hace tres
cosas por ti: sirve la app con recarga instantánea (*HMR*: guardas y el
navegador actualiza sin perder el estado), traduce el JSX a JavaScript que el
navegador entiende, y con `npm run build` genera la carpeta `dist/` optimizada
para producción.

**Variables de entorno**: en Vite, las que empiezan por `VITE_` quedan
disponibles como `import.meta.env.VITE_API_URL`. Es lo que usa el proyecto para
no tener `localhost:4000` escrito a fuego en el código (ver sección 30).

---

## 8. Proyecto puente: la app entera, sin React

📂 `fundamentos/06-mini-app-vanilla/` — ábrelo y **léelo completo** (unas 150
líneas). Es la misma aplicación de tareas que construirás con React, escrita con
todo lo de las secciones 2 a 6 y nada más: HTML semántico, CSS con flexbox y
variables, estado en un objeto, `localStorage`, delegación de eventos y
renderizado manual del DOM.

Fíjate en su estructura, porque es el modelo mental de React dibujado a mano:

```
estado (los datos)  →  render() (dibuja la interfaz a partir de los datos)
        ↑                                   │
        └──────  acciones que cambian el estado y vuelven a llamar a render()
```

Y fíjate sobre todo en las tres cosas que te resultan incómodas:

1. **`render()` borra la lista entera y la reconstruye** en cada cambio, por
   mínimo que sea. Es fácil de escribir, pero desperdicia trabajo, pierde el
   foco del teclado y la posición del scroll. La alternativa —actualizar solo lo
   que cambió— es el código tedioso y lleno de bugs que React escribe por ti.
2. **Cada trozo de interfaz derivado del estado hay que actualizarlo a mano**
   (la lista, el contador de pendientes, el botón de filtro activo, el mensaje
   de vacío). Olvidar una línea = una parte de la pantalla desincronizada. En
   React ese bug es imposible por construcción.
3. **Tienes que acordarte de llamar a `render()`** en cada acción. Cuenta
   cuántas veces aparece en el archivo.

Cuando termines la Parte II, vuelve a abrir este archivo junto a
`frontend/src/paginas/Tareas.jsx` y `frontend/src/componentes/TaskCard.jsx`.
Hacen lo mismo, sin una sola llamada a `createElement` ni `appendChild`.

---

## 9. Checklist: ¿estás listo para React?

Responde sin consultar. Si fallas alguna, vuelve a la sección indicada — te
ahorrará horas de frustración después.

**HTML** (§2)

- [ ] ¿Para qué sirven `<meta charset>` y `<meta name="viewport">`?
- [ ] ¿Por qué `<button>` y no `<div onclick>`?
- [ ] ¿Cómo se asocia un `<label>` a su `<input>`, y por qué importa?
- [ ] ¿Qué hace `required` sin JavaScript?

**CSS** (§3)

- [ ] ¿Qué diferencia hay entre `padding` y `margin`?
- [ ] ¿Qué cambia `box-sizing: border-box` y por qué se pone siempre?
- [ ] ¿Cómo centro una caja vertical y horizontalmente?
- [ ] ¿Cuándo Flexbox y cuándo Grid?
- [ ] ¿Quién gana entre `.tarjeta p` y `#titulo`?
- [ ] ¿Qué hace `repeat(auto-fit, minmax(200px, 1fr))`?

**JavaScript — lenguaje** (§4)

- [ ] Si `a` es un objeto y hago `const b = a; b.x = 1`, ¿qué le pasa a `a`?
- [ ] ¿Qué devuelve `.map()` y en qué se diferencia de `.forEach()`?
- [ ] ¿Cuáles de estos mutan: `push`, `filter`, `sort`, `slice`, `splice`?
- [ ] ¿Cómo añado un elemento a un array **sin** mutarlo? ¿Y cómo actualizo un
      objeto dentro de ese array?
- [ ] ¿Qué diferencia hay entre `0 || 10` y `0 ?? 10`?
- [ ] ¿Qué es una closure?
- [ ] ¿Qué hace `const { titulo } = tarea`?

**JavaScript — DOM y asincronía** (§5, §6)

- [ ] ¿Qué hace `event.preventDefault()` en el `submit` de un formulario?
- [ ] ¿Por qué `textContent` es más seguro que `innerHTML`?
- [ ] ¿Por qué un `fetch` que recibe un 404 **no** entra en el `catch`?
- [ ] ¿Cuál es la diferencia entre tres `await` seguidos y un `Promise.all`?
- [ ] ¿Qué tres estados hay que manejar en toda petición de datos?

**Herramientas** (§7)

- [ ] ¿Qué es `node_modules/` y por qué no va al repositorio?
- [ ] ¿Qué hace `npm run dev`?

Si has marcado todo, ya no vas a "aprender React": vas a aprender **una forma
distinta de organizar el JavaScript que ya sabes**. Sigue.

---
---

# PARTE II — REACT

---

## 10. ¿Qué es React y por qué existe?

Ya lo has vivido en la sección 8: actualizar una página con JavaScript "puro"
significa buscar elementos del DOM a mano (`document.querySelector(...)`) y
mutarlos cada vez que algo cambia. Se vuelve imposible de mantener cuando 5
partes distintas de la pantalla dependen del mismo dato.

React propone un modelo **declarativo**: tú describes **cómo se debe ver la
interfaz para un estado de datos dado**, y React calcula los cambios mínimos
necesarios en el DOM real para llegar ahí. A esto se le llama el **Virtual
DOM**: una representación en memoria, ligera, del árbol de la interfaz, que
React compara ("diffing") contra la versión anterior para actualizar solo lo que
cambió.

En la práctica, tu trabajo como desarrollador de React se reduce a una pregunta
constante: **"¿cuál es mi estado, y cómo se ve la interfaz en función de ese
estado?"** Todo lo demás (cuándo repintar, qué tocar del DOM) lo resuelve React.

Dicho de otro modo: en `fundamentos/06-mini-app-vanilla/app.js` escribiste
`estado` + `render()` + "acuérdate de llamar a render()". React te quita el
tercer punto y optimiza el segundo.

---

## 11. Componentes: la unidad fundamental

Un componente de React es simplemente **una función de JavaScript que devuelve
JSX** (una descripción de interfaz). Puedes componer componentes pequeños dentro
de componentes más grandes, igual que compones funciones en programación normal.

```jsx
function Saludo() {
  return <h1>Hola, mundo</h1>
}
```

Convención: los componentes SIEMPRE empiezan con mayúscula (`Saludo`, no
`saludo`) — así React distingue un componente propio (`<Saludo />`) de una
etiqueta HTML normal (`<div>`).

En el proyecto: cada archivo dentro de `frontend/src/componentes/` y
`frontend/src/paginas/` es un componente.

---

## 12. JSX en profundidad

JSX no es HTML: es una extensión de sintaxis de JavaScript que se transforma
(vía Babel/esbuild, que Vite usa internamente) en llamadas a
`React.createElement(tipo, props, hijos)`. Por eso:

- Usas `className` en vez de `class` (`class` es palabra reservada de JS), y
  `htmlFor` en vez de `for`.
- Cualquier cosa entre `{ }` es JavaScript evaluado, no texto literal.
- Todo componente debe devolver **un solo** elemento raíz (usa `<>...</>`, un
  Fragment, si no quieres un `<div>` extra envolviendo todo).
- Los atributos de estilo en línea son objetos JS: `style={{ color: 'red' }}`
  (las dobles llaves son: `{` de JSX + `{` de objeto literal), y las propiedades
  van en camelCase: `backgroundColor`, no `background-color`.
- Todas las etiquetas se cierran, incluidas las que en HTML no lo hacían:
  `<img />`, `<input />`, `<br />`.

Todo lo que sabes de HTML (§2) sigue valiendo: la semántica, los `label`, los
`alt`, el `type` de los inputs. JSX solo cambia la sintaxis, no las reglas.

Archivo de referencia: `frontend/src/ejemplos/01-JSXBasico.jsx`.

---

## 13. Props: pasar datos de padre a hijo

Las props (abreviación de "properties") son cómo un componente padre le pasa
información a un componente hijo. Son de **solo lectura**: un componente jamás
debe modificar sus propias props.

```jsx
function Tarjeta({ titulo, children }) {
  return (
    <div>
      <h4>{titulo}</h4>
      {children}
    </div>
  )
}

// Uso:
<Tarjeta titulo="Mi tarjeta">Contenido aquí</Tarjeta>
```

Eso de `({ titulo, children })` es el *destructuring* de objetos de la sección
4: React te pasa **un** objeto con todas las props y tú extraes las que
necesitas en la propia firma de la función.

`children` es una prop especial: es todo lo que pones entre las etiquetas de
apertura y cierre del componente.

Archivo de referencia: `frontend/src/ejemplos/02-Props.jsx`, y en el proyecto
real: `TaskCard.jsx` recibe `task`, `onToggle`, `onDelete` como props desde
`Tareas.jsx`.

---

## 14. Estado con `useState`

Las props vienen de afuera; el **estado** es la memoria interna de un componente
— datos que cambian con el tiempo y que, al cambiar, deben actualizar lo que se
ve en pantalla.

```jsx
import { useState } from 'react'

function Contador() {
  const [valor, setValor] = useState(0) // [valor actual, función para cambiarlo]

  return <button onClick={() => setValor(valor + 1)}>{valor}</button>
}
```

(`const [valor, setValor]` es destructuring de array por posición — §4. Por eso
los nombres los eliges tú.)

Reglas importantes:

1. **Nunca mutes el estado directamente** (`valor++`, `array.push(x)`,
   `objeto.campo = y` están prohibidos). Siempre pasa un valor **nuevo** al
   setter. Aquí es donde te salva la tabla de mutan/no-mutan de la sección 4:
   ```jsx
   setTareas([...tareas, nueva])                                    // añadir
   setTareas(tareas.filter(t => t.id !== id))                       // eliminar
   setTareas(tareas.map(t => t.id === id ? { ...t, hecha: true } : t)) // actualizar
   ```
   Si mutas, la referencia no cambia, React cree que nada cambió y la pantalla
   se queda congelada (§4, "valor vs referencia").
2. Si el nuevo valor depende del anterior, usa la forma funcional:
   `setValor(prev => prev + 1)`. Esto evita bugs cuando React agrupa varias
   actualizaciones (algo que hace automáticamente para optimizar).
3. Llamar al setter dispara un **re-render**: React vuelve a ejecutar la función
   del componente completa, con el nuevo valor de estado.

Archivo de referencia: `frontend/src/ejemplos/03-EstadoYEventos.jsx`.

---

## 15. Manejo de eventos

Los eventos en JSX se escriben en camelCase y reciben una función (no un string
como en HTML): `onClick`, `onChange`, `onSubmit`, etc.

```jsx
<button onClick={() => alert('Click!')}>Presióname</button>
```

Nota clave (la misma de la sección 4): pasas la **función**, no el resultado de
ejecutarla. Por eso `onClick={funcion}` está bien, pero `onClick={funcion()}`
ejecuta la función inmediatamente al renderizar, en vez de esperar al clic.
Cuando hay que pasar argumentos: `onClick={() => borrar(id)}`.

El objeto `event` que recibes es el mismo que ya conoces del DOM (§5), con sus
`event.target.value` y su `event.preventDefault()` — React solo lo envuelve para
que se comporte igual en todos los navegadores.

---

## 16. Listas y la prop `key`

Para renderizar un array de datos como elementos de interfaz, usas `.map()` — el
método de la sección 4. Cada elemento generado necesita una prop `key` única y
estable (normalmente un id de base de datos, nunca el índice del array si la
lista puede reordenarse, filtrarse o tener elementos insertados/eliminados).

```jsx
{tareas.map((tarea) => (
  <TaskCard key={tarea.id} task={tarea} />
))}
```

`key` le permite a React identificar qué elemento es cuál entre un render y el
siguiente, para actualizar el DOM de forma eficiente y evitar bugs de estado
"pegado" al elemento equivocado. Es el equivalente automático del
`li.dataset.id` que pusiste a mano en la app vanilla.

Archivo de referencia: `frontend/src/ejemplos/04-ListasYCondicionales.jsx`.

---

## 17. Renderizado condicional

Tres formas comunes, todas ellas JavaScript puro (§4) dentro de llaves:

```jsx
{cargando ? <Loader /> : <Contenido />}          {/* ternario: if/else */}
{errores.length > 0 && <Alerta />}                {/* && : solo si es true */}
{lista.length === 0 ? <Vacio /> : <Lista />}      {/* combinando ambos */}
```

⚠️ Cuidado con `&&`: si el valor de la izquierda es `0` (no `false`), React lo
imprime literalmente en pantalla. Por eso compara siempre con algo que dé un
booleano real (`cantidad > 0 && ...`), no el número solo. Es la misma trampa de
truthy/falsy de la sección 4, con una consecuencia visible.

---

## 18. `useEffect`: sincronizar con el mundo exterior

Un componente de React, en esencia, calcula "cómo se ve la interfaz para este
estado". Pero a veces necesitas hacer algo que **no** es parte de ese cálculo:
pedir datos a un servidor, iniciar un timer, suscribirte a un evento del
navegador, cambiar el título de la pestaña. A esto se le llama **efecto
secundario**, y `useEffect` es el hook para manejarlo.

```jsx
useEffect(() => {
  const id = setInterval(() => setSegundos(s => s + 1), 1000)
  return () => clearInterval(id) // limpieza: antes del próximo efecto o al desmontar
}, [dependencias]) // se re-ejecuta solo si algo en este array cambió
```

El array de dependencias controla cuándo se re-ejecuta el efecto:

- `[]` (vacío) → se ejecuta **una sola vez**, al montar el componente.
- `[algo]` → se ejecuta al montar Y cada vez que `algo` cambia.
- sin array → se ejecuta en **cada** render (casi nunca es lo que quieres).

⚠️ La comparación de dependencias es por **referencia** (§4): si pones un objeto
o una función creados en el cuerpo del componente, serán nuevos en cada render y
el efecto se disparará infinitamente. De ahí `useCallback` y `useMemo` (§22).

La función que retornas dentro del efecto es la "limpieza": React la ejecuta
automáticamente antes de correr el efecto de nuevo, o cuando el componente
desaparece de la pantalla. Olvidar la limpieza es la causa número uno de fugas
de memoria y bugs raros en apps de React — es el equivalente a no quitar nunca
un `addEventListener`.

Archivos de referencia: `frontend/src/ejemplos/05-UseEffect.jsx` y, en la app
real, `frontend/src/paginas/Dashboard.jsx` (fetch manual) vs.
`frontend/src/hooks/useTasks.js` (el mismo patrón, encapsulado en un hook).

---

## 19. Formularios controlados

Un input "controlado" tiene su valor atado 100% al estado de React:

```jsx
const [texto, setTexto] = useState('')

<input value={texto} onChange={(e) => setTexto(e.target.value)} />
```

Compáralo con el `input` + `addEventListener('input', ...)` de la sección 5: es
la misma idea, pero aquí React es la única fuente de verdad. Si quieres limpiar
el campo, haces `setTexto('')` — no tocas el DOM directamente. Esto permite
validar en tiempo real, formatear mientras el usuario escribe, o deshabilitar el
envío hasta que el formulario sea válido.

Y el `onSubmit` lleva el mismo `e.preventDefault()` de siempre.

Archivos de referencia: `frontend/src/ejemplos/06-Formularios.jsx` y
`frontend/src/componentes/TaskForm.jsx` (formulario real con varios campos
usando un solo objeto de estado).

---

## 20. Custom Hooks: reutilizar lógica con estado

Un custom hook es una función que empieza con `use`, puede usar otros hooks
adentro, y encapsula lógica reutilizable.

```jsx
function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : valorInicial
  })
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])
  return [valor, setValor]
}
```

(Sí: el mismo `localStorage` + `JSON.stringify` de la sección 5, ahora
empaquetado para reutilizar.)

**Reglas de los hooks** (aplican a `useState`, `useEffect`, y a tus propios
custom hooks):

1. Solo se llaman en el nivel superior de un componente o de otro hook — nunca
   dentro de un `if`, un `for`, o una función anidada.
2. Solo se llaman desde componentes de React o desde otros hooks, nunca desde
   una función JavaScript normal.

Esto existe porque React identifica cada hook por el **orden** en que se llama
entre renders; si el orden cambiara condicionalmente, React perdería el rastro
de cuál estado pertenece a cuál `useState`.

Archivo de referencia: `frontend/src/ejemplos/07-CustomHook.jsx` y, en la app
real, `frontend/src/hooks/useTasks.js` — el corazón de TaskFlow: toda la
comunicación con el backend vive ahí, para que las páginas no repitan código de
`fetch`.

---

## 21. Context API: estado compartido sin "prop drilling"

Cuando muchos componentes, en niveles distintos del árbol, necesitan el mismo
dato (el usuario logueado, el tema claro/oscuro, el idioma), pasar ese dato como
prop a través de cada nivel intermedio se vuelve tedioso ("prop drilling").
Context resuelve esto:

```jsx
const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// En cualquier descendiente, sin importar qué tan profundo:
const { theme } = useContext(ThemeContext)
```

Archivos de referencia: `frontend/src/ejemplos/08-ContextAPI.jsx` (ejemplo
aislado) y `frontend/src/context/ThemeContext.jsx` (el real: controla el tema
claro/oscuro de toda la app TaskFlow, incluido persistirlo en `localStorage`).
Mira cómo aplica el tema: poniendo un atributo `data-theme` en `<html>` para que
las variables CSS de la sección 3 hagan el resto.

**Cuándo NO usar Context**: para estado que cambia muy seguido y que solo un
componente necesita (ahí, `useState` local basta). Context brilla para datos
"globales" que cambian poco: tema, idioma, sesión de usuario.

---

## 22. Optimización: `useMemo`, `useCallback`, `React.memo`

No los necesitas desde el día 1, pero debes reconocerlos:

- **`useMemo(fn, deps)`**: memoriza el *resultado* de un cálculo costoso,
  recalculándolo solo si `deps` cambia. Se usa en `Tareas.jsx` para no
  re-filtrar la lista en cada render si ni las tareas ni el filtro cambiaron
  (exactamente la función `tareasVisibles()` de la app vanilla).
- **`useCallback(fn, deps)`**: memoriza una *función* en sí (útil cuando esa
  función es dependencia de un `useEffect`, o se pasa a un componente hijo
  optimizado con `React.memo`). Se usa en `useTasks.js`.
- **`React.memo(Componente)`**: evita re-renderizar un componente si sus props
  no cambiaron.

Los tres existen por lo mismo: **la comparación por referencia** de la sección
4. Una función o un objeto creados en el cuerpo del componente son *nuevos* en
cada render aunque su contenido sea idéntico.

Regla práctica: no optimices prematuramente. Escribe el componente simple
primero; añade estas herramientas solo si mides un problema real de rendimiento.

---

## 23. React Router: navegación entre páginas

TaskFlow es una **SPA** (Single Page Application): solo hay un `index.html`, y
React Router intercambia qué componente se muestra según la URL, sin recargar el
navegador.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/tareas" element={<Tareas />} />
    <Route path="/tareas/:id" element={<TareaDetalle />} />
    <Route path="*" element={<NoEncontrado />} />
  </Routes>
</BrowserRouter>
```

Piezas clave que usa el proyecto:

- **`<Link>` / `<NavLink>`**: como `<a>`, pero sin recargar la página. `NavLink`
  además sabe si su ruta está activa.
- **`useParams()`**: lee los parámetros dinámicos de la URL (el `:id` de
  `/tareas/:id`). Ver `TareaDetalle.jsx`.
- **`useNavigate()`**: navega por código, por ejemplo después de borrar algo
  (`navigate('/tareas')`) o para volver atrás (`navigate(-1)`).

---

## 24. Consumir una API REST desde React

El patrón que usa TaskFlow para hablar con el backend — el `fetch` de la sección
6, ahora dentro de un efecto:

```jsx
useEffect(() => {
  fetch('http://localhost:4000/api/tasks')
    .then(res => res.json())
    .then(data => setTareas(data))
    .catch(err => setError(err.message))
}, [])
```

Los tres estados que SIEMPRE debes manejar al pedir datos —los mismos de la
sección 6— son **cargando**, **error** y **datos listos**. `useTasks.js` los
maneja los tres (`loading`, `error`, `tasks`) y además expone `createTask`,
`updateTask`, `deleteTask` que hacen `POST`/`PUT`/`DELETE` y actualizan el
estado local sin tener que re-pedir toda la lista cada vez (actualización
optimista).

Y recuerda la trampa: **comprueba `res.ok`**, porque un 404 no entra solo en el
`catch`.

---

## 25. Arquitectura de una app real

TaskFlow separa el código en carpetas por responsabilidad, un patrón estándar en
proyectos de React de tamaño mediano:

| Carpeta | Responsabilidad |
|---|---|
| `paginas/` | Una "pantalla" completa, mapeada a una ruta |
| `componentes/` | Piezas de interfaz reutilizables, sin lógica de red |
| `hooks/` | Lógica con estado reutilizable (fetch, formularios complejos, etc.) |
| `context/` | Estado verdaderamente global |

La regla general: entre más "abajo" en esta tabla, más reutilizable y menos
acoplado a una pantalla específica debe ser el código.

---

## 26. Cheatsheet de Hooks

| Hook | Para qué sirve |
|---|---|
| `useState` | Guardar un valor que cambia y provoca re-render |
| `useEffect` | Sincronizar con algo externo (fetch, timers, DOM, suscripciones) |
| `useContext` | Leer un valor compartido por un `Context.Provider` |
| `useRef` | Guardar un valor mutable que NO provoca re-render (referencias al DOM, valores "instantáneos") |
| `useMemo` | Memorizar el resultado de un cálculo costoso |
| `useCallback` | Memorizar una función para que no se recree en cada render |
| `useParams` (Router) | Leer parámetros dinámicos de la URL |
| `useNavigate` (Router) | Navegar por código |
| Custom hooks (`useTasks`, etc.) | Empaquetar cualquier combinación de los anteriores en una función reutilizable |

---

## 27. Errores comunes de principiantes

1. **Mutar el estado directamente** (`array.push(x)` en vez de
   `setArray([...array, x])`). React no detecta la mutación y no re-renderiza.
   → §4, valor vs referencia.
2. **Olvidar la `key` en listas**, o usar el índice del array como `key` cuando
   la lista puede reordenarse — causa bugs sutiles de UI.
3. **Faltar dependencias en `useEffect`** — el linter de React
   (`eslint-plugin-react-hooks`) te avisa; no lo ignores sin entender por qué.
4. **Bucle infinito de `useEffect`** por poner un objeto, array o función como
   dependencia sin memorizar. → §22.
5. **Poner lógica de fetch directamente en el componente** en vez de un custom
   hook — funciona al principio, pero se vuelve inmantenible cuando 3 pantallas
   necesitan los mismos datos.
6. **No manejar el estado de "cargando" ni "error"** al pedir datos — la app se
   ve rota si el backend tarda o falla.
7. **Confundir props y estado**: props vienen de afuera y son de solo lectura;
   estado es interno y mutable (a través del setter).
8. **`onClick={funcion()}`** en vez de `onClick={funcion}`. → §4.
9. **Olvidar `e.preventDefault()`** en `onSubmit` y ver la página recargarse
   entera. → §5.
10. **`{cantidad && <Algo />}`** imprimiendo un `0` en pantalla. → §17.

---
---

# PARTE III — FULL STACK Y PRODUCCIÓN

---

## 28. El backend: Express + API REST

El frontend de React corre en el navegador; **no puede** hablar directamente con
una base de datos (sería un enorme hueco de seguridad: cualquiera podría leer
tus credenciales abriendo el código fuente de la página). Por eso existe el
backend: un servidor que sí tiene acceso a los datos, y expone una API que el
frontend consume por HTTP.

TaskFlow usa **Express**, el framework de servidor más popular del ecosistema
Node.js:

```js
const app = express()
app.use(cors())          // permite peticiones desde otro origen (el frontend)
app.use(express.json())  // parsea el body de las peticiones como JSON

app.get('/api/tasks', async (req, res) => {
  res.json(tareas)
})

app.listen(4000)
```

**REST** es simplemente una convención: usar el método HTTP para expresar la
intención (`GET` leer, `POST` crear, `PUT`/`PATCH` actualizar, `DELETE` borrar)
sobre "recursos" identificados por URL (`/api/tasks/:id`) — los mismos métodos y
códigos de estado de la sección 6. Revisa `backend/routes/tasks.js`: implementa
las 5 operaciones CRUD completas.

---

## 29. La base de datos

Para que aprendas sin fricción, TaskFlow usa **lowdb**: guarda los datos en un
archivo JSON plano (`backend/data/db.json`) que puedes abrir y leer
directamente. La forma de usarla (`await db.read()`, modificar `db.data`,
`await db.write()`) es intencionalmente parecida a como usarías un ORM real,
para que el código se traduzca casi directo el día que migres a una base de
datos de producción.

Cuando estés listo para ese paso, los candidatos más comunes son:

- **PostgreSQL + Prisma** (recomendado): base de datos relacional real, con un
  ORM que genera tipos automáticamente.
- **MongoDB + Mongoose**: orientada a documentos, popular en el stack "MERN".
- **SQLite + Drizzle/Prisma**: para apps pequeñas que quieres desplegar sin
  depender de un servicio externo.

---

## 30. Cómo desplegar TaskFlow a producción

Desplegar significa poner tu app en un servidor accesible desde internet, no
solo en tu `localhost`. Frontend y backend se despliegan por separado, en
servicios distintos, porque son programas distintos.

### Frontend (Vite + React) → Vercel o Netlify

1. Sube el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) (o Netlify), "Import Project" y
   selecciona el repo. Configura:
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
3. El código ya está preparado para esto: `useTasks.js` y `Dashboard.jsx` leen
   `import.meta.env.VITE_API_URL` y solo caen a `localhost:4000` si esa variable
   no existe. En Vercel, agrega la variable de entorno `VITE_API_URL` con la URL
   real de tu backend ya desplegado (paso siguiente) y no tendrás que tocar el
   código.

### Backend (Express) → Render o Railway

1. En [render.com](https://render.com) (o Railway), "New Web Service", conecta
   el mismo repo.
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
2. lowdb escribe a un archivo local (`data/db.json`); en la mayoría de estos
   servicios el disco NO es persistente entre despliegues. Para producción real,
   este es el momento de migrar a una base de datos administrada (Render y
   Railway ofrecen PostgreSQL gratis/barato) — ver la sección 29.
3. Copia la URL pública que te da el servicio (algo como
   `https://taskflow-backend.onrender.com`) y úsala como `VITE_API_URL` en el
   paso del frontend.

### Checklist antes de desplegar

- [ ] Reemplazar URLs de `localhost` por variables de entorno
- [ ] Revisar CORS en el backend: en producción, restringe `cors()` al dominio
      real de tu frontend en vez de aceptar cualquier origen
- [ ] Migrar de lowdb a una base de datos persistente si el disco del hosting no
      es persistente
- [ ] Agregar `.env` a `.gitignore` si guardas secretos (claves de API, cadena
      de conexión a la base de datos)

---

## 31. Próximos pasos — roadmap después de este proyecto

Ya con los fundamentos sólidos, este es un orden razonable para seguir creciendo:

1. **TypeScript**: agrega tipos a tus componentes y props. Reduce bugs
   drásticamente en proyectos medianos/grandes. Vite tiene soporte nativo
   (`npm create vite@latest -- --template react-ts`).
2. **Testing**: `Vitest` + `React Testing Library` para probar componentes
   automáticamente.
3. **Manejo de estado más avanzado**: cuando Context se queda corto (apps
   grandes con estado muy dinámico), mira `Zustand` (simple) o `Redux Toolkit`
   (más estructura, curva de aprendizaje mayor). Para datos de servidor,
   `TanStack Query` reemplaza buena parte de `useTasks.js`.
4. **Next.js**: framework construido sobre React que añade routing basado en
   archivos, renderizado en servidor (SSR) y generación estática. Es el paso
   natural después de dominar React "puro" con Vite.
5. **Autenticación**: JWT manual, o servicios como Auth0/Clerk/Supabase Auth.
6. **Estilizado a escala**: Tailwind CSS (utilidades) o CSS Modules (scoping
   automático) en vez de estilos en línea como los de este proyecto (los usamos
   aquí por simplicidad didáctica). Ambos presuponen que dominas la sección 3:
   Tailwind son las mismas propiedades de CSS con otros nombres.
7. **Accesibilidad y rendimiento**: audita con Lighthouse (viene en DevTools) y
   navega tu propia app solo con el teclado.

---

## 32. Recursos recomendados

- **MDN Web Docs**: [developer.mozilla.org/es](https://developer.mozilla.org/es/)
  — la referencia definitiva de HTML, CSS y JavaScript. Cuando dudes de qué hace
  una propiedad o un método, se busca aquí, no en un blog.
- **javascript.info** — el mejor tutorial gratuito de JavaScript a fondo.
- **Flexbox Froggy** y **Grid Garden** — juegos para practicar layout de CSS.
- Documentación oficial de React: [react.dev](https://react.dev) — reescrita por
  completo con explicaciones modernas y ejemplos interactivos.
- React Router: [reactrouter.com](https://reactrouter.com)
- Vite: [vitejs.dev](https://vitejs.dev) · Express: [expressjs.com](https://expressjs.com)

---

*Este documento acompaña al código en `fundamentos/`, `frontend/` y `backend/`.
La forma más rápida de aprender es leer una sección, abrir el archivo real que
menciona, y modificarlo tú mismo para ver qué pasa.*
