const mkdir = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')

// Instanciated by {GameEditor}.
module.exports =
class LibraryManager {
  constructor () {
    this.hidrogenLibrary = document.querySelector('hidrogen-library')
    this.gameDataFolder = path.resolve('games/')

    this.loadGamesFromDB()
  }

  loadGamesFromDB () {
    fs.readdir(this.gameDataFolder, (err, files) => {
      if (err) console.log(err)

      for (let folder of files) {
        let gameData = JSON.parse(fs.readFileSync(path.join(this.gameDataFolder, `${folder}`, 'game.json')))
        this.hidrogenLibrary.add(gameData)
      }
    })
  }

  addGame (gameData) {
    if (!fs.existsSync(this.gameDataFolder)) mkdir(this.gameDataFolder)
    let gameDataFolder = path.join(this.gameDataFolder, `${gameData.name}`)
    mkdir(gameDataFolder)

    // Generate and add Game ID.
    gameData.id = this.generateGameId()

    fs.writeFileSync(path.join(gameDataFolder, 'game.json'), JSON.stringify(gameData, null, 2))

    this.hidrogenLibrary.add(gameData)
  }

  removeGame (gameName) {
    rimraf(path.join(this.gameDataFolder, `${gameName}`))
  }

  generateGameId () {
    // A Game ID is a integer number between 111.111 and 999.999.
    return Math.floor(Math.random() * (999999 - 111111) + 111111)
  }
}
