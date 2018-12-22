const HidrogenComponent = require('./hidrogen-component')
const I18n = require('../translator')
const i18n = new I18n()

// The {Sidebar} class manages all the events in the sidebar
// component.
class Sidebar extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['sidebar']
    this.items = this.children('.list-item')
    this.attachEvents()
  }

  updateSelectedListItem (item) {
    for (let listItem of this.items) {
      if (listItem.classList.contains('settings')) listItem.classList.remove('active')
      listItem.classList.remove('selected')
    }

    document.querySelector(`.item-${item}`).classList.add('selected')
  }

  attachEvents () {

    const showHome = () => {
      document.querySelector('hidrogen-board').updateView('home')
      this.updateSelectedListItem('home')
    }

    const showLibrary = () => {
      document.querySelector('hidrogen-board').updateView('library')
      this.updateSelectedListItem('library')
    }

    const showGameEditor = () => {
      document.querySelector('hidrogen-board').updateView('game-editor')
      this.updateSelectedListItem('game-editor')
    }

    const showSettings = () => {
      document.querySelector('hidrogen-board').updateView('settings')
      this.updateSelectedListItem('settings')
    }

    const showAbout = () => {
      document.querySelector('hidrogen-board').updateView('about')
      this.updateSelectedListItem('about')
    }

    this.child('.item-home').addEventListener('click', showHome)

    this.child('.item-library').addEventListener('click', showLibrary)

    this.child('.item-game-editor').addEventListener('click', showGameEditor)

    this.child('.item-settings').addEventListener('click', showSettings)

    this.child('.item-about').addEventListener('click', showAbout)
  }

  render () {
    // <li class="list-item"> <span class="icon-hidrogen"></span> </li>
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
    `)
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
