const { BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// The {HidrogenWindow} class manages Hidrogen's window, its
// events and states throught a electron's {BrowserWindow}
// instance.
module.exports =
class HidrogenWindow {
  constructor (options) {
    this.dev = options.dev

    this.preferences = {
      width: 1600,
      height: 900,
      show: false,
      frame: false,
      transparent: true,
      maximizable: false,
      resizable: false
    }

    this.iconPath = path.resolve('./resources/images/icon-hidrogen.png')
    // An icon is only necessary for Linux, as Windows and MacOS takes
    // the window's icon from the app's executable.
    if (process.platform === 'linux') this.preferences.icon = this.iconPath

    this.browserWindow = new BrowserWindow(this.preferences)

    this.browserWindow.loadURL(url.format({
      protocol: 'file',
      pathname: path.join(__dirname, '..', '..', 'static', 'index.html'),
      slashes: true
    }))

    this.browserWindow.webContents.openDevTools()

    this.browserWindow.on('ready-to-show', () => this.browserWindow.show())
  }

  close () {
    this.browserWindow.close()
  }

  focus () {
    this.browserWindow.focus()
  }

  show () {
    this.browserWindow.show()
  }

  hide () {
    this.browserWindow.hide()
  }

  isVisible () {
    this.browserWindow.isVisible()
  }

  minimize () {
    this.browserWindow.minimize()
  }

  isMinimized () {
    this.browserWindow.isMinimized()
  }

  restore () {
    this.browserWindow.restore()
  }
}
