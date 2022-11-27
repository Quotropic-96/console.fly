class Game{
  constructor(context) {
    this.ctx = context;
    this.player = new Player(150,400,50,100);
  }

  _assignControls() {
    // Controles del teclado
    document.addEventListener('keydown', (event) => {
      console.log(event.code);
      if (event.code === 'ArrowUp' || event.code === 'Space') {
        this.player.fly();
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowUp' || event.code === 'Space') {
        this.player.fall();
      }
    })
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