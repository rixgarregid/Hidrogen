const HidrogenComponent = require('./hidrogen-component')
const Config = require('../config')
const { Emitter } = require('event-kit')
const { remote } = require('electron')
const { app } = remote
const os = require('os')

// The {App} class links all the main components that builds
// the Hidrogen UI. Also sends debug information for the renderer
// process which can be accesed in the app's Developer Tools.
class App extends HidrogenComponent {
  constructor () {
    super()
    this.sidebar = this.getComponent('sidebar')
    this.board = this.getComponent('board')
    this.home = this.getComponent('home')
    this.library = this.getComponent('library')
    this.gameEditor = this.getComponent('game-editor')
    this.settings = this.getComponent('settings')
    this.about = this.getComponent('about')
    this.modals = this.getComponent('modals')
    this.config = new Config()

    this.emitter = new Emitter()

    this.initializeState()
    this.attachEvents()
  }

  initializeState () {
    this.appStateController = remote.getCurrentWindow()
    this.appStateController.focus()
  }

  getComponent (component) {
    return this.child(`hidrogen-${component}`)
  }

  setView (view) {
    this.board.updateView(view)
    this.sidebar.updateSelectedItem(view)
  }

  focus () {
    this.classList.remove('blurred')
    this.classList.add('focused')
    this.state = 'focused'
    this.emitter.emit('did-focus')
  }

  blur () {
    this.classList.remove('focused')
    this.classList.add('blurred')
    this.state = 'blurred'
    this.emitter.emit('did-blur')
  }

  onDidFocus (callback) {
    this.emitter.on('did-focus', callback)
  }

  onDidBlur (callback) {
    this.emitter.on('did-blur', callback)
  }

  toggleAppState () {
    if (!this.appStateController.isFocused()) {
      this.blur()
      this.getComponent('board').getView('home').pauseBackgroundVideo()
    } else {
      this.focus()
      this.getComponent('board').getView('home').playBackgroundVideo()
    }
  }

  restoreDefaults () {
    this.library.clean()
    this.config.restoreDefaults()
  }

  getSystemInfo () {
    let systemOS
    let arch

    switch (process.platform) {
      case 'win32': systemOS = 'Windows'; break
      case 'linux': systemOS = 'Linux'; break
      case 'darwin': systemOS = 'MacOS'; break
    }

    switch (os.arch()) {
      case 'ia32': arch = '32-bit'; break
      case 'arm64': arch = '64-bit'; break
      case 'x32': arch = '32-bit'; break
      case 'x64': arch = '64-bit'; break
    }

    let platformRelease = os.release()

    return `${systemOS} ${platformRelease} ${arch}`
  }

  attachEvents () {
    const toggleAppState = () => {
      if (!this.appStateController.isFocused()) {
        this.blur()
        this.getComponent('board').getView('home').pauseBackgroundVideo()
      } else {
        this.focus()
        this.getComponent('board').getView('home').playBackgroundVideo()
      }
    }

    // Attemping to call a function in a renderer window that has
    // been closed or released.
    this.appStateController.on('blur', toggleAppState)
    this.appStateController.on('focus', toggleAppState)
  }

  render () {
    super.render(`
      <hidrogen-loader></hidrogen-loader>

      <hidrogen-titlebar></hidrogen-titlebar>
      <hidrogen-sidebar></hidrogen-sidebar>

      <hidrogen-board>

        <hidrogen-home></hidrogen-home>
        <hidrogen-library></hidrogen-library>
        <hidrogen-game-editor></hidrogen-game-editor>
        <hidrogen-settings></hidrogen-settings>
        <hidrogen-about></hidrogen-about>

      </hidrogen-board>

      <hidrogen-modals></hidrogen-modals>
    `)
  }
}

customElements.define('hidrogen-app', App)
