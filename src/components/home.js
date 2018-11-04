class Home extends HTMLElement {
  constructor () {
    super()
    this.classList.add('home-screen')
    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.querySelector('.library-btn').addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('library')
      document.querySelector('hidrogen-board').setAttribute('view', 'library')
      document.querySelector('hidrogen-sidebar').updateSelectedListItem('library')
    })

    this.querySelector('.add-btn').addEventListener('click', () => {
      document.querySelector('hidrogen-game-editor').classList.add('active')
    })
  }

  render () {
    this.innerHTML = `
      <text class="text main-title">Bienvenido a Hidrogen,</text>
      <text class="text sub-title">tu biblioteca de juegos</text>
      <hidrogen-panel class="home-btns">
        <btn class="btn library-btn">Ir a mi biblioteca</btn>
        <btn class="btn btn-sec add-btn">Añadir juegos</btn>
      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-home', Home)
