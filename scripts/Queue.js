/**
 * List of symbols, which are going to be practiced
 * @type {string}
 */
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz,.;\'[]/';

const SEGMENT_MAX_LENGTH = 100;

let past = [];
let current = "";
let future = [];

export class Queue {
    constructor() {
        current = "";
        topUp();
    }

    getCurrentCharacter() {
        return current;
    }

    getFuture() {
        return future;
    }

    getPast() {
        return past;
    }

    insertArray(index, characters) {
        for (let i = 0; i < characters.length; i++) {
            insertCharacter(index, characters[i]);
        }
    }

    step() {
        if (future.length <= SEGMENT_MAX_LENGTH) {
            future.push(getRandomLetter());
        }
        past.push(current);
        current = future.shift();
        if (past.length > SEGMENT_MAX_LENGTH) {
            past.shift();
        }
    }
}

function topUp() {
    while (future.length < SEGMENT_MAX_LENGTH + 1) {
        future.push(getRandomLetter());
    }
    current = future.shift();
}

/**
 * This character is used to prevent repetitions while getting new random symbol
 * @type {string}
 */
let lastGenerated = "";

function getRandomLetter() {
    let index;
    let candidate;
    do {
        index = Math.floor(Math.random() * CHARACTERS.length)
        candidate = CHARACTERS.charAt(index);
    } while (candidate === lastGenerated);
    lastGenerated = candidate;
    return candidate;
}

function insertCharacter(index, character) {
    future.splice(index, 0, character);
}
