class App extends HTMLElement {
  constructor () {
    super()
    this.render()
  }

  render () {
    this.titlebar = document.createElement('hidrogen-titlebar')
    this.sidebar = document.createElement('hidrogen-sidebar')

    this.home = document.createElement('hidrogen-home')
    this.library = document.createElement('hidrogen-library')
    this.settings = document.createElement('hidrogen-settings')

    this.board = document.createElement('hidrogen-board')
    this.board.appendChild(this.home)
    this.board.appendChild(this.library)
    this.board.appendChild(this.settings)

    this.appendChild(this.titlebar)
    this.appendChild(this.sidebar)
    this.appendChild(this.board)
  }
}

customElements.define('hidrogen-app', App)
