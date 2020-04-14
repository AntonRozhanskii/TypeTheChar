const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

showLetter();

function getRandomChar() {
    let index = Math.floor(Math.random() * CHARACTERS.length);
    return CHARACTERS.charAt(index);
}

function showLetter() {
    const letterElement = document.getElementById("letter");
    letterElement.innerText = getRandomChar();
}
