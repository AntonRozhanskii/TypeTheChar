const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz ';
let currentChar;
let pressedKey;

showNewLetter();
document.onkeydown = compareKeys;

function showNewLetter() {
    const letterElement = document.getElementById("made-up");
    currentChar = setNewLetter();
    letterElement.innerText = currentChar;
}

function getRandomLetter() {
    const index = Math.floor(Math.random() * CHARACTERS.length);
    const candidate = CHARACTERS.charAt(index);
    return candidate;
}

function setNewLetter() {
    let candidate;
    do {
        candidate = getRandomLetter();
    } while (candidate == currentChar);
    return candidate;
}

function compareKeys(e) {
    pressedKey = e.key;
    showKeyPressed(pressedKey);
    if (pressedKey == currentChar) {
        showNewLetter();
    }
}

function showKeyPressed(char) {
    const pressedKeyElement = document.getElementById("pressed");
    pressedKeyElement.innerText = char;
}
