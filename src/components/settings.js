const Config = require('../config')
const I18n = require('../translator')
const i18n = new I18n()

class Settings extends HTMLElement {
  constructor () {
    super()

    this.config = new Config()

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.render()
    this.attachEvents()

    this.loadSettings()
  }

  loadSettings () {
    if (this.config.get('autorun')) this.querySelector('.autolaunch-checkbox').checked = true

    if (this.config.get('autoclose')) this.querySelector('.autoclose-checkbox').checked = true

    if (this.config.get('closingCountdown')) this.querySelector('.autoclose-countdown-checkbox').checked = true

    if (this.config.get('allowMultiInstance')) this.querySelector('.multiinstance-checkbox').checked = true

    if (this.config.get('askBeforeLeave')) this.querySelector('.ask-before-leave-checkbox').checked = true

    if (this.config.get('autolang')) this.querySelector('.autolang-checkbox').checked = true
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

    this.querySelector('.autolang-checkbox').addEventListener('click', () => {
      if (this.querySelector('.autolang-checkbox').checked === true) {
        this.config.set('autolang', true)
      } else {
        this.config.set('autolang', false)
      }
    })

    this.querySelector('.cancel-btn').addEventListener('click', () => {
      this.classList.remove('active')
      this.hidrogenBoard.updateView('home')
      this.hidrogenSidebar.updateSelectedListItem('home')
    })
  }

  render () {
    this.classList.add('settings')
    this.classList.add('board-view')

    this.innerHTML = `
      <hidrogen-panel class="field">
        <label class="checkbox-label autolaunch-label">
          <input type="checkbox" class="autolaunch-checkbox">
          <text class="label"> ${i18n.translate('Run Hidrogen when your computer starts.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <label class="checkbox-label autoclose-label">
          <input type="checkbox" class="autoclose-checkbox">
          <text class="label"> ${i18n.translate('Close Hidrogen when launching a game.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <label class="checkbox-label autoclose-downdown-label">
          <input type="checkbox" class="autoclose-countdown-checkbox">
          <text class="label"> ${i18n.translate('Show countdown.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <label class="checkbox-label multiinstance-label">
          <input type="checkbox" class="multiinstance-checkbox">
          <text class="label"> ${i18n.translate('Allow multiple Hidrogen instances.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <label class="checkbox-label ask-before-leave-label">
          <input type="checkbox" class="ask-before-leave-checkbox">
          <text class="label"> ${i18n.translate('Ask before leaving Hidrogen.')} </text>
        </label>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <label class="checkbox-label autolang-label">
          <input type="checkbox" class="autolang-checkbox">
          <text class="label"> ${i18n.translate('Detect language automatically.')} </text>
        </label>
      </hidrogen-panel>

      <btn class="btn cancel-btn"> ${i18n.translate('Save settings!')} </btn>
    `
  }
}

customElements.define('hidrogen-settings', Settings)
