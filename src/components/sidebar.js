const HidrogenComponent = require('./hidrogen-component')
const { ipcRenderer } = require('electron')
const I18n = require('../translator')
const i18n = new I18n()

// The {Sidebar} class manages all the events in the sidebar
// component.
class Sidebar extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['sidebar']
    this.items = this.children('.list-item')
    this.subscribeToDOMEvents()
  }

  updateSelectedItem (item) {
    for (let listItem of this.items) {
      if (listItem.classList.contains('settings')) listItem.classList.remove('active')
      listItem.classList.remove('selected')
    }

    document.querySelector(`.item-${item}`).classList.add('selected')
  }

  subscribeToDOMEvents () {
    this.child('.item-home').addEventListener('click', () => { this.hidrogen.setView('home') })
    this.child('.item-library').addEventListener('click', () => { this.hidrogen.setView('library') })
    this.child('.item-game-editor').addEventListener('click', () => { this.hidrogen.setView('game-editor') })
    this.child('.item-settings').addEventListener('click', () => { this.hidrogen.setView('settings') })
    this.child('.item-about').addEventListener('click', () => { this.hidrogen.setView('about') })

    this.child('.update-ready-btn').onDidClick(() => { ipcRenderer.send('quitAndInstall') })
    ipcRenderer.on('updateReady', (event, text) => { this.child('.update-ready-btn').classList.add('active') })
  }

  render () {
    super.render(`
      <hidrogen-list class="sidebar-list">

        <li class="list-item item-home selected">
          <icon class="icon-home"></icon>
          <span> ${i18n.translate('Home')} </span>
        </li>

        <li class="list-item item-library">
          <icon class="icon-dashboard"></icon>
          <span> ${i18n.translate('My library')} </span>
        </li>

        <li class="list-item item-game-editor">
          <icon class="icon-add"></icon>
          <span> ${i18n.translate('Add games')} </span>
        </li>

        <li class="list-item item-settings">
          <icon class="icon-settings"></icon>
          <span> ${i18n.translate('Settings and customization')} </span>
        </li>

        <li class="list-item item-about">
          <icon class="icon-school"></icon>
          <span> ${i18n.translate('About')} </span>
        </li>

      </hidrogen-list>

      <hidrogen-btn custom-content class="update-ready-btn">
        <icon class="update-icon icon-get_app"></icon>
        <span class="update-ready-label"> ¡Actualización disponible! </span>
      </hidrogen-btn>
    `)
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
