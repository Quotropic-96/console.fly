class Missile {
    constructor(x, y , width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 20;
        this.isAlerting = true;
        this.color = rgb(255,0,0);
    }

    _alertPlayer() {
        setTimeout(() => {
            this.isAlerting = false;
            this.color = rgb(0,0,0);
        },1000);
    }

    _moveLeft() {
        if (!this.isAlerting && this.x + this.width > 0) {
            this.x -= this.speed;
        }
    }
}