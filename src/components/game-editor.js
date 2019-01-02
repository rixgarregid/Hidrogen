const HidrogenComponent = require('./hidrogen-component')
const { dialog } = require('electron').remote
const { Emitter } = require('event-kit')
const fs = require('fs')
const path = require('path')
const I18n = require('../translator')
const i18n = new I18n()

class GameEditor extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'game-editor']
    this.emitter = new Emitter()
    this.subscribeToDOMEvents()
  }

  get mode () {
    return this.getAttribute('mode') || 'add-game'
  }

  set mode (mode) {
    this.setAttribute('mode', mode)
  }

  setMode (mode) {
    this.mode = mode
    if (mode === 'edit-game') {
      this.child('.btn-done span').innerText = 'Guardar cambios'
    } else if (mode === 'add-game') {
      this.child('.btn-done span').innerText = i18n.translate('Add game')
    }
  }

  getUserInput () {
    return {
      title: this.child('.game-title-input').value,
      path: this.child('.game-path-input').value,
      customBackground: this.tempCustomBackgroundPath
    }
  }

  addGameToLibrary (gameObject) {
    if (this.validate(gameObject)) {
      this.hidrogen.library.add(gameObject)
      this.close()
      this.clean()
    } else {
      console.log(`{GameEditor}: Not valid input to create a game data object.`)
    }
  }

  updateGame (data) {
    if (!this.validate(data)) return false
    let gameDataPath = path.join(this.hidrogen.library.getGamesFolderPath(), this.edittedGameData.id, 'game.json')
    data.id = this.edittedGameData.id
    fs.writeFileSync(gameDataPath, JSON.stringify(data, null, 2))
    this.close()
    this.clean()
  }

  validate (gameDataObj) {
    let titleIsValid, pathIsValid

    if (gameDataObj.title) {
      this.child('.game-title-input').classList.remove('error')
      titleIsValid = true
    } else {
      this.child('.game-title-input').classList.add('error')
      titleIsValid = false
    }

    if (gameDataObj.path) {
      this.child('.game-path-input').classList.remove('error')
      pathIsValid = true
    } else {
      this.child('.game-path-input').classList.add('error')
      pathIsValid = false
    }

    if (titleIsValid && pathIsValid) {
      return true
    } else {
      return false
    }
  }

  fill (gameObject) {
    console.log(gameObject)
    this.edittedGameData = gameObject
    this.child('.game-title-input').value = this.edittedGameData.title
    this.child('.game-path-input').value = this.edittedGameData.path
    this.child('.preview').src = this.edittedGameData.customBackground
    this.child('.preview').classList.add('active')
  }

  clean () {
    this.child('.game-title-input').value = ''
    this.child('.game-title-input .input-text-label').classList.remove('active')
    this.child('.game-path-input').value = ''
    this.child('.game-path-input .input-text-label').classList.remove('active')
    this.child('.preview').src = '../static/images/custom-background-template.gif'
    this.child('.preview').classList.remove('active')
    this.emitter.emit('did-clean')
  }

  close () {
    this.classList.remove('active')
    this.hidrogen.setView('library')
    this.emitter.emit('did-close')
  }

  onDidClean (callback) {
    this.emitter.on('did-clean', callback)
  }

  onDidClose (callback) {
    this.emitter.on('did-close', callback)
  }

  subscribeToDOMEvents () {
    this.child('.btn-done').onDidClick(() => {
      if (this.mode === 'add-game') {
        this.addGameToLibrary(this.getUserInput())
      } else if (this.mode === 'edit-game') {
        this.updateGame(this.getUserInput())
      }
    })

    this.child('.cancel-btn').onDidClick(() => { this.close() })

    const openGamePathInputDialog = () => {
      dialog.showOpenDialog({
        properties: ['openFiles'],
        filters: [{name: 'Ejecutables'}],
        extensions: ['exe']
      }, filePath => {
        if (filePath === undefined) return
        this.child('.game-path-input').value = filePath
        this.child('.game-path-input .input-text-label').classList.add('active')
      })
    }

    const openGameBackgroundImgDialog = () => {
      dialog.showOpenDialog({
        properties: ['openFiles'],
        filters: [{name: `${i18n.translate('Images')} (*.jpg, *.png)`,
        extensions: ['jpg', 'png', 'gif']}] },
        files => {
          if (files !== undefined) {
            this.child('.preview').classList.add('active')
            this.child('.preview').src = files[0]
            this.tempCustomBackgroundPath = files[0]
          } else {
            return
          }
      })
    }

    const addGame = () => {
      // Input validation will wait until next patch.
      // if (!this.validateInputs()) return
      let gameDataObj = this.getInputsValue()

      this.hidrogen.library.add(gameDataObj)

      this.close()
      this.clean()
    }

    this.child('.game-path-btn').addEventListener('click', openGamePathInputDialog)

    this.child('.game-image-btn').addEventListener('click', openGameBackgroundImgDialog)

    // this.child('.btn-done').addEventListener('click', addGame)

    // this.child('.cancel-btn').addEventListener('click', this.close)
  }

  render () {
    super.render(`
      <hidrogen-panel class="field">
        <hidrogen-input type="text" class="game-title-input" label="${i18n.translate('Game title')}"></hidrogen-input>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <hidrogen-input type="text" class="game-path-input" label="${i18n.translate('Game path')}"></hidrogen-input>
        <hidrogen-btn icon="folder" text="${i18n.translate('Select path')}" class="game-path-btn"></hidrogen-btn>
      </hidrogen-panel>

      <hidrogen-panel class="field game-custom-bg-container">
        <hidrogen-panel class="panel game-custom-bg-preview">
          <text class="text title">${i18n.translate('Preview')}</text>
          <text class="text sub-title">${i18n.translate('Recommended')} 200x300px</text>
          <img src="../static/images/custom-background-template.gif" class="preview"></img>
        </hidrogen-panel>
        <hidrogen-btn icon="file_upload" text="${i18n.translate('Upload image')}" class="game-image-btn"></hidrogen-btn>
      </hidrogen-panel>

      <hidrogen-btn text="${i18n.translate('Cancel')}" class="outlined cancel-btn"></hidrogen-btn>

      <hidrogen-btn type="success" text="
      ${ this.mode === 'add-game' ? i18n.translate('Add game') : 'Guardar cambios'}
      " class="btn-done"></hidrogen-btn>
    `)
  }
}

customElements.define('hidrogen-game-editor', GameEditor)

// <hidrogen-input>
//   <label class="input-text-label" for="game-name-input"> ${i18n.translate('Game title')} </label>
//   <input type="text" class="input-text game-name-input" name="game-name-input">
// </hidrogen-input>
// <input type="text" class="input-text game-name-input" placeholder="${i18n.translate('Game title')}">
// <hidrogen-panel class="field">
//   <input type="text" class="input-text game-path-input" placeholder="${i18n.translate('Game path')}">
//   <btn class="btn game-path-btn"><span class="icon icon-folder"></span>${i18n.translate('Select path')}</btn>
// </hidrogen-panel>
//
// <hidrogen-panel class="field huge-field">
//   <textarea class="input-textarea game-synopsis-input" placeholder="${i18n.translate('Synopsis')}"></textarea>
//
//   <hidrogen-panel class="panel game-image-preview-panel">
//     <text class="text title">${i18n.translate('Preview')}</text>
//     <text class="text sub-title">${i18n.translate('Recommended')} 200x300px</text>
//     <img src="" class="preview"></img>
//   </hidrogen-panel>
//
//   <btn class="btn game-image-btn"><span class="icon icon-file_upload"></span>${i18n.translate('Upload image')}</btn>
//
//   <input type="text" class="input-text game-developer-input" placeholder="${i18n.translate('Developer')}">
//   <input type="text" class="input-text game-year-input" placeholder="${i18n.translate('Launch year')}">
//   <input type="text" class="input-text game-genre-input" placeholder="${i18n.translate('Genre')}">
//   <input type="text" class="input-text game-adquisition-date-input" placeholder="${i18n.translate('Adquisition date')}">
//   <input type="text" class="input-text game-finished-date-input" placeholder="${i18n.translate('Finished on')}">
// </hidrogen-panel>
