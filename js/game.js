class Game{
  constructor(context) {
    this.ctx = context;
    this.player = new Player(150,400,50,100);
    this.zappers = [];
    this.missiles = [];
    this.generateZappersInterval = undefined;
    this.generateMissilesInterval = undefined;
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
    },1000);
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
      zapper.coordinates.forEach(point => this.ctx.lineTo(point.x,point.y))
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  _drawMissiles() {
    this.missiles.forEach(missile => {
      this.ctx.fillStyle = missile.color;
      this.ctx.fillRect(missile.x, missile.y, missile.width, missile.height);
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

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _update() {
    this._clean();
    this._drawplayer();
    this._moveZappers();
    this._moveMissiles();
    this._drawZappers();
    this._drawMissiles();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._generateZappers();
    this._update();
  }
}