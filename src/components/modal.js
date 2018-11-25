class Modal extends HTMLElement {
  constructor () {
    super()

    this.modalContent = this.innerHTML

    this.render()
    this.attachEvents()
  }

  attachEvents () {

    const closeModal = () => {
      this.classList.remove('active')
    }

    this.querySelector('.btn-close').addEventListener('click', closeModal)
  }

  render () {
    this.classList.add('modal')

    this.innerHTML = `
      <hidrogen-panel class="panel content">
        <text class="text title"> ${this.modalTitle} </text>
        <btn class="btn icon-close btn-close"></btn>
        ${this.modalContent}
      </hidrogen-panel>
    `
  }
}

customElements.define('hidrogen-modal', Modal)
