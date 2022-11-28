class Game{
  constructor(context) {
    this.ctx = context;
    this.player = new Player(150,400,50,100);
    this.zappers = [];
    this.generateZappersInterval = undefined;
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
      newZapper._definePosition();
      console.log(newZapper.position);
      this.zappers.push(newZapper);
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
      this.ctx.moveTo(zapper.xd, zapper.yd);
      this.ctx.lineTo(zapper.xu, zapper.yu);
      this.ctx.lineTo(zapper.xu + zapper.width, zapper.yu);
      this.ctx.lineTo(zapper.xu + zapper.width, zapper.yd);
      this.ctx.fill();
      this.ctx.closePath();
    })
  }

  _moveZappers() {
    this.zappers.forEach(zapper => {
      zapper._moveLeft();
    })
  }

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _update() {
    this._clean();
    this._drawplayer();
    this._moveZappers();
    this._drawZappers();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._generateZappers();
    this._update();
  }
}