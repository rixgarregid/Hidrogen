const HidrogenWindow = require('./hidrogen-window')
const Config = require('../config')
const { EventEmitter } = require('events')
const { autoUpdater } = require('electron-updater')
const { app, globalShortcut, ipcMain } = require('electron')

// This is Hidrogen's main class. {HidrogenApp} manages all
// the app's processes in the main process, such as window
// management (through the {HidrogenWindow} class) or the app's
// life cycle.
module.exports =
class HidrogenApp extends EventEmitter {
  static start (options) {
    if (HidrogenApp.isSecondInstance()) app.quit()
    new HidrogenApp(options)
  }

  constructor (options) {
    super()
    this.dev = options.dev
    this.version = app.getVersion()
    this.window = new HidrogenWindow(options)
    this.config = new Config()

    autoUpdater.checkForUpdates()

    this.registerKeyboardCommands()
    this.subscribeToEvents()
  }

  registerKeyboardCommands () {
    globalShortcut.register('Ctrl+Shift+I', () => { this.window.openDevTools() })
  }

  subscribeToEvents () {
    autoUpdater.on('update-downloaded', info => { this.window.webContents.send('updateReady') })
    ipcMain.on('quitAndInstall', (event, arg) => { autoUpdater.quitAndInstall() })
  }

  static isSecondInstance () {
    if (Config.getMultipleInstanceSettings()) {
      return false
    } else {
      const quit = app.makeSingleInstance(() => {
        if (this.window) {
          if (this.window.isMinimized()) this.window.restore()
          this.window.focus()
        }
      })

      return quit
    }
  }
}
