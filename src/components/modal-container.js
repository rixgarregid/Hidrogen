const HidrogenComponent = require('./hidrogen-component')
const I18n = require('../translator')
const i18n = new I18n()

class ModalContainer extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['modal-container']
    this.attachEvents()
  }

  attachEvents () {
    const deleteGame = () => {
      this.child('.delete-game-modal').classList.remove('active')

      let delId = this.child('.delete-game-modal').getAttribute('game-id')
      document.querySelector(`hidrogen-game-card[game-id='${delId}']`).destroy(delId)
    }

    const cleanLibrary = () => { document.querySelector('hidrogen-library').clean() }

    const resetHidrogenDefaults = () => { document.querySelector('hidrogen-app').restoreDefaults() }

    this.child('.delete-game-modal .btn-confirm').addEventListener('click', deleteGame)
    this.child('.clean-library-modal .btn-confirm').addEventListener('click', cleanLibrary)
    this.child('.reset-hidrogen-modal .btn-confirm').addEventListener('click', resetHidrogenDefaults)
  }

  render () {
    super.render(`
      <hidrogen-modal
        type="confirm"
        class="delete-game-modal"
        content="${i18n.translate('Hey! This action can\'t be reverted, once done there\'s no way back. Are you sure about what are you doing?')}"
      ></hidrogen-modal>

      <hidrogen-modal
        type="info"
        class="closing-countdown-modal"
        content=" I'm a countdown! "
      ></hidrogen-modal>

      <hidrogen-modal
        type="confirm"
        class="clean-library-modal"
        content="${i18n.translate('Hey! This action can\'t be reverted, once done there\'s no way back. Are you sure about what are you doing?')}"
      ></hidrogen-modal>

      <hidrogen-modal
        type="confirm"
        class="reset-hidrogen-modal"
        content="${i18n.translate('Hey! This action can\'t be reverted, once done there\'s no way back. Are you sure about what are you doing?')}"
      ></hidrogen-modal>
    `)
  }
}

customElements.define('hidrogen-modals', ModalContainer)
