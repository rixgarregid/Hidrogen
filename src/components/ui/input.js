const HidrogenComponent = require('../hidrogen-component')

class InputText extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['input-text']
    this.attachEvents()
  }

  set label (label) {
    this.setAttribute('label', label)
    this.child('.input-text-label').innerText = label
  }

  get label () {
    return this.getAttribute('label') || 'Write something here!'
  }

  set value (value) {
    this.child('.input-element').value = value
  }

  get value () {
    return this.child('.input-element').value
  }

  attachEvents () {
    this.child('.input-element').addEventListener('focus', () => this.child('.input-text-label').classList.add('active'))
    this.child('.input-element').addEventListener('blur', () => {
      if (this.child('.input-element').value === '') this.child('.input-text-label').classList.remove('active')
    })
  }

  render () {
    super.render(`
      <label class="input-text-label" for="input-element"> ${this.label} </label>
      <input type="text" class="input-element" name="input-element">
    `)
  }
}

customElements.define('hidrogen-input', InputText)
