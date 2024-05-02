const game = document.querySelector("body");
let gameStatus = 0;
const trees = []

document.addEventListener("keydown", Game);

function Game(event) {
    
    if (event.code === "Enter" && gameStatus === 1) {
        gameStatus = 0;
        location.reload();
    }
    
    if (event.code === "Enter" && gameStatus === 0) {
        gameStatus = 1;
        const dinoScript = document.createElement("script");
        dinoScript.src = "dino.js";
        document.body.appendChild(dinoScript);
        setInterval(createNewTree, 2000);
    }
}
    function createNewTree() {
        //const newTree = document.createElement("div");
        //newTree.classList.add("tree");
        const treeImage = document.createElement("img");
        console.log(treeImage);
        treeImage.src = "tree.jpg";
        treeImage.alt = "tree";
        treeImage.classList.add("tree");
        //newTree.appendChild(treeImage);
        document.body.appendChild(treeImage);
        trees.push(treeImage);
        moveTree(treeImage);
}

function moveTree(tree) {

    const containerWidth = window.innerWidth;
    let currentPosition = containerWidth;
    
    function move() {

        if (currentPosition <= 0) {
            trees.splice(trees.indexOf(tree), 1);
        }

        currentPosition -= 4; 
        tree.style.left = currentPosition + 'px';
        requestAnimationFrame(move);
    }
    move();
    
}
