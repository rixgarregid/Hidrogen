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
    this.subscribeToDOMEvents()
  }

  updateWelcomeMessage (username) {
    this.child('.main-title').innerText = `¡Hola de nuevo, ${username}!`
    this.child('.sub-title').style.display = 'none'
  }

  playBackgroundVideo () {
    this.child('video').play()
  }

  pauseBackgroundVideo () {
    this.child('video').pause()
  }

  subscribeToDOMEvents () {
    this.child('.library-btn').onDidClick(() => { this.hidrogen.setView('library') })
  }

  render () {
    super.render(`
      <hidrogen-panel class="panel background-video">
        <video src="../static/video/World of Warcraft Official Hellfire Citadel Trailer.mp4" muted loop="true"></video>
      </hidrogen-panel>
      <hidrogen-panel class="background-video-overlay"></hidrogen-panel>

      <span class="main-title"> ${i18n.translate('Welcome to Hidrogen,')} </span>
      <span class="sub-title"> ${i18n.translate('your gaming library')} </span>

      <hidrogen-btn text="${i18n.translate('Go to my library')}" class="library-btn"></hidrogen-btn>
    `)
  }
}

customElements.define('hidrogen-home', Home)
