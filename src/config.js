const path = require('path')
const fs = require('fs')

// The {Config} class can be instaciated in both main and renderer
// processes to access and change Hidrogen's settings. This class is
// also responsible for creating default configurations and managing
// the `config.json` file.
module.exports =
class Config {
  constructor () {
    this.configFile = path.join(__dirname, '..', 'config.json')

    this.defaults = {
      core: {
        autorun: false,
        autolang: true,
        lang: 'en',
        multiInstance: false
      },
      library: {
        autoclose: false,
        closingCountdown: false,
        showGameCounter: true,
        favouritesLibrary: true
      },
      sidebar: {
        userPanelMode: 'bigPicture'
      },
      home: {
        disableBackgroundVideo: false
      }
    }

    this.checkConfigFile()
  }

  getCurrentSettings () {
    return this.currentConfig
  }

  set (keyPath, value) {
    this.currentConfig[keyPath] = value
    fs.writeFileSync(this.configFile, JSON.stringify(this.currentConfig, null, 2))
  }

  get (keyPath) {
    return this.currentConfig[keyPath]
  }

  checkConfigFile () {
    if (!fs.existsSync(this.configFile)) {
      this.createConfigFile()
    } else {
      this.currentConfig = JSON.parse(fs.readFileSync(this.configFile))
    }
  }

  createConfigFile () {
    fs.closeSync(fs.openSync(this.configFile, 'w'))
    fs.writeFileSync(this.configFile, JSON.stringify(this.loadDefaults(), null, 2))
    this.currentConfig = JSON.parse(fs.readFileSync(this.configFile))
  }

  loadDefaults () {
    return this.defaults
  }

  restoreDefaults () {
    fs.writeFileSync(this.configFile, JSON.stringify(this.loadDefaults(), null, 2))
    this.currentConfig = JSON.parse(fs.readFileSync(this.configFile))
  }

  static getMultipleInstanceSettings () {
    if (fs.existsSync(this.configFile)) {
      let config = JSON.parse(fs.readFileSync(this.configFile))
      return config.multiInstance
    } else {
      console.log('Config: Multiple instance disabled by default.')
    }
  }
}
