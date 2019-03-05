const Config = require('./config')
const config = new Config()

// const { Library, Home, Settings } = require('./UIView')

const firebaseService = {
  auth: firebase.auth(),
  db: firebase.database(),
  storage: firebase.storage()
}

const firebaseAuth = firebase.auth()
const firebaseDB = firebase.database()
const firebaseStorage = firebase.storage()

module.exports =
class Authentication {
  static getCurrentUser () {
    return {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      picture: firebase.auth().currentUser.photoURL
    }
  }

  static authenticateUser (user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        // Log successful user login.
        console.log('%c[AuthService]: %cLogged in successfully as', 'color:blue;', 'color:green;', {
          username: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
        })

        console.log(firebase.auth().currentUser)

        // Load user's database info into the app.
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value')
          .then(snapshot => {
            firebase.auth().currentUser.updateProfile({
              displayName: snapshot.val().username
            })
          })

        return Promise.resolve(firebase.auth().currentUser)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  static signUpUser (user) {
    console.log('%c[AuthService]: %cUser signed up!', 'color:blue;', 'color:green;', {
      username: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
    })

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        // Create user entry in the database.
        firebase.database().ref(`users`).child(firebase.auth().currentUser.uid).set({
          username: user.name,
          email: user.email,
          // picture: user.picture,
          // games: Library.getGamesObjects(),
          // customLibraries: Library.customs.getAll(),
          settings: config.loadDefaults()
        })

        // Load user's database info into the app.
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value')
          .then(snapshot => {
            firebase.auth().currentUser.updateProfile({
              displayName: snapshot.val().username
            })
          })

        Authentication.authenticateUser(user)
      })
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
}
