const HidrogenComponent = require('../hidrogen-component')
const { Emitter } = require('event-kit')

class Input extends HidrogenComponent {
  constructor () {
    super({ events: false })
    this.type = this.type
    this.focus = false
    this.checked = false
    this.disabled = false
    this.emitter = new Emitter()
    this.type === 'text' ? this.classNames = ['input-text'] : this.classNames = ['input-toggle']
    this.subscribeToDOMEvents()
  }

  set type (type) {
    this.setAttribute('type', type)
  }

  get type () {
    if (this.hasAttribute('type')) {
      return this.getAttribute('type')
    } else {
      // TODO: Return error.
    }
  }

  set label (label) {
    this.setAttribute('label', label)
    this.child('.input-text-label').innerText = label
  }

  get label () {
    return this.getAttribute('label') || 'Write something here!'
  }

  set value (value) {
    this.child('.input-text-element').value = value
  }

  get value () {
    return this.child('.input-text-element').value
  }

  isFocused () {
    if (this.type === 'text') {
      return this.child(`input-text-element`).hasFocus
    } else {
      throw new Error('<hidrogen-input> must be "text" in order to use Input::is()')
    }
  }

  isChecked () {
    if (this.type === 'toggle') {
      return this.checked
    } else {
      throw new Error('<hidrogen-input> must be "toggle" in order to use Input::isChecked()')
    }
  }

  enable () {
    this.addEventListener('click', this.toggle)
    this.classList.remove('disabled')
    this.disabled = false
  }

  disable () {
    this.removeEventListener('click', this.toggle)
    this.classList.add('disabled')
    this.disabled = true
  }

  isDisabled () {
    return this.disabled
  }

  focusInput () {
    this.classList.add('active')
    this.emitter.emit('did-focus')
    this.focus = true
  }

  blur () {
    this.classList.remove('active')
    this.emitter.emit('did-blur')
    this.focus = false
  }

  toggle () {
    if (this.checked) {
      this.checked = false
      this.classList.remove('active')
    } else {
      this.checked = true
      this.classList.add('active')
    }

    this.emitter.emit('did-toggle')
  }

  destroy () {
    this.emitter.dispose()
    this.destroyed = true
  }

  onDidClick (callback) {
    this.emitter.on('did-click', callback)
  }

  onDidToggle (callback) {
    this.emitter.on('did-toggle', callback)
  }

  onDidFocus (callback) {
    this.emitter.on('did-focus', callback)
  }

  onDidBlur (callback) {
    this.emitter.on('did-blur', callback)
  }

  onDidDestroy (callback) {
    this.emitter.on('did-destroy', callback)
  }

  subscribeToDOMEvents () {
    if (this.type === 'text') {
      this.child('.input-text-element').addEventListener('focus', () => { this.focusInput() })
      this.child('.input-text-element').addEventListener('blur', () => {
        if (this.child('.input-text-element').value === '') this.blur()
      })
    } else if (this.type === 'toggle') {
      this.addEventListener('click', this.toggle)
    }
  }

  render () {
    switch (this.type) {
      case 'text':
        super.render(`
          <label class="input-text-label" for="input-element"> ${this.label} </label>
          <input type="text" class="input-text-element" name="input-element">
        `)
        break
      case 'toggle':
        super.render(`
          <icon class="tick-icon check_box_outline_blank"></icon>
          <span class="label"> ${this.label} </span>
        `)
        break
    }
  }
}

customElements.define('hidrogen-input', Input)

// <label class="input-toggle-label" for="input-toggle-element"> ${this.label} </label>
// <input type="checkbox" class="input-toggle-element">
