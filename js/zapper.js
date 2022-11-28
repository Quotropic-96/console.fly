class Zapper {
    constructor() {
        this.xd;
        this.yd;
        this.xu;
        this.yu;
        this.width = 20;
        this.length = 50;
        // this.possiblePositions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
        this.possiblePositions = ['horizontal', 'vertical'];
        this.position;
    }
    _definePosition() {
        this.length += Math.floor(Math.random()*350);
        this.position = this.possiblePositions[Math.floor(Math.random()*this.possiblePositions.length)];
        switch (this.position) {
            case 'horizontal':
                this.xd = 1000;
                this.xu = this.xd + this.length;
                this.yd = Math.floor(Math.random()*200);
                this.yu = this.yd;
                break;
            
            case 'vertical':
                this.xd = 1000;
                this.xu = this.xd;
                this.yd = Math.floor(Math.random()*200);
                this.yu = this.yd - this.length;
                break;
                
            default:
                break;
        }
    }
}