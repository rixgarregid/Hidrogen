const HidrogenComponent = require('./hidrogen-component')
const mkdir = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')

// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'library']
    this.libraryGamesFolder = path.resolve('games/')

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.loadGamesFromFiles()

    this.attachEvents()
  }

  loadGamesFromFiles () {
    fs.readdir(this.libraryGamesFolder, (err, files) => {
      if (err) console.log(err)
      // if (typeof files === undefined) console.log('No files were found'); return

      for (let folder of files) {
        let gameData = JSON.parse(fs.readFileSync(path.join(this.libraryGamesFolder, `${folder}`, 'game.json')))
        this.addGame(gameData)
      }

      this.gamesLoaded = true
    })
  }

  addGame (gameData) {
    if (!fs.existsSync(this.libraryGamesFolder)) mkdir(this.libraryGamesFolder)
    let gameFolder = path.join(this.libraryGamesFolder, `${gameData.name}`)
    mkdir(gameFolder)

    // Generate and add Game ID.
    gameData.id = this.generateGameId()

    fs.writeFileSync(path.join(gameFolder, 'game.json'), JSON.stringify(gameData, null, 2))

    this.querySelector('.game-container').innerHTML += `
      <hidrogen-game-card game-id=${gameData.id} game-title='${gameData.name}'></hidrogen-game-card>
    `

    let addedGame = this.querySelector(`.game-container hidrogen-game-card[game-id='${gameData.id}']`)
    if (gameData.thumbnailPath === '') {
      addedGame.classList.add('no-bg')
    }
  }

  removeGame (gameId) {
    let removedGame = this.child(`.game-container hidrogen-game-card[game-id='${gameId}']`)
    this.child('.game-container').removeChild(removedGame)

    rimraf(path.join(this.libraryGamesFolder, `${removedGame.gameTitle}`), (err) => {
      if (err) console.log(err)
    })
  }

  getGames () {
    return this.children('.game-container hidrogen-game-card')
  }

  getGameNames () {
    let gameNames = []

    for (let game of this.getGames()) {
      gameNames.push(game.gameTitle)
    }

    return gameNames
  }

  clean () {
    for (let game of this.getGames()) {
      this.child('.game-container').removeChild(game)
    }
  }

  reload () {
    this.clean()
    this.loadGamesFromFiles()
  }

  generateGameId () {
    // A Game ID is a integer number between 111.111 and 999.999.
    return Math.floor(Math.random() * (999999 - 111111) + 111111)
  }

  attachEvents () {
    const toggleSearchbox = () => {
      if (!this.child('.searchbox').classList.contains('active')) {
        this.child('.searchbox').classList.add('active')
        this.child('.input-search').focus()
      } else {
        this.child('.searchbox').classList.remove('active')
      }
    }

    const addGameHandler = () => {
      this.hidrogenBoard.updateView('game-editor')
      this.hidrogenSidebar.updateSelectedListItem('game-editor')
    }

    this.child('.icon-search').addEventListener('click', toggleSearchbox)
    this.child('.add-btn').addEventListener('click', addGameHandler)
  }

  render () {
    super.render(`
      <hidrogen-panel class="library-toolbar">

        <hidrogen-panel class="searchbox">
          <span class="icon-search"></span>
          <input type="text" class="input-search">
        </hidrogen-panel>

        <btn class="add-btn icon-add"></btn>

      </hidrogen-panel>

      <hidrogen-panel class="game-container"></hidrogen-panel>`
    )
  }
}

customElements.define('hidrogen-library', Library)
