import {Queue} from "./Queue.js";

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
 * @type {Queue}
 */
let theQueue;

setUp();
displayTheQueue();
document.onkeydown = processKeyDownEvent;

function setUp() {
    theQueue = new Queue();
}

/**
 * Is used to filter symbols, which can be displayed,
 * I am not going to show 'Control', 'Alt' and so forth.
 * @type {RegExp}
 */
const DISPLAYABLE_SYMBOLS = new RegExp('^.$');

// TODO one day
//  Consider changing e.preventDefault()'s logic
//  With e.preventDefault() Chrome's DevTools panel is not opened until focus is on the document
//  Also, CTRL+f does'n work now.
function processKeyDownEvent(e) {
    let pressedSymbol = e.key;
    if (DISPLAYABLE_SYMBOLS.test(pressedSymbol)) {
        e.preventDefault(); // prevents, for example, firefox's 'quick find', called by hitting '/'
        showKeyPressed(pressedSymbol);
        if (pressedSymbol === theQueue.getCurrentCharacter()) {
            theQueue.step();
            displayTheQueue();
        }
    }
}

function showKeyPressed(char) {
    const pressedKeyElement = document.getElementById("pressed");
    pressedKeyElement.innerText = char;
}

function displayTheQueue() {
    displayTail();
    displayTargetChar();
    displayHead();
}

function displayTail() {
    let tail = theQueue.getPast().slice(-limbLength);
    const tailHtml = document.getElementById("tail");
    tailHtml.innerHTML = "";
    for (let i = 0; i < limbLength; i++) {
        const char = tail.pop();
        let letter = getQueueHtmlElement(char ? char : "");
        tailHtml.prepend(letter);
    }
}

function displayTargetChar() {
    const letterElement = document.getElementById("target");
    letterElement.innerText = theQueue.getCurrentCharacter();
}

function displayHead() {
    let head = theQueue.getFuture().slice(0, limbLength);
    const headHtml = document.getElementById("head");
    headHtml.innerHTML = "";
    for (let i = 0; i < limbLength; i++) {
        const char = head[i];
        let letter = getQueueHtmlElement(char ? char : "");
        headHtml.appendChild(letter);
    }
}

function getQueueHtmlElement(symbol) {
    let letter = document.createElement("span");
    letter.classList.add("letter");
    letter.innerHTML = symbol;
    return letter;
}
