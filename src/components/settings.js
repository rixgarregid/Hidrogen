const HidrogenComponent = require('./hidrogen-component')
const Config = require('../config')
const I18n = require('../translator')
const i18n = new I18n()

class Settings extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'settings']

    this.config = new Config()
    this.loadSettings()

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.attachEvents()
  }

  loadSettings () {
    if (this.config.get('autorun')) this.child('.autolaunch-checkbox').checked = true

    if (this.config.get('autoclose')) this.child('.autoclose-checkbox').checked = true

    if (this.config.get('closingCountdown')) this.child('.autoclose-countdown-checkbox').checked = true

    if (this.config.get('allowMultiInstance')) this.child('.multiinstance-checkbox').checked = true

    if (this.config.get('askBeforeLeave')) this.child('.ask-before-leave-checkbox').checked = true

    if (this.config.get('autolang')) this.child('.autolang-checkbox').checked = true

    if (this.config.get('showGameCounter')) this.child('.total-games-checkbox').checked = true
  }

  attachEvents () {

    this.querySelector('.autolaunch-checkbox').addEventListener('click', () => {
      if (this.querySelector('.autolaunch-checkbox').checked === true) {
        this.config.set('autorun', true)
      } else {
        this.config.set('autorun', false)
      }
    })

    this.querySelector('.autoclose-checkbox').addEventListener('click', () => {
      if (this.querySelector('.autoclose-checkbox').checked === true) {
        this.config.set('autoclose', true)
      } else {
        this.config.set('autoclose', false)
      }
    })

    this.querySelector('.autoclose-countdown-checkbox').addEventListener('click', () => {
      if (this.querySelector('.autoclose-countdown-checkbox').checked === true) {
        this.config.set('closingCountdown', true)
      } else {
        this.config.set('closingCountdown', false)
      }
    })

    this.querySelector('.multiinstance-checkbox').addEventListener('click', () => {
      if (this.querySelector('.multiinstance-checkbox').checked === true) {
        this.config.set('allowMultiInstance', true)
      } else {
        this.config.set('allowMultiInstance', false)
      }
    })

    this.querySelector('.ask-before-leave-checkbox').addEventListener('click', () => {
      if (this.querySelector('.ask-before-leave-checkbox').checked === true) {
        this.config.set('askBeforeLeave', true)
      } else {
        this.config.set('askBeforeLeave', false)
      }
    })

    for (let item of this.querySelectorAll('.lang-dropdown .dropdown-item')) {
      item.addEventListener('click', () => {

        if (item.classList.contains('spanish-item')) {
          this.config.set('lang', 'es')
        } else if (item.classList.contains('english-item')) {
          this.config.set('lang', 'en')
        } else if (item.classList.contains('german-item')) {
          this.config.set('lang', 'de')
        }
      })
    }

    this.querySelector('.autolang-checkbox').addEventListener('click', () => {
      if (this.querySelector('.autolang-checkbox').checked === true) {
        this.config.set('autolang', true)
      } else {
        this.config.set('autolang', false)
      }
    })

    this.querySelector('.total-games-checkbox').addEventListener('click', () => {
      if (this.querySelector('.total-games-checkbox').checked === true) {
        this.config.set('showGameCounter', true)
      } else {
        this.config.set('showGameCounter', false)
      }
    })

    this.querySelector('.save-btn').addEventListener('click', () => {
      this.classList.remove('active')
      this.hidrogenBoard.updateView('library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    })

    this.child('.clean-library-btn').addEventListener('click', () => {
      document.querySelector('.clean-library-modal').classList.add('active')
    })

    this.child('.restore-settings-btn').addEventListener('click', () => {
      document.querySelector('.reset-hidrogen-modal').classList.add('active')
    })
  }

  render () {
    super.render(`
      <hidrogen-panel type="panel" class="settings-panel">
      <span class="settings-group-title"> General </span>

      <hidrogen-panel class="settings-field">
        <label class="checkbox-label autolaunch-label">
          <input type="checkbox" class="autolaunch-checkbox">
          <text class="label"> ${i18n.translate('Run Hidrogen when your computer starts.')} </text>
        </label>

        <span class="setting-description"> Iniciar Hidrogen automáticamente al encender mi equipo. </span>
      </hidrogen-panel>

      <hidrogen-panel class="settings-field">
        <label class="checkbox-label autoclose-label">
          <input type="checkbox" class="autoclose-checkbox">
          <text class="label"> ${i18n.translate('Close Hidrogen when launching a game.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="settings-field">
        <label class="checkbox-label autoclose-downdown-label">
          <input type="checkbox" class="autoclose-countdown-checkbox">
          <text class="label"> ${i18n.translate('Show countdown.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="settings-field">
        <label class="checkbox-label multiinstance-label">
          <input type="checkbox" class="multiinstance-checkbox">
          <text class="label"> ${i18n.translate('Allow multiple Hidrogen instances.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="settings-field lang-field">
        <text class="text lang-label"> ${i18n.translate('Language.')} </text>
        <dropdown-menu class="lang-dropdown dropdown-menu">
          <span class="dropdown-item spanish-item selected"> ${i18n.translate('Spanish')} </span>
          <span class="dropdown-item english-item"> ${i18n.translate('English')} </span>
          <span class="dropdown-item german-item"> ${i18n.translate('German')} </span>
        </dropdown-menu>

        <label class="checkbox-label autolang-label">
          <input type="checkbox" class="autolang-checkbox">
          <text class="label"> ${i18n.translate('Detect language automatically.')} </text>
        </label>
      </hidrogen-panel>

      <span class="settings-group-title"> Biblioteca </span>

      <hidrogen-panel class="settings-field">
        <label class="checkbox-label total-games-label">
          <input type="checkbox" class="total-games-checkbox">
          <text class="label"> Mostrar contador de juegos en la biblioteca. </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="settings-field library-field">
        <hidrogen-btn type="danger" class="outlined clean-library-btn" text="Eliminar toda mi biblioteca">
      </hidrogen-panel>

      <hidrogen-btn type="danger" text="Restaurar Hidrogen" class="outlined restore-settings-btn"></hidrogen-btn>

      <hidrogen-btn type="success" text="${i18n.translate('Done!')}" class="save-btn"></hidrogen-btn>
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-settings', Settings)

// <btn class="btn btn-sec btn-danger clean-library-btn"> Eliminar toda mi biblioteca </btn>
// <hidrogen-panel type="panel" class="settings-nav">
//   <hidrogen-list class="settings-list">
//     <li class="list-item selected"> General </li>
//     <li class="list-item"> Biblioteca </li>
//   </hidrogen-list>
// </hidrogen-panel>

// <span class="settings-field-title"> Apariencia </span>
//
// <hidrogen-panel class="field theme-field">
//   <hidrogen-list list-title="Tema" behaviour="checkgroup">
//     <span class="list-item light-theme-item"> Claro </span>
//     <span class="list-item nightly-theme-item"> 'Nightly' (por defecto) </span>
//     <span class="list-item dark-theme-item"> Oscuro </span>
//     <span class="list-item modern-theme-item"> Moderno </span>
//   </hidrogen-list>
// </hidrogen-panel>
