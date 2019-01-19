const HidrogenComponent = require('./hidrogen-component')
const util = require('../util')
const path = require('path')
const fs = require('fs')

class CustomLibraryManager extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['custom-library-manager']
    this.libraries = []
    this.subscribeToDOMEvents()
  }

  get name () {
    return this.getAttribute('name')
  }

  set name (name) {
    this.setAttribute(name)
  }

  create (libraryTitle) {
    this.child('.library-container').innerHTML += `<hidrogen-custom-library title=${libraryTitle}></hidrogen-custom-library>`
  }

  delete () {

  }

  loadLibraries () {

  }

  show () {
    this.classList.add('active')
  }

  close () {
    this.classList.remove('active')
  }

  subscribeToDOMEvents () {
    this.child('.return-btn').onDidClick(() => { this.close() })
    this.child('.add-btn').onDidClick(() => { this.hidrogen.modals.get('new-custom-library').show() })
  }

  render () {
    super.render(`
      <hidrogen-panel class="library-container">

        <hidrogen-custom-library name="MOBAs"></hidrogen-custom-library>
        <hidrogen-custom-library name="RPG"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>
        <hidrogen-custom-library name="Some cool saga"></hidrogen-custom-library>

      </hidrogen-panel>

      <hidrogen-panel class="floating-btns">
        <hidrogen-btn type="default" text="Return" class="return-btn outlined"></hidrogen-btn>
        <hidrogen-btn type="success" icon="add" class="add-btn"></hidrogen-btn>
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-library-manager', CustomLibraryManager)
