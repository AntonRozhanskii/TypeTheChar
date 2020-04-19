/**
 * List of symbols, which are going to be practiced
 * @type {string}
 */
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz,.;\'[]/';

/**
 * Amount of characters before the target letter
 * and after it. So, there going to be<br>
 * limbLength (for tail) + 1 (for target letter) + limbLength (for head)
 * characters
 * @type {number}
 */
const limbLength = 4;
let theQueue = [];
let targetCharIndex = 0;

topUpTheQueue();
displayTheQueue();
document.onkeydown = processKeyDownEvent;

function processKeyDownEvent(e) {
    let pressedKey = e.key;
    showKeyPressed(pressedKey);
    if (pressedKey == theQueue[targetCharIndex]) {
        moveTheQueue();
    }
}

function showKeyPressed(char) {
    const pressedKeyElement = document.getElementById("pressed");
    if (CHARACTERS.includes(char)) {
        pressedKeyElement.innerText = char;
    }
}

function moveTheQueue() {
    if (targetCharIndex < limbLength) {
        targetCharIndex++;
    } else {
        theQueue.shift();
    }
    topUpTheQueue();
    displayTheQueue();
}

function topUpTheQueue() {
    while (theQueue.length < (targetCharIndex + 1) + limbLength) {
        theQueue.push(getRandomLetter());
    }
}

function getRandomLetter() {
    const index = Math.floor(Math.random() * CHARACTERS.length);
    const candidate = CHARACTERS.charAt(index);
    return candidate;
}

function displayTheQueue() {
    createTail();
    showTargetChar();
    displayHead();
}

function createTail() {
    let beginningIndex = (targetCharIndex - limbLength) >= 0 ? targetCharIndex - limbLength : 0 ;
    let lastDisplayedIndex = targetCharIndex;
    let tail = theQueue.slice(beginningIndex, lastDisplayedIndex)
    const htmlTail = document.getElementById("tail");
    htmlTail.innerHTML = "";
    tail.forEach(e => htmlTail.appendChild(getQueueHtmlElement(e)));
}

function showTargetChar() {
    const letterElement = document.getElementById("target");
    let targetChar;
    if (typeof targetCharIndex === "number") {
        targetChar = theQueue[targetCharIndex];
    } else {
        targetChar = 'error';
    }
    letterElement.innerText = targetChar;
}

function displayHead() {
    let beginningIndex = targetCharIndex + 1;
    let lastDisplayedIndex = targetCharIndex + 1 + limbLength + 1;
    let limb = theQueue.slice(beginningIndex, lastDisplayedIndex)
    const htmlHead = document.getElementById("head");
    htmlHead.innerHTML = "";
    limb.forEach(e => htmlHead.appendChild(getQueueHtmlElement(e)));
}

function getQueueHtmlElement(symbol) {
    let letter = document.createElement("span");
    letter.classList.add("letter");
    letter.innerHTML = symbol;
    return letter;
}
