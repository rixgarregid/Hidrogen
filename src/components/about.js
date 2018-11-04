class About extends HTMLElement {
  constructor () {
    super()
    this.classList.add('about')
    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.querySelector('.icon-close').addEventListener('click', () => {
      this.classList.remove('active')
      document.querySelector('hidrogen-board').updateView('home')
      document.querySelector('hidrogen-sidebar').updateSelectedListItem('home')
    })
  }

  render () {
    this.innerHTML = `
      <btn class="btn icon icon-close"></btn>
    `
  }
}

customElements.define('hidrogen-about', About)
