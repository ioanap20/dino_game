"use strict"; 

const dino = document.querySelector(".dino");

let dinoY = 50;
let jumping = false;
let jumpHeight = 200;
const jumpSpeed = 3;

document.addEventListener("keydown", pressDownAction);
document.addEventListener("keyup", pressUpAction);

function pressUpAction(event) {
    if (event.code === "Space" && jumping) {
        jumping = false;
    }
}

function pressDownAction(event) {
    if (event.code === "Space" && !jumping) {
        jumping = true;
        jump();
    }
}

function jump() {
    if (dinoY >= jumpHeight) {
        jumping = false;
        fall();
        return;
    }
    
    dinoY += jumpSpeed;
    dino.style.bottom = dinoY + "px";

    requestAnimationFrame(jump);
}

function fall() {


    if (dinoY <= 50) {
        dinoY = 50;
        dino.style.bottom = dinoY + "px";
        return;
    }

    dinoY -= jumpSpeed;
    dino.style.bottom = dinoY + "px";

    requestAnimationFrame(fall);
}

