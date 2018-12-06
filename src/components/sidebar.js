const HidrogenComponent = require('./hidrogen-component')
const I18n = require('../translator')
const i18n = new I18n()

// The {Sidebar} class manages all the events in the sidebar
// component.
class Sidebar extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['sidebar']

    this.attachEvents()
  }

  getListItems () {
    return this.children('.list-item')
  }

  updateSelectedListItem (item) {
    for (let listItem of this.getListItems()) {
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
    super.render(`
      <ul class="list sidebar-list">
        <li class="list-item"> <span class="icon-hidrogen"></span> </li>

        <li class="list-item item-home selected">
          <span class="icon icon-home"></span>
          <text class="text"> ${i18n.translate('Home')} </text>
        </li>

        <li class="list-item item-library">
          <span class="icon icon-local_library"></span>
          <text class="text"> ${i18n.translate('My library')} </text>
        </li>

        <li class="list-item item-game-editor">
          <span class="icon icon-add"></span>
          <text class="text"> ${i18n.translate('Add games')} </text>
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
    `)
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
