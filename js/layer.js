class Layer {
    constructor(ctx, speed, img) {
        this.ctx = ctx;
        this.speed = speed;
        this.img = img;
        this.dx = 0;
        this.isFreeze = false;
    }

    _parallaxAnimate() {
        if (this.dx * this.speed >= 1000) {
            this.dx = 0;
        }
        if (!this.isFreeze) {
            this.ctx.drawImage(this.img, 0 - this.dx * this.speed, 0, 1000, 600);
            this.ctx.drawImage(this.img, 1000 - this.dx * this.speed, 0, 1000, 600);
            this.dx++;
        } else {
            this.ctx.drawImage(this.img, 0 - this.dx * this.speed, 0, 1000, 600);
            this.ctx.drawImage(this.img, 1000 - this.dx * this.speed, 0, 1000, 600);
        }
    }
}