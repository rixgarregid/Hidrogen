const { remote } = require('electron')
const { app } = remote
const { EventEmitter } = require('events')
const path = require('path')
const fs = require('fs')

// The {WindowController} class does all window-related stuff.
// This includes managing window state. For example, helps laoding
// UI profiles to be used when Hidrogen is maximized or in default
// state.
//
// An instance of this class is available via `hidrogen.window`.
module.exports =
class WindowController extends EventEmitter {
  constructor () {
    super()
    this.hidrogen = document.querySelector('hidrogen-app')
    // The different values can be `default`, `maximized`
    this.state = {
      focus: false,
      maximized: false
    }

    this.windowPosition = {
      x: 1920/4,
      y: 1080/4
    }

    this.bounds = {
      w: 1570,
      h: 870
    }
  }

  getWindow () {
    return remote.getCurrentWindow()
  }

  minimize () {
    this.getWindow().minimize()
  }

  isMaximized () {
    return this.state.maximized
  }

  maximize () {
    this.state.maximized = true
    this.hidrogen.classList.add('maximized')
    this.getWindow().setPosition(0, 0, true)
    // document.querySelector('body').classList.add('fullscreen')
  }

  unmaximize () {
    this.state.maximized = false
    this.hidrogen.classList.remove('maximized')
    document.querySelector('body').classList.remove('fullscreen')
  }

  toggle () {
    if (this.isMaximized()) {
      this.unmaximize()
    } else {
      this.maximize()
    }
  }

  close () {
    app.quit()
  }

  setPosition () {

  }

  setBounds () {

  }

  saveState () {

  }

  loadState () {

  }

  subscribeToDOMEvents () {
    this.hidrogen.titlebar.onDidDoubleClick(() => { this.toggle() })

    this.hidrogen.titlebar.onDidDrag(() => {
      if (this.state.maximized) {
        this.restore()
      } else {
        return
      }
    })
  }
}
