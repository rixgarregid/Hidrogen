const HidrogenComponent = require('./hidrogen-component')
const { app } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

class ModalManager extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['modal-manager']
    this.subscribeToDOMEvents()
    this.attachEvents()
  }

  get (modal) {
    return this.child(`.${modal}-modal`)
  }

  subscribeToDOMEvents () {
    const cleanLibrary = () => { this.hidrogen.library.clean() }
    const resetHidrogen = () => { this.hidrogen.restoreDefaults() }

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

    this.get('clean-library').onDidConfirm(cleanLibrary)
    this.get('reset-hidrogen').onDidConfirm(resetHidrogen)
    this.get('closing-countdown').onDidShow(updateCountdownModalTimer)
    this.get('closing-countdown').onDidConfirm(() => { app.quit() })
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
    // this.child('.clean-library-modal .btn-confirm').addEventListener('click', cleanLibrary)
    // this.child('.reset-hidrogen-modal .btn-confirm').addEventListener('click', resetHidrogenDefaults)
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
    `)
  }
}

customElements.define('hidrogen-modals', ModalManager)
