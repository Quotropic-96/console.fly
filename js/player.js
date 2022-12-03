class Player {
    constructor(x, y, width, height, runAnimation, jumpAnimation, flyAnimation, ctx) {
        this.ctx = ctx;
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
        this.runAnimation = runAnimation;
        this.runCount = 0;
        this.jumpAnimation = jumpAnimation;
        this.jumpCount = 0;
        this.flyAnimation = flyAnimation;
        this.flyAnimationCount = 0;
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

    _animatePlayerRun() {
        if (this.runCount == 60) {
            this.runCount = 0;
        }
        this.ctx.drawImage(this.runAnimation[Math.floor(this.runCount/10)], this.x, this.y, this.width, this.height);
        this.runCount++;
    }

    _animatePlayerJump() {
        if (this.isFly && this.jumpCount < 8) {
            this.ctx.drawImage(this.jumpAnimation[Math.floor(this.jumpCount/2)], this.x, this.y, this.width, this.height);
            this.jumpCount++;
        }
    }

    _animatePlayerFly() {
        if (this.isFly && this.jumpCount >= 8) {
            if (this.flyAnimationCount > 30) {
                this.flyAnimationCount = 0;
            }
            this.ctx.drawImage(this.flyAnimation[Math.floor(this.flyAnimationCount/10)], this.x, this.y, this.width, this.height);
            this.flyAnimationCount++;
        }
    }
}