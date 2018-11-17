const { shell } = require('electron')
const I18n = require('../translator')
const i18n = new I18n()

class Game extends HTMLElement {
  constructor () {
    super()

    this.gameTitle = 'World of Warcraft' // Yeah.

    this.hidrogenLibrary = document.querySelector('hidrogen-library')

    this.render()
    this.attachEvents()
  }

  attachEvents () {

    const toggleGameMenu = () => {
      this.querySelector('.game-menu').classList.toggle('active')
      this.querySelector('.game-menu-btn').classList.toggle('active')

      this.querySelector('.title').classList.toggle('disabled')
      this.querySelector('.play-btn').classList.toggle('disabled')
    }

    this.querySelector('.game-menu-btn').addEventListener('click', toggleGameMenu)
  }

  render () {
    this.classList.add('game-card')

    this.innerHTML = `
      <text class="text title"> ${this.gameTitle} </text>
      <btn class="btn play-btn"> ${i18n.translate('Play')} </btn>

      <btn class="btn game-menu-btn"><span class="hamburger"></span></btn>

      <hidrogen-panel class="game-menu" state="no-active">
        <ul class="list menu-list">
          <li class="list-item">
            <span class="icon icon-info"></span><text class="text">Información</text>
          </li>
          <li class="list-item">
            <span class="icon icon-mode_edit"></span><text class="text">Editar información</text>
          </li>
          <li class="list-item">
            <span class="icon icon-folder_open"></span><text class="text">Abrir carpeta del juego</text>
          </li>
          <li class="list-item">
            <span class="icon icon-delete"></span><text class="text">Eliminar</text>
          </li>
        </ul>
      </hidrogen-panel>

      <hidrogen-panel class="background"></hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-game-card', Game)
