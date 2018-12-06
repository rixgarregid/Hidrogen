const HidrogenComponent = require('./hidrogen-component')
const { app } = require('electron').remote
const os = require('os')

// The {App} class links all the main components that builds
// the Hidrogen UI. Also sends debug information for the renderer
// process which can be accesed in the app's Developer Tools.
class App extends HidrogenComponent {
  constructor () {
    super()
    this.logEnvironmentInfo()
  }

  logEnvironmentInfo () {
    console.log(`Hidrogen version: v${app.getVersion()}`)
    console.log(`Node version: ${process.version}`)
    console.log(`Running on ${this.getSystemInfo()}`)
    console.log(`Exec path: ${process.execPath}`)
  }

  getSystemInfo () {
    let systemOS
    let arch

    switch (process.platform) {
      case 'win32': systemOS = 'Windows'; break
      case 'linux': systemOS = 'Linux'; break
      case 'darwin': systemOS = 'MacOS'; break
    }

    switch (os.arch()) {
      case 'ia32': arch = '32-bit'; break
      case 'arm64': arch = '64-bit'; break
      case 'x32': arch = '32-bit'; break
      case 'x64': arch = '64-bit'; break
    }

    let platformRelease = os.release()

    return `${systemOS} ${platformRelease} ${arch}`
  }

  render () {
    super.render(`
      <hidrogen-titlebar></hidrogen-titlebar>
      <hidrogen-sidebar></hidrogen-sidebar>

      <hidrogen-board>

        <hidrogen-home></hidrogen-home>
        <hidrogen-library></hidrogen-library>
        <hidrogen-game-editor></hidrogen-game-editor>
        <hidrogen-settings></hidrogen-settings>
        <hidrogen-about></hidrogen-about>

      </hidrogen-board>

      <hidrogen-modals></hidrogen-modals>
    `)
  }
}

customElements.define('hidrogen-app', App)
