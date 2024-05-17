"use strict";

const tree = document.querySelector(".tree");
const containerWidth = window.innerWidth;
console.log(containerWidth);
const treeWidth = tree.clientWidth;
console.log(treeWidth);
let currentPosition = containerWidth;

moveTree();

function moveTree() {
    if (currentPosition <= 0) {
        currentPosition = containerWidth;
    }
    currentPosition -= 4; 
    tree.style.left = currentPosition + 'px';
    requestAnimationFrame(moveTree);
}

