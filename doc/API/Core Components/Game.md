# Game
> This component represents any game in the Hidrogen library.

You shouldn't create a `Game` instance directly. Use `hidrogen.library.createGameElement()` instead.

## Properties

#### id
A `Integer`

#### title
A `String` which represents the game's title.

#### path
A `String` which represents the path to the game's executable file.

#### customBackground
A `String` which represents the path to an image that will be displayed in the game's card.

## Playing the game

#### edit ()
Opens the `GameEditor` in `edit` mode to modify a game's properties.

#### getData ()
Returns an `Object` with the following properties:

- `id` Id of the game in which `getData()` is called.
- `title` Game's title
- `path` Game's path
- `customBackground` Game's custom background.

#### setBackgroundImage (imagePath)
Sets a background image for the game.

- Arguments
    - `imagePath` A `String` representing the path to the image to be assigned to the game.

#### openFolder ()
Opens the installation folder of the game.

- Returns a `String` which represents the path to the opened folder.

#### play ()
Runs the game.

**Experimental** A game can be run with certain arguments, which you may specify in the `args` argument.

- Arguments
    - `args` An `Array` which has the arguments of the game to be run.

**Example**
```javascript
hidrogen.library.getGame('895786').play(['-Displaymode 1', '-console'])
```

#### toggleMenu ()
Toggles the game menu.

## Game lifecycle

#### destroy ()
Destroys the `Game` instance. You shouldn't be using `destroy()` directly but `hidrogen.library.remove()` instead.

## Event subscriptions

#### onDidCreate (callback)
Invokes the given `callback` when the `Game` object is created.

- Arguments
	- `callback ()` `Function` to be called when the `Game` object is created.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

#### onDidEdit (callback)
Invokes the given `callback` when the `edit()` method is called in the `Game` instance.

- Arguments
	- `callback ()` `Function` to be called when the `edit()` method is called in the `Game` instance.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.

#### onDidDestroy (callback)
Invokes the given `callback` when the `Game` object is destroyed.

- Arguments
	- `callback ()` `Function` to be called when the `Game` object is destroyed.


- Returns a `Disposable` on which `.dispose()` can be called to unsubscribe.
