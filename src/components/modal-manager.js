const HidrogenComponent = require('./hidrogen-component')
const { app } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

class ModalManager extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['modal-manager']
    this.subscribeToDOMEvents()
  }

  get (modal) {
    return this.child(`.${modal}-modal`)
  }

  subscribeToDOMEvents () {
    const updateCountdownModalTimer = () => {
      let counter = 6
      let interval = setInterval(() => {
        this.get('closing-countdown').child('.custom-content').innerText = counter
        this.get('closing-countdown').onDidCancel(() => { clearInterval(interval) })

        counter--

        if (counter < 0) {
          app.quit()
          clearInterval(interval)
        }
      }, 1000)
    }

    this.get('clean-library').onDidConfirm(() => { this.hidrogen.library.clean(); this.hidrogen.setView('library') })
    this.get('reset-hidrogen').onDidConfirm(() => { this.hidrogen.restoreDefaults() })
    this.get('closing-countdown').onDidShow(updateCountdownModalTimer)
    this.get('closing-countdown').onDidConfirm(() => { app.quit() })
    this.get('delete-game').onDidConfirm(() => { this.hidrogen.library.remove(this.get('delete-game').getAttribute('game-id')) })
    this.get('edit-library-name').onDidConfirm(() => {  })
  }

  render () {
    super.render(`
      <hidrogen-modal
        type="confirm"
        class="delete-game-modal"
        content="${i18n.translate('Hey! This action can\'t be reverted, once done there\'s no way back. Are you sure about what are you doing?')}"
      ></hidrogen-modal>

      <hidrogen-modal
        type="confirm"
        modal-title="Hidrogen se cerrará en"
        class="closing-countdown-modal"
        content="6"
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

      <hidrogen-modal
        type="custom"
        modal-title="Añadir biblioteca"
        class="new-custom-library-modal"
        content="
          <hidrogen-input type='text'></hidrogen-input>
          <span> Añadir biblioteca </span>
        "
      ></hidrogen-modal>

      <hidrogen-modal
        type="custom"
        class="edit-library-name-modal"
        content="Library name"
      ></hidrogen-modal>
    `)
  }
}

customElements.define('hidrogen-modals', ModalManager)
