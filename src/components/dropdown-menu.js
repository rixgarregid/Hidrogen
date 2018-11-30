const HidrogenComponent = require('./hidrogen-component')

class DropdownMenuElement extends HidrogenComponent {
  constructor () {
    super()

    this.dropdownItems = this.innerHTML
    this.setClassNames(['dropdown-menu'])

    this.attachEvents()

    this.selectItem()
    this.setListHeight()
  }

  setListHeight () {
    this.child('.dropdown-list').style.height = `${40 * (this.children('.dropdown-item').length - 1)}px`
  }

  selectItem () {
    for (let item of this.children('.dropdown-item')) {
      if (item.classList.contains('selected')) {
        this.child('.dropdown-title').innerText = item.innerText
      }
    }
  }

  attachEvents () {

    const toggleDropdown = () => {
      this.classList.toggle('active')
    }

    this.querySelector('.text').addEventListener('click', toggleDropdown)

    for (let item of this.querySelectorAll('.dropdown-item')) {
      item.addEventListener('click', () => {
        this.classList.remove('active')
        this.querySelector('.dropdown-title').innerText = item.innerText

        for (let item of this.querySelectorAll('.dropdown-item')) {
          if (item.classList.contains('selected')) {
            item.classList.remove('selected')
          }
        }

        item.classList.add('selected')
        this.selectItem()
      })
    }
  }

  render () {
    super.render(`
        <text class="text dropdown-title">Dropdown Menu</text>
        <span class="icon-expand_more dropdown-icon"></span>
        <ul class="list dropdown-list">
          ${this.dropdownItems}
        </ul>
    `)
  }
}

customElements.define('dropdown-menu', DropdownMenuElement)
