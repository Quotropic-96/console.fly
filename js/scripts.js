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
  const replayButton = document.getElementById('replay');
  
  // Main Loop
  startButton.onclick = function () {
    playSong(instructionsAudio);
    startPage.style = "display: none";
    instructionsPage.classList.remove('hidden');
    animateCharacter();                                 // Instructions page function
    typingEffect();                                     // Instructions page function
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
    },17100);
  }

  replayButton.onclick = function () {
    stopSong(audio);
    audio = createSound(gameMusic);
    playSong(audio);
    losePage.classList.add('hidden');
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
        document.getElementById('send-name').disabled = false;
        clearInterval(gameOverInt);
      }
    },1000);
  }
}
