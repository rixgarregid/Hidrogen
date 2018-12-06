const HidrogenComponent = require('./hidrogen-component')
const { remote } = require('electron')
const { app } = remote

// The {Titlebar} class represents the upper element of the
// UI and is responsible for the app's window functionality
// like moving or closing the window.
class Titlebar extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['titlebar']
    this.hidrogenWindow = remote.getCurrentWindow()

    this.attachEvents()
  }

  attachEvents () {
    const quitHidrogen = () => {
      app.quit()
    }

    const toggleMaximizeHidrogen = () => {
      if (this.hidrogenWindow.isMaximized()) {
        this.hidrogenWindow.restore()
      } else {
        this.hidrogenWindow.maximize()
      }
    }

    const minimizeHidrogen = () => {
      this.hidrogenWindow.minimize()
    }

    this.child('.btn-window-close').addEventListener('click', quitHidrogen)

    this.child('.btn-window-maximize').addEventListener('click', toggleMaximizeHidrogen)

    this.child('.btn-window-minimize').addEventListener('click', minimizeHidrogen)
  }

  render () {
    super.render(`
      <hidrogen-panel class="window-controls">

        <btn class="btn win-control icon-close btn-window-close"></btn>
        <btn class="btn win-control icon-crop_landscape btn-window-maximize"></btn>
        <btn class="btn win-control icon-remove btn-window-minimize"></btn>

      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-titlebar', Titlebar)
