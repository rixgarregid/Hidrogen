const HidrogenComponent = require('./hidrogen-component')
const GameDB = require('../local-databases/game-db')
const { Emitter } = require('event-kit')

// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.games = []
    this.gameObjects = []
    this.gameDB = new GameDB()
    this.activeLibrary = 'Mis juegos'

    this.classNames = ['board-view', 'library']
    this.emitter = new Emitter()

    this.gamesToRender = ''
    this.gameContainer = this.child('.game-container')

    this.render()

    this.games = this.getGames()
    this.customs = this.child('hidrogen-library-manager')

    this.initializeGameCounter()
    this.subscribeToDOMEvents()

    // We delay loading games until the DOM is fully loaded in order
    // to avoid the app from freezing while loading those games.
    // document.addEventListener('DOMContentLoaded', () => { this.loadGames() })
    // this.loadGames()
    setTimeout(() => { this.loadGames() }, 1000)
  }

  getGame (gameId) {
    return this.child(`hidrogen-game[game-id='${gameId}']`)
  }

  getGames () {
    return this.children('hidrogen-game-card')
  }

  getAllGames () {
    return this.games
  }

  getTotalGames () {
    return this.gameCounter
  }

  add (game, libraries = []) {
    this.gameDB.add(game.getData())
    this.gameContainer.appendChild(game)
    this.updateGameCounter(this.getTotalGames() + 1)

    if (libraries === []) return
    for (let library in libraries) {
      this.customs.add(library, game)
      this.customs.updateGameCounter(library, this.customs.get(library).updateGameCounter(this.customs.get(library).getTotalGames() + 1))
    }
  }

  remove (game, all = true) {
    game.destroy()
    this.updateGameCounter(this.getTotalGames() - 1)
    if (all) this.gameDB.remove(game.getData())
  }

  loadGames () {
    this.gameDB.load()
  }

  // add (game, libraries = {}) {
  //   // If we're adding a brand-new game it won't have any Id, so we assign
  //   // it one randomly generated.
  //   // if (!gameData.hasOwnProperty('id')) {
  //   //   gameData.id = this.generateGameId()
  //   //
  //   //   let gameDataFile = path.join(this.getGamesFolderPath(), `${gameData.id}.json`)
  //   //   fs.writeFileSync(gameDataFile, JSON.stringify(gameData, null, 2))
  //   // }
  //
  //   this.gameObject[`${gameData.id.toString()}`] = gameData
  //
  //   this.renderGameIntoLibrary(gameData)
  //   this.updateGameCounter(this.getTotalGames() + 1)
  // }

  renderGame (gameData) {
    let parsedGameLibraryArray = ''
    for (let library of gameData.libraries) {
      let parsedLib = library + ' '
      parsedGameLibraryArray += parsedLib
    }

    let game = `
      <hidrogen-game-card
        game-id=${gameData.id}
        game-title='${gameData.name}'
        path='${gameData.execPath}'
        custom-bg='${gameData.bgImage}'
        libraries='${parsedGameLibraryArray}'
      ></hidrogen-game-card>
    `

    this.gamesToRender += game
    this.updateGameCounter(this.getTotalGames() + 1)
  }

  addRendererGamesToLibrary () {
    this.child('.game-container').innerHTML = this.gamesToRender
  }

  setActiveLibrary (libraryId) {
    this.activeLibrary = libraryId

    for (let game of this.getGames()) {
      if (!game.getData().libraries.includes(libraryId)) {
        this.activeLibrary !== 'Mis juegos' ? game.hide() : game.show()
      } else {
        game.show()
      }
    }
  }

  getActiveLibrary () {
    return this.activeLibrary
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
      this.child('.game-counter-label').innerText = 'juego en la biblioteca'
    } else {
      this.child('.game-counter-label').innerText = 'juegos en la biblioteca'
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
    for (let game of this.getGames()) {
      this.remove(game)
    }
  }

  reload () {
    for (let game of this.getGames()) {
      game.destroy()
      this.updateGameCounter(this.getTotalGames() - 1)
    }

    this.loadGames()
  }

  reloadGame (game) {
    game.destroy()
    this.updateGameCounter(this.getTotalGames() - 1)
    this.add(game)
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

  subscribeToDOMEvents () {
    this.onDidLoadGames(() => {
      this.hidrogen.loadedComponents.library = true
      this.hidrogen.areComponentsLoaded()
    })

    this.child('.custom-libs-btn').onDidClick(() => { this.customs.show() })
    this.child('.search-icon').onDidClick(() => { this.toggleSearchbox() })
    this.child('.add-btn').onDidClick(() => { this.hidrogen.setView('game-editor') })
    this.child('.input-search').addEventListener('keyup', () => { this.search(this.child('.input-search').value.toUpperCase()) })
  }

  render () {
    super.render(`
      <hidrogen-panel class="toolbar">

        <hidrogen-btn text="Mis juegos" class="custom-libs-btn"></hidrogen-btn>
        <icon class="icon-expand_more"></icon>

        <hidrogen-panel class="searchbox">
          <hidrogen-btn icon="search" class="search-icon"></hidrogen-btn>
          <input type="text" class="input-search">
        </hidrogen-panel>

        <hidrogen-panel class="total-game-counter">
          <span class="game-counter"> ${this.getTotalGames()} </span>
          <span class="game-counter-label"> juegos en la biblioteca </span>
        </hidrogen-panel>

        <hidrogen-btn icon="add" class="add-btn" type="default"></hidrogen-btn>

      </hidrogen-panel>

      <hidrogen-panel class="game-container"></hidrogen-panel>
      <hidrogen-library-manager></hidrogen-library-manager>
      `
    )
  }
}

customElements.define('hidrogen-library', Library)
