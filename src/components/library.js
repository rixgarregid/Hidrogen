const HidrogenComponent = require('./hidrogen-component')
const binarySearch = require('../util')
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
    } else {
      addedGame.setBackgroundImage(gameData.thumbnailPath)
    }
  }

  removeGame (gameId) {
    let removedGame = this.child(`.game-container hidrogen-game-card[game-id='${gameId}']`)
    this.child('.game-container').removeChild(removedGame)

    rimraf(path.join(this.libraryGamesFolder, `${removedGame.gameTitle}`), (err) => {
      if (err) console.log(err)
    })
  }

  getGamesPath () {
    return this.libraryGamesFolder
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

  searchGame (game) {
    // binarySearch(this.getGameNames(), game)
    for (let gameItem of this.getGames()) {
      if (gameItem.gameTitle.toUpperCase().indexOf(game) > -1) {
        gameItem.classList.remove('hidden')
      } else {
        gameItem.classList.add('hidden')
      }
    }
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

    const search = () => {
      this.searchGame(this.child('.input-search').value.toUpperCase())
    }

    this.child('.icon-search').addEventListener('click', toggleSearchbox)
    this.child('.add-btn').addEventListener('click', addGameHandler)
    this.child('.input-search').addEventListener('keyup', search)

    // Not working... #fixme
    this.addEventListener('keydown', event => {
      // Ctrl + S to toggle search box.
      if (event.keyCode === 17 && event.keyCode === 83) toggleSearchbox()
    })
  }

  render () {
    super.render(`
      <hidrogen-panel class="toolbar">

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
