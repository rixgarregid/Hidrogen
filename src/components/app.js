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
    this.about = document.createElement('hidrogen-about')
    this.settings = document.createElement('hidrogen-settings')
    this.language = document.createElement('hidrogen-language')
    this.gameEditor = document.createElement('hidrogen-game-editor')

    this.board = document.createElement('hidrogen-board')
    this.board.appendChild(this.home)
    this.board.appendChild(this.library)
    this.board.appendChild(this.about)
    this.board.appendChild(this.settings)
    this.board.appendChild(this.language)
    this.board.appendChild(this.gameEditor)

    this.appendChild(this.titlebar)
    this.appendChild(this.sidebar)
    this.appendChild(this.board)
  }
}

customElements.define('hidrogen-app', App)
