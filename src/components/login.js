const HidrogenComponent = require('./hidrogen-component')
const Authentication = require('../auth')

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

  updateUIWithUserData (user) {
    firebase.storage().ref(`users/${user.uid}`).child('profilePicture').getDownloadURL()
      .then(url => {
        this.hidrogen.settings.updateProfilePic(url)
        this.hidrogen.sidebar.updateUserProfilePanel({ name: firebase.auth().currentUser.displayName, picture: url })
      })
      .catch(err => {
        if (err.code === 'storage/object-not-found') {
          const path = require('path')
          this.hidrogen.settings.updateProfilePic(path.resolve('static/images/login-background.jpg'))
        }
      })
    
    this.hidrogen.home.updateWelcomeMessage(user.displayName)
    this.hidrogen.settings.updateUserProfile(user)
    
    
    this.hide()
    this.hidrogen.loader.hide()
  }

  login () {
    const authFormData = this.getAuthForm().collectData()
    const credential = {
      email: authFormData[0],
      password: authFormData[1]
    }

    Authentication.authenticateUser(credential)
      .then(user => this.updateUIWithUserData(user))
      .catch(error => console.log(error))

     /* Authentication.authenticateUser(loginData)
       .then(() => {
         this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
         this.hidrogen.sidebar.updateUserProfilePanel({ name: Authentication.getCurrentUser().name, picture: Authentication.getCurrentUser().picture })
         this.hidrogen.settings.updateProfilePic(Authentication.getCurrentUser().picture)
         this.hide()
         this.hidrogen.loader.hide()
       })
       .catch(err => console.log(err)) */

    //Authentication.authenticateUser(loginData, () => {
    //  console.log(Authentication.getCurrentUser().picture)
    //  this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
    //  this.hidrogen.sidebar.updateUserProfilePanel({ name: Authentication.getCurrentUser().name, picture: Authentication.getCurrentUser().picture })
    //  this.hidrogen.settings.updateProfilePic(Authentication.getCurrentUser().picture)
    //  this.hidrogen.loader.hide()
    //})
  }

  //async login () {
  //  const formData = LoginForm.getData()
  //  const loginCredentials = {
  //    email: formData.email,
  //    password: formData.password
  //  }

  //  import { App } from '../UIView'

  //  try {
      // We get the authenticated user's data object after successful login.
  //    const user = await Authentication.authenticateUser(loginData)

      // Update all app's components that use user's data.
  //    App.updateUserProfile(user)
  //  } catch (error) {
  //    import Logger from '../logger'
      // Log the error in the console and in the log's file.
  //    Logger.error(error)
  //  }
    

    // import { Home, SidebarUserProfilePanel, Settings, Loader } from '../UIView'
    // const { Home, SidebarUserProfilePanel, Settings, Loader } = require('../UIView')

    // Home.updateWelcomeMessage(user.name)
    // SidebarUserProfilePanel.updateProfile({ name: user.name, picture: user.picture })
    // Settings.getView('userProfile').updateProfile({
    //   name: user.name,
    //   email: user.email,
    //   picture: user.picture
    // })
    // Loader.hide()
  // }

  async signUpUser (credentials) {
    /* const signUpFormData = SignUpForm.getData()
    const signUpCredentials = {
      email: signUpFormData.email,
      password: signUpFormData.password
    } */

    try {
      const timer = new Timer('[Authentication] User creation time delay:')
      timer.start()

      const user = await Authentication.createUser(signUpCredentials)
      App.uploadUserProfile(user)

      Loader.hide()
      timer.stop()
    } catch (error) {
      logger.error(error)
      // Send notification to user.
    }
  }

  signUp () {
    const authFormData = this.getAuthForm().collectData()
    const signUpData = {
      name: authFormData[0],
      email: authFormData[1],
      password: authFormData[2]
    }

    //Authentication.signUpUser(signUpData)
    //   .then(() => {
    //     this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
    //     this.hidrogen.sidebar.updateUserProfilePanel(Authentication.getCurrentUser())
    //     this.hidrogen.loader.hide()
    //   })

    Authentication.createUser(signUpData)
      .then(() => {
        this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
        this.hidrogen.sidebar.updateUserProfilePanel(Authentication.getCurrentUser())
        this.hidrogen.loader.hide()
      })
      .catch (error => console.log(error))

    //Authentication.signUpUser(signUpData, () => {
    //  this.hidrogen.home.updateWelcomeMessage(Authentication.getCurrentUser().name)
    //  this.hidrogen.sidebar.updateUserProfilePanel(Authentication.getCurrentUser())
    //  this.hidrogen.loader.hide()
    //})
  }

  subscribeToDOMEvents () {
    this.child('.login-form').onDidSubmit(() => {
      this.hidrogen.loader.show()
      this.hide()
      this.login()
      this.getAuthForm().clear()
    })

    this.child('.signup-form').onDidSubmit(() => {
      this.hidrogen.loader.show()
      this.hide()
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
