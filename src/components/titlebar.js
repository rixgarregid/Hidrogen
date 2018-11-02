const { remote } = require('electron')
const { app } = remote

class Titlebar extends HTMLElement {
  constructor () {
    super()
    this.classList.add('titlebar')

    this.win = remote.getCurrentWindow()

    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.btnClose.addEventListener('click', () => app.quit())

    this.btnMaximize.addEventListener('click', () => {
      if (this.win.isMaximized()) {
        this.win.restore()
      } else {
        this.win.maximize()
      }
    })

    this.btnMinimize.addEventListener('click', () => this.win.minimize())
  }

  render () {
    this.btnClose = document.createElement('btn')
    this.btnClose.classList.add('btn')
    this.btnClose.classList.add('win-control')
    this.btnClose.classList.add('icon-close')

    this.btnMaximize = document.createElement('btn')
    this.btnMaximize.classList.add('btn')
    this.btnMaximize.classList.add('win-control')
    this.btnMaximize.classList.add('icon-crop_landscape')

    this.btnMinimize = document.createElement('btn')
    this.btnMinimize.classList.add('btn')
    this.btnMinimize.classList.add('win-control')
    this.btnMinimize.classList.add('icon-remove')

    this.winControlsContainer = document.createElement('hidrogen-panel')
    this.winControlsContainer.classList.add('window-controls')
    this.winControlsContainer.appendChild(this.btnClose)
    this.winControlsContainer.appendChild(this.btnMaximize)
    this.winControlsContainer.appendChild(this.btnMinimize)

    this.appendChild(this.winControlsContainer)
  }
}

customElements.define('hidrogen-titlebar', Titlebar)
