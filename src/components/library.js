class Library extends HTMLElement {
  constructor () {
    super()
    this.classList.add('library')
    this.render()
  }

  render () {
    this.gameTitle = document.createElement('text')
    this.gameTitle.classList.add('text')
    this.gameTitle.classList.add('title')
    this.gameTitle.innerText = 'Some cool game'

    this.playBtn = document.createElement('btn')
    this.playBtn.classList.add('btn')
    this.playBtn.classList.add('play-btn')
    this.playBtn.innerText = 'Jugar'

    this.background = document.createElement('span')
    this.background.classList.add('background')

    this.gameCard = document.createElement('game-card')
    this.gameCard.classList.add('game-card')
    this.gameCard.appendChild(this.gameTitle)
    this.gameCard.appendChild(this.playBtn)
    this.gameCard.appendChild(this.background)

    this.gameContainer = document.createElement('hidrogen-panel')
    this.gameContainer.classList.add('game-container')
    this.gameContainer.appendChild(this.gameCard)

    this.appendChild(this.gameContainer)
  }
}

customElements.define('hidrogen-library', Library)
