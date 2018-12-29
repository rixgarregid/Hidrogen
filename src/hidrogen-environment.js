const Config = require('./config')

global.hidrogen = new HidrogenEnvironment()

class HidrogenEnvironment {
  constructor () {
    this.app = document.querySelector('hidrogen-app')
    this.sidebar = this.app.getComponent('sidebar')
    this.board = this.app.getComponent('board')
    this.library = this.app.getComponent('library')
    this.settings = this.app.getComponent('settings')
    this.notifications = this.app.getComponent('notifications')
    this.modals = this.app.getComponent('modals')
    this.config = new Config()
  }

  logEnvironmentInfo () {
    console.log(`Hidrogen version: v${app.getVersion()}`)
    console.log(`Node version: ${process.version}`)
    console.log(`Running on ${this.app.getSystemInfo()}`)
    console.log(`Exec path: ${process.execPath}`)
  }
}
