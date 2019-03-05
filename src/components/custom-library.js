const HidrogenComponent = require('./hidrogen-component')
const { Emitter } = require('event-kit')

class CustomLibrary extends HidrogenComponent {
  constructor () {
    super()
    this.destroyable = this.getAttribute('destroyable')
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

  getTotalGames () {
    let counter = 0
    for (let game of this.hidrogen.library.getGames()) {
      if (game.isVisible()) counter++
    }

    return counter
  }

  destroy () {
    this.remove()
    this.emitter.emit('did-destroy')
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

  onDidDestroy (callback) {
    this.emitter.on('did-destroy', callback)
  }

  render () {
    super.render(`
      <hidrogen-btn type="danger" icon="close" class="delete-btn"></hidrogen-btn>
      <span class="title">
        <icon class="icon-dashboard"></icon>
        <span class="title-span"> ${this.name} </span>
      </span>

      <hidrogen-panel class="background"></hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-custom-library', CustomLibrary)
