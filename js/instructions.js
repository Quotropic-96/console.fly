class Instructions {
    constructor(music, soundEffect, charAnimation, typingText, textId, ctx) {
        this.music = createSound(music);
        this.soundEffect = soundEffect;
        this.charAnimation = charAnimation;
        this.animationCount = 0;
        this.typingText = typingText;
        this.textId = textId;
        this.ctx = ctx;
        this.textIdx = 0;
        this.textSpeed = 50;
    }

    _playMusic() {
        playSong(this.music);
    }

    _stopMusic() {
        stopSong(this.music);
    }

    _animateCharacter() {
        if (this.animationCount > 4) {
            this.animationCount = 0;
        }
        this.ctx.drawImage(this.charAnimation[this.animationCount], 0, 0, 150, 200);
        this.animationCount++;
    }

    _typingEffect() {
        if (this.textIdx < this.typingText.length) {
            document.getElementById(this.textId).innerHTML += this.typingText.chatAt(this.textIdx);
            this.textIdx++;
            setTimeout(this._typingEffect, this.speed);
        }
    }
}

