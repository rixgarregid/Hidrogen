const HidrogenComponent = require('./hidrogen-component')
const { Emitter } = require('event-kit')

class Loader extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['loader']
    this.emitter = new Emitter()
    this.subscribeToDOMEvents()
  }

  show () {
    this.classList.remove('inactive')
    this.emitter.emit('did-show')
  }

  hide () {
    this.classList.add('inactive')
    this.emitter.emit('did-hide')
  }

  onDidShow (callback) {
    this.emitter.on('did-show', callback)
  }

  onDidHide (callback) {
    this.emitter.on('did-hide', callback)
  }

  subscribeToDOMEvents () {
    // document.addEventListener('DOMContentLoaded', () => {
    //   this.classList.add('inactive')
    //   console.log('Dom is ready!')
    // })

    // let timer = setInterval(() => {
    //     this.classList.add('inactive')
    // }, 1000)
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
