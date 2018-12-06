const HidrogenComponent = require('./hidrogen-component')
const { shell } = require('electron')
const I18n = require('../translator')
const i18n = new I18n()

class Game extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['game-card']
    this.gameTitle = this.gameTitle

    this.hidrogenLibrary = document.querySelector('hidrogen-library')

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

  toggleMenu () {

  }

  destroy (id) {
    this.hidrogenLibrary.removeGame(id)
  }

  attachEvents () {

    const toggleGameMenu = () => {
      this.child('.game-menu').classList.toggle('active')
      this.child('.game-menu-btn').classList.toggle('active')

      this.child('.title').classList.toggle('disabled')
      this.child('.play-btn').classList.toggle('disabled')
    }

    const deleteGame = () => {
      // document.querySelector('.delete-game-modal').classList.add('active')
      // document.querySelector('.delete-game-modal').setAttribute('game-id', this.gameId)
      // Avoid showing the modal and delete game directly:
      this.destroy(this.gameId)
    }

    this.child('.game-menu-btn').addEventListener('click', toggleGameMenu)
    this.child('.delete-game-item').addEventListener('click', deleteGame)

    // super.attachEvents(this.attachEvents())
  }

  render () {
    super.render(`
      <text class="text title"> ${this.gameTitle} </text>
      <btn class="btn play-btn"> ${i18n.translate('Play')} </btn>
      <btn class="btn game-menu-btn"><span class="hamburger"></span></btn>

      <hidrogen-panel class="game-menu" state="no-active">
        <ul class="list menu-list">

          <li class="list-item">
            <span class="icon icon-info"></span><text class="text"> ${i18n.translate('Information')} </text>
          </li>

          <li class="list-item">
            <span class="icon icon-mode_edit"></span><text class="text"> ${i18n.translate('Edit information')} </text>
          </li>

          <li class="list-item">
            <span class="icon icon-folder_open"></span><text class="text"> ${i18n.translate('Open game folder')} </text>
          </li>

          <li class="list-item delete-game-item">
            <span class="icon icon-delete"></span><text class="text"> ${i18n.translate('Delete')} </text>
          </li>

        </ul>
      </hidrogen-panel>

      <hidrogen-panel class="background"></hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-game-card', Game)
