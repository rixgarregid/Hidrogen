const HidrogenComponent = require('../hidrogen-component')

class Button extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['btn']
    this.type = this.type
  }

  set type (type) {
    this.setAttribute('type', type)
  }

  get type () {
    console.log(`Button type: ${this.getAttribute('type')}`)
    if (this.getAttribute('type') === undefined) {
      this.setAttribute('type', 'default')
    } else {
      return this.getAttribute('type')
    }
  }

  get icon () {
    console.log(`Button icon: ${this.getAttribute('icon')}`)
    if (this.getAttribute('icon') === undefined) {
      this.child('icon').classList.add('none')
    } else {
      return this.getAttribute('icon')
    }
  }

  get text () {
    console.log(`Button text: ${this.getAttribute('text')}`)
    if (this.getAttribute('text') === undefined) {
      this.child('span').classList.add('none')
    } else {
      return this.getAttribute('text')
    }
  }

  render () {
    super.render(`
      <icon class="${this.icon}"></icon>
      <span> ${this.text} </span>
    `)
  }
}

customElements.define('hidrogen-btn', Button)
