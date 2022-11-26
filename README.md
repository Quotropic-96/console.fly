# Game name

<!-- When you finish, add a nice screenshot of your game -->
<!--[<img src="./img/page.png">]()-->

## Description

Console.fly() is a runner game. The main character will be continuously running in an infinite flat platform being able to fly with a jetpack (or some sort of propulsor). Tha player will not be able to move horizontally. During the run there will be two kind of obstacles.
Zapper obstacle: Staight static finite lines that con not collide with the player.
Missile obstacle: Leftwards moving objects that originate at the right side of the screen and go all the way up to the left side in a straight trajectory.
The goal of the game is to get as far as possible.

## User stories MVP

Minimum user stories:

- Fly when the space key is pressed.
- Fall with gravitational acceleration when the space key is released.
- See randomly generated zappers and missiles.
- Game over when the player collides with one obstacle.
- See the meter count.
- Running speed increases as time passes.

## User stories Backlog

- See spinning zappers.
- Bouns boxes with some kind of temporal aid to the player.
- Change player's sprite.

## File structure

- <code>assets.js</code>: loads all audiovisual assets to be used. 
- <code>player.js</code>: defines player class. Methods: fly(), fall()
- <code>zapper.js</code>: defines zapper class. Methods: \_definePosition()
- <code>missile.js</code>: defines missile class. Methods: \_moveLeft(), \_alertPlayer, \_computeSpeed() 
- <code>game.js</code>: contains all the elements for the game to work. Methods: 
    - start() 
    - \_update()
    - \_generateZappers
    - \_drawZappers()
    - \_generateMissiles
    - \_drawMissiles()
    - \_assignControls()
    - \_checkCollisions()
    - \_computeMeters()
    - \_drawPlayer()
    - \_clean()
- <code>scripts.js</code>: contains all the DOM manipulation code to start the game

## Useful links

<!-- When you finish, add these links and commit -->

- [Presentation slides]()
- [Deployed game]()
