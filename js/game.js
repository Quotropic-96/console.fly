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
      newZapper = new Zapper();
      newZapper.definePosition();
      this.zappers.push(newZapper);
    },1500);
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

  

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _update() {
    this._clean();
    this._drawplayer();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }
}