const mkdir = require('mkdirp')
const path = require('path')
const fs = require('fs')

// Instanciated by {GameEditor}.
module.exports =
class LibraryManager {
  constructor () {
    this.hidrogenLibrary = document.querySelector('hidrogen-library')
    this.gameDataFolder = path.resolve('games/')
  }

  addGame (gameData) {
    if (!fs.existsSync(this.gameDataFolder)) mkdir(this.gameDataFolder)
    let gameDataFolder = path.join(this.gameDataFolder, `${gameData.name}`)
    mkdir(gameDataFolder)

    fs.writeFileSync(path.join(gameDataFolder, `${gameData.name}.json`), JSON.stringify('I\'m a game!', null, 2))
  }
}
