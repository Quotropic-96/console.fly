const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 200
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

// Draw Obstacle

ctx.beginPath();
ctx.moveTo(obstacle.coordinates[0].x, obstacle.coordinates[0].y);
obstacle.coordinates.forEach(point => ctx.lineTo(point.x,point.y));
ctx.fill();
ctx.closePath();

function diagonalHit(obstacleX0, obstacleY0, deltaX, deltaY, diagonalShift) {
    let x0 = obstacleX0 + deltaX * 0.1 * (-1) * diagonalShift/Math.abs(diagonalShift);
    let y0 = obstacleY0;
    let dy = deltaY/10;
    let dx = -diagonalShift/10;
    ctx.fillStyle = 'red';
    while (y0 < obstacleY0 + deltaY) {
        ctx.fillRect(x0, y0, deltaX, dy);
        // this._checkSquareHit(playerX, playerY, playerWidth, playerHeight, x0, y0, deltaX, dy);
        x0 += dx;
        y0 += dy;
        //dy += deltaY/10;
      }
}

diagonalHit(obstacle.coordinates[0].x, obstacle.coordinates[0].y, obstacle.deltaX, obstacle.deltaY, obstacle.diagonalShift);