const LocalDatabase = require('./local-database')
const JSONStream = require('JSONStream')
const path = require('path')
const fs = require('fs')

module.exports =
class GameDB extends LocalDatabase {
  constructor () {
    super()
    this.setDBSource(path.resolve('games.json'))
  }

  add (gameDataObject) {
    this.addKey(gameDataObject)
  }

  remove (gameDataObject) {
    this.removeKey(gameDataObject)
  }

  update (gameDataObject, updatedData = {}) {
    this.updateKey(gameDataObject, updatedData)
  }

  load () {
    let startLoadTime = Date.now()
    console.log('%c[LibraryGameLoader]:', 'color:blue;', 'Started loading games.')

    fs.createReadStream(this.getDBSource())
      .pipe(JSONStream.parse('*'))
      .on('data', chunk => {
        this.hidrogen.library.gameObjects.push(chunk)
        this.hidrogen.library.renderGame(chunk)
      })
      .on('end', () => {
        this.hidrogen.library.addRendererGamesToLibrary()

        console.log('%c[LibraryGameLoader]:', 'color:blue;', 'Loaded:', this.hidrogen.library.gameObjects)
        console.log('%c[LibraryGameLoader]: %cgames.json parsing completed successfully!', 'color:blue;', 'color:green;')
        console.log('%c[LibraryGameLoader]:', 'color:blue;', `Game loading delay time: ${Date.now() - startLoadTime}ms`)

        this.hidrogen.library.emitter.emit('did-load-games')
      })
  }
}
