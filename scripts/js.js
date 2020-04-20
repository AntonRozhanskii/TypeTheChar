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

/**
 * Whole bunch of symbols to type,
 * including short history of already typed characters,
 * target letter and small amount of upcoming symbols.
 * @type {array}
 */
let theQueue;

/**
 * Index in {@link theQueue} which is used to show current
 * @type {number}
 */
let targetCharIndex;

setUp();
topUpTheQueue();
displayTheQueue();
document.onkeydown = processKeyDownEvent;

function setUp() {
    theQueue = [];
    targetCharIndex = 0;
    const queueParts = document.getElementsByClassName("queue");
    Array.from(queueParts).forEach(e => {
        e.style.minWidth = (limbLength * 30) + 'px';
    });
}

function processKeyDownEvent(e) {
    e.preventDefault(); // prevents, for example, firefox's 'quick find', called by hitting '/'
    let pressedKey = e.key;
    showKeyPressed(pressedKey);
    if (pressedKey === theQueue[targetCharIndex]) {
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
    let tailStart = (targetCharIndex - limbLength) >= 0 ? targetCharIndex - limbLength : 0 ;
    let tailEnd = targetCharIndex;
    displaySubQueue(tailStart, tailEnd, "tail");
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
    let headStart = targetCharIndex + 1;
    let headEnd = targetCharIndex + 1 + limbLength + 1;
    displaySubQueue(headStart, headEnd, "head")
}

function displaySubQueue(limbStart, limbEnd, elementId) {
    let limb = theQueue.slice(limbStart, limbEnd)
    const htmlLimb = document.getElementById(elementId);
    htmlLimb.innerHTML = "";
    limb.forEach(e => htmlLimb.appendChild(getQueueHtmlElement(e)));
}

function getQueueHtmlElement(symbol) {
    let letter = document.createElement("span");
    letter.classList.add("letter");
    letter.innerHTML = symbol;
    return letter;
}
