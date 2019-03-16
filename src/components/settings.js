const HidrogenComponent = require('./hidrogen-component')
const Authentication = require('../authentication')
const I18n = require('../translator')
const i18n = new I18n()

class Settings extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'settings']
    this.settings = {
      autorun: { element: '.autorun-toggle' },
      autoclose: { element: '.autoclose-toggle' },
      closingCountdown: { element: '.autoclose-countdown-toggle' },
      multiInstance: { element: '.multiinstance-toggle' },
      showGameCounter: { element: '.show-game-counter-toggle' },
      autolang: { element: '.autolang-toggle' },
      lang: { element: '.lang-list' }
    }

    this.load()
    this.attachEvents()
    this.checkTogglesStates()

    // Disabling some toggles while development.
    this.child('.autorun-toggle').disable()
  }

  load () {
    for (let configKey in this.settings) {
      if (this.hidrogen.config.get(configKey)) {

        if (configKey === 'lang') {
          this.child('.lang-list').selectItemByValue(this.hidrogen.config.get('lang'))
        } else {
          this.child(this.settings[configKey].element).toggle()
        }

      }
    }
  }

  save () {
    for (let configKey in this.settings) {
      if (configKey === 'lang') {
        this.hidrogen.config.set('lang', this.child('.lang-list').getSelectedItem().getAttribute('value'))
      } else {
        if (this.child(this.settings[configKey].element).isChecked()) {
          this.hidrogen.config.set(configKey, true)
        } else {
          this.hidrogen.config.set(configKey, false)
        }
      }
    }

    this.close()
  }

  close () {
    this.classList.remove('active')
    this.hidrogen.board.updateView('library')
    this.hidrogen.sidebar.updateSelectedListItem('library')
  }

  checkTogglesStates () {
    if (this.child('.autoclose-toggle').isChecked()) {
      this.child('.autoclose-countdown-toggle').enable()
    } else {
      this.child('.autoclose-countdown-toggle').disable()
    }

    if (this.child('.autolang-toggle').isChecked()) {
      this.child('.lang-list').disable()
    } else {
      this.child('.lang-list').enable()
    }
  }

  updateProfilePic (picture) {
    this.child('.profile-picture img').src = picture
  }

  attachEvents () {
    const save = () => { this.save() }
    const showCleanLibraryModal = () => { this.hidrogen.modals.get('clean-library').show() }
    const showResetHidrogenModal = () => { this.hidrogen.modals.get('reset-hidrogen').show() }
    const toggleInputState = () => {
      if (this.child('.autoclose-toggle').isChecked()) {
        this.child('.autoclose-countdown-toggle').enable()
      } else {
        this.child('.autoclose-countdown-toggle').disable()
      }
    }

    const toggleListState = () => {
      if (this.child('.autolang-toggle').isChecked()) {
        this.child('.lang-list').disable()
      } else {
        this.child('.lang-list').enable()
      }
    }

    this.child('.autoclose-toggle').addEventListener('click', toggleInputState)
    this.child('.autolang-toggle').addEventListener('click', toggleListState)
    this.child('.save-btn').addEventListener('click', save)
    this.child('.clean-library-btn').addEventListener('click', showCleanLibraryModal)
    this.child('.restore-settings-btn').addEventListener('click', showResetHidrogenModal)

    this.child('#profile-pic-input').addEventListener('change', event => {
      let file = event.target.files[0]
      Authentication.uploadUserProfilePicture(file, () => {
        this.child('.profile-picture img').src = Authentication.getCurrentUser().picture
        this.hidrogen.sidebar.updateUserProfilePanel({ name: Authentication.getCurrentUser().name, picture: Authentication.getCurrentUser().picture })
      })
    })
  }

  render () {
    super.render(`
      <hidrogen-panel type="panel" class="settings-panel">
        <span class="settings-group-title"> Perfil </span>

        <input type="file" id="profile-pic-input"/>
        <label for="profile-pic-input" class="profile-picture">
          <img src="../static/images/login-background.jpg"></img>
        </label>

        <span class="settings-group-title"> General </span>

        <hidrogen-input type="toggle" label="${i18n.translate('Run Hidrogen when your computer starts.')}" class="autorun-toggle"></hidrogen-input>

        <hidrogen-input type="toggle" label="${i18n.translate('Allow multiple Hidrogen instances.')}" class="multiinstance-toggle"></hidrogen-input>

        <hidrogen-input type="toggle" label="${i18n.translate('Detect language automatically.')}" class="autolang-toggle"></hidrogen-input>

        <hidrogen-list list-title="${i18n.translate('Language.')}" behaviour="checkgroup" class="lang-list">
          <li class="list-item" value="es"> ${i18n.translate('Spanish')} </li>
          <li class="list-item" value="en"> ${i18n.translate('English')} </li>
        </hidrogen-list>

        <hidrogen-btn type="danger" text="Restaurar Hidrogen" class="outlined restore-settings-btn"></hidrogen-btn>

        <span class="settings-group-title"> Biblioteca </span>

        <hidrogen-input type="toggle" label="${i18n.translate('Close Hidrogen when launching a game.')}" class="autoclose-toggle"></hidrogen-input>
        <hidrogen-input type="toggle" label="${i18n.translate('Show countdown.')}" class="autoclose-countdown-toggle"></hidrogen-input>
        <hidrogen-input type="toggle" label="Mostrar contador de juegos en la biblioteca." class="show-game-counter-toggle"></hidrogen-input>
        <hidrogen-input type="toggle" label="Ocultar biblioteca de favoritos." class="fav-lib-toggle"></hidrogen-input>
        <hidrogen-btn type="danger" class="outlined clean-library-btn" text="Eliminar toda mi biblioteca"></hidrogen-btn>

        <span class="settings-group-title"> Inicio </span>

        <hidrogen-input type="toggle" label="Deshabilitar vídeo de inicio. (Recomendado para ordenadores de gama baja)." class="disable-home-video-toggle"></hidrogen-input>

        <hidrogen-btn type="success" text="${i18n.translate('Done!')}" class="save-btn"></hidrogen-btn>
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-settings', Settings)

// <hidrogen-panel class="settings-field lang-field">
//   <text class="text lang-label"> ${i18n.translate('Language.')} </text>
//   <dropdown-menu class="lang-dropdown dropdown-menu">
//     <span class="dropdown-item spanish-item selected"> ${i18n.translate('Spanish')} </span>
//     <span class="dropdown-item english-item"> ${i18n.translate('English')} </span>
//     <span class="dropdown-item german-item"> ${i18n.translate('German')} </span>
//   </dropdown-menu>
// </hidrogen-panel>

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
