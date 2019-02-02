const LocalDatabase = require('./local-database')
const JSONStream = require('JSONStream')
const path = require('path')
const fs = require('fs')

module.exports =
class CustomLibraryDB extends LocalDatabase {
  constructor () {
    super()
    this.setDBSource(path.resolve('libraries.json'))
  }

  add (libraryDataObject) {
    this.addKey(libraryDataObject)
  }

  remove (libraryDataObject) {
    this.removeKey(libraryDataObject)
  }

  update (libraryDataObject, updatedData = {}) {
    this.updateKey(libraryDataObject, updatedData)
  }

  load () {
    let startLoadTime = Date.now()
    console.log('%c[CustomLibraryLoader]:', 'color:blue;', 'Started loading custom libraries.')

    fs.createReadStream(this.getDBSource())
      .pipe(JSONStream.parse('*'))
      .on('data', chunk => {
        this.hidrogen.library.customs.libraries.push(chunk)
        this.hidrogen.library.customs.renderLibrary(chunk)
      })
      .on('end', () => {
        console.log('%c[CustomLibraryLoader]:', 'color:blue;', 'Loaded:', this.hidrogen.library.customs.libraries)
        console.log('%c[CustomLibraryLoader]: %clibraries.json parsing completed successfully!', 'color:blue;', 'color:green;')
        console.log('%c[CustomLibraryLoader]:', 'color:blue;', `Custom libraries loading delay time: ${Date.now() - startLoadTime}ms`)
      })
  }
}
