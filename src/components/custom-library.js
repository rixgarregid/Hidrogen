const HidrogenComponent = require('./hidrogen-component')

class CustomLibrary extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['custom-library']
    // this.name = this.name
    this.subscribeToDOMEvents()
  }

  get name () {
    return this.getAttribute('name')
  }

  set name (name) {
    this.setAttribute(name)
  }

  subscribeToDOMEvents () {
    this.addEventListener('click', () => { this.classList.add('active') })
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
