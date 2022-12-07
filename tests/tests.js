const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');

const music = createSound(instructionsMusic);
const instructionsAnimation = playerIdle;
const txt = ['In the middle of the misty Red Mountains lived a young developer.','All his teachers had warned him to be mindful of the power of the console.','Then came the update...','Press SPACE BAR for console.fly()','He pressed it and unleashed the true power of the console.','How far will he get?'];


startBtn.onclick = function () {
    playSong(music);
    animateCharacter();
    typingEffect();
}

let letterIdx = 0;
let lineIdx = 0;
const txtDiv = document.getElementById('instructions-text');

function typingEffect() {
    let p = document.createElement('p');
    p.setAttribute("id", `${lineIdx}`);
    txtDiv.appendChild(p);
    typingLine();
    if (lineIdx < txt.length-1) {
        setTimeout(() => {
            lineIdx++;
            letterIdx = 0;

            typingEffect();
        },3000);
    }
}

function typingLine() {
    if (letterIdx < txt[lineIdx].length) {
        const txtId = document.getElementById(`${lineIdx}`).innerHTML += txt[lineIdx].charAt(letterIdx);
        letterIdx++;
        setTimeout(typingLine, 30);
    }
}

let animationCount = 0

function animateCharacter() {
    if (animationCount >= instructionsAnimation.length) {
        animationCount = 0;
    }
    ctx.clearRect(0,0,150,200);
    ctx.drawImage(instructionsAnimation[animationCount],0,0,150,200);
    animationCount++;
    setTimeout(animateCharacter,500);
}