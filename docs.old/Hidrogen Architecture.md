# Hidrogen Architecture
The `Hidrogen Architecture` is based on several components linked together which compounds the UI.

### Basic Hidrogen Component
This is an example of a basic component.

```javascript
const HidrogenComponent = require('./hidrogen-component')

class HelloComponent extends HidrogenComponent {
    constructor () {
        super()
    }

    render () {
        super.render(`<h1> Hello! </h1>`)
    }
}

customElements.define('hello-tag', HelloComponent)
```

### Adding events to a component
Let's create a custom button!

```javascript
const HidrogenComponent = require('./hidrogen-component')

class FavButton extends HidrogenComponent {
    constructor () {
        super()
        this.classNames = ['btn', 'fav-btn']
        this.attachEvents()
    }

    attachEvents () {

    }

    render () {
        super.render(`
            <span class="icon icon-fav"></span>
            <span> Add to my favorites </span>
        `)
    }
}

customElements.define('fav-button', FavButton)
```

### Some coding conventions
