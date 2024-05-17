const gameStatus = document.querySelector(".gameStatus");
gameStatus.classList.add("firstGame");

const trees = [];
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
            //trees.splice(trees.indexOf(tree), 1);

            return;
        }

        if (currentPosition <= 0) {
            trees.splice(trees.indexOf(tree), 1);
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
            //clearInterval(treeInterval);
            cancelAnimationFrame(animationFrameId);
            tree.remove();
            //trees.splice(trees.indexOf(tree), 1);
            gameStatus.classList.add("collision");
            return;
        }  
        
        animationFrameId = requestAnimationFrame(move);
    }

}




function checkCollision(tree) {
    const dinoRect = document.querySelector(".dino").getBoundingClientRect();
    //const trees = document.querySelectorAll(".tree");

    const dinoCenterX = (dinoRect.left + dinoRect.width) / 2;
    const dinoCenterY = (dinoRect.top + dinoRect.height) / 2;

    //for (let i = 0; i < trees.length; i++) {
        //const treeRect = trees[i].getBoundingClientRect();
        const treeRect = tree.getBoundingClientRect();

        const treeCenterX = (treeRect.left + treeRect.width) / 2;
        const treeCenterY = (treeRect.top + treeRect.height) / 2;

        if (
            /*dinoRect.right >= treeRect.left &&
            dinoRect.left <= treeRect.right &&
            dinoRect.bottom >= treeRect.top &&
            dinoRect.top <= treeRect.bottom*/
            Math.abs(dinoCenterX - treeCenterX) < 30 &&
            Math.abs(dinoCenterY - treeCenterY) < 30
        ) {
            return false;
        }
    //}
    
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
