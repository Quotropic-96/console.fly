window.onload = function () {
  const gamePage = document.getElementById('game-page');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const meters = document.getElementById('meter-number');
  
  startButton.onclick = function () {
    startPage.style = "display: none";
    gamePage.classList.remove('hidden');
    const game = new Game(ctx, meters);
    game.start();
  }
}