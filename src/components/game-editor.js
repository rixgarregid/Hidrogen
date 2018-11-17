const LibraryManager = require('../library-manager')
const { dialog } = require('electron').remote
const I18n = require('../translator')
const i18n = new I18n()

class GameEditor extends HTMLElement {
  constructor () {
    super()

    this.libraryManager = new LibraryManager()

    this.hidrogenBoard = document.querySelector('hidrogen-board')
    this.hidrogenSidebar = document.querySelector('hidrogen-sidebar')

    this.render()
    this.attachEvents()
  }

  validateInputs () {
    if (this.querySelector('.game-name-input').value == '') {
      this.querySelector('.game-name-input').classList.add('error')
    } else {
      this.querySelector('.game-name-input').classList.remove('error')
    }
  }

  getInputsValue () {
    return {
      name: this.querySelector('.game-name-input').value,
      path: this.querySelector('.game-path-input').value,
      synopsis: this.querySelector('.game-synopsis-input').value,
      thumbnailPath: this.querySelector('.game-name-input').value,
      developer: this.querySelector('.game-developer-input').value,
      year: this.querySelector('.game-year-input').value,
      genre: this.querySelector('.game-genre-input').value,
      adquisitionDate: this.querySelector('.game-adquisition-date-input').value,
      finishedOnDate: this.querySelector('.game-finished-date-input').value,
    }
  }

  attachEvents () {

    const openGamePathInputDialog = () => {
      dialog.showOpenDialog({ properties: ['openDirectory'] }, folderPath => {
        this.querySelector('.game-path-input').value = folderPath
      })
    }

    const openGameBackgroundImgDialog = () => {
      dialog.showOpenDialog({ properties: ['openFiles'], filters: [{name: 'Images (*.jpg, *.png)', extensions: ['jpg', 'png', 'gif']}] }, files => {
        console.log(files[0])
      })
    }

    const addGame = () => {
      if (!this.validateInputs()) return

      this.libraryManager.addGame(this.getInputsValue())

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

    this.querySelector('.btn-cancel').addEventListener('click', closeGameEditor)
  }

  render () {
    this.classList.add('game-editor')
    this.classList.add('board-view')

    this.innerHTML = `
      <hidrogen-panel class="field">
        <input type="text" class="input-text game-name-input" placeholder="${i18n.translate('Game title')}">
      </hidrogen-panel>

      <hidrogen-panel class="field">
        <input type="text" class="input-text game-path-input" placeholder="${i18n.translate('Game path')}">
        <btn class="btn game-path-btn"><span class="icon icon-folder"></span>${i18n.translate('Select path')}</btn>
      </hidrogen-panel>

      <hidrogen-panel class="field huge-field">
        <textarea class="input-textarea game-synopsis-input" placeholder="${i18n.translate('Synopsis')}"></textarea>

        <hidrogen-panel class="panel game-image-preview-panel">
          <text class="text title">${i18n.translate('Preview')}</text>
          <text class="text sub-title">${i18n.translate('Recommended')} 200x300px</text>
        </hidrogen-panel>
        <btn class="btn game-image-btn"><span class="icon icon-file_upload"></span>${i18n.translate('Upload image')}</btn>

        <input type="text" class="input-text game-developer-input" placeholder="${i18n.translate('Developer')}">
        <input type="text" class="input-text game-year-input" placeholder="${i18n.translate('Launch year')}">
        <input type="text" class="input-text game-genre-input" placeholder="${i18n.translate('Genre')}">
        <input type="text" class="input-text game-adquisition-date-input" placeholder="${i18n.translate('Adquisition date')}">
        <input type="text" class="input-text game-finished-date-input" placeholder="${i18n.translate('Finished on')}">
      </hidrogen-panel>

      <btn class="btn btn-done"> ${i18n.translate('Save changes')} </btn>
      <btn class="btn btn-sec btn-cancel"> ${i18n.translate('Cancel')} </btn>
    `
  }
}

customElements.define('hidrogen-game-editor', GameEditor)