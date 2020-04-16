const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz,.;\'[]/';
let currentChar;

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
    let pressedKey = e.key;
    showKeyPressed(pressedKey);
    if (pressedKey == currentChar) {
        showNewLetter();
    }
}

function showKeyPressed(char) {
    const pressedKeyElement = document.getElementById("pressed");
    if (CHARACTERS.includes(char)) {
        pressedKeyElement.innerText = char;
    }
}
