const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 300,
    width: 100,
    height: 200,
    color: 'blue',
}

const enemy = {
    x: 500,
    y: 300,
    width: 10,
    height: 20,
    color:'red',
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        movePlayer(player, 'up');
        drawPlayer();
    }
    if (event.code === 'ArrowDown') {
        movePlayer(player, 'down');
        drawPlayer();
      }
    if (event.code === 'ArrowLeft') {
        movePlayer(player, 'left');
        drawPlayer();
    }
    if (event.code === 'ArrowRight') {
        movePlayer(player, 'right');
        drawPlayer();
    }
  });

function drawPlayer() {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    _checkSquareHit(player.x, player.y, player.width, player.height, enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillRect(player.x, player.y, player.width, player.height);
}


function movePlayer(player, direction) {
    if (direction === 'right') {
        player.x += 10;
    }
    if (direction === 'left') {
        player.x -= 10;
    }
    if (direction === 'up') {
        player.y -= 10;
    }
    if (direction === 'down') {
        player.y += 10;
    }
}

const deltaX = 40;
const deltaY= 190;
const diagonalShift= 100;

const obstacle = {
    deltaX: deltaX,
    deltaY: deltaY,
    diagonalShift: diagonalShift,
    coordinates: [
        {
            x: 500 + diagonalShift,
            y: 200
        },
        {
            x: 500 + deltaX + diagonalShift,
            y: 200
        },
        {
            x: 500 + deltaX,
            y: 200 + deltaY
        },
        {
            x: 500,
            y: 200 + deltaY
        }
    ]
}

// Square Hit tests
function _checkSquareHit(playerX, playerY, playerWidth, playerHeight, obstacleX, obstacleY, obstacleWidth, obstacleHeight) {
    if (((playerX <= obstacleX && obstacleX <= playerX + playerWidth)||(playerX <= obstacleX + obstacleWidth && obstacleX + obstacleWidth <= playerX + playerWidth)) 
      && 
      ((playerY <= obstacleY && obstacleY <= playerY + playerHeight)||(playerY <= obstacleY + obstacleHeight && obstacleY + obstacleHeight<= playerY + playerHeight))) {
        ctx.fillStyle = 'green';
    } else if (((obstacleX <= playerX &&  playerX <= obstacleX + obstacleWidth)||(obstacleX <= playerX + playerWidth && playerX + playerWidth <= obstacleX + obstacleWidth)) 
      && 
      ((obstacleY <= playerY && playerY <= obstacleY + obstacleHeight)||(obstacleY <=  playerY + playerHeight && playerY + playerHeight <= obstacleY + obstacleHeight))) {
        ctx.fillStyle = 'green';
    }
  }

// Diagonal Tests

// ctx.beginPath();
// ctx.moveTo(obstacle.coordinates[0].x, obstacle.coordinates[0].y);
// obstacle.coordinates.forEach(point => ctx.lineTo(point.x,point.y));
// ctx.fill();
// ctx.closePath();

// function diagonalHit(obstacleX0, obstacleY0, deltaX, deltaY, diagonalShift) {
//     let x0 = obstacleX0 + deltaX * 0.1 * (-1) * diagonalShift/Math.abs(diagonalShift);
//     let y0 = obstacleY0;
//     let dy = deltaY/10;
//     let dx = -diagonalShift/10;
//     ctx.fillStyle = 'red';
//     while (y0 < obstacleY0 + deltaY) {
//         ctx.fillRect(x0, y0, deltaX, dy);
//         // this._checkSquareHit(playerX, playerY, playerWidth, playerHeight, x0, y0, deltaX, dy);
//         x0 += dx;
//         y0 += dy;
//         //dy += deltaY/10;
//       }
// }

// diagonalHit(obstacle.coordinates[0].x, obstacle.coordinates[0].y, obstacle.deltaX, obstacle.deltaY, obstacle.diagonalShift);