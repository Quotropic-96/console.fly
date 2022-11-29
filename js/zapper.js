class Zapper {
    constructor() {
        this.possibleOriginZones = [0, 1, 2];
        this.originZone = undefined;
        this.possibleTiers = [1, 2];
        this.tier = undefined;
        this.possiblePositions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
        this.position = undefined;
        this.deltaX = undefined;
        this.deltaY = undefined;
        this.diagonalShift = 0;
        this.coordinates = [];
        this.speed = 10;
    }

    _defineOriginZone() {
        this.originZone = this.possibleOriginZones[Math.floor(Math.random()*this.possibleOriginZones.length)];
    }

    _defineTier() {
        this.tier = this.possibleTiers[Math.floor(Math.random()*this.possibleTiers.length)];
    }

    _definePosition() {
        this.position = this.possiblePositions[Math.floor(Math.random()*this.possiblePositions.length)];
    }

    _defineDeltas() {
        switch (this.position) {
            case 'horizontal':
                this.deltaX = 190 * this.tier;
                this.deltaY = 50;
                // Add this line so horizontal zapper appears in the middle of the zone
                this.originZone += .5;
                break;
            case 'vertical':
                this.deltaX = 50;
                this.deltaY = 190 * this.tier;
                break;
            case 'diagonalUp':
                // Add this line so diagonal zapper appears with some margin
                this.originZone += .1;
                this.deltaX = 50;
                this.deltaY = 190 * this.tier;
                this.diagonalShift = 100;
                break;
            case 'diagonalDown':
                // Add this line so diagonal zapper appears with some margin
                this.originZone += .1;
                this.deltaX = 50;
                this.deltaY = 190 * this.tier;
                this.diagonalShift = -100;
                break;
            default:
                break;
        }
    }

    _computeCoordinates() {
        this.coordinates = [
            {
                x: 1100 + this.diagonalShift,
                y: 200*this.originZone
            },
            {
                x: 1100 + this.deltaX + this.diagonalShift,
                y: 200*this.originZone
            },
            {
                x: 1100 + this.deltaX,
                y: 200 * this.originZone + this.deltaY
            },
            {
                x: 1100,
                y: 200 * this.originZone + this.deltaY
            }
        ];
    }

    _moveLeft() {
        this.coordinates.forEach(point => {
            if (point.x + this.deltaX > 0) {
                point.x -= this.speed;
            }
        })
    }
    
    _computeSpeed(dt) {
        this.speed += Math.round(dt/500);
    }
}