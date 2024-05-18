const gameStatus = document.querySelector(".gameStatus");
gameStatus.classList.add("firstGame");
const scoreElement = document.querySelector(".score");

const trees = [];
let passedTrees = 0;
let animationFrameId;

let remainingStars = 3;
const stars = document.querySelectorAll(".star");
const startButton = document.getElementById("startButton");
const failedButton = document.getElementById("failedButton");
const gameOver = document.getElementById("gameOver");

startButton.addEventListener("click", startGame);
failedButton.addEventListener("click", restartGame);

function startGame() {
    if (gameStatus.classList.contains("firstGame")) {
        gameStatus.classList.remove("firstGame");
        gameStatus.classList.add("ongoingGame");
        startButton.classList.add("hidden");
        treeInterval = setInterval(createNewTree, 2500);
    }
}

function endGame() { 
    gameOver.classList.remove("hidden");
}

function restartGame() {

    console.log(passedTrees);

    failedButton.classList.add("hidden");

    gameStatus.classList.remove("collision");

    trees.forEach(tree => tree.remove());
    trees.length = 0;

    clearInterval(treeInterval);


    treeInterval = setInterval(createNewTree, 2500);

}

function createNewTree() {
    const treeImage = document.createElement("img");
    treeImage.src = "tree.jpg";
    treeImage.alt = "tree";
    treeImage.classList.add("tree");
    document.body.appendChild(treeImage);
    trees.push(treeImage);
    moveTree(treeImage);
}

function moveTree(tree) {
    const containerWidth = window.innerWidth;
    let currentPosition = containerWidth;

    move();

    function move() {

        if (gameStatus.classList.contains("collision")) {

                        
            cancelAnimationFrame(animationFrameId);
            tree.remove();

            clearInterval(treeInterval);
            return;
        }

        if (currentPosition <= 0) {

            tree.remove();

            passedTrees++; // Increment score
            updateScore(); // Update score display

            return;
            
        }

        currentPosition -= 4; 
        tree.style.left = currentPosition + 'px';
        
        if (!checkCollision(tree)) {
            if (remainingStars === 1) {
                decreaseStars();
                endGame();
            }

            else{
                decreaseStars();
                failedButton.classList.remove("hidden");
            }
            
            console.log("Game Over");
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
