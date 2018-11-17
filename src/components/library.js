// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HTMLElement {
  constructor () {
    super()

    this.render()
  }

  add (game) {
    this.querySelector('.game-container').appendChild(game)
  }

  render () {
    this.classList.add('library')
    this.classList.add('board-view')

    this.innerHTML = `
      <hidrogen-panel class="game-container">

        <hidrogen-game-card class="wow-card"></hidrogen-game-card> <!-- Just an example -->

      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-library', Library)
