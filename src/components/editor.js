const HidrogenComponent = require('./hidrogen-component')
const { Emitter } = require('event-kit')
const path = require('path')
const fs = require('fs')

module.exports =
class Editor extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['editor']
    this.emitter = new Emitter()
  }

  setEditorContent (htmlContent) {
    // if (typeof htmlContent !== String) return
    this.innerHTML = `
      <hidrogen-panel class="editor-content">
        ${htmlContent}
      </hidrogen-panel>
    `
  }

  open () {
    this.classList.add('opened')
    this.emitter.emit('did-open')
  }

  close () {
    this.classList.remove('opened')
    this.emitter.emit('did-close')
  }

  onDidOpen (callback) {
    this.emitter.on('did-open', callback)
  }

  onDidClose (callback) {
    this.emitter.on('did-close', callback)
  }

  render () {
    super.render(`
      <hidrogen-panel class="editor-content"></hidrogen-panel>
    `)
  }
}
