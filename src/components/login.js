const HidrogenComponent = require('./hidrogen-component')
const Authentication = require('../authentication')

class Login extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['login']
    this.subscribeToDOMEvents()
  }

  getAuthForm () {
    if (this.child('.login-form').classList.contains('active')) {
      return this.child('.login-form')
    } else {
      return this.child('.signup-form')
    }
  }

  toggleAuthForm (mode) {
    switch (mode) {
      case 'login':
        this.child('.login-form').classList.add('active')
        this.child('.signup-form').classList.remove('active')
        break
      case 'signup':
        this.child('.login-form').classList.remove('active')
        this.child('.signup-form').classList.add('active')
        break
    }
  }

  hide () {
    this.style.display = 'none'
  }

  login () {
    const authFormData = this.getAuthForm().collectData()
    const loginData = {
      email: authFormData[0],
      password: authFormData[1]
    }

    // METER LOADER

    Authentication.authenticateUser(loginData, () => {
      this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
      this.hidrogen.sidebar.updateUserProfilePanel({ name: Authentication.getCurrentUser().name, picture: Authentication.getCurrentUser().picture })
      this.hidrogen.settings.updateProfilePic(Authentication.getCurrentUser().picture)
      this.hide()

      // QUITAR LOADER
    })
  }

  signUp () {
    const authFormData = this.getAuthForm().collectData()
    const signUpData = {
      name: authFormData[0],
      email: authFormData[1],
      password: authFormData[2]
    }

    // METER LOADER

    Authentication.signUpUser(signUpData, () => {
      this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
      this.hidrogen.sidebar.updateUserProfilePanel(Authentication.getCurrentUser())
      this.hide()

      // QUITAR LOADER
    })
  }

  subscribeToDOMEvents () {
    this.child('.login-form').onDidSubmit(() => {
      this.login()
      this.getAuthForm().clear()
    })

    this.child('.signup-form').onDidSubmit(() => {
      this.signUp()
      this.getAuthForm().clear()
    })

    this.child('.show-signup-form-btn').addEventListener('click', () => { this.toggleAuthForm('signup') })
    this.child('.show-login-form-btn').addEventListener('click', () => { this.toggleAuthForm('login') })
  }

  render () {
    super.render(`
      <hidrogen-form class="login-form active">
        <span class="form-title"> ¡Hola de nuevo! </span>
        <hidrogen-input type="text" label="Correo electrónico" class="email-field"></hidrogen-input>
        <hidrogen-input type="text" label="Contraseña" class="password-field"></hidrogen-input>
        <span class="forgot-password-btn"> He olvidado mi contraseña :( </span>
        <hidrogen-btn text="Iniciar Sesión" class="submit-btn"></hidrogen-btn>
        <hidrogen-btn text="¿Necesitas una cuenta? ¡Regístrate!" class="show-signup-form-btn"></hidrogen-btn>
      </hidrogen-form>

      <hidrogen-form class="signup-form">
        <span class="form-title"> ¡Bienvenido a Hidrogen! </span>
        <hidrogen-input type="text" label="Nombre de usuario" class="username-field"></hidrogen-input>
        <hidrogen-input type="text" label="Correo electrónico" class="email-field"></hidrogen-input>
        <hidrogen-input type="text" label="Contraseña" class="password-field"></hidrogen-input>
        <hidrogen-btn text="Registrarse" class="submit-btn"></hidrogen-btn>
        <span class="show-login-form-btn"> ¿Tienes ya una cuenta? ¡Inicia sesión! </span>
      </hidrogen-form>
    `)
  }
}

customElements.define('hidrogen-login', Login)
