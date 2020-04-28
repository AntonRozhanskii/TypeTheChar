/**
 * List of symbols, which are going to be practiced
 * @type {string}
 */
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz,.;\'[]/';

const MAX_LENGTH = 100;

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

    getCharacters() {
        return CHARACTERS;
    }

    getFuture() {
        return future;
    }

    getPast() {
        return past;
    }

    step() {
        future.push(getRandomLetter());
        past.push(current);
        current = future.shift();
        if (past.length > MAX_LENGTH) {
            past.shift();
        }
    }
}

function topUp() {
    while (future.length < MAX_LENGTH + 1) {
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
