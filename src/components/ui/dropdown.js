const HidrogenComponent = require('../hidrogen-component')

class DropdownMenu extends HidrogenComponent {
  constructor () {
    super({ render: false })
    this.dropdownItems = this.innerHTML
    this.classNames = ['dropdown-menu']

    this.render()

    this.selectItem()
    this.setDropdownListHeight()

    this.attachEvents()
  }

  getDropdownItems () {
    return this.children('.dropdown-item')
  }

  selectItem () {
    for (let item of this.getDropdownItems()) {
      if (item.classList.contains('selected')) {
        this.child('.dropdown-title').innerText = item.innerText
      }
    }
  }

  setDropdownListHeight () {
    this.child('.dropdown-list').style.height = `${40 * (this.getDropdownItems().length - 1)}px`
  }

  attachEvents () {

    const toggleDropdown = () => {
      this.classList.toggle('active')
    }

    // const itemClickHandler = () => {
    //   this.classList.remove('active')
    //   this.child('.dropdown-title').innerText = item.innerText
    //
    //   for (let item of this.getDropdownItems()) {
    //     if (item.classList.contains('selected')) item.classList.remove('selected')
    //   }
    //
    //   item.classList.add('selected')
    //   this.selectItem()
    // }

    this.child('.text').addEventListener('click', toggleDropdown)

    for (let item of this.getDropdownItems()) {
      item.addEventListener('click', () => {
        this.classList.remove('active')
        this.child('.dropdown-title').innerText = item.innerText

        for (let item of this.getDropdownItems()) {
          if (item.classList.contains('selected')) item.classList.remove('selected')
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

customElements.define('dropdown-menu', DropdownMenu)
