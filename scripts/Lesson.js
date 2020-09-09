const JK = 'jkkjkkjkkjjkjjkkkjkj';
const DF = 'dffdffdffddfddfffdfd';
const L_SEMICOLON = 'l;;l;;l;;ll;ll;;;l;l';
const AS = 'assassassaasaasssasa';

const GH = 'gfhjhjgfhjhjhjgfgfhjgfgf';
const UY = 'yjyjujujyjyjujujyjujujyj';
const RT = 'rftftftftftfrfrftfrftfrf';
const MN = 'njnjmjmjnjnjmjnjmjmjmjnj';
const VB = 'vfbfvfbfbfbfbfvfvfbfbfvf';

const WE = 'wswsedwsededwsedwswseded';
const IO = 'ikikololikololikolikikol';
const XC = 'xscdxscdcdxscdcdxsxscdcd';
const COMMA_DOT = ',k,k.l.l,k.l.l,k.l,k,k.l,k,k.l.l';

const QZ = 'qazaqaqazazaqazaqazaqaza';
const P_QUOTE = 'p;p;\';\';p;\';p;\';p;p;\';';
const SQUARE_BRACKETS = '[;[;];];];[;[;];[;[;];[;];[;];];';

const DICTIONARY = {
    'a': AS, 'b': VB, 'c': XC, 'd': DF,
    'e': WE, 'f': DF, 'g': GH, 'h': GH,
    'i': IO, 'j': JK, 'k': JK, 'l': L_SEMICOLON,
    'm': MN, 'n': MN, 'o': IO, 'p': P_QUOTE,
    'q': QZ, 'r': RT, 's': AS, 't': RT,
    'u': UY, 'v': VB, 'w': WE, 'x': XC,
    'y': UY, 'z': QZ, ';': L_SEMICOLON,
    '\'': P_QUOTE, ',': COMMA_DOT, '.': COMMA_DOT,
    '[': SQUARE_BRACKETS, ']': SQUARE_BRACKETS
}

export class Lesson {
    constructor(props) {
    }

    getLesson(character) {
        return DICTIONARY[character];
    }
}