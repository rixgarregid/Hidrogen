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

  getItems () {
    return this.children('.list-item')
  }

  getSelectedItem () {
    for (let item of this.getItems()) {
      if (item.classList.contains('selected')) return item
    }
  }

  selectItemByValue (itemValue) {
    this.child(`.list-container li[value=${itemValue}]`).classList.add('selected')
  }

  get listTitle () {
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

  enable () {
    // this.addEventListener('click', this.toggle)
    this.classList.remove('disabled')
    this.disabled = false
  }

  disable () {
    // this.removeEventListener('click', this.toggle)
    this.classList.add('disabled')
    this.disabled = true
  }

  subscribeToDOMEvents () {
    for (let item of this.getItems()) {
      item.addEventListener('click', () => { this.emitter.emit('did-click-item') })
    }
  }

  attachEvents () {
    for (let item of this.getItems()) {
      item.addEventListener('click', () => {
        for (let item of this.getItems()) {
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
