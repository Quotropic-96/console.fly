window.onload = function () {
  // Main set up
  const gamePage = document.getElementById('game-page');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const instructionsPage = document.getElementById('instructions-page');
  const meters = document.getElementById('meter-number');
  const losePage = document.getElementById('lose-page');
  const resultMeters = document.getElementById('result-number');

  // Instructions page set up
  const instructionsAudio = createSound(instructionsMusic);
  const instructionsAnimation = playerIdle;
  const txt = ['In the middle of the misty Red Mountains lived a young developer.','All his teachers had warned him to be mindful of the power of the console.','Then came the update...','Press SPACE BAR for console.fly()','He pressed it and unleashed the true power of the console.','How far will he get?'];
  const txtDiv = document.getElementById('instructions-text');
  const instructionsCanvas = document.getElementById('instructions-canvas');
  const instructionsCtx = instructionsCanvas.getContext('2d');
  let letterIdx = 0;
  let lineIdx = 0;
  let animationCount = 0;

  // Instructions page functions
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

  function animateCharacter() {
    if (animationCount >= instructionsAnimation.length) {
        animationCount = 0;
    }
    instructionsCtx.clearRect(0,0,150,200);
    instructionsCtx.drawImage(instructionsAnimation[animationCount],0,0,150,200);
    animationCount++;
    setTimeout(animateCharacter,500);
  }
  
  // Main Loop

  startButton.onclick = function () {
    playSong(instructionsAudio);
    startPage.style = "display: none";
    instructionsPage.classList.remove('hidden');
    animateCharacter();
    typingEffect();
    setTimeout(() => {
      stopSong(instructionsAudio);
      audio = createSound(gameMusic);
      playSong(audio);
      instructionsPage.classList.add('hidden');
      gamePage.classList.remove('hidden');
      const game = new Game(ctx, meters);
      game.start();
      gameOverInt = setInterval(() => {
        if(game.gameOver) {
          stopSong(audio);
          audio = createSound(endMusic);
          playSong(audio);
          gamePage.classList.add('hidden');
          losePage.classList.remove('hidden');
          resultMeters.innerHTML = `${Math.round(game.meters)}`;
          clearInterval(gameOverInt);
        }
      },1000);
    },5000);
    
  }
}
