const { remote } = require('electron')
const { app } = remote

class Titlebar extends HTMLElement {
  constructor () {
    super()
    this.win = remote.getCurrentWindow()

    this.render()
    this.attachEvents()
  }

  attachEvents () {
    const quitHidrogen = () => {
      app.quit()
    }

    const toggleMaximizeHidrogen = () => {
      if (this.win.isMaximized()) {
        this.win.restore()
      } else {
        this.win.maximize()
      }
    }

    const minimizeHidrogen = () => {
      this.win.minimize()
    }

    this.querySelector('.btn-window-close').addEventListener('click', quitHidrogen)

    this.querySelector('.btn-window-maximize').addEventListener('click', toggleMaximizeHidrogen)

    this.querySelector('.btn-window-minimize').addEventListener('click', minimizeHidrogen)
  }

  render () {
    this.classList.add('titlebar')

    this.innerHTML = `
      <hidrogen-panel class="window-controls">
        <btn class="btn win-control icon-close btn-window-close"></btn>
        <btn class="btn win-control icon-crop_landscape btn-window-maximize"></btn>
        <btn class="btn win-control icon-remove btn-window-minimize"></btn>
      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-titlebar', Titlebar)
