"use strict"

const score = document.querySelector(".score");
const personaliseButton = document.getElementById("personaliseButton");
const nameButton = document.getElementById("nameButton");
const names = document.getElementById("name");
const textEntry = document.querySelector("#textEntry");
const textRender = document.querySelector("#textRender");
const textName1 = document.querySelector("#textName1");
const textName2 = document.querySelector("#textName2");
const names2 = document.getElementById("name2");
const colorButton = document.getElementById("colorButton");
const colors = document.querySelectorAll(".color");
const songButton = document.getElementById("songButton");
const songs = document.querySelectorAll(".song");
const audios = document.querySelectorAll(".audio");
const image = document.querySelector('img');
const doneButton = document.getElementById("doneButton");
const how = document.getElementById("how");

let decide;
let chosenColor;
let chosenSong;

personaliseButton.addEventListener("click", personaliseGame);
nameButton.addEventListener("click", nameCharacter);
textEntry.addEventListener("change", textModified);
colorButton.addEventListener("click", colorCharacter);
songButton.addEventListener("click", songChoose);
for (const color of colors) {
    color.addEventListener("click", clickOnColor);
}
for (const song of songs) {
    song.addEventListener("click", clickOnSong);
}
doneButton.addEventListener("click", doneStep);

score.classList.add("hidden");
nameButton.classList.add("hidden");
names.classList.add("hidden");
names2.classList.add("hidden");
colorButton.classList.add("hidden");
colors.forEach(color => {
    color.classList.add("hidden");
});
songButton.classList.add("hidden");
songs.forEach(song => {
    song.classList.add("hidden");
});
audios.forEach(audio => {
    audio.classList.add("hidden");
});
doneButton.classList.add("hidden");

function personaliseGame() {
    decide = "chooseBoth";
    personaliseButton.classList.add("hidden");
    startButton.classList.add("hidden");
    how.classList.add("hidden");
    nameButton.classList.remove("hidden");
    colorButton.classList.remove("hidden");
    songButton.classList.remove("hidden");
    doneButton.classList.remove("hidden");
}

function nameCharacter() {
    decide = "chooseName";
    nameButton.classList.add("hidden");
    colorButton.classList.add("hidden");
    songButton.classList.add("hidden");
    names.classList.remove("hidden");
    doneButton.classList.remove("hidden");
}

function textModified(event) {
    textRender.textContent = textEntry.value;
    textName1.textContent = textEntry.value;
    textName2.textContent = textEntry.value;
    names2.classList.remove("hidden");
}

function colorCharacter() {
    decide = "chooseColor";
    nameButton.classList.add("hidden");
    colorButton.classList.add("hidden");
    songButton.classList.add("hidden");
    colors.forEach(color => {
        color.classList.remove("hidden");
    });
    doneButton.classList.remove("hidden");
}

function clickOnColor(event) {
    const element = event.currentTarget;
    chosenColor = element.id;
    image.src = "sitting_" + chosenColor + ".gif";
}

function songChoose() {
    decide = "chooseSong";
    nameButton.classList.add("hidden");
    colorButton.classList.add("hidden");
    songButton.classList.add("hidden");
    songs.forEach(song => {
        song.classList.remove("hidden");
    });
    doneButton.classList.remove("hidden");
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

function doneStep() {
    if (decide === "chooseName" || decide === "chooseColor" || decide === "chooseSong") {
        if (decide === "chooseName") {
            names.classList.add("hidden");
            names2.classList.add("hidden");
        }
        if (decide === "chooseColor") {
            colors.forEach(color => {
                color.classList.add("hidden");
            });
        }
        if (decide === "chooseSong") {
            songs.forEach(song => {
                song.classList.add("hidden");
            });
        }
        nameButton.classList.remove("hidden");
        colorButton.classList.remove("hidden");
        songButton.classList.remove("hidden");
        decide = "chooseBoth";
    } else {
        nameButton.classList.add("hidden");
        colorButton.classList.add("hidden");
        songButton.classList.add("hidden");
        personaliseButton.classList.remove("hidden");
        startButton.classList.remove("hidden");
        how.classList.remove("hidden");
        doneButton.classList.add("hidden");
    }
}