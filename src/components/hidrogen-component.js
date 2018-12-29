const { Emitter } = require('event-kit')

// {HidrogenComponent} is used as an interface for Hidrogen's
// UI components. You must not create an instance of this class
// directly, only by inheritance.
module.exports =
class HidrogenComponent extends HTMLElement {
  constructor (options = {}) {
    super()
    this.autorender = options.render
    this.shadowElement = options.shadow
    this.destroyable = options.destroyable
    this.events = options.events

    if (this.autorender !== false) this.render()
    if (this.destroyable) this.destroyed = false
    if (this.events) this.emitter = new Emitter()

    this.hidrogen = document.querySelector('hidrogen-app')
  }

  setClassNames (classNames) {
    if (classNames.length === 0) return

    for (let className of classNames) {
      this.classList.add(className)
    }
  }

  set classNames (classNames) {
    this.setClassNames(classNames)
  }

  child (selector) {
    return this.querySelector(selector)
  }

  children (selector) {
    return this.querySelectorAll(selector)
  }

  render (html) {
    if (html === undefined) return

    if (this.shadowElement === true) {
      let shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = html
    } else {
      this.innerHTML = html
    }
  }
}
