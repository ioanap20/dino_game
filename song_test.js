const songs = document.querySelectorAll(".song");
const audios = document.querySelectorAll(".audio");
let chosenSong;

for (const song of songs) {
    song.addEventListener("click", clickOnSong);
}

audios.forEach(audio => {
    audio.addEventListener("ended", function() {
        audio.currentTime = 0;
        audio.play();
    });
});

function clickOnSong(event) {
    const element = event.currentTarget;
    chosenSong = "audio" + element.id;
    console.log(chosenSong)
    playChosenSong();
}

function playChosenSong() {
    if (chosenSong) {
        stopAllSongs();
        const audio = document.getElementById(chosenSong);
        if (audio) {
            audio.play();
        }
    }
}

function stopAllSongs() {
    const audios = document.querySelectorAll(".audio");
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}