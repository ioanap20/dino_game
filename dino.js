const dino = document.querySelector(".dino");

let dinoY = 50;
let jumping = false;
const jumpHeight = 300; 
const jumpDuration = 1000; 

document.addEventListener("keydown", pressDownAction);
document.addEventListener("keyup", pressUpAction);

function pressUpAction(event) {
    if (event.code === "Space" && !jumping) {
        jumping = true;
        jumpStartTime = performance.now(); 
        requestAnimationFrame(jump);
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
        jumping = false;
        fall(jumpStartTime); 
    }
}

function fall(jumpStartTime) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - jumpStartTime;

    if (dinoY <= 50) {
        dinoY = 50;
        dino.style.bottom = dinoY + "px";
        return;
    }

    const gravity = 0.005; 
    const fallDistance = gravity * elapsedTime;
    dinoY -= fallDistance;
    dino.style.bottom = dinoY + "px";

    requestAnimationFrame(() => fall(jumpStartTime)); 
}

function pressDownAction(event) {
    if (event.code === "Space" && jumping) {
        jumping = false;
    }
}