"use strict";

const gameStatus = document.querySelector(".gameStatus");
gameStatus.classList.add("firstGame");
const scoreElement = document.querySelector(".score");

const trees = [];
const intervals = [3000, 4000, 2000];
let passedTrees = 0;
let animationFrameId;
let treeTimeout;

let remainingStars = 3;
const stars = document.querySelectorAll(".star");
const startButton = document.getElementById("startButton");
const failedButton = document.getElementById("failedButton");
const gameOver = document.getElementById("gameOver");

startButton.addEventListener("click", startGame);
failedButton.addEventListener("click", restartGame);

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "background.jpg"; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground();
}

function drawBackground() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
    resizeCanvas();
    drawBackground();
});

function startGame() {
    personaliseButton.classList.add("hidden");
    how.classList.add("hidden");
    if (chosenColor) {
        image.src = "moving_"+chosenColor+".gif";
    }
    else {
        image.src = "moving_blue.gif";
    }
    if (gameStatus.classList.contains("firstGame")) {
        gameStatus.classList.remove("firstGame");
        gameStatus.classList.add("ongoingGame");
        startButton.classList.add("hidden");
        scheduleNextTree();
    }
    
}

function scheduleNextTree() {
    const randomIndex = Math.floor(Math.random() * 3);

    treeTimeout = setTimeout(createNewTree, intervals[randomIndex]);
}

function endGame() { 

    clearTimeout(treeTimeout);
    gameOver.classList.remove("hidden");
    if (chosenColor){
        image.src = "sitting_"+chosenColor+".gif";
    }
    else {
        image.src = "sitting_blue.gif";
    }
}

function restartGame() {

    if (chosenColor) {
        image.src = "moving_"+chosenColor+".gif";
    }
    else {
        image.src = "moving_blue.gif";
    }

    clearTimeout(treeTimeout);

    failedButton.classList.add("hidden");
    gameStatus.classList.remove("collision");

    trees.forEach(tree => tree.remove());
    trees.length = 0;


    scheduleNextTree(); 

}

function createNewTree() {
    const treeImage = document.createElement("img");
    treeImage.src = "tree.png";
    treeImage.alt = "tree";
    treeImage.classList.add("tree");
    document.body.appendChild(treeImage);
    trees.push(treeImage);
    moveTree(treeImage);
    
    scheduleNextTree(); 
}

function moveTree(tree) {
    const containerWidth = window.innerWidth;
    let currentPosition = containerWidth;
    const dinoRect = document.querySelector(".dino").getBoundingClientRect();
    const dinoX = dinoRect.left;
    move();

    function move() {

        if (gameStatus.classList.contains("collision")) {

                        
            cancelAnimationFrame(animationFrameId);
            //tree.remove();

            clearTimeout(treeTimeout);
            return;
        }

        if (dinoX > currentPosition) {

            tree.remove();
            passedTrees++;
            updateScore();
            return;
        }

        currentPosition -= 4; 
        tree.style.left = currentPosition + 'px';
        
        if (!checkCollision(tree)) {
            if (remainingStars === 1) {
                tree.remove();
                decreaseStars();
                endGame();
            }

            else{
                decreaseStars();
                failedButton.classList.remove("hidden");
            }

            if (chosenColor){
                image.src = "sitting_"+chosenColor+".gif";
            }
            else {
                image.src = "sitting_blue.gif";
            }

            cancelAnimationFrame(animationFrameId);
            tree.remove();
            gameStatus.classList.add("collision");
            return;
        }  
        
        animationFrameId = requestAnimationFrame(move);
    }

}




function checkCollision(tree) {
    const dinoRect = document.querySelector(".dino").getBoundingClientRect();

    const dinoCenterX = (dinoRect.left + dinoRect.width) / 2;
    const dinoCenterY = (dinoRect.top + dinoRect.height) / 2;

        const treeRect = tree.getBoundingClientRect();

        const treeCenterX = (treeRect.left + treeRect.width) / 2;
        const treeCenterY = (treeRect.top + treeRect.height) / 2;

        if (
            Math.abs(dinoCenterX - treeCenterX) < 30 &&
            Math.abs(dinoCenterY - treeCenterY) < 30
        ) {
            return false;
        }
    
    return true;
}

function decreaseStars() {
    remainingStars--;
    for (let i = 0; i < stars.length; i++) {
        if (!stars[i].classList.contains("white")) {
            stars[i].classList.add("white"); 
            return;
        }
    }
}

function updateScore() {
    scoreElement.textContent = `Trees Passed: ${passedTrees}`;
}
