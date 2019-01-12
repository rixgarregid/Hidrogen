const HidrogenComponent = require('./hidrogen-component')
const util = require('../util')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const { Emitter } = require('event-kit')

// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.classNames = ['board-view', 'library']
    this.gamesFolder = path.resolve('games/')
    this.emitter = new Emitter()

    this.render()
    this.initializeGameCounter()
    this.subscribeToDOMEvents()

    // We delay loading games until the DOM is fully loaded in order
    // to avoid the app from freezing while loading those games.
    // document.addEventListener('DOMContentLoaded', () => { this.loadGames() })
    // this.loadGames()
    setTimeout(() => { this.loadGames() }, 1000)
  }

  getGame (gameId) {
    return this.child(`hidrogen-game-card[game-id='${gameId}']`)
  }

  getAllGames () {
    return this.children('.game-container hidrogen-game-card')
  }

  getGamesFolderPath () {
    return this.gamesFolder
  }

  getTotalGames () {
    return this.gameCounter
  }

  add (gameData) {
    // If we're adding a brand-new game it won't have any Id, so we assign
    // it one randomly generated.
    if (!gameData.hasOwnProperty('id')) {
      gameData.id = this.generateGameId()

      let gameDataFile = path.join(this.getGamesFolderPath(), `${gameData.id}.json`)
      fs.writeFileSync(gameDataFile, JSON.stringify(gameData, null, 2))
    }

    this.createGameElement(gameData)
    this.updateGameCounter(this.getTotalGames() + 1)
  }

  remove (gameId) {
    let game = this.getGame(gameId)

    this.updateGameCounter(this.getTotalGames() - 1)
    rimraf(path.join(this.gamesFolder, `${game.gameId}.json`), err => { if (err) console.log(err) })
    game.destroy()
  }

  async loadGames () {
    try {
      let games = await util.readdir(this.gamesFolder)
      let startTime = Date.now()

      for (let gameId of games) {
        let gameData = JSON.parse(fs.readFileSync(path.join(this.gamesFolder, `${gameId}`)))
        this.add(gameData)
      }

      let loadDelayTime = `Game loading delay time: ${Date.now() - startTime}ms`
      console.log(loadDelayTime)

      this.emitter.emit('did-load-games')
    } catch (err) {
      console.log(`Something went wrong in Library::loadGames(): ${err}`)
    }
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

  initializeGameCounter () {
    if (!this.hidrogen.config.get('showGameCounter')) {
      this.child('.total-game-counter').classList.add('no-display')
    } else {
      this.gameCounter = 0
      this.child('.total-game-counter .game-counter').innerText = this.gameCounter
    }

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

  search (game) {
    for (let gameItem of this.getAllGames()) {
      if (gameItem.gameTitle.toUpperCase().indexOf(game) > -1) {
        gameItem.classList.remove('hidden')
      } else {
        gameItem.classList.add('hidden')
      }
    }
  }

  toggleSearchbox () {
    if (!this.child('.searchbox').classList.contains('active')) {
      this.child('.searchbox').classList.add('active')
      this.child('.input-search').focus()
    } else {
      this.child('.searchbox').classList.remove('active')
    }
  }

  clean () {
    for (let game of this.getAllGames()) {
      this.remove(game.gameId)
    }
  }

  // Remove games only from the DOM and load their files again.
  reload () {
    for (let game of this.getAllGames()) {
      game.destroy()
      this.updateGameCounter(this.getTotalGames() - 1)
    }

    this.loadGames()
  }

  generateGameId () {
    // A Game ID is a integer number between 111.111 and 999.999.
    return Math.floor(Math.random() * (999999 - 111111) + 111111)
  }

  onDidAddGame (callback) {
    this.emitter.on('did-add-game', callback)
  }

  onDidRemoveGame (callback) {
    this.emitter.on('did-remove-game', callback)
  }

  onDidLoadGames (callback) {
    this.emitter.on('did-load-games', callback)
  }

  onDidClean (callback) {
    this.emitter.on('did-clean', callback)
  }

  reloadGame (gameData) {
    this.getGame(gameData.id).destroy()
    this.updateGameCounter(this.getTotalGames() - 1)
    this.add(gameData)
  }

  subscribeToDOMEvents () {
    this.onDidLoadGames(() => {
      this.hidrogen.loadedComponents.library = true
      this.hidrogen.areComponentsLoaded()
    })

    this.child('.search-icon').onDidClick(() => { this.toggleSearchbox() })
    this.child('.add-btn').onDidClick(() => { this.hidrogen.setView('game-editor') })
    this.child('.input-search').addEventListener('keyup', () => { this.search(this.child('.input-search').value.toUpperCase()) })
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
