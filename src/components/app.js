const HidrogenComponent = require('./hidrogen-component')
const WindowController = require('../window-controller')
const Config = require('../config')
const util = require('../util')
const { Emitter } = require('event-kit')
const { remote } = require('electron')

// The {App} class links all the main components that builds
// the Hidrogen UI. Also sends debug information for the renderer
// process which can be accesed in the app's Developer Tools.
class App extends HidrogenComponent {
  constructor () {
    super()
    this.startTime = Date.now()
    this.emitter = new Emitter()

    this.loader = this.getComponent('loader')
    this.sidebar = this.getComponent('sidebar')
    this.board = this.getComponent('board')
    this.home = this.getComponent('home')
    this.library = this.getComponent('library')
    this.gameEditor = this.getComponent('game-editor')
    this.libraryEditor = this.getComponent('custom-library-editor')
    this.settings = this.getComponent('settings')
    this.about = this.getComponent('about')
    this.modals = this.getComponent('modals')
    this.config = new Config()
    this.window = new WindowController()

    this.initializeState()
    this.subscribeToDOMEvents()
    this.logDebugInfo()
  }

  initializeState () {
    this.appStateController = remote.getCurrentWindow()
    this.appStateController.focus()

    this.states = {
      focus: true,
      loaded: false
    }

    this.loadedComponents = {
      dom: false,
      library: false
    }
  }

  getComponent (component) {
    return this.child(`hidrogen-${component}`)
  }

  setView (view) {
    this.board.updateView(view)
    this.sidebar.updateSelectedItem(view)

    if (view === 'game-editor') {
      this.gameEditor.setMode('add-game')
      this.gameEditor.clean()
    }
  }

  toggleAppState () {
    if (this.isReady()) {
      if (!this.appStateController.isFocused()) {
        this.blur()
        this.getComponent('board').getView('home').pauseBackgroundVideo()
      } else {
        this.focus()
        this.getComponent('board').getView('home').playBackgroundVideo()
      }
    }
  }

  logDebugInfo () {
    util.logEnvironmentInfo()
  }

  logReadyDelayTime () {
    // We need to substract 1000ms due to the delayed game loading.
    console.log('%c[RendererProcess]:', 'color:blue;', `Ready load time: ${Date.now() - this.startTime - 1000}ms`)
  }

  restoreDefaults () {
    this.library.clean()
    this.config.restoreDefaults()
  }

  isReady () {
    return this.states.loaded
  }

  areComponentsLoaded () {
    if (this.loadedComponents.library) {
      this.emitter.emit('ready')
    }
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

  onReady (callback) {
    this.emitter.on('ready', callback)
  }

  onDidFocus (callback) {
    this.emitter.on('did-focus', callback)
  }

  onDidBlur (callback) {
    this.emitter.on('did-blur', callback)
  }

  subscribeToDOMEvents () {
    this.onReady(() => {
      if (!this.states.loaded) {
        this.logReadyDelayTime()
        this.home.playBackgroundVideo()
        this.loader.hide()
        this.states.loaded = true
      }
    })

    // Attemping to call a function in a renderer window that has
    // been closed or released.
    this.appStateController.on('blur', () => { this.toggleAppState() })
    this.appStateController.on('focus', () => { this.toggleAppState() })

    document.addEventListener('DOMContentLoaded', () => { this.loadedComponents.dom = true })
  }

  render () {
    super.render(`
      <hidrogen-loader></hidrogen-loader>

      <hidrogen-titlebar></hidrogen-titlebar>
      <hidrogen-login></hidrogen-login>
      <hidrogen-sidebar></hidrogen-sidebar>

      <hidrogen-board>

        <hidrogen-home></hidrogen-home>
        <hidrogen-library></hidrogen-library>
        <hidrogen-game-editor></hidrogen-game-editor>
        <hidrogen-settings></hidrogen-settings>
        <hidrogen-about></hidrogen-about>

      </hidrogen-board>

      <hidrogen-custom-library-editor></hidrogen-custom-library-editor>

      <hidrogen-modals></hidrogen-modals>
    `)
  }
}

customElements.define('hidrogen-app', App)
