class Sidebar extends HTMLElement {
  constructor () {
    super()
    this.classList.add('sidebar')
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

    this.querySelector('.item-about').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('about')
      this.updateSelectedListItem('about')
    })

    this.querySelector('.item-settings').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('settings')
      this.updateSelectedListItem('settings')
    })

    this.querySelector('.item-language').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('language')
      this.updateSelectedListItem('language')
    })
  }

  render () {
    this.innerHTML = `
      <ul class="list sidebar-list">
        <li class="list-item"><span class="icon-hidrogen"></span></li>

        <li class="list-item item-home selected">
          <span class="icon icon-home"></span>
          <text class="text">Inicio</text>
        </li>

        <li class="list-item item-library">
          <span class="icon icon-desktop_windows"></span>
          <text class="text">Mi biblioteca</text>
        </li>

        <li class="list-item item-about">
          <span class="icon icon-school"></span>
          <text class="text">Acerca de</text>
        </li>

        <li class="list-item item-settings">
          <span class="icon icon-settings"></span>
          <text class="text">Ajustes</text>
        </li>

        <li class="list-item item-language">
          <span class="icon icon-public"></span>
          <text class="text">Español</text>
        </li>
      </ul>
    `
  }
}

customElements.define('hidrogen-sidebar', Sidebar)
