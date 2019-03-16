const Config = require('./config')
const config = new Config()

const path = require('path')

// const { Library, Home, Settings } = require('./UIView')

module.exports =
class Authentication {
  static getCurrentUser () {
    return {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      picture: firebase.auth().currentUser.photoURL
    }
  }

  static getUserDataFromDatabase (callback) {
    firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value')
      .then(snapshot => {
        firebase.auth().currentUser.updateProfile({ displayName: snapshot.val().username })
        firebase.storage().ref('profilePics').child(firebase.auth().currentUser.uid).getDownloadURL()
          .then(url => {
            firebase.auth().currentUser.updateProfile({ photoURL: url })
            callback()
          })
          .catch(err => {
            console.log('%c[AuthService]: %cUser does not have a profile pic!', 'color:blue;', 'color:red;')
            // TODO: Actualizar imagen por defecto.
            firebase.auth().currentUser.updateProfile({ photoURL: path.resolve('static/images/login-background.jpg') })
            callback()
          })
      })
      .catch(err => {
        Promise.reject(err)
      })
  }

  static authenticateUser (user, callback) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        Authentication.getUserDataFromDatabase(callback)

        // console.log('%c[AuthService]: %cLogged in successfully as', 'color:blue;', 'color:green;', {
        //   username: firebase.auth().currentUser.displayName,
        //   email: firebase.auth().currentUser.email,
        // })

        console.log(firebase.auth().currentUser)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  static createUserInDatabase (user) {
    firebase.database().ref(`users`).child(firebase.auth().currentUser.uid).set({
      username: user.name,
      email: user.email,
      // games: Library.getGamesObjects(),
      // customLibraries: Library.customs.getAll(),
      settings: config.loadDefaults()
    })
      .then(() => {
        Authentication.getUserDataFromDatabase()
        Promise.resolve()
      })
  }

  static signUpUser (user, callback) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        // Create user entry in the database.
        Authentication.createUserInDatabase(user)
          // .then(() => {
          //   console.log('%c[AuthService]: %cUser signed up!', 'color:blue;', 'color:green;', {
          //     username: firebase.auth().currentUser.displayName,
          //     email: firebase.auth().currentUser.email,
          //   })

        Authentication.authenticateUser(user, callback)

            // Authentication.authenticateUser(user)
      })

        // Load user's database info into the app.
        // firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value')
        //   .then(snapshot => {
        //     firebase.auth().currentUser.updateProfile({
        //       displayName: snapshot.val().username
        //     })
        //   })

        // Authentication.getUserDataFromDatabase(

      .catch(err => {
        if (err) console.log(err.message)
        return
      })
  }

  static signOut () {
    firebase.auth().currentUser.signOut()
      .then(() => {
        console.log('%c[AuthService]: %cUser signed out successfully', 'color:blue;', 'color:green;')
      })

    // Clean up HidrogenUser data.
  }

  static uploadUserProfilePicture (file, callback) {
    firebase.storage().ref('profilePics').child(firebase.auth().currentUser.uid).put(file)
      .then(() => {
        callback()
      })
  }

  static isUserAuthenticated () {
    if (firebase.auth().currentUser) {
      return true
    } else {
      return false
    }
  }
}
