class Settings extends HTMLElement {
  constructor () {
    super()
    this.classList.add('settings')
    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.btnClose.addEventListener('click', () => {
      this.classList.remove('active')
      document.querySelector('hidrogen-board').updateView('home')
      document.querySelector('hidrogen-sidebar').updateSelectedListItem('home')
    })
  }

  render () {
    this.btnClose = document.createElement('btn')
    this.btnClose.classList.add('btn')
    this.btnClose.classList.add('icon')
    this.btnClose.classList.add('icon-close')

    this.appendChild(this.btnClose)
  }
}

customElements.define('hidrogen-settings', Settings)
