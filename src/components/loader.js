const HidrogenComponent = require('./hidrogen-component')

class Loader extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['loader']

    this.attachEvents()
  }

  attachEvents () {
    // document.addEventListener('DOMContentLoaded', () => {
    //   this.classList.add('inactive')
    //   console.log('Dom is ready!')
    // })

    let timer = setInterval(() => {
        this.classList.add('inactive')
    }, 1000)
  }

  render () {
    super.render(`
      <span class="loader-title"> Recomponiendo átomos de hidrógeno... </span>
      <span class="loader-container">
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
        <span class="loader-item"></span>
      </span>
    `)
  }
}

customElements.define('hidrogen-loader', Loader)
