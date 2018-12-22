const HidrogenComponent = require('../hidrogen-component')

class List extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.listItems = this.innerHTML
    this.listTitle = this.listTitle
    this.classNames = ['h-list']

    this.render()
    this.attachEvents()
  }

  getListItems () {
    return this.children('.list-item')
  }

  get listTitle () {
    console.log(this.getAttribute('list-title'))
    if (this.getAttribute('list-title') !== null) {
      return this.getAttribute('list-title')
    } else {
      this.listTitle = ''
      this.classList.add('no-title')
    }
  }

  set listTitle (title) {

  }

  get behaviour () {
    if (this.getAttribute('behaviour') === undefined) {
      this.behaviour = 'list'
      return this.behaviour
    } else {
      return this.getAttribute('behaviour')
    }
  }

  attachEvents () {
    for (let item of this.getListItems()) {
      item.addEventListener('click', () => {
        for (let item of this.getListItems()) {
          if (item.classList.contains('selected')) item.classList.remove('selected')
        }

        item.classList.add('selected')
      })
    }
  }

  render () {
    super.render(`
      <span class="list-title"> ${this.listTitle} </span>
      <ul class="list-container">
        ${this.listItems}
      </ul>
    `)
  }
}

customElements.define('hidrogen-list', List)
