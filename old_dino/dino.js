"use strict";

let dinoY = 50;
let jumping = false;
const jumpHeight = 300; 
const jumpDuration = 600; 
let jumpStartTime = 0;

const audioLicking = document.getElementById('audio');
audioLicking.classList.add("hidden");

document.addEventListener("keydown", pressDownAction);
document.addEventListener("keyup", pressUpAction);

function pressDownAction(event) {
    if (event.code === "Space" && !jumping) {
        jumping = true;
        jumpStartTime = performance.now(); 
        requestAnimationFrame(jump);
        audio.play();
    }
}

function jump() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - jumpStartTime;
    const velocity = 0.4;

    const jumpDistance = elapsedTime * velocity;

    dinoY = 50 + jumpDistance;
    dino.style.bottom = dinoY + "px";

    if (elapsedTime < jumpDuration) {
        requestAnimationFrame(jump);
    } else {
        fall(jumpStartTime); 
    }
}

function fall(jumpStartTime) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - jumpStartTime;

    if (dinoY <= 50) {
        dinoY = 50;
        dino.style.bottom = dinoY + "px";
        jumping = false;
        return;
    }

    const gravity = 0.005; 
    const fallDistance = gravity * elapsedTime;
    dinoY -= fallDistance;
    dino.style.bottom = dinoY + "px";

    requestAnimationFrame(() => fall(jumpStartTime)); 
}
