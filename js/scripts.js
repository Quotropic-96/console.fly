window.onload = function () {
  const gamePage = document.getElementById('game-page');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const instructionsPage = document.getElementById('instructions-page');
  const meters = document.getElementById('meter-number');
  const losePage = document.getElementById('lose-page');
  const resultMeters = document.getElementById('result-number');
  
  startButton.onclick = function () {
    startPage.style = "display: none";
    instructionsPage.classList.remove('hidden');
    setTimeout(() => {
      instructionsPage.classList.add('hidden');
      gamePage.classList.remove('hidden');
      const game = new Game(ctx, meters);
      game.start();
      gameOverInt = setInterval(() => {
        if(game.gameOver) {
          gamePage.classList.add('hidden');
          losePage.classList.remove('hidden');
          resultMeters.innerHTML = `${Math.round(game.meters)}`;
          clearInterval(gameOverInt);
        }
      },1000);
    },1000);
  }
}