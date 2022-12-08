  // Instructions page set up
  const instructionsAudio = createSound(instructionsMusic);
  const typeAudio = createSound(typingAudio);
  const instructionsAnimation = playerIdle;
  const txt = ['In the middle of the misty Red Mountains lived a young developer.','All his teachers had warned him to be mindful of the power of the console.','Then came the upgrade...','Press SPACE BAR for console.fly()','He pressed it and unleashed the true power of the console.','How far will he get?'];
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
    playSong(typeAudio);
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
    } else {
      stopSong(typeAudio);
    }
  }

  function animateCharacter() {
    if (animationCount >= instructionsAnimation.length) {
        animationCount = 0;
    }
    instructionsCtx.clearRect(0,0,150,200);
    instructionsCtx.drawImage(instructionsAnimation[animationCount],0,0,90,140);
    animationCount++;
    setTimeout(animateCharacter,500);
  }

