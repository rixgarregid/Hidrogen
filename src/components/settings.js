const HidrogenComponent = require('./hidrogen-component')
const Authentication = require('../auth')
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

  updateUserSection (user) {
    firebase.storage().ref(`users/${user.uid}`).child('profilePicture').getDownloadURL()
      .then(url => {
        this.hidrogen.sidebar.updateUserProfilePanel({ name: firebase.auth().currentUser.displayName, picture: url })
        this.hidrogen.settings.updateProfilePic(url)
      })
      .catch(err => {
        if (err.code === 'storage/object-not-found') {
          const path = require('path')
          this.hidrogen.settings.updateProfilePic(path.resolve('static/images/login-background.jpg'))
        }
      })
  }

  updateProfilePic () {
    Authentication.updateUserPicture(this.child('.profile-picture-label img').src)
      .then(url => {
        this.child('.profile-picture').src = picture
        this.hidrogen.sidebar.updateUserProfilePanel({ name: firebase.auth().currentUser.displayName, picture: url })
      })
  }

  updateUserProfile (user) {
    this.child('.username').innerText = user.displayName
    this.child('.email').innerText = user.email
  }

  saveProfileChanges () {
    console.log('Update!')

    if (this.child('.username').innerText !== this.child('.name-field').value && this.child('.name-field').value !== '') {
      firebase.auth().currentUser.updateProfile({ displayName: this.child('.name-field').value })


      Authentication.updateUserName(this.child('.name-field').value)
        .then(() => {
          console.log(firebase.auth().currentUser)
          this.hidrogen.login.updateUIWithUserData(firebase.auth().currentUser)
        })
      
      // this.updateUserProfile(firebase.auth().currentUser)
      /* let user = firebase.auth().currentUser
      this.child('.username').innerText = user.displayName
      this.child('.email').innerText = user.email
      this.hidrogen.sidebar.updateUserProfilePanel({ name: firebase.auth().currentUser.displayName, picture: firebase.auth().currentUser.photoURL }) */
      // this.hidrogen.login.updateUIWithUserData(firebase.auth().currentUser)
        // .then(() => this.hidrogen.login.updateUIWithUserData(firebase.auth().currentUser))
    }

    if (this.child('.profile-picture-label img').src !== this.child('.profile-picture').src) {
      this.updateProfilePic()
    }
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

    this.child('.edit-btn').onDidClick(() => {
      this.child('.user-profile-settings-section').classList.add('edit-mode')
      this.child('.name-field').value = this.child('.username').innerText
      this.child('.email-field').value = this.child('.email').innerText
      this.child('.name-field').classList.add('active')
      this.child('.email-field').classList.add('active')
      
      this.child('.profile-picture-label img').src = this.child('.profile-picture').src
    })

    this.child('.save-changes-btn').onDidClick(() => { 
      this.saveProfileChanges()
      this.child('.user-profile-settings-section').classList.remove('edit-mode')
    })

    this.child('.cancel-btn').onDidClick(() => {
      this.child('.user-profile-settings-section').classList.remove('edit-mode')
      /* this.child('.name-field').value = ''
      this.child('.email-field').value = '' */
    })

    this.child('#profile-pic-input').addEventListener('change', event => {

      /* if (files.length) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.child('#profile-pic-input img').src = fileReader.result
        }
      } */

      this.child('.profile-picture-label img').src = event.target.files[0]
      
      /* Authentication.updateUserPicture(this.child('.profile-picture-label img').src)
        .then(url => {
          this.updateProfilePic(url)
          this.hidrogen.sidebar.updateUserProfilePanel({ name: firebase.auth().currentUser.displayName, picture: url })
        }) */
      

      /* Authentication.uploadUserProfilePicture(file, () => {
        // this.child('.profile-picture img').src = Authentication.getCurrentUser().picture
        this.hidrogen.sidebar.updateUserProfilePanel({ name: Authentication.getCurrentUser().name, picture: Authentication.getCurrentUser().picture })
        this.child('.profile-picture img').src = event.target.value
        
      }) */
    })
  }

  render () {
    super.render(`
      <hidrogen-panel type="panel" class="settings-panel">
        <span class="settings-group-title"> Perfil </span>

        <hidrogen-panel class="user-profile-settings-section">

          <hidrogen-panel class="edit-form">

            <hidrogen-panel class="profile-pic">
              <input type="file" id="profile-pic-input"/>
              <label for="profile-pic-input" class="profile-picture-label">
                <img src="../static/images/login-background.jpg"></img>
                <span class="icon-mode_edit"></span>
              </label>
              <hidrogen-panel class="background"></hidrogen-panel>
            </hidrogen-panel>

            <hidrogen-input type="text" label="Nombre de usuario" class="name-field"></hidrogen-input>
            <hidrogen-input type="text" label="Correo electrónico" class="email-field"></hidrogen-input>
            <span class="reset-password"> Cambiar mi contraseña </span>
            <hidrogen-btn class="delete-account-btn outlined" text="Eliminar mi cuenta" type="danger"></hidrogen-btn>
            <hidrogen-btn class="save-changes-btn" text="Guardar cambios" type="success"></hidrogen-btn>
            <hidrogen-btn class="cancel-btn outlined" text="Cancelar"></hidrogen-btn>

          </hidrogen-panel>

          <hidrogen-panel class="profile-container">

            <img class="profile-picture" src="../static/images/login-background.jpg"></img>
            <span class="username"> Username </span>
            <span class="email"> someone@hidrogen.io </span>

            <hidrogen-btn icon="mode_edit" text="Editar perfil" class="edit-btn" type="success"></hidrogen-btn>
          
          </hidrogen-panel>

        </hidrogen-panel>
        

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
