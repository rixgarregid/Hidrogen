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
    this.gameTitle = this.gameTitle
    this.emitter = new Emitter()
    this.emitter.emit('did-create', this.data)
    this.subscribeToDOMEvents()
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
      this.removeAttribute('custom-bg')
      this.classList.add('no-bg')
    } else {
      return this.getAttribute('custom-bg')
    }
  }

  getData () {
    return {
      id: this.gameId,
      title: this.gameTitle,
      path: this.path,
      customBackground: this.customBackground
    }
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

  edit () {
    this.hidrogen.gameEditor.setMode('edit-game')
    this.hidrogen.gameEditor.fill(this.getData())
    this.hidrogen.board.updateView('game-editor')
  }

  toggleMenu () {
    this.child('.game-menu').classList.toggle('active')
    this.child('.game-menu-btn').classList.toggle('active')

    this.child('.title').classList.toggle('disabled')
    this.child('.play-btn').classList.toggle('disabled')
  }

  openFolder () {
    shell.showItemInFolder(this.path)
  }

  destroy () {
    this.remove()
    this.emitter.emit('did-destroy')
    this.emitter.dispose()
  }

  onDidCreate (callback) {
    this.emitter.on('did-create', callback)
  }

  onDidEdit (callback) {
    this.emitter.on('did-edit', callback)
  }

  onDidDestroy (callback) {
    this.emitter.on('did-destroy', callback)
  }

  subscribeToDOMEvents () {
    this.child('.play-btn').onDidClick(() => { this.play() })
    this.child('.game-menu-btn').onDidClick(() => { this.toggleMenu() })
    this.child('.edit-btn').onDidClick(() => { this.edit() })
    this.child('.open-folder-btn').onDidClick(() => { this.openFolder() })
    this.child('.delete-btn').onDidClick(() => {
      this.deleteGameModal = this.hidrogen.modals.get('delete-game')
      this.deleteGameModal.show()
      this.deleteGameModal.setAttribute('game-id', this.gameId)
    })
  }

  render () {
    super.render(`
      <span class="text title"> ${this.gameTitle} </span>
      <hidrogen-btn type="highlight" text="${i18n.translate('Play')}" class="play-btn"></hidrogen-btn>
      <hidrogen-btn custom-content class="game-menu-btn"><span class="hamburger"></span></hidrogen-btn>

      <hidrogen-panel class="game-menu" state="no-active">
        <ul class="list menu-list">

          <li class="list-item">
            <hidrogen-btn icon="mode_edit" text="${i18n.translate('Edit information')}" class="edit-btn"></hidrogen-btn>
          </li>

          <li class="list-item">
            <hidrogen-btn icon="folder_open" text="${i18n.translate('Open game folder')}" class="open-folder-btn"></hidrogen-btn>
          </li>

          <li class="list-item">
            <hidrogen-btn icon="mode_edit" text="${i18n.translate('Delete')}" class="delete-btn"></hidrogen-btn>
          </li>

        </ul>
      </hidrogen-panel>

      <hidrogen-panel class="background"></hidrogen-panel>
      <img src="${this.customBackground}" class="custom-background"></img>
    `)
  }
}

customElements.define('hidrogen-game-card', Game)
