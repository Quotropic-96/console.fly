class Missile {
    constructor(x, y , width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 20;
        this.isAlerting = true;
        this.color = 'red';
    }

    _alertPlayer() {
        this.x -= this.width;
        setTimeout(() => {
            this.isAlerting = false;
            this.color = 'black';
        },1000);
    }

    _followPlayerWhenAlert(playerY) {
        if (this.isAlerting && playerY != this.y) {
            this.y += Math.abs(playerY - this.y)/(playerY - this.y)*5;
        }
    }

    _moveLeft() {
        if (!this.isAlerting && this.x + this.width > 0) {
            this.x -= this.speed;
        }
    }

    _computeSpeed(dt) {
        this.speed += Math.round(dt/500);
    }
}