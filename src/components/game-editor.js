const HidrogenComponent = require('./hidrogen-component')
const { dialog } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

class GameEditor extends HidrogenComponent {
  constructor () {
    super()
    this.classNames = ['board-view', 'game-editor']

    this.hidrogenLibrary = document.querySelector('hidrogen-library')
    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.attachEvents()

  }

  validateInputs () {
    if (this.child('.game-name-input').value == '') {
      this.child('.game-name-input').classList.add('error')
    } else {
      this.child('.game-name-input').classList.remove('error')
    }
  }

  getInputsValue () {
    return {
      name: this.child('.game-title-input').value,
      path: this.child('.game-path-input').value,
      customBackground: this.tempCustomBackgroundPath
    }
  }

  clean () {

  }

  attachEvents () {

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

            // Guardar la ruta del fondo temporalmente.
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

      this.hidrogenLibrary.add(gameDataObj)

      this.classList.remove('active')
      this.hidrogenBoard.updateView('library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    const closeGameEditor = () => {
      this.classList.remove('active')
      this.hidrogenBoard.updateView('library')
      this.hidrogenSidebar.updateSelectedListItem('library')
    }

    this.querySelector('.game-path-btn').addEventListener('click', openGamePathInputDialog)

    this.querySelector('.game-image-btn').addEventListener('click', openGameBackgroundImgDialog)

    this.querySelector('.btn-done').addEventListener('click', addGame)

    this.querySelector('.cancel-btn').addEventListener('click', closeGameEditor)
  }

  render () {
    super.render(`
      <hidrogen-panel class="field">
        <hidrogen-input class="game-title-input" label="${i18n.translate('Game title')}"></hidrogen-input>
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <hidrogen-input class="game-path-input" label="${i18n.translate('Game path')}"></hidrogen-input>
        <hidrogen-btn icon="icon-folder" text="${i18n.translate('Select path')}" class="game-path-btn"></hidrogen-btn>
      </hidrogen-panel>

      <hidrogen-panel class="field game-custom-bg-container">
        <hidrogen-panel class="panel game-custom-bg-preview">
          <text class="text title">${i18n.translate('Preview')}</text>
          <text class="text sub-title">${i18n.translate('Recommended')} 200x300px</text>
          <img src="../static/images/custom-background-template.gif" class="preview"></img>
        </hidrogen-panel>
        <hidrogen-btn icon="icon-file_upload" text="${i18n.translate('Upload image')}" class="game-image-btn"></hidrogen-btn>
      </hidrogen-panel>

      <hidrogen-btn type="success" text="${i18n.translate('Add game')}" class="btn-done"></hidrogen-btn>
      <hidrogen-btn text="${i18n.translate('Cancel')}" class=" outlined cancel-btn"></hidrogen-btn>
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
