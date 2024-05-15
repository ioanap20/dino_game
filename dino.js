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


function checkCollision() {

    
    const dinoRect = dino.getBoundingClientRect(); // Get dino's bounding box
    const trees = document.querySelectorAll(".tree"); // Get all trees
    
    trees.forEach(tree => {
        const treeRect = tree.getBoundingClientRect(); // Get tree's bounding box
        if (
            dinoRect.right >= treeRect.left &&
            dinoRect.left <= treeRect.right &&
            dinoRect.bottom >= treeRect.top &&
            dinoRect.top <= treeRect.bottom
        ) {
            gameStatus.classList.add("gameStatusFalse"); // Collision detected, stop the game
            gameStatus.classList.remove("gameStatusTrue");
            alert("Game Over! Press Enter to restart");
        }
    });
}
