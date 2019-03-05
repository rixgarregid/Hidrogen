const Editor = require('./editor')

class CustomLibraryEditor extends Editor {
  constructor () {
    super()
    this.customIcons = this.children('.custom-icons-grid span')
    this.subscribeToDOMEvents()
  }

  subscribeToDOMEvents () {
    this.child('.cancel-btn').onDidClick(() => { this.close() })
    this.child('.custom-icon-toggle').onDidToggle(() => {
      if (this.child('.custom-icon-toggle').isChecked()) {
        this.child('.custom-icons-grid').classList.add('active')
      } else {
        this.child('.custom-icons-grid').classList.remove('active')
      }
    })

    for (let icon of this.customIcons) {
      icon.addEventListener('click', () => {
        for (let icon of this.customIcons) {
          if (icon.classList.contains('selected')) icon.classList.remove('selected')
        }

        icon.classList.add('selected')
      })
    }
  }

  render () {
    super.setEditorContent(`
      <hidrogen-input type="text" label="Nombre de la biblioteca" class="lib-name-field"></hidrogen-input>
      <hidrogen-input type="toggle" label="Icono personalizado" class="custom-icon-toggle"></hidrogen-input>

      <hidrogen-panel class="custom-icons-grid">
        <span class="icon-turned_in"></span>
        <span class="icon-turned_in_not"></span>
        <span class="icon-photo_library"></span>
        <span class="icon-dashboard selected"></span>
        <span class="icon-desktop_windows"></span>
        <span class="icon-favorite"></span>
        <span class="icon-favorite_border"></span>
        <span class="icon-star"></span>
        <span class="icon-star_border"></span>
        <span class="icon-people"></span>
        <span class="icon-headset_mic"></span>
        <span class="icon-steam2"></span>
        <span class="icon-twitch"></span>
      </hidrogen-panel>

      <hidrogen-panel class="editor-btns">
        <hidrogen-btn type="default" text="Cancelar" class="cancel-btn outlined"></hidrogen-btn>
        <hidrogen-btn type="success" text="Crear biblioteca" icon="add" class="create-lib-btn"></hidrogen-btn>
      </hidrogen-panel>
    `)
  }
}

customElements.define('hidrogen-custom-library-editor', CustomLibraryEditor)
