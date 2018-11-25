// The {Library} class displays all the games added by the
// user and controls how they are shown.
class Library extends HTMLElement {
  constructor () {
    super()
    
    this.render()
  }

  add (gameData) {
    this.querySelector('.game-container').innerHTML += `
      <hidrogen-game-card game-id=${gameData.id} game-title='${gameData.name}'></hidrogen-game-card>
    `

    let addedGame = this.querySelector(`.game-container hidrogen-game-card[game-id='${gameData.id}']`)
    if (gameData.thumbnailPath === '') {
      addedGame.classList.add('no-bg')
    }
  }

  remove (gameId) {
    let removedGame = this.querySelector(`.game-container hidrogen-game-card[game-id='${gameId}']`)
    this.querySelector('.game-container').removeChild(removedGame)
  }

  render () {
    this.classList.add('library')
    this.classList.add('board-view')

    this.innerHTML = `
      <hidrogen-panel class="game-container"></hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-library', Library)
