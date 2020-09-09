import {Queue} from "./Queue.js";
import {Lesson} from "./Lesson.js";

/**
 * Amount of characters before the target letter
 * and after it. So, there going to be<br>
 * DISPLAYABLE_SEGMENT_LENGTH (for tail) + 1 (for target letter) + DISPLAYABLE_SEGMENT_LENGTH (for head)
 * characters
 * @type {number}
 */
const DISPLAYABLE_SEGMENT_LENGTH = 4;

/**
 * Whole bunch of symbols to type and already typed as well
 * including short history of already typed characters,
 * target letter and small amount of upcoming symbols.
 * @type {Queue}
 */
let theQueue;

let lesson;

setUp();
displayTheQueue();
document.onkeydown = processKeyDownEvent;

function setUp() {
    theQueue = new Queue();
    lesson = new Lesson();
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
        } else {
            theQueue.insertArray(DISPLAYABLE_SEGMENT_LENGTH, lesson.getLesson(theQueue.getCurrentCharacter()));
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

/**
 * Displays characters which have already been successfully typed
 */
function displayTail() {
    let tail = theQueue.getPast().slice(-DISPLAYABLE_SEGMENT_LENGTH);
    const tailHtml = document.getElementById("tail");
    tailHtml.innerHTML = "";
    for (let i = 0; i < DISPLAYABLE_SEGMENT_LENGTH; i++) {
        const char = tail.pop();
        let letter = getQueueHtmlElement(char ? char : "");
        tailHtml.prepend(letter);
    }
}

function displayTargetChar() {
    const letterElement = document.getElementById("target");
    letterElement.innerText = theQueue.getCurrentCharacter();
}

/**
 * Displays characters to be typed
 */
function displayHead() {
    let head = theQueue.getFuture().slice(0, DISPLAYABLE_SEGMENT_LENGTH);
    const headHtml = document.getElementById("head");
    headHtml.innerHTML = "";
    for (let i = 0; i < DISPLAYABLE_SEGMENT_LENGTH; i++) {
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
