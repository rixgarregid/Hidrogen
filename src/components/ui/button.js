const HidrogenComponent = require('../hidrogen-component')
const { Emitter } = require('event-kit')

class Button extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.classNames = ['btn']
    this.type = this.type
    this.customContent = this.innerHTML
    this.emitter = new Emitter()
    this.render()
    this.subscribeToDOMEvents()
    this.addCustomContent(this.customContent)
  }

  set type (type) {
    this.setAttribute('type', type)
  }

  get type () {
    if (this.hasAttribute('type')) {
      return this.getAttribute('type')
    } else {
      this.type = 'default'
    }
  }

  get icon () {
    if (this.hasAttribute('icon')) {
      return this.getAttribute('icon')
    } else {
      this.classList.add('no-icon')
    }
  }

  get text () {
    if (this.hasAttribute('text')) {
      return this.getAttribute('text')
    } else {
      this.classList.add('no-text')
    }
  }

  addCustomContent (content) {
    if (this.hasAttribute('custom-content')) this.innerHTML += content
  }

  subscribeToDOMEvents () {
    this.addEventListener('click', () => { this.emitter.emit('did-click') })
  }

  onDidClick (callback) {
    this.emitter.on('did-click', callback)
  }

  render () {
    super.render(`
      <icon class="icon-${this.icon}"></icon>
      <span> ${this.text} </span>
    `)
  }
}

customElements.define('hidrogen-btn', Button)
