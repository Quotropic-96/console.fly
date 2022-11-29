class Game{
  constructor(context) {
    this.ctx = context;
    this.player = new Player(150,400,50,100);
    this.zappers = [];
    this.missiles = [];
    this.generateZappersInterval = undefined;
    this.generateMissilesInterval = undefined;
    this.isCollission = false;
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowUp' || event.code === 'Space') {
        this.player.isFly = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowUp' || event.code === 'Space') {
        this.player.isFly = false;
      }
    })
  }

  _generateZappers() {
    this.generateZappersInterval = setInterval(() => {
      const newZapper = new Zapper();
      newZapper._defineOriginZone();
      newZapper._defineTier();
      newZapper._definePosition();
      newZapper._defineDeltas();
      newZapper._computeCoordinates();
      this.zappers.push(newZapper);
    },1000);
  }

  _generateMissiles() {
    this.generateMissilesInterval = setInterval(() => {
      const newMissile = new Missile(1000, this.player.y, 50, 50);
      newMissile._alertPlayer();
      this.missiles.push(newMissile);
    },2000);
  }

  _drawplayer() {
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    if (this.player.isFly) {
      this.player.fly();
    }
    if (!this.player.isFly) {
      this.player.fall();
    }
  }

  _drawZappers() {
    this.zappers.forEach(zapper => {
      this.ctx.beginPath();
      this.ctx.moveTo(zapper.coordinates[0].x, zapper.coordinates[0].y);
      zapper.coordinates.forEach(point => this.ctx.lineTo(point.x,point.y));
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  _drawMissiles() {
    this.missiles.forEach(missile => {
      this.ctx.fillStyle = missile.color;
      this.ctx.fillRect(missile.x, missile.y, missile.width, missile.height);
      this.ctx.fillStyle = 'black';
    })
  }

  _moveZappers() {
    this.zappers.forEach(zapper => {
      zapper._moveLeft();
    })
  }

  _moveMissiles() {
    this.missiles.forEach(missile => {
      missile._moveLeft();
    })
  }

  _cleanZappers() {
    this.zappers = this.zappers.filter(zapper => {
      let isVisible = false;
      zapper.coordinates.forEach(point => {
        if (point.x > 0) {
          isVisible = true;
        }
      });
      return isVisible;
    });
  }

  _cleanMissiles() {
    this.missiles = this.missiles.filter(missile => {
      let isVisible = false;
      if (missile.x + missile.width > 0) {
        isVisible = true;
      }
      return isVisible;
    });
  }

  _cleanArrays() {
    this._cleanZappers();
    this._cleanMissiles();
  }

  _cleanScreen() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _moveAll() {
    this._moveZappers();
    this._moveMissiles();
  }

  _redrawAll() {
    this._cleanScreen();
    this._drawplayer();
    this._drawZappers();
    this._drawMissiles();
  }

  _checkSquareHit(playerX, playerY, playerWidth, playerHeight, obstacleX, obstacleY, obstacleWidth, obstacleHeight) {
    if (((playerX < obstacleX && obstacleX < playerX + playerWidth)||(playerX < obstacleX + obstacleWidth && obstacleX + obstacleWidth < playerX + playerWidth)) 
      && 
      ((playerY < obstacleY && obstacleY < playerY + playerHeight)||(playerY < obstacleY + obstacleHeight && obstacleY + obstacleHeight< playerY + playerHeight))) {
        this.ctx.fillStyle = 'red';
    } else if (((obstacleX < playerX &&  playerX < obstacleX + obstacleWidth)||(obstacleX < playerX + playerWidth && playerX + playerWidth < obstacleX + obstacleWidth)) 
      && 
      ((obstacleY < playerY && playerY < obstacleY + obstacleHeight)||(obstacleY <  playerY + playerHeight && playerY + playerHeight < obstacleY + obstacleHeight))) {
        this.ctx.fillStyle = 'red';
    }
  }

  _checkDiagonalHit(playerX, playerY, playerWidth, playerHeight, obstacleX0, obstacleY0, deltaX, deltaY, diagonalShift) {
    // X0 and Y0 are the coordinates of the top left point of the obstacle. 
    // DeltaY: Orthogonal height of the obstacle.
    // diagonalShift: Orthogonal x distance between two points otherwise aligned vertically. Positive for diagonalUp, Negative for diagonalDown
    
    // Split diagonal object into 10 small rectangles
    let x0 = obstacleX0 + deltaX * 0.1 * (-1) * diagonalShift/Math.abs(diagonalShift);
    let y0 = obstacleY0;
    let dy = deltaY/10;
    let dx = - diagonalShift/10;
    while (y0 < obstacleY0 + deltaY) {
      this._checkSquareHit(playerX, playerY, playerWidth, playerHeight, x0, y0, deltaX, dy);
      x0 += dx;
      y0 += dy;
    }
  }

  _checkCollissions() {
    // // Missile Collision
    // this.missiles.forEach(missile => {
    //   this._checkSquareHit(this.player.x, this.player.y, this.player.width, this.player.height, missile.x, missile.y, missile.width, missile.height);
    // });
    // Zapper Collision
    this.zappers.forEach(zapper => {
      if (zapper.position === 'horizontal' || zapper.position === 'vertical') {
        this._checkSquareHit(this.player.x, this.player.y, this.player.width, this.player.height, zapper.coordinates[0].x, zapper.coordinates[0].y, zapper.deltaX, zapper.deltaY);
      } else {
        this._checkDiagonalHit(this.player.x, this.player.y, this.player.width, this.player.height, zapper.coordinates[0].x, zapper.coordinates[0].y, zapper.deltaX, zapper.deltaY, zapper.diagonalShift);
      }
    });
  }

  _update() {
    this._cleanArrays();
    this._moveAll();
    this._checkCollissions();
    this._redrawAll();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._generateZappers();
    this._generateMissiles();
    this._update();
  }
}