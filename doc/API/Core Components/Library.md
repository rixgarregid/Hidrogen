# Library

> `Library` is one of core Hidrogen's components. It manages all the games' stuff and controls their state in the app. Using this component we can add, remove, create and save games.

An instance of the `Library` component is available as `hidrogen.library` in all components of the app.

## Properties

#### games
An `Array` of `Game` objects.

#### gamesFolder
A `String` representing the path to the `game` folder where games' data is stored.

#### gameCounter
An `Integer` which represents the number of games in the library.

## Dealing with games

#### add (game)
Adds a new game to the `Library`.

- Arguments
	- `game` The `Game` instance to be added to the `Library`.


- Returns the `Game` object added.

**Example**
```javascript
const game = new Game(Game.generateId(), 'Some cool game!', 'D:/Somewhere/game.exe', 'D:/Somewhere/bg.png')

hidrogen.library.add(game)
```

#### createGameElement (gameData)
Creates a `Game` object and appends it to the `Library`'s DOM.

- Arguments
	- `gameData` An `Object` containing the game's data. See [GameDataObject](../docs/GameDataObject.md) for more information.

**Example**
```javascript
const gameDataObject = {
    id: Game.generateId(),
    title: 'Some cool game!',
    path: 'D:/Somewhere/game.exe',
    customBackground: 'D:/Somewhere/picture.png'
}

hidrogen.library.createGameElement(gameDataObject)
```

#### loadGames ()
Loads games into the library, looking for game data files using the `gamesFolder` property and extracting the JSON data, which will be passed to the `createGameElement ()` method to create a `Game` object and then add it to the library with the `add ()` method.

#### getGame (gameId)
Returns a `Game` object with the `gameId` from the `Library`.

- Arguments
	- `gameId` An `Integer` representing the `Id` of the `Game` object we wanna get.

#### getAllGames ()
Returns `Game[]`, an `Array` containing all the `Game` objects in the `Library`.

#### remove (game)
Removes a `Game` object from the `Library` and deletes its data files.

- Arguments
	- `game` The `Game` object to be removed.

**Example**
```javascript
const game = hidrogen.library.getGame(138734)

hidrogen.library.remove(game)
```

## Library management

#### clean ()
Removes all the `Game` objects from the `Library`.

#### initializeGameCounter ()
Sets the initial state for the game counter. Displays it or not depending on the `library.gameCounter` configuration.

- Returns an `Integer` representing the initial value of the `gameCounter` property.

#### getGamesFolderPath ()
Returns a `String` containing the `gamesFolder` property.

#### getTotalGames ()
Returns an `Integer` representing the total number of `Game` objects in the `Library`.

#### reload ()
Reloads the `Library`.

#### search (game)
Displays `Game` objects matching the `Game` object given.

- Arguments
	- `game` `Game` object we're looking for.

#### updateGameCounter (amount)
Updates the `gameCounter` property and element.

- Arguments
	- `amount` An `Integer` representing the number to be set in the `gameCounter`.

## Event subscription

#### onDidAddGame (callback)
nvokes the given `callback` when a `Game` object is added to the `Library`.

- Arguments
	- `callback ()` `Function` to be called when a `Game` is added to the `Library`.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

#### onDidClean (callback)
Invokes the given `callback` when the `Library` is cleaned.

- Arguments
	- `callback ()` `Function` to be called when the `Library` is cleaned.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

#### onDidLoadGames (callback)
Invokes the given `callback` when  all `Game` objects are loaded into the `Library`.

- Arguments
	- `callback ()` `Function` to be called when all `Game` objects are loaded into the `Library`.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

#### onDidRemoveGame (callback)
Invokes the given `callback` when a `Game` object is removed from the `Library`.

- Arguments
	- `callback ()` `Function` to be called when a `Game` is removed from the `Library`.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

<!-- BEGIN OVERVIEW -->

## Overview

#### Properties

`games` `Array` <br>
`gamesFolder` `String` <br>
`gameCounter` `Integer` <br>

#### Dealing with games

`add (game)` <br>
`createGameElement (gameData)` <br>
`loadGames ()` <br>
`getGame (gameId)` <br>
`getAllGames ()` <br>
`remove (game)`<br>

#### Library management

`clean ()` <br>
`initializeGameCounter ()` <br>
`getGamesFolderPath ()` <br>
`getTotalGames ()` <br>
`reload ()` <br>
`search (game)` <br>
`updateGameCounter (amount)` <br>

#### Event subscription
`onDidAddGame (callback)` <br>
`onDidClean (callback)` <br>
`onDidLoadGames (callback)` <br>
`onDidRemoveGame (callback)` <br>

<!-- FINISH OVERVIEW -->
