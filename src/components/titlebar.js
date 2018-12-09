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

  // render () {
  //   super.render(`
  //     <hidrogen-panel class="window-controls">
  //
  //     <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,5 10,5 10,6 0,6 Z"></path></svg>
  //     <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path></svg>
  //     <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path></svg>
  //
  //       <btn class="btn win-control icon-close btn-window-close"></btn>
  //       <btn class="btn win-control icon-crop_landscape btn-window-maximize"></btn>
  //       <btn class="btn win-control icon-remove btn-window-minimize"></btn>
  //
  //     </hidrogen-panel>
  //   `)
  // }
  // Restore icon: <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"></path></svg>
  render () {
    super.render(`
      <hidrogen-panel class="window-controls">

        <btn class="btn win-control btn-window-close">
          <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z"></path></svg>
        </btn>
        <btn class="btn win-control btn-window-maximize">
          <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path></svg>
        </btn>
        <btn class="btn win-control btn-window-minimize">
          <svg aria-hidden="true" version="1.1" width="10" height="10"><path d="M 0,5 10,5 10,6 0,6 Z"></path></svg>
        </btn>

      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-titlebar', Titlebar)
