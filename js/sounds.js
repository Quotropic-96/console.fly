function createSound(src) {
    sound = document.createElement("audio");
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.setAttribute('loop', 'true');
    sound.style.display = "none";
    document.body.appendChild(sound);
    return sound;
}

function stopSong(song) {
    song.pause();
}

function playSong(song) {
    song.play();
}