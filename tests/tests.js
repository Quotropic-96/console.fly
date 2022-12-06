const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


window.onload = function () {
    const newZapper = new Zapper(zapperHAnimation, zapperVAnimation, eBAnimation, ctx);
    newZapper._defineOriginZone();
    newZapper.originZone = 1;
    newZapper._defineTier();
    newZapper.tier = 2;
    newZapper._definePosition();
    newZapper.position = 'diagonalUp';
    newZapper._defineDeltas();
    newZapper._computeCoordinates();
    newZapper._computeSpeed(100);
    newZapper.coordinates.forEach(point => {
        point.x -= 500;
    });
    newZapper._animateZapper();
    // drawCollissionBox(newZapper.coordinates[0].x, newZapper.coordinates[0].y, newZapper.deltaX, newZapper.deltaY, newZapper.diagonalShift);
    console.log(newZapper);
}

function drawCollissionBox(obstacleX0, obstacleY0, deltaX, deltaY, diagonalShift) {
    let x0 = obstacleX0 + deltaX * 0.1 * (-1) * diagonalShift/Math.abs(diagonalShift);
    let y0 = obstacleY0;
    let dy = 50;
    let dx = - diagonalShift/10;
    while (y0 < obstacleY0 + deltaY) {
        ctx.fillRect(x0, y0, deltaX, dy);
        // this._checkSquareHit(playerX, playerY, playerWidth, playerHeight, x0, y0, deltaX, dy);
        x0 += dx;
        y0 += dy;
      }
}


