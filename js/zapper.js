class Zapper {
    constructor() {
        this.xd = undefined;
        this.yd = undefined;
        this.xu = undefined;
        this.yu = undefined;
        this.width = 20;
        this.length = 50;
        // this.possiblePositions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
        this.possiblePositions = ['horizontal', 'vertical'];
        this.position = undefined;
    }
    _definePosition() {
        this.length += Math.floor(Math.random()*350);
        this.position = this.possiblePositions[Math.floor(Math.random()*this.possiblePositions.length)];
        switch (this.position) {
            case 'horizontal':
                this.xd = 1000;
                this.xu = this.xd + this.length;
                this.yd = Math.floor(Math.random()*500);
                this.yu = this.yd;
                break;
            
            case 'vertical':
                this.xd = 1000;
                this.xu = this.xd;
                this.yd = Math.floor(Math.random()*500);
                this.yu = this.yd - this.length;
                break;

            default:
                break;
        }
    }

    _moveLeft() {
        if (this.xd > 0 || this.xu > 0) {
            this.xd -= 10;
            this.xu -= 10;
        }
    }
}