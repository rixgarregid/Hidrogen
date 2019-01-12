# Arquitectura de Hidrogen
### ¿Cómo está construido Hidrogen?
La arquitectura de Hidrogen está basada en componentes.

### Componentes
Un componente, representado por la clase `HidrogenComponent`, es un elemento HTML con uno o varios comportamientos definidos. Cada componente está construido en su archivo propio con su mismo nombre, por ejemplo, `Titlebar` está definido en el archivo `titlebar.js`.
Un componente básico tiene la siguiente forma:
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
    }
}
```
Después de la declaración de la clase, el componente en cuestión debe de ser añadido a la lista de componentes personalizados para que el navegador lo detecte como tal.
```javascript
customElements.define('mi-componente', Componente)
```
En la función `define()` tenemos dos parámetros. El primero hace referencia al nombre de nuestro elemento HTML, en este caso para crear un elemento `Componente` deberíamos escribir el siguiente código HTML:
```html
<mi-componente></mi-componente>
```
El segundo parámetro es la clase con la que vamos a asociar ese elemento, la cual en nuestro ejemplo hemos creado previamente.

#### Renderizando un componente en la UI
Para renderizar un componente en la UI usamos el método `render()`.
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
    }

    render () {
        super.render(`<h1> ¡Estoy vivo! </h1>`)
    }
}
```

#### Seleccionando un elemento del componente.
Se darán bastantes casos en los que tengamos que seleccionar un elemento hijo del componente, ya sea para tomar un valor o añadir un evento. Para hacer esto usamos el método `child()`, y como parámetro pondremos un selector CSS entre comillas simples.
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
        const miTexto = this.child('.texto')
    }

    render () {
        super.render(`<h1 class="texto"> ¡Estoy vivo! </h1>`)
    }
}
```
Para seleccionar múltiples elementos de un mismo tipo a la vez usaremos `children()` con el mismo procedimiento. El método `children()` devuelve un `Array` con todos los elementos HTMl hijos del componente que coincidan con el selector CSS.
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
        const misTextos = this.children('.texto')
    }

    render () {
        super.render(`
            <h1 class="texto"> ¡Estoy vivo! </h1>
            <h1 class="texto"> ¡Yo también! </h1>
            <h1 class="texto"> ¡Somos unos magos! </h1>
        `)
    }
}
```

#### Añadiendo eventos a la UI
Si por cualquier motivo necesitamos que algún elemento ejecute alguna función ante un evento, por ejemplo, `click`:
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
        this.attachEvents() // Añadimos los eventos al construir el componente.
    }

    // Método al que llamaremos al hacer click en el botón.
    sayHi () {
        console.log('¡Hola!')
    }

    attachEvents () {
        // Creamos una función que llamará a nuestro método a ejecutar.
        const handleClick = () => { this.sayHi() }

        this.child('.btn').addEventListener('click', handleClick)
    }

    render () {
        super.render(`
            <h1> ¡Estoy vivo! </h1>
            <button class="btn"> Púlsame </button>
        `)
    }
}
```

#### Añadiendo clases CSS a un componente
Por lo general, querremos añadir clases CSS a nuestro componente bien para estilizarlo con CSS o bien para seleccionarlo desde otro punto de la app. Para añadir clases usamos la propiedad de clase `classNames` que es un `Array` de `Strings`, siendo cada `String` una clase CSS.
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super()
        this.classNames = ['mi-componente', 'ejemplo', 'clase']
    }

    render () {
        super.render(`
            <h1> ¡Estoy vivo! </h1>
            <button class="btn"> Soy un botón </button>
        `)
    }
}
```

#### Construcción avanzada de componentes
Podemos personalizar la manera en la que un componente es construido y renderizado añadiendo un objeto con ciertos parámetros a la función `super()` en el constructor del componente.
Con el parámetro `render` podemos decidir cuando queremos que se renderice en el componente, puesto que este normalmente se renderiza automáticamente nada más construirse. De este modo, si necesitamos hacer cualquier operación antes de que se renderice el componente podremos evitar el autorenderizado y renderizar el componente cuando nosotros queramos llamando al método `render()`.
```javascript
class Componente extends HidrogenComponent {
    constructor () {
        super({ render: false })

        // Hacemos algo antes de renderizar el componente.

        this.render()
    }

    render () {
        super.render(`
            <h1> ¡Estoy vivo! </h1>
            <button class="btn"> Soy un botón </button>
        `)
    }
}
```
Una cosa a tener en cuenta si usamos este método es que **siempre** tendremos que llamar al método `render()` antes que a `attachEvents()` puesto que este último depende del primero, de lo contrario obtendremos un fallo de que el elemento al que queremos añadir el evento no existe.
