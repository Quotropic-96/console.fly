class Zapper {
    constructor() {
        this.possibleOriginZones[0, 1, 2];
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
                x0: 1000,
                y0: 200*this.originZone
            },
            {
                x1: 1000 + this.deltaX,
                y1: 200*this.originZone
            },
            {
                x2: 1000 + this.deltaX,
                y2: 200 * this.originZone + this.deltaY
            },
            {
                x3: 1000,
                y3: 200 * this.originZone + this.deltaY
            }
        ];
    }

    _moveLeft() {
        if (this.xd > 0 || this.xu > 0) {
            this.xd -= 10;
            this.xu -= 10;
        }
    }
}