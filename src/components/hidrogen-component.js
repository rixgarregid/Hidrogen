// {HidrogenComponent} is used as an interface for Hidrogen's
// UI components. You must not create an instance of this class
// directly, only by inheritance.
module.exports =
class HidrogenComponent extends HTMLElement {
  constructor () {
    super()
    this.render()
  }

  setClassNames (classNames) {
    if (classNames.length === 0) return

    for (let className of classNames) {
      this.classList.add(className)
    }
  }

  child (selector) {
    return this.querySelector(selector)
  }

  children (selector) {
    return this.querySelectorAll(selector)
  }

  render (html) {
    if (html === undefined) return
    this.innerHTML = html
  }
}
