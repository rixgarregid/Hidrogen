# Hidrogen API
Welcome to the Hidrogen API's documentation! Here you'll find all classes, components and methods which makes up Hidrogen described clearly so you can have an overall view of the whole app's infrastructure.

In Hidrogen we distinguish between three main types of classes: Cores, Major components and UI components.

## Core classes

<!-- HIDROGEN APP -->

#### HidrogenApp

###### Properties
- `dev` *Boolean.* True if Hidrogen is in development mode.
- `version` *String.* Hidrogen version.
- `window` *HidrogenWindow.* Native window instance.
- `config` *Config.*

###### Methods
- `start ()`
- `registerKeyboardCommands ()`
- `isSecondInstance ()`

<!-- HIDROGEN WINDOW -->

#### HidrogenWindow

###### Properties
- `dev` *Boolean.* True if Hidrogen is in development mode.
- `preferences`
- `iconPath`
- `browserWindow`

###### Methods
- `close ()`
- `focus ()`
- `show ()`
- `hide ()`
- `isVisible ()`
- `minimize ()`
- `isMinimized ()`
- `restore ()`

<!-- CONFIG -->

#### Config

###### Properties
- `defaults`

###### Methods
- `set (keyPath, value)`
- `get (keyPath)`
- `loadDefaults ()`
- `restoreDefaults ()`
- `createConfigFile ()`
- `checkConfigFile ()`

<!-- I18N -->

#### I18n

###### Properties
- `language`
- `loadedLanguage`
- `langResourcePath`

###### Methods
- `loadLanguage ()`
- `translate (phrase)`

## Major Components

<!-- APP -->

#### App

###### Properties
- `state`
- `appStateController`
- `sidebar`
- `board`
- `home`
- `library`
- `gameEditor`
- `settings`
- `about`
- `modals`
- `notifications`
- `config`

###### Methods
- `initializeState ()`
- `focus ()`
- `blur ()`
- `onDidFocus (callback)`
- `onDidBlur (callback)`
- `getComponent (component)`
- `getSystemInfo ()`

###### Events
- `did-focus`
- `did-blur`

<!-- TITLEBAR -->

#### Titlebar

###### Properties
- `windowController`

#### Sidebar

###### Properties
- `items`

###### Methods
- `updateSelectedItem (item)`

<!-- LOADER -->

#### Loader

<!-- BOARD -->

#### Board

###### Properties
- `views`
- `activeView`

###### Methods
- `getView (view)`
- `getAllViews ()`
- `updateView (view)`

<!-- HOME -->

#### Home

###### Methods
- `playBackgroundVideo ()`
- `pauseBackgroundVideo ()`

<!-- LIBRARY -->

#### Library

###### Properties
- `gamesFolder`
- `gameCounter`

###### Methods
- `initializeGameCounter ()`
- `loadGames ()` Load each game's data from its `game.json` file in the `games/` directory.
- `add (gameData)` Creates a `<hidrogen-game>` element and its data files, then this game is added to the library.
- `remove (gameId)`
- `getGame (gameId)` Returns a `<hidrogen-game>` which matchs the `gameId` param.
- `getAllGames ()` Returns an `Array` with all the `<hidrogen-game>` elements in the library.
- `getGamesFolderPath ()`
- `clean ()`
- `reload ()`
- `getTotalGames ()`
- `updateGameCounter (count)`

<!-- GAME -->

#### Game

###### Properties
- `id`
- `title`
- `path`
- `customBackground`

###### Methods
- `play ()`
- `getData ()`
- `getId ()`
- `getTitle ()`
- `setTitle (title)`
- `getPath ()`
- `setPath (path)`
- `getCustomBackground ()`
- `setCustomBackground (image)`
- `openGameFolder ()`
- `destroy ()`
- `onDidCreate (callback)`
- `onDidDestroy (callback)`
- `onDidChangeTitle (callback)`
- `onDidChangePath (callback)`
- `onDidChangeCustomBackground (callback)`

###### Events
- `did-create`
- `did-destroy`
- `did-change-title`
- `did-change-path`
- `did-change-custom-background`

<!-- GAMEEDITOR -->

#### GameEditor

###### Methods
- `getInputsValue ()`
- `validateInputs ()`
- `clean ()`
- `fill (gameData)`
- `close ()`

<!-- SETTINGS -->

#### Settings

###### Properties
- `settings`

###### Methods
- `load ()`
- `save ()`
- `close ()`

<!-- ABOUT -->

#### About

###### Methods
- `close ()`

<!-- MODALMANAGER -->

#### ModalManager

###### Methods
- `get (modal)`

<!-- UI COMPONENTS -->

## UI Components

<!-- BUTTON -->

#### Button

###### Properties
- `type`
- `icon`
- `text`
- `customContent`
- `disabled`

###### Methods
- `enable ()`
- `disable ()`
- `addCustomContent (content)`
- `destroy ()`
- `onDidClick (callback)`

###### Events
- `did-click`
- `did-destroy`

<!-- DROPDOWN -->

#### Dropdown

###### Properties
- `items`

###### Methods
- `getItems ()`
- `selectItem (item)`
- `getSelectedItem ()`
- `setDropdownMaxHeight ()`

<!-- INPUT -->

#### Input

###### Properties
- `type`
- `label`
- `value`
- `disabled`

###### Methods
- `isFocused ()`
- `isChecked ()`
- `enable ()`
- `disable ()`
- `destroy ()`
- `onDidClick (callback)`
- `onDidFocus (callback)`
- `onDidBlur (callback)`
- `onDidDestroy (callback)`

###### Events
- `did-click`
- `did-focus`
- `did-blur`
- `did-destroy`

<!-- LIST -->

#### List

###### Properties
- `items`
- `title`
- `behaviour`

###### Methods
- `getItems ()`
- `getSelectedItem ()`

<!-- MODAL -->

#### Modal

###### Properties
- `type`
- `title`
- `content`

###### Methods
- `show ()`
- `close ()`
- `onDidConfirm (callback)`
- `onDidCancel (callback)`

###### Events
- `did-confirm`
- `did-cancel`

<!-- NOTIFICATION -->

#### Notification
