const HidrogenComponent = require('../hidrogen-component')
const { Emitter } = require('event-kit')
const I18n = require('../../translator')
const i18n = new I18n()

class Modal extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.classNames = ['modal']
    // this.cont = this.innerHTML
    this.emitter = new Emitter()
    this.render()
    this.attachEvents()
  }

  show () {
    this.classList.add('active')
    this.emitter.emit('did-show')
  }

  close () {
    this.classList.remove('active')
    this.emitter.emit('did-close')
  }

  get type () {
    return this.getAttribute('type')
  }

  get content () {
    return this.getAttribute('content')
  }

  get modalTitle () {
    if (this.getAttribute('modal-title') === null) {
      this.classList.add('no-title')
    } else {
      return this.getAttribute('modal-title')
    }
  }

  confirm () {
    this.emitter.emit('did-confirm')
    this.close()
    return true
  }

  cancel () {
    this.close()
    this.emitter.emit('did-cancel')
  }

  destroy () {
    this.emitter.dispose()
  }

  onDidShow (callback) {
    this.emitter.on('did-show', callback)
  }

  onDidClose (callback) {
    this.emitter.on('did-confirm', callback)
  }

  onDidConfirm (callback) {
    this.emitter.on('did-confirm', callback)
  }

  onDidCancel (callback) {
    this.emitter.on('did-cancel', callback)
  }

  onDidDestroy (callback) {
    this.emitter.on('did-destroy', callback)
  }

  attachEvents () {
    const confirm = () => { this.confirm() }
    const close = () => { this.cancel() }

    this.child('.btn-confirm').addEventListener('click', confirm)
    this.child('.btn-cancel').addEventListener('click', close)
  }

  render () {
    switch (this.type) {

      case 'info':
        super.render(`
          <hidrogen-panel class="content">
            <text class="text title"> ${this.modalTitle} </text>
            <btn class="btn icon-close btn-close"></btn>
            ${this.modalContent}
          </hidrogen-panel>
        `)

      case 'confirm':
        super.render(`
          <hidrogen-panel class="content">
            <span class="title"> ${this.modalTitle} </span>
            <span class="custom-content"> ${this.content} </span>
            <hidrogen-panel class="btn-container">
              <hidrogen-btn text="${i18n.translate('Nope, let me a moment...')}" class="btn-cancel"></hidrogen-btn>
              <hidrogen-btn type="success" text="${i18n.translate('Yeah, n.n')}" class="btn-confirm"></btn>
            </hidrogen-panel>
          </hidrogen-panel>
        `)

      case 'custom':
        super.render(`
          <hidrogen-panel class="content">
            <span class="title"> ${this.modalTitle} </span>
            <span class="custom-content"> ${this.content} </span>
            <hidrogen-panel class="btn-container">
              <hidrogen-btn text="${i18n.translate('Nope, let me a moment...')}" class="btn-cancel"></hidrogen-btn>
              <hidrogen-btn type="success" text="${i18n.translate('Yeah, n.n')}" class="btn-confirm"></btn>
            </hidrogen-panel>
          </hidrogen-panel>
        `)
    }
  }
}

customElements.define('hidrogen-modal', Modal)
