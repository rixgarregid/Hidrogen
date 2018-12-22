const HidrogenComponent = require('./hidrogen-component')
const I18n = require('../translator')
const i18n = new I18n()

// The {Home} class is the default view (component) to be
// selected by {Board} <hidrogen-board> and the first to be
// displayed when the app starts.
class Home extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'home-screen']

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')
    this.hidrogenGameEditor = document.querySelector('hidrogen-game-editor')

    this.attachEvents()
  }

  playBackgroundVideo () {
    this.child('video').play()
  }

  pauseBackgroundVideo () {
    this.child('video').pause()
  }

  attachEvents () {

    const showLibrary = () => {
      this.hidrogenBoard.updateView('library')
      this.hidrogenBoard.setAttribute('view', 'library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    const showGameEditor = () => {
      this.hidrogenBoard.updateView('game-editor')
      this.hidrogenSidebar.updateSelectedListItem('game-editor')
    }

    this.child('.library-btn').addEventListener('click', showLibrary)

    this.child('.add-btn').addEventListener('click', showGameEditor)
  }

  render () {
    super.render(`
      <hidrogen-panel class="panel background-video">
        <video src="../static/video/video_sample.mp4" autoplay muted loop="true"></video>
      </hidrogen-panel>
      <hidrogen-panel class="background-video-overlay"></hidrogen-panel>

      <span class="main-title"> ${i18n.translate('Welcome to Hidrogen,')} </span>
      <span class="sub-title"> ${i18n.translate('your gaming library')} </span>

      <hidrogen-panel class="home-btns">

        <hidrogen-btn text="${i18n.translate('Go to my library')}" class="library-btn"></hidrogen-btn>
        <hidrogen-btn text="${i18n.translate('Add a game')}" class="outlined add-btn"></hidrogen-btn>

      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-home', Home)
