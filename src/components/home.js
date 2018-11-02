class Home extends HTMLElement {
  constructor () {
    super()
    this.classList.add('home-screen')
    this.render()
    this.attachEvents()
  }

  attachEvents () {
    this.libraryBtn.addEventListener('click', () => {
      document.querySelector('hidrogen-board').updateView('library')
      document.querySelector('hidrogen-board').setAttribute('view', 'library')
      document.querySelector('hidrogen-sidebar').updateSelectedListItem('library')
    })
  }

  render () {
    this.mainTitle = document.createElement('text')
    this.mainTitle.classList.add('text')
    this.mainTitle.classList.add('main-title')
    this.mainTitle.innerText = 'Bienvenido a Hidrogen,'

    this.subTitle = document.createElement('text')
    this.subTitle.classList.add('text')
    this.subTitle.classList.add('sub-title')
    this.subTitle.innerText = 'tu biblioteca de juegos'

    this.libraryBtn = document.createElement('btn')
    this.libraryBtn.classList.add('btn')
    this.libraryBtn.classList.add('library-btn')
    this.libraryBtn.innerText = 'Ir a mi biblioteca'

    this.addBtn = document.createElement('btn')
    this.addBtn.classList.add('btn')
    this.addBtn.classList.add('btn-sec')
    this.addBtn.classList.add('add-btn')
    this.addBtn.innerText = 'Añadir juegos'

    this.homeBtns = document.createElement('hidrogen-container')
    this.homeBtns.classList.add('home-btns')
    this.homeBtns.appendChild(this.libraryBtn)
    this.homeBtns.appendChild(this.addBtn)

    this.appendChild(this.mainTitle)
    this.appendChild(this.subTitle)
    this.appendChild(this.homeBtns)
  }
}

customElements.define('hidrogen-home', Home)
