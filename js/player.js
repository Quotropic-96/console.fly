class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    fly() {
        if (this.y > 0) {
            this.y -= 10;
        } else {
            this.y += 5;
        }
    }
}