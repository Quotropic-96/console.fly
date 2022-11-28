class Zapper {
    constructor() {
        this.possibleOriginZones = [0, 1, 2];
        this.originZone = undefined;
        this.possibleTiers = [1, 2];
        this.tier = undefined;
        this.possiblePositions = ['horizontal', 'vertical'];
        this.position = undefined;
        this.deltaX = undefined;
        this.deltaY = undefined;
        this.coordinates = [];
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
                break;
            case 'vertical':
                this.deltaX = 50;
                this.deltaY = 190 * this.tier;
                break;
            default:
                break;
        }
    }

    _computeCoordinates() {
        this.coordinates = [
            {
                x: 1000,
                y: 200*this.originZone
            },
            {
                x: 1000 + this.deltaX,
                y: 200*this.originZone
            },
            {
                x: 1000 + this.deltaX,
                y: 200 * this.originZone + this.deltaY
            },
            {
                x: 1000,
                y: 200 * this.originZone + this.deltaY
            }
        ];
    }

    _moveLeft() {
        this.coordinates.forEach(point => {
            if (point.x + this.deltaX > 0) {
                point.x -= 10;
            }
        })
    }
}