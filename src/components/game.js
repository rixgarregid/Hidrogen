const HidrogenComponent = require('./hidrogen-component')
const Config = require('../config')
const { shell } = require('electron')
const { app } = require('electron').remote
const path = require('path')
const { Emitter, CompositeDisposable } = require('event-kit')
const I18n = require('../translator')
const i18n = new I18n()

class Game extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['game-card']
    this.emitter = new Emitter()
    this.data = {
      // id: this.gameId,
      // title: this.gameTitle,
      // path: this.path,
      customBackground: this.customBackground
    }
    this.gameTitle = this.gameTitle

    this.emitter.emit('did-create', this.data)

    this.attachEvents()
  }

  get gameTitle () {
    return this.getAttribute('game-title') || 'Some cool game'
  }

  set gameTitle (title) {
    this.setAttribute('game-title', title)
  }

  get gameId () {
    return this.getAttribute('game-id')
  }

  get path () {
    return this.getAttribute('path')
  }

  get customBackground () {
    if (this.getAttribute('custom-bg') === 'undefined') {
      this.setAttribute('custom-bg', '')
    } else {
      return this.getAttribute('custom-bg')
    }
  }

  toggleMenu () {
    this.child('.game-menu').classList.toggle('active')
    this.child('.game-menu-btn').classList.toggle('active')

    this.child('.title').classList.toggle('disabled')
    this.child('.play-btn').classList.toggle('disabled')
  }

  setBackgroundImage (imageURL) {
    document.querySelector('.custom-background').src = imageURL
  }

  play () {
    shell.openExternal(this.path)

    if (this.hidrogen.config.get('autoclose') && this.hidrogen.config.get('closingCountdown')) {
      this.hidrogen.modals.get('closing-countdown').show()
    } else if (this.hidrogen.config.get('autoclose')) {
      app.quit()
    }
  }

  destroy (id) {
    this.hidrogen.library.remove(id)
    this.emitter.dispose()
  }

  openGameFolder () {
    shell.showItemInFolder(path.join(this.hidrogen.library.getGamesFolderPath(), `${this.gameTitle}`, 'game.json'))
  }

  onDidCreate (callback) {
    this.emitter.on('did-create', callback)
  }

  attachEvents () {
    const play = () => { this.play() }
    const toggleMenu = () => { this.toggleMenu() }
    const openGameFolder = () => { this.openGameFolder() }
    const deleteGame = () => {
      document.querySelector('.delete-game-modal').classList.add('active')
      document.querySelector('.delete-game-modal').setAttribute('game-id', this.gameId)

      this.deleteGameModal = this.hidrogen.modals.get('delete-game')
      this.deleteGameModal.show()
    }

    this.child('.play-btn').addEventListener('click', play)
    this.child('.game-menu-btn').addEventListener('click', toggleMenu)
    this.child('.open-game-folder-item').addEventListener('click', openGameFolder)
    this.child('.delete-game-item').addEventListener('click', deleteGame)
  }

  render () {
    super.render(`
      <span class="text title"> ${this.gameTitle} </span>
      <hidrogen-btn type="highlight" text="${i18n.translate('Play')}" class="play-btn"></hidrogen-btn>
      <hidrogen-btn custom-content class="game-menu-btn"><span class="hamburger"></span></hidrogen-btn>

      <hidrogen-panel class="game-menu" state="no-active">
        <ul class="list menu-list">

          <li class="list-item">
            <span class="icon icon-mode_edit"></span><text class="text"> ${i18n.translate('Edit information')} </text>
          </li>

          <li class="list-item open-game-folder-item">
            <span class="icon icon-folder_open"></span><text class="text"> ${i18n.translate('Open game folder')} </text>
          </li>

          <li class="list-item delete-game-item">
            <span class="icon icon-delete"></span><text class="text"> ${i18n.translate('Delete')} </text>
          </li>

        </ul>
      </hidrogen-panel>

      <hidrogen-panel class="background"></hidrogen-panel>
      <img src="${this.customBackground}" class="custom-background"></img>
    `)
  }
}

customElements.define('hidrogen-game-card', Game)
