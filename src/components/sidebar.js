class Sidebar extends HTMLElement {
  constructor () {
    super()
    this.classList.add('sidebar')
    this.render()
    this.attachEvents()
  }

  updateSelectedListItem (item) {
    for (let i of this.itemList.childNodes) {
      if (i.classList.contains('settings')) i.classList.remove('active')
      i.classList.remove('selected')
    }

    document.querySelector(`.item-${item}`).classList.add('selected')
  }

  attachEvents () {
    this.home.addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('home')
      this.updateSelectedListItem('home')
    })

    this.library.addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('library')
      this.updateSelectedListItem('library')
    })

    this.settings.addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('settings')
      this.updateSelectedListItem('settings')
    })
  }

  render () {
    this.logoItem = document.createElement('span')
    this.logoItem.classList.add('icon-hidrogen')
    this.logo = document.createElement('li')
    this.logo.classList.add('list-item')
    this.logo.appendChild(this.logoItem)

    this.homeItem = document.createElement('span')
    this.homeItem.classList.add('icon')
    this.homeItem.classList.add('icon-home')
    this.homeLabel = document.createElement('span')
    this.homeLabel.classList.add('text')
    this.homeLabel.innerText = 'Inicio'
    this.home = document.createElement('li')
    this.home.classList.add('list-item')
    this.home.classList.add('selected')
    this.home.classList.add('item-home')
    this.home.appendChild(this.homeItem)
    this.home.appendChild(this.homeLabel)

    this.libraryItem = document.createElement('span')
    this.libraryItem.classList.add('icon')
    this.libraryItem.classList.add('icon-desktop_windows')
    this.libraryLabel = document.createElement('span')
    this.libraryLabel.classList.add('text')
    this.libraryLabel.innerText = 'Mi biblioteca'
    this.library = document.createElement('li')
    this.library.classList.add('list-item')
    this.library.classList.add('item-library')
    this.library.appendChild(this.libraryItem)
    this.library.appendChild(this.libraryLabel)

    this.aboutItem = document.createElement('span')
    this.aboutItem.classList.add('icon')
    this.aboutItem.classList.add('icon-school')
    this.aboutLabel = document.createElement('span')
    this.aboutLabel.classList.add('text')
    this.aboutLabel.innerText = 'Acerca de'
    this.about = document.createElement('li')
    this.about.classList.add('list-item')
    this.about.classList.add('item-about')
    this.about.appendChild(this.aboutItem)
    this.about.appendChild(this.aboutLabel)

    this.settingsItem = document.createElement('span')
    this.settingsItem.classList.add('icon')
    this.settingsItem.classList.add('icon-settings')
    this.settingsLabel = document.createElement('span')
    this.settingsLabel.classList.add('text')
    this.settingsLabel.innerText = 'Ajustes'
    this.settings = document.createElement('li')
    this.settings.classList.add('list-item')
    this.settings.classList.add('item-settings')
    this.settings.appendChild(this.settingsItem)
    this.settings.appendChild(this.settingsLabel)

    this.langItem = document.createElement('span')
    this.langItem.classList.add('icon')
    this.langItem.classList.add('icon-public')
    this.langLabel = document.createElement('span')
    this.langLabel.classList.add('text')
    this.langLabel.innerText = 'Español'
    this.language = document.createElement('li')
    this.language.classList.add('list-item')
    this.language.classList.add('item-language')
    this.language.appendChild(this.langItem)
    this.language.appendChild(this.langLabel)

    this.itemList = document.createElement('ul')
    this.itemList.classList.add('list')
    this.itemList.appendChild(this.logo)
    this.itemList.appendChild(this.home)
    this.itemList.appendChild(this.library)
    this.itemList.appendChild(this.about)
    this.itemList.appendChild(this.settings)
    this.itemList.appendChild(this.language)

    this.appendChild(this.itemList)
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
