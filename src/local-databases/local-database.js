const { EventEmitter } = require('events')
const path = require('path')
const fs = require('fs')

module.exports =
class LocalDatabase extends EventEmitter {
  constructor (dbSourceFile) {
    super()
    this.dbSourceFile = dbSourceFile
    this.hidrogen = document.querySelector('hidrogen-app')
  }

  setDBSource (path) {
    this.dbSourceFile = path
  }

  getDBSource () {
    return this.dbSourceFile
  }

  addKey (keyObject) {
    this.emit('did-add-key')
  }

  removeKey (keyObject) {
    this.emit('did-remove-key')
  }

  updateKey (keyObject, updatedKeyData = {}) {
    this.emit('did-update-key')
  }

  destroy () {
    this.emit('did-destroy')
  }

  onDidAddKey (callback) {
    this.on('did-add-key', callback)
  }

  onDidRemoveKey (callback) {
    this.on('did-remove-key', callback)
  }

  onDidUpdateKey (callback) {
    this.on('did-update-key', callback)
  }

  onDidDestroy (callback) {
    this.on('did-destroy', callback)
  }
}
