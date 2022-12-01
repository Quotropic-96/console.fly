class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.floorHeight = 550;
        this.isFly = false;
        this.isFall = false;
        this.fallCount = 1;
        this.flyCount = 1;
        this.gravity = 4;
        this.acceleration = 2;
    }
    fly() {
        this.isFall = false;
        this.fallCount = 1;
        let yIncrement = 0.5*this.acceleration*(2*this.flyCount-1);
        if (this.y - yIncrement > 0) {
            this.y -= yIncrement;
        } else {
            this.y = 0;
        }
        this._flyCount();
    }
    fall() {
        this.flyCount = 1;
        let yIncrement = 0.5*this.gravity*(2*this.fallCount-1);
        if (this.y + this.height + yIncrement < this.floorHeight) {
            this.isFall = true;
            this.y += yIncrement;
        } else {
            this.y = this.floorHeight - this.height;
            this.isFall = false;
        }
        this._fallCount();
    }
    _fallCount() {
        if (this.isFall) {
            this.fallCount += 1;
        } else {
            this.fallCount = 1;
        }
    }
    _flyCount() {
        if (this.isFly) {
            this.flyCount += 1;
        } else {
            this.flyCount = 1;
        }
    }
}