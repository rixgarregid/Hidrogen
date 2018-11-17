const I18n = require('../translator')
const i18n = new I18n()

class Sidebar extends HTMLElement {
  constructor () {
    super()

    this.render()
    this.attachEvents()
  }

  updateSelectedListItem (item) {
    for (let i of this.querySelectorAll('.list-item')) {
      if (i.classList.contains('settings')) i.classList.remove('active')
      i.classList.remove('selected')
    }

    document.querySelector(`.item-${item}`).classList.add('selected')
  }

  attachEvents () {
    this.querySelector('.item-home').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('home')
      this.updateSelectedListItem('home')
    })

    this.querySelector('.item-library').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('library')
      this.updateSelectedListItem('library')
    })

    this.querySelector('.item-game-editor').addEventListener('click', () => {
      document.querySelector('hidrogen-game-editor').classList.add('active')
      this.updateSelectedListItem('game-editor')
    })

    this.querySelector('.item-about').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('about')
      this.updateSelectedListItem('about')
    })

    this.querySelector('.item-settings').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('settings')
      this.updateSelectedListItem('settings')
    })
  }

  render () {
    this.classList.add('sidebar')

    this.innerHTML = `
      <ul class="list sidebar-list">
        <li class="list-item"><span class="icon-hidrogen"></span></li>

        <li class="list-item item-home selected">
          <span class="icon icon-home"></span>
          <text class="text"> ${i18n.translate('Home')} </text>
        </li>

        <li class="list-item item-library">
          <span class="icon icon-local_library"></span>
          <text class="text"> ${i18n.translate('My library')} </text>
        </li>

        <li class="list-item item-game-editor">
          <span class="icon icon-mode_edit"></span>
          <text class="text"> ${i18n.translate('Game editor')} </text>
        </li>

        <li class="list-item item-settings">
          <span class="icon icon-settings"></span>
          <text class="text"> ${i18n.translate('Settings and customization')} </text>
        </li>

        <li class="list-item item-about">
          <span class="icon icon-school"></span>
          <text class="text"> ${i18n.translate('About')} </text>
        </li>
      </ul>
    `
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
