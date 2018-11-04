class GameEditor extends HTMLElement {
  constructor () {
    super()
    this.classList.add('game-editor')
    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.querySelector('.btn-done').addEventListener('click', () => this.classList.remove('active'))
  }

  render () {
    this.innerHTML = `
      <btn class="btn btn-done">Guardar cambios</btn>
    `
  }
}

customElements.define('hidrogen-game-editor', GameEditor)
