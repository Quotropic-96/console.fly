class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isFly = false;
    }
    fly() {
        if (this.y > 0) {
            this.y -= 10;
        }
    }
    fall() {
        if (this.y + this.height < 600) {
            this.y += 10;
        }
    }
}