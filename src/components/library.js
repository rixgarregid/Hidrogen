class Library extends HTMLElement {
  constructor () {
    super()
    this.classList.add('library')
    this.render()
  }

  render () {
    this.innerHTML = `
      <hidrogen-panel class="game-container">

        <hidrogen-game-card class="game-card">
          <text class="text title">Some cool game</text>
          <btn class="btn play-btn">Jugar</btn>
          <hidrogen-panel class="background"></hidrogen-panel>
        </hidrogen-game-card>

      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-library', Library)
