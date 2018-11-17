const HidrogenWindow = require('./hidrogen-window')
const Config = require('../config')
const { EventEmitter } = require('events')
const { app } = require('electron')

// This is Hidrogen's main class. {HidrogenApp} manages all
// the app's processes in the main process, such as window
// management (through the {HidrogenWindow} class) or the app's
// life cycle.
module.exports =
class HidrogenApp extends EventEmitter {
  // Entry point to the app.
  static start (options) {
    if (HidrogenApp.isSecondInstance()) app.quit()
    new HidrogenApp(options)
  }

  constructor (options) {
    super()
    this.version = app.getVersion()
    this.dev = options.dev

    this.hidrogenWindow = new HidrogenWindow(options)
    this.config = new Config()
  }

  static isSecondInstance () {
    const quit = app.makeSingleInstance(() => {
      if (this.hidrogenWindow) {
        if (this.hidrogenWindow.isMinimized()) this.hidrogenWindow.restore()
        this.hidrogenWindow.focus()
      }
    })

    return quit
  }
}
