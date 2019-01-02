const HidrogenComponent = require('./hidrogen-component')
const { app } = require('electron').remote
const { shell } = require('electron')
const I18n = require('../translator')
const i18n = new I18n()

// {About} component. Info about the app is displayed
// here.
class About extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'about']
    this.subscribeToDOMEvents()
  }

  close () {
    this.classList.remove('active')
    this.hidrogen.setView('library')
  }

  subscribeToDOMEvents () {
    this.child('.hidrogen-logo').addEventListener('click', () => { shell.openExternal('https://github.com/rixgarregid/Hidrogen') })
    this.child('.issues-web-link').addEventListener('click', () => { shell.openExternal('https://github.com/rixgarregid/Hidrogen/issues') })
    this.child('.back-btn').onDidClick(() => { this.close() })
  }

  render () {
    super.render(`
      <span class="hidrogen-logo link"> Hidrogen </span>
      <span class="text version-text"> v.${app.getVersion()} </span>
      <span class="text link issues-web-link"> ¿Has encontrado un fallo? ¡Puedes reportarlo aquí! </span>
      <span class="text emails"> ¿Echas en falta algo? ¿Alguna idea para mejorar Hidrogen? ¡Escríbenos! <br>
        rix.frost@outlook.com <br> miguel_ff@hotmail.es
      </span>

      <hidrogen-btn text="${i18n.translate('Back')}" class="back-btn"></hidrogen-btn>
    `)
  }
}

customElements.define('hidrogen-about', About)
