class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isFly = false;
        this.isFalling = false;
        this.fallCount = 1;
    }
    fly() {
        this.isFalling = false;
        this.fallCount = 1;
        if (this.y > 0) {
            this.y -= 10;
        }
    }
    fall() {
        let yIncrement = 0.5*3*(2*this.fallCount-1);
        if (this.y + this.height + yIncrement < 600) {
            this.isFalling = true;
            this.y += yIncrement;
        } else {
            this.y = 600 - this.height;
            this.isFalling = false;
        }
        this._fallCount();
    }
    _fallCount() {
        if (this.isFalling) {
            this.fallCount += 1;
        } else {
            this.fallCount = 1;
        }
    }
}