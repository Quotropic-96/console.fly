class Game{
  constructor(context, metersHTML) {
    this.ctx = context;
    this.player = new Player(150,400,80,112, playerRun, playerJump, playerFly, playerFall, this.ctx);
    this.zappers = [];
    this.missiles = [];
    this.bgLayers = [];
    this.bgFloor = undefined;
    this.generateZappersInterval = undefined;
    this.zapperGenerationProbability = 10000;   // Time in centi seconds when a new zapper will appear every second
    this.generateMissilesInterval = undefined;
    this.missileGenerationProbability = 100000;
    this.isCollission = false;
    this.metersHTML = metersHTML;
    this.dt = 0;
    this.meters = 0;
    this.computeMetersInterval = undefined;
    this.gameOver = false;
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
        this.player.jumpCount = 0;
      }
    })
  }

  _generateZappers() {
    this.generateZappersInterval = setInterval(() => {
      if (Math.random()*this.zapperGenerationProbability < this.dt){
        const newZapper = new Zapper(zapperHAnimation, zapperVAnimation, eBAnimation, this.ctx);
        newZapper._defineOriginZone();
        newZapper._defineTier();
        newZapper._definePosition();
        newZapper._defineDeltas();
        newZapper._computeCoordinates();
        newZapper._computeSpeed(this.dt);
        this.zappers.push(newZapper);
      }
    },1000);
  }

  _generateMissiles() {
    this.generateMissilesInterval = setInterval(() => {
      const newMissile = new Missile(1000, this.player.y, 100, 50, missileMoveLeft, this.ctx);
      newMissile._alertPlayer();
      newMissile._computeSpeed(this.dt);
      this.missiles.push(newMissile);
    },2000);
  }

  _drawPlayer() {
    if (this.player.isFly) {
      this.player._animatePlayerJump();
      this.player._animatePlayerFly();
    } else if (this.player.isFall) {
      this.player._animatePlayerFall();
    } else {
      this.player._animatePlayerRun();
    }
  }

  _drawZappers() {
    this.zappers.forEach(zapper => {
      zapper._animateZapper();
    });
  }

  _drawMissiles() {
    this.missiles.forEach(missile => {
      missile._animateMoveLeft();
    })
  }

  _drawBackground() {
    this.bgLayers.forEach(layer => layer._parallaxAnimate());
  }

  _drawFloor() {
    this.bgFloor._parallaxAnimate();
    //this.ctx.drawImage(floor, 0, 0, 1000, 600);
  }

  _redrawAll() {
    this._cleanScreen();
    this._drawBackground();
    this._drawFloor();
    this._drawPlayer();
    this._drawZappers();
    this._drawMissiles();
  }

  _movePlayer() {
    if (!this.gameOver) {
      if (this.player.isFly) {
        this.player.fly();
      }
      if (!this.player.isFly) {
        this.player.fall();
      }
    }
  }

  _moveZappers() {
    this.zappers.forEach(zapper => {
      zapper._moveLeft();
    })
  }

  _moveMissiles() {
    this.missiles.forEach(missile => {
      missile._followPlayerWhenAlert(this.player.y);
      missile._moveLeft();
    })
  }

  _moveAll() {
    this._moveZappers();
    this._moveMissiles();
    this._movePlayer();
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

  _checkSquareHit(playerX, playerY, playerWidth, playerHeight, obstacleX, obstacleY, obstacleWidth, obstacleHeight) {
    if (((playerX <= obstacleX && obstacleX <= playerX + playerWidth)||(playerX <= obstacleX + obstacleWidth && obstacleX + obstacleWidth <= playerX + playerWidth)) 
      && 
      ((playerY <= obstacleY && obstacleY <= playerY + playerHeight)||(playerY <= obstacleY + obstacleHeight && obstacleY + obstacleHeight <= playerY + playerHeight))) {
        this.ctx.fillStyle = 'red';
        this.gameOver = true;
    } else if (((obstacleX <= playerX &&  playerX <= obstacleX + obstacleWidth)||(obstacleX <= playerX + playerWidth && playerX + playerWidth <= obstacleX + obstacleWidth)) 
      && 
      ((obstacleY <= playerY && playerY <= obstacleY + obstacleHeight)||(obstacleY <=  playerY + playerHeight && playerY + playerHeight <= obstacleY + obstacleHeight))) {
        this.ctx.fillStyle = 'red';
        this.gameOver = true;
    }
  }

  _checkDiagonalHit(playerX, playerY, playerWidth, playerHeight, obstacleX0, obstacleY0, deltaX, deltaY, diagonalShift) {
    // X0 and Y0 are the coordinates of the top left point of the obstacle. 
    // DeltaY: Orthogonal height of the obstacle.
    // diagonalShift: Orthogonal x distance between two points otherwise aligned vertically. Positive for diagonalUp, Negative for diagonalDown
    
    // Split diagonal object into 10 small rectangles
    let x0 = obstacleX0 + deltaX * 0.1 * (-1) * diagonalShift/Math.abs(diagonalShift);
    let y0 = obstacleY0;
    let dy = 50;
    let dx = - diagonalShift/10;
    while (y0 < obstacleY0 + deltaY) {
      this._checkSquareHit(playerX, playerY, playerWidth, playerHeight, x0, y0, deltaX, dy);
      x0 += dx;
      y0 += dy;
    }
  }

  _checkCollissions() {
    // Missile Collision
    this.missiles.forEach(missile => {
      this._checkSquareHit(this.player.x, this.player.y, this.player.width, this.player.height, missile.x, missile.y, missile.width, missile.height);
    });
    // Zapper Collision
    this.zappers.forEach(zapper => {
      if (zapper.position === 'horizontal' || zapper.position === 'vertical') {
        this._checkSquareHit(this.player.x, this.player.y, this.player.width, this.player.height, zapper.coordinates[0].x, zapper.coordinates[0].y, zapper.deltaX, zapper.deltaY);
      } else {
        this._checkDiagonalHit(this.player.x, this.player.y, this.player.width, this.player.height, zapper.coordinates[0].x, zapper.coordinates[0].y, zapper.deltaX, zapper.deltaY, zapper.diagonalShift);
      }
    });
  }

  _computeMeters() {
    this.computeMetersInterval = setInterval(() => {
      this.dt += 1;
      this.meters += 0.5*0.1*(this.dt/6000);
    })
  }

  _displayMeters() {
    this.metersHTML.innerHTML = `${Math.round(this.meters)}`;
  }

  _freezeGame() {
    this.missiles.forEach(missile => missile.speed = 0);
    this.zappers.forEach(zapper => zapper.speed = 0);
    this.bgLayers.forEach(layer => layer.isFreeze = true);
    this.bgFloor.isFreeze = true;
  }

  _drawLoseText() {
    this.ctx.font = "30px Imapct";
    this.ctx.fillText('You Loose Sucker!', 400, 200);
  } 

  _update() {
    this._cleanArrays();
    this._moveAll();
    this._checkCollissions();
    this._redrawAll();
    this._displayMeters();
    this._checkGameOver();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._generateZappers();
    this._generateMissiles();
    this._computeMeters();
    bg.forEach((img,idx) => {
      let newLayer = new Layer(this.ctx, idx, img);
      this.bgLayers.push(newLayer);
    })
    this.bgFloor = new Layer(this.ctx, 3, floor);
    this._update();
  }

  _checkGameOver() {
    if (this.gameOver) {
      this._freezeGame();
      this._drawLoseText();
      clearInterval(this.generateMissilesInterval);
      clearInterval(this.generateZappersInterval);
      clearInterval(this.computeMetersInterval);
    }
  }
}