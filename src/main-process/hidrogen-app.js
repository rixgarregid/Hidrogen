const HidrogenWindow = require('./hidrogen-window')
const { EventEmitter } = require('events')
const { app } = require('electron')

module.exports =
class HidrogenApp extends EventEmitter {
  static start (options) {
    if (HidrogenApp.shouldQuit()) app.quit()
    new HidrogenApp(options)
  }

  constructor (options) {
    super()
    
    this.version = app.getVersion()
    this.dev = options.dev

    this.hidrogenWindow = new HidrogenWindow(options)
  }

  static shouldQuit () {
    const quit = app.makeSingleInstance(() => {
      if (this.hidrogenWindow) {
        if (this.hidrogenWindow.isMinimized()) this.hidrogenWindow.restore()
        this.hidrogenWindow.focus()
      }
    })

    return quit
  }
}
