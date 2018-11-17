const { app } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

// {About} component. Info about the app is displayed
// here.
class About extends HTMLElement {
  constructor () {
    super()

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.render()
    this.attachEvents()
  }

  attachEvents () {

    const closeAbout = () => {
      this.classList.remove('active')
      this.hidrogenBoard.updateView('library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    this.querySelector('.back-btn').addEventListener('click', closeAbout)
  }

  render () {
    this.classList.add('about')
    this.classList.add('board-view')

    this.innerHTML = `
      <text class="text version-text"> Hidrogen v.${app.getVersion()} </text>
      <text class="text copyright-disclaimer"> Copyright 2018. Ionix. </text>
      <btn class="btn back-btn"> ${i18n.translate('Back')} </btn>
    `
  }
}

customElements.define('hidrogen-about', About)
