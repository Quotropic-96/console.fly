class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isFly = false;
        this.isFall = false;
        this.accelerationCount = 1;
        this.gravity = 3;
    }
    fly() {
        this.isFall = false;
        this.accelerationCount = 1;
        if (this.y > 0) {
            this.y -= 10;
        }
    }
    fall() {
        let yIncrement = 0.5*this.gravity*(2*this.accelerationCount-1);
        if (this.y + this.height + yIncrement < 600) {
            this.isFall = true;
            this.y += yIncrement;
        } else {
            this.y = 600 - this.height;
            this.isFall = false;
        }
        this._fallCount();
    }
    _fallCount() {
        if (this.isFall) {
            this.accelerationCount += 1;
        } else {
            this.accelerationCount = 1;
        }
    }
}