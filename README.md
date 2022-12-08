# Console.fly()


[<img src="assets/pages/bg_1.png">]()

## Description

Console.fly() is a runner game. The main character will be continuously running in an infinite flat platform being able to jump and fly. The player will not be able to move horizontally. During the run there will be two kind of obstacles.
Zapper obstacle: Staight static finite lines that con not collide with the player.
Missile obstacle: Leftwards moving objects that originate at the right side of the screen and go all the way up to the left side in a straight trajectory.
The goal of the game is to get as far as possible.

## User stories

- Fly when the space key is pressed.
- Fall with gravitational acceleration when the space key is released.
- See randomly generated zappers and missiles.
- See the meter count.
- Running speed increases as time passes.
- Game over when the player collides with one obstacle.
- Player can add his score to the top scores table.

## User stories Backlog

- Spinning zappers.
- Bouns boxes with some kind of temporal aid to the player.
- Change player's sprite.

## File structure

- <code>assets.js</code>: loads all audiovisual assets to be used. 
- <code>sounds.js</code>: defines sound functionalities.
- <code>player.js</code>: defines player class. Methods: 
    - fly()
    - fall()
    - \_animations()
- <code>zapper.js</code>: defines zapper class. Methods: 
    - \_defineOriginZone()
    - \_defineTier()
    - \_definePosition()
    - \_defineDeltas()
    - \_computeCoordinates()
    - \_computeSpeed()
    - \_animations()
- <code>missile.js</code>: defines missile class. Methods: 
    - \_alertPlayer()
    - \_followPlayerWhenAlert()
    - \_moveLeft()
    - \_computeSpeed() 
    - \_animations()
- <code>layer.js</code>: defines layer class for parallax animation.
- <code>game.js</code>: contains all the elements for the game to work. Methods: 
    - \_assignControls()
    - \_generateZappers()
    - \_generateMissiles()
    - \_redrawAll()
    - \_moveAll()
    - \_cleanArrays()
    - \_cleanScreen()
    - \_checkCollisions()
    - \_computeMeters()
    - \_freezeGame()
    - \_update()
    - start() 
    - \_checkGameOver()
- <code>instructions.js</code>: implements functionalities for instructions page. Functions:
    - typigEffect()
    - animateCharacter()
- <code>scores.js</code>: implements functionalities for end screen.
    - Add data to localStorage
    - Display top scores in page
- <code>scripts.js</code>: contains all the DOM manipulation code to start the game

## Useful links

<!-- When you finish, add these links and commit -->

- [Presentation slides](https://my.visme.co/view/mxw90rvj-console-fly-slides)
- [Deployed game]()
