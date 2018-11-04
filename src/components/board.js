class Board extends HTMLElement {
  constructor () {
    super()
    this.classList.add('board')

    this.views = ['home', 'library', 'about', 'settings', 'language', 'game-editor']
    this.activeView = 'home'

    this.updateView('home')
  }

  updateView (view) {
    for (let v of this.childNodes) {
      if (v.classList.contains('active')) v.classList.remove('active')
    }

    document.querySelector(`hidrogen-${view}`).classList.add('active')

    this.setAttribute('view', view)
  }

  get view () {
    return this.getAttribute('view')
  }

  set view (view) {
    this.updateView(view)
  }
}

customElements.define('hidrogen-board', Board)
