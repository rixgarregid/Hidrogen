const Config = require('./config')
const electron = require('electron')
const path = require('path')
const fs = require('fs')

// The I18n class manages language settings and all the app's
// content translation.
//
// I18n class will check if `automatic language detection` is
// enabled and then select the right language (the one from the
// user's machine or the one chosen by the user). Each language
// has its own .json file in the `lang` folder in the root directory.
// In case of the .json file corresponding to the selected language
// isn't available, English will be used as default language.
module.exports =
class I18n {
  constructor () {
    // Enable instancing {app} from electron from both the main and
    // renderer process.
    this.app = electron.app ? electron.app : electron.remote.app
    this.config = new Config()

    this.loadLanguage()
  }

  loadLanguage () {
    if (this.config.get('autolang')) {
      this.language = this.app.getLocale()
    } else {
      this.language = this.config.get('lang')
    }

    this.langResourcePath = path.resolve(`lang/${this.language}.json`)

    if (fs.existsSync(this.langResourcePath)) {
      this.loadedLanguage = JSON.parse(fs.readFileSync(this.langResourcePath))
    } else {
      this.loadedLanguage = JSON.parse(fs.readFileSync(path.resolve(`lang/en.json`)))
    }
  }

  translate (phrase) {
    let translation = this.loadedLanguage[phrase]
    if (translation === 'undefined') translation = phrase
    return translation
  }
}
