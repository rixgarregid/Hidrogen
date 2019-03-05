const HidrogenComponent = require('../hidrogen-component')
const { Emitter } = require('event-kit')

class Form extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.content = this.innerHTML
    this.classNames = ['form']
    this.emitter = new Emitter()

    this.render()
    this.subscribeToDOMEvents()
  }

  getInputs () {
    return this.children('hidrogen-input[type="text"]')
  }

  collectData() {
    let data = []
    for (let input of this.getInputs()) {
      data.push(input.value)
    }
    
    return data
  }

  clear () {
    for (let input of this.children('hidrogen-input')) {
      input.value = ''
      input.classList.remove('active')
    }
  }

  subscribeToDOMEvents () {
    // this.onDidSubmit(() => { this.clear() })
    this.child('.submit-btn').onDidClick(() => { this.emitter.emit('did-submit') })
  }

  onDidSubmit (callback) {
    this.emitter.on('did-submit', callback)
  }

  render () {
    super.render(`
      <hidrogen-panel class="form-content">
        ${this.content}
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-form', Form)
