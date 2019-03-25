//import { Settings } from '../UIView'
//import { defaultUserPicture } from '../routes'

//import logger from './logger'
//import defaultSettings from './default-settings'
const path = require('path')
const defaultSettings = require('./default-settings')

module.exports =
class Authentication {
  static getCurrentUser () {
    const user = firebase.auth().currentUser
    return {
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    }
  }

  static async createUser (user) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      await firebase.database().ref('users').child(firebase.auth().currentUser.uid).set({
        name: user.name,
        email: user.email,
        settings: defaultSettings
      })

      Authentication.getUserData()
        .then(createdUser => { return Promise.resolve(createdUser) })
    } catch (error) {
      // logger.error(error)
      return Promise.reject(error)
    }
  }

  static async authenticateUser (user) {
    try {
      await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      Authentication.getUserData()
        // .then(authenticatedUser => { console.log(authenticatedUser); return Promise.resolve(authenticatedUser) })
      return Promise.resolve(firebase.auth().currentUser)
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('No existe este usuario')
      }

      return Promise.reject(error)
    }
  }

  static async signOutUser (user) {
    try {
      await firebase.auth().currentUser.signOut()
      //logger.log('Auth', 'User signed out successfully.')
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static isUserAuthenticated () {
    if (firebase.auth().currentUser) {
      return true
    } else {
      return false
    }
  }

  static async getUserData () {
    const currentUser = firebase.auth().currentUser
    try {
      const userObject = await firebase.database().ref('users').child(currentUser.uid).once('value')
      currentUser.updateProfile({ displayName: userObject.val().name })

      if (currentUser.photoURL !== null) {
        const userPictureUrl = await firebase.storage().ref(`users/${currentUser.uid}`).child('profilePicture').getDownloadURL()
        currentUser.updateProfile({ photoURL: userPictureUrl })
      } else {
        currentUser.updateProfile({ photoURL: path.resolve('static/images/login-background.jpg') })
      }

      return Promise.resolve(firebase.auth().currentUser)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async updateUserName (name) {
    const usernameRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/name`)

    await usernameRef.set(name)
    const username = await usernameRef.once('value')
    firebase.auth().currentUser.updateProfile({ displayName: username })
  
    console.log(username.val())

    return Promise.resolve(username.val())
  }

  static async updateUserEmail (email) {

  }

  static async updateUserPicture (file) {
    try {
      await firebase.storage().ref(`users/${firebase.auth().currentUser.uid}`).child('profilePicture').put(file)

      const updatedPictureUrl = await firebase.storage().ref('users').child(firebase.auth().currentUser.uid).child('profilePicture').getDownloadURL()
      console.log(updatedPictureUrl)

      // firebase.auth().currentUser.updateProfile({ photoURL: updatedPictureUrl })
      /* const uploadTask = firebase.storage().put(file)
      uploadTask.on('state_changed', async snapshot => {
        if ((snapshot.bytesTransferred / snapshot.totalBytes) === 1) {
          const pictureUrl = await firebase.storage().ref('profilePics').child(firebase.auth().currentUser.uid).getDownloadURL()
          return Promise.resolve(pictureUrl)
        }
      }) */
      return Promise.resolve(updatedPictureUrl)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async updateUserSettings (settings) {

  }

  static async updateUserLibrary (library) {

  }

  static async sendEmailVerificationEmail (user) {

  }

  static async sendRestorePasswordEmail (user) {

  }
}
