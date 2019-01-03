const HidrogenComponent = require('./hidrogen-component')
const Config = require('../config')
const mkdir = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')

const util = require('../util')

// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.classNames = ['board-view', 'library']
    this.gamesFolder = path.resolve('games/')

    this.render()
    this.initializeGameCounter()
    this.loadGames()
    this.subscribeToDOMEvents()
  }

  initializeGameCounter () {
    if (!this.hidrogen.config.get('showGameCounter')) {
      this.child('.total-game-counter').classList.add('no-display')
    } else {
      this.gameCounter = 0
      this.child('.total-game-counter .game-counter').innerText = this.gameCounter
    }
  }

  async loadGames () {
    try {
      let games = await util.readdir(this.gamesFolder)

      for (let gameId of games) {
        let gameData = JSON.parse(fs.readFileSync(path.join(this.gamesFolder, `${gameId}`)))
        this.add(gameData)
      }
    } catch (err) {
      console.log(`Something went wrong in Library::loadGames(): ${err}`)
    }
  }

  getGame (gameId) {
    return this.child(`hidrogen-game-card[game-id='${gameId}']`)
  }

  createGameElement (gameData) {
    this.child('.game-container').innerHTML += `
      <hidrogen-game-card
        game-id=${gameData.id}
        game-title='${gameData.title}'
        path='${gameData.path}'
        custom-bg='${gameData.customBackground}'
      ></hidrogen-game-card>
    `
  }

  // A `gameData` object looks like this.
  // {
  //   id: 111111,
  //   title: 'Some cool name',
  //   path: '../Program Files/Cool Game/coolgame.exe',
  //   customBackground: '../Program Files/Cool Game/Splash.png'
  // }
  add (gameData) {
    // If we're adding a brand-new game it won't have any Id, so we assign
    // it one randomly generated.
    if (!gameData.hasOwnProperty('id')) gameData.id = this.generateGameId()

    let gameDataFile = path.join(this.getGamesFolderPath(), `${gameData.id}.json`)
    fs.writeFileSync(gameDataFile, JSON.stringify(gameData, null, 2))

    this.createGameElement(gameData)
    this.updateGameCounter(this.getTotalGames() + 1)
  }

  remove (gameId) {
    let game = this.getGame(gameId)

    this.updateGameCounter(this.getTotalGames() - 1)
    rimraf(path.join(this.gamesFolder, `${game.gameId}`), err => { if (err) console.log(err) })
    game.destroy()
  }

  getAllGames () {
    return this.children('.game-container hidrogen-game-card')
  }

  getGamesFolderPath () {
    return this.gamesFolder
  }

  search (game) {
    for (let gameItem of this.getAllGames()) {
      if (gameItem.gameTitle.toUpperCase().indexOf(game) > -1) {
        gameItem.classList.remove('hidden')
      } else {
        gameItem.classList.add('hidden')
      }
    }
  }

  clean () {
    for (let game of this.getAllGames()) {
      this.remove(game.gameId)
    }
  }

  reload () {
    this.clean()
    this.loadGames()
  }

  getTotalGames () {
    return this.gameCounter
  }

  updateGameCounter (amount) {
    this.gameCounter = amount
    this.child('.game-counter').innerText = amount

    if (this.getTotalGames() === 1) {
      this.child('.game-counter-label').innerText = 'juego en la biblioteca!'
    } else {
      this.child('.game-counter-label').innerText = 'juegos en la biblioteca!'
    }
  }

  generateGameId () {
    // A Game ID is a integer number between 111.111 and 999.999.
    return Math.floor(Math.random() * (999999 - 111111) + 111111)
  }

  subscribeToDOMEvents () {
    const toggleSearchbox = () => {
      if (!this.child('.searchbox').classList.contains('active')) {
        this.child('.searchbox').classList.add('active')
        this.child('.input-search').focus()
      } else {
        this.child('.searchbox').classList.remove('active')
      }
    }

    const search = () => { this.search(this.child('.input-search').value.toUpperCase()) }

    this.child('.search-icon').onDidClick(toggleSearchbox)
    this.child('.add-btn').onDidClick(() => { this.hidrogen.setView('game-editor') })
    this.child('.input-search').addEventListener('keyup', search)
  }

  render () {
    super.render(`
      <hidrogen-panel class="toolbar">

        <hidrogen-panel class="searchbox">
          <hidrogen-btn icon="search" class="search-icon"></hidrogen-btn>
          <input type="text" class="input-search">
        </hidrogen-panel>

        <hidrogen-panel class="total-game-counter">
          <span class="game-counter"> ${this.getTotalGames()} </span>
          <span class="game-counter-label"> juegos en la biblioteca! </span>
        </hidrogen-panel>

        <hidrogen-btn icon="add" class="add-btn" type="default"></hidrogen-btn>

      </hidrogen-panel>

      <hidrogen-panel class="game-container"></hidrogen-panel>`
    )
  }
}

customElements.define('hidrogen-library', Library)
