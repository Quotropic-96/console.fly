class Zapper {
    constructor(hAnimation, vAnimation, eBAnimation, ctx) {
        this.possibleOriginZones = [0, 1, 2];
        this.originZone = undefined;
        this.possibleTiers = [1, 2];
        this.tier = undefined;
        // this.possiblePositions = ['horizontal', 'vertical', 'diagonalUp', 'diagonalDown'];
        this.possiblePositions = ['horizontal', 'vertical', 'diagonalUp'];
        this.position = undefined;
        this.deltaX = undefined;
        this.deltaY = undefined;
        this.diagonalShift = 0;
        this.coordinates = [];
        this.speed = 10;
        this.hAnimation = hAnimation;
        this.vAnimation = vAnimation;
        this.eBAnimation = eBAnimation;
        this.animationCount = 0;    
        this.ctx = ctx;
    }

    _defineOriginZone() {
        this.originZone = this.possibleOriginZones[Math.floor(Math.random()*this.possibleOriginZones.length)];
    }

    _defineTier() {
        this.tier = this.possibleTiers[Math.floor(Math.random()*this.possibleTiers.length)];
    }

    _definePosition() {
        this.position = this.possiblePositions[Math.floor(Math.random()*this.possiblePositions.length)];
        this.position = 'diagonalUp';
    }

    _defineDeltas() {
        switch (this.position) {
            case 'horizontal':
                this.deltaX = 170 * this.tier;
                this.deltaY = 50;
                // Add this line so horizontal zapper appears in the middle of the zone
                this.originZone += .5;
                break;
            case 'vertical':
                this.deltaX = 50;
                this.deltaY = 170 * this.tier;
                break;
            case 'diagonalUp':
                // Add this line so diagonal zapper appears with some margin
                this.originZone += .1;
                this.deltaX = 50;
                this.deltaY = 170 * this.tier;
                this.diagonalShift = 100;
                break;
            case 'diagonalDown':
                // Add this line so diagonal zapper appears with some margin
                this.originZone += .1;
                this.deltaX = 50;
                this.deltaY = 170 * this.tier;
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

    _animateZapper() {
        if (this.animationCount >= 110) {
            this.animationCount = 0;
        }
        switch (this.position) {
            case 'horizontal':
                this.ctx.drawImage(this.hAnimation[Math.floor(this.animationCount/10)], this.coordinates[0].x, this.coordinates[0].y, this.deltaX, this.deltaY);
                this.animationCount++;
                break;
            case 'vertical':
                this.ctx.drawImage(this.vAnimation[Math.floor(this.animationCount/10)], this.coordinates[0].x, this.coordinates[0].y, this.deltaX, this.deltaY);
                this.animationCount++;
                break;
            case 'diagonalUp':
                if (this.animationCount >= 70) {
                    this.animationCount = 0;
                }
                let zapAnX0 = this.coordinates[0].x + this.deltaX * 0.1 * (-1) * this.diagonalShift/Math.abs(this.diagonalShift);
                let zapAnY0 = this.coordinates[0].y;
                let ZapAnDy = 50;
                let ZapAnDx = - this.diagonalShift/10;
                while (zapAnY0 < this.coordinates[0].y + this.deltaY) {
                    this.ctx.drawImage(this.eBAnimation[Math.floor(this.animationCount/10)], zapAnX0, zapAnY0, this.deltaX, ZapAnDy);
                    zapAnX0 += ZapAnDx;
                    zapAnY0 += ZapAnDy;
                }
                this.animationCount++;
                break;
            default:
                break;
        }
    }
}