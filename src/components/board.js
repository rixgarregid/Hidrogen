// The {Board} class manages the app's major panel in which
// most of the content is displayed (home, library, etc.).
// It controls which `view` is active at a certain time or
// by a certain action.
class Board extends HTMLElement {
  constructor () {
    super()

    this.views = ['home', 'library', 'game-editor', 'settings', 'about']

    this.updateView('home')
    this.render()
  }

  updateView (view) {
    // In order to get all <hidrogen-board>'s child elements, each of
    // these elements must have the `board-view` css class to be recognized
    // as a child and selected.
    for (let boardView of this.querySelectorAll('.board-view')) {
      if (boardView.classList.contains('active')) boardView.classList.remove('active')
    }

    document.querySelector(`hidrogen-${view}`).classList.add('active')

    this.setAttribute('view', view)
  }

  getActiveView () {
    return this.getAttribute('view')
  }

  render () {
    this.classList.add('board')
  }
}

customElements.define('hidrogen-board', Board)
