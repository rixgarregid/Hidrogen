const HidrogenComponent = require('./hidrogen-component')

// The {Board} class manages the app's major panel in which
// most of the content is displayed (home, library, etc.).
// It controls which `view` is active at a certain time or
// by a certain action.
class Board extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board']

    this.views = ['home', 'library', 'game-editor', 'settings', 'about']
    this.updateView('home')
  }

  get activeView () {
    return this.getAttribute('active-view')
  }

  set activeView (view) {
    this.setAttribute('active-view', view)
  }

  getView (view) {
    return this.child(`hidrogen-${view}`)
  }

  getAllViews () {
    return this.children('.board-view')
  }

  updateView (view) {
    // In order to get all <hidrogen-board>'s child elements, each of
    // these elements must have the `board-view` css class to be recognized
    // as a child and selected.
    for (let boardView of this.getAllViews()) {
      if (boardView.classList.contains('active')) boardView.classList.remove('active')

      // If the active view isn't home we're pausing the background video
      // to save computer's resources.
      if (view === 'home') {
        this.getView('home').playBackgroundVideo()
      } else {
        this.getView('home').pauseBackgroundVideo()
      }
    }

    this.getView(view).classList.add('active')
    this.activeView = view
  }
}

customElements.define('hidrogen-board', Board)
