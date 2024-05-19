const personaliseButton = document.getElementById("personaliseButton");
const nameButton = document.getElementById("nameButton");
const names = document.getElementById("name");
const textEntry = document.querySelector("#textEntry");
const textRender = document.querySelector("#textRender");
const textName = document.querySelector("#textName");
const names2 = document.getElementById("name2");
const colorButton = document.getElementById("colorButton");
const colors = document.querySelectorAll(".color");
const image = document.querySelector('img');
const doneButton = document.getElementById("doneButton");
const how = document.getElementById("how");

let decide;
let chosenColor;

personaliseButton.addEventListener("click", personaliseGame);
nameButton.addEventListener("click", nameCharacter);
textEntry.addEventListener("change", textModified);
colorButton.addEventListener("click", colorCharacter);
for (const color of colors) {
    color.addEventListener("click", clickOnColor);
}
doneButton.addEventListener("click", doneStep);

nameButton.classList.add("hidden");
names.classList.add("hidden");
names2.classList.add("hidden");
colorButton.classList.add("hidden");
colors.forEach(color => {
    color.classList.add("hidden");
});
doneButton.classList.add("hidden");

function personaliseGame() {
    decide = "chooseBoth";
    personaliseButton.classList.add("hidden");
    startButton.classList.add("hidden");
    how.classList.add("hidden");
    nameButton.classList.remove("hidden");
    colorButton.classList.remove("hidden");
    doneButton.classList.remove("hidden");
}

function nameCharacter() {
    decide = "chooseName";
    nameButton.classList.add("hidden");
    colorButton.classList.add("hidden");
    names.classList.remove("hidden");
    doneButton.classList.remove("hidden");
}

function textModified(event) {
    textRender.textContent = textEntry.value;
    textName.textContent = textEntry.value;
    names2.classList.remove("hidden");
}

function colorCharacter() {
    decide = "chooseColor";
    nameButton.classList.add("hidden");
    colorButton.classList.add("hidden");
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

function doneStep() {
    if (decide === "chooseName" || decide === "chooseColor") {
        if (decide === "chooseName") {
            names.classList.add("hidden");
            names2.classList.add("hidden");
        }
        if (decide === "chooseColor") {
            colors.forEach(color => {
                color.classList.add("hidden");
            });
        }
        nameButton.classList.remove("hidden");
        colorButton.classList.remove("hidden");
        decide = "chooseBoth";
    } else {
        nameButton.classList.add("hidden");
        colorButton.classList.add("hidden");
        personaliseButton.classList.remove("hidden");
        startButton.classList.remove("hidden");
        how.classList.remove("hidden");
        doneButton.classList.add("hidden");
    }
}