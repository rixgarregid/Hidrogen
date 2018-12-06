const HidrogenComponent = require('./hidrogen-component')
const { app } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

// {About} component. Info about the app is displayed
// here.
class About extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'about']

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.attachEvents()
  }

  attachEvents () {

    const closeAbout = () => {
      this.classList.remove('active')
      this.hidrogenBoard.updateView('library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    this.child('.back-btn').addEventListener('click', closeAbout)
  }

  render () {
    super.render(`
      <span class="hidrogen-logo"></span>
      <text class="text version-text"> v.${app.getVersion()} </text>
      <btn class="btn back-btn"> ${i18n.translate('Back')} </btn>
    `)
  }
}

customElements.define('hidrogen-about', About)
