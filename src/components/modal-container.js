class ModalContainer extends HTMLElement {
  constructor () {
    super()

    this.render()
    this.attachEvents()
  }

  attachEvents () {

    const handleOk = () => {
      this.querySelector('.delete-game-modal').classList.remove('active')

      let delId = this.querySelector('.delete-game-modal').getAttribute('game-id')
      document.querySelector(`hidrogen-game-card[game-id='${delId}']`).destroy(delId)
    }

    const handleCancel = () => {
      this.querySelector('.delete-game-modal').classList.remove('active')
    }

    this.querySelector('.delete-game-modal .confirm-btn').addEventListener('click', handleOk)
    this.querySelector('.delete-game-modal .cancel-btn').addEventListener('click', handleCancel)
  }

  render () {
    this.classList.add('modal-container')

    this.innerHTML = `
      <hidrogen-modal class="delete-game-modal no-default-content">
        <!-- <text class="text">
          ${i18n.translate('Hey! This action can\'t be reverted, once done there\'s no way back. Are you sure about what are you doing?')}
        </text> -->
        <!-- <btn class="btn confirm-btn"> ${i18n.translate('Yeah, n.n')} </btn>
        <btn class="btn btn-sec cancel-btn"> ${i18n.translate('Nope, let me a moment...')} </btn> -->
      </hidrogen-modal>
    `
  }
}

customElements.define('hidrogen-modals', ModalContainer)
