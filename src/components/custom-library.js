const HidrogenComponent = require('./hidrogen-component')
const { Emitter } = require('event-kit')

class CustomLibrary extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['custom-library']
    // this.name = this.name
    this.emitter = new Emitter()
    this.subscribeToDOMEvents()
  }

  get name () {
    return this.getAttribute('name')
  }

  set name (name) {
    this.setAttribute(name)
  }

  setName (name) {
    this.name = name
  }

  subscribeToDOMEvents () {
    this.onDidClick(() => {
      this.hidrogen.library.customs.close()
      this.hidrogen.library.setActiveLibrary(this.name)
    })

    this.addEventListener('click', () => { this.emitter.emit('did-click') })
  }

  onDidClick (callback) {
    this.emitter.on('did-click', callback)
  }

  render () {
    super.render(`
      <hidrogen-btn type="danger" icon="close" class="delete-btn"></hidrogen-btn>
      <span class="title"> ${this.name} </span>
      <hidrogen-panel class="background"></hidrogen-panel>

      <hidrogen-panel class="game-container"></hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-custom-library', CustomLibrary)
