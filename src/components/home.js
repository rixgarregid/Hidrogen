const I18n = require('../translator')
const i18n = new I18n()

// The {Home} class is the default view (component) to be
// selected by {Board} <hidrogen-board> and the first to be
// displayed when the app starts.
class Home extends HTMLElement {
  constructor () {
    super()

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')
    this.hidrogenGameEditor = document.querySelector('hidrogen-game-editor')

    this.render()
    this.attachEvents()
  }

  attachEvents () {

    const showLibrary = () => {
      this.hidrogenBoard.updateView('library')
      this.hidrogenBoard.setAttribute('view', 'library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    const showGameEditor = () => {
      this.hidrogenGameEditor.classList.add('active')
      this.hidrogenSidebar.updateSelectedListItem('game-editor')
    }

    this.querySelector('.library-btn').addEventListener('click', showLibrary)

    this.querySelector('.add-btn').addEventListener('click', showGameEditor)
  }

  render () {
    this.classList.add('home-screen')
    this.classList.add('board-view')

    this.innerHTML = `
      <text class="text main-title"> ${i18n.translate('Welcome to Hidrogen,')} </text>
      <text class="text sub-title"> ${i18n.translate('your gaming library')} </text>

      <hidrogen-panel class="home-btns">
        <btn class="btn library-btn"> ${i18n.translate('Go to my library')} </btn>
        <btn class="btn btn-sec add-btn"> ${i18n.translate('Add a game')} </btn>
      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-home', Home)
