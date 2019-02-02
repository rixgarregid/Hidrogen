const HidrogenComponent = require('./hidrogen-component')
const CustomLibraryDB = require('../local-databases/custom-library-db')
const util = require('../util')
const JSONStream = require('JSONStream')
const path = require('path')
const fs = require('fs')

class CustomLibraryManager extends HidrogenComponent {
  constructor () {
    super()
    this.libraries = []
    this.libraryDB = new CustomLibraryDB()

    this.classNames = ['custom-library-manager']

    this.subscribeToDOMEvents()
    this.loadLibraries()
  }

  getLibrary(libraryName) {
    return this.child(`hidrogen-custom-library[name=${libraryName}]`)
  }

  add (libraryName, game) {
    let gameDataObject = game.getData()

    if (!gameDataObject.hasOwnProperty('libraries')) gameDataObject.libraries = []
    gameDataObject.libraries.push(libraryName)

    this.hidrogen.library.reloadGame(game)
    this.hidrogen.library.gameDB.update(game.getData(), )
  }

  create (libraryName) {
    if (typeof libraryName !== String) return

    let libraryDataObject = {
      id: this.createLibraryId(),
      name: libraryName
    }

    this.renderLibrary(libraryDataObject)
    this.libraryDB.add(libraryDataObject)
  }

  delete (library) {
    library.destroy()
    this.libraryDB.remove(library.getData())
  }

  loadLibraries () {
    this.libraryDB.load()
  }

  renderLibrary (libraryDataObject) {
    let library = `<hidrogen-custom-library name=${libraryDataObject.name}></hidrogen-custom-library>`
    this.child('.library-container').innerHTML += library
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
        <hidrogen-custom-library name="Mis juegos"></hidrogen-custom-library>
      </hidrogen-panel>

      <hidrogen-panel class="floating-btns">
        <hidrogen-btn type="default" text="Return" class="return-btn outlined"></hidrogen-btn>
        <hidrogen-btn type="success" text="Añadir una biblioteca" icon="add" class="add-btn"></hidrogen-btn>
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-library-manager', CustomLibraryManager)
