const HidrogenWindow = require('./hidrogen-window')
const Config = require('../config')
const chalk = require('chalk')
const { EventEmitter } = require('events')
const { autoUpdater } = require('electron-updater')
const { app, globalShortcut, ipcMain, BrowserWindow } = require('electron')

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

    // Overlay window setup
    // https://github.com/electron/electron/issues/10078
    this.overlayWindow = new BrowserWindow({ width: 400, height: 1900, show: false, alwaysOnTop: true })
    // app.dock.hide()
    this.overlayWindow.setAlwaysOnTop(true, 'floating')
    this.overlayWindow.setVisibleOnAllWorkspaces(true)
    this.overlayWindow.setFullScreenable(false)

    this.checkForUpdates()

    this.registerKeyboardCommands()
    this.subscribeToEvents()
  }

  checkForUpdates () {
    autoUpdater.checkForUpdates()
  }

  registerKeyboardCommands () {
    globalShortcut.register('Ctrl+Shift+I', () => { this.window.openDevTools() })
    globalShortcut.register('Ctrl+O', () => { this.overlayWindow.show() })
  }

  subscribeToEvents () {
    autoUpdater.on('update-downloaded', info => { this.window.webContents.send('autoupdater:update-ready') })
    ipcMain.on('autoupdater:check-for-updates', () => { this.checkForUpdates() })
    ipcMain.on('autoupdater:quit-and-install', (event, arg) => { autoUpdater.quitAndInstall() })
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
