class Game{
  constructor(context) {
    this.ctx = context;
    this.player = new Player(150,400,50,100);
  }

  _assignControls() {
    // Controles del teclado
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.fly();
          break;
        case 'ArrowDown':
          //this.player.moveRight();
          break;
        default:
          break;
      }
    });
  }

  _drawplayer() {
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
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