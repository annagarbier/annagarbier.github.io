const spoonerism_please = document.getElementById('spoonerism_please');
spoonerism_please.addEventListener('click', main);

const and = 'and';

const vowels = [
    'a',
    'e',
    'i',
    'o',
    'u'
];
const consonants = [
    'q', 'Q',
    'w', 'W',
    'r', 'R',
    't', 'T',
    'y', 'Y',
    'p', 'P',
    's', 'S',
    'd', 'D',
    'f', 'F',
    'g', 'G',
    'h', 'H',
    'j', 'J',
    'k', 'K',
    'l', 'L',
    'z', 'Z',
    'x', 'X',
    'c', 'C',
    'v', 'V',
    'b', 'B',
    'n', 'N',
    'm', 'M'
]

function readDatasheet(text) {
    return text.split(' ');
}

function findSwapWords(word_array) {
    let and_index;
    if (word_array.includes(and)) {
        and_index = word_array.indexOf(and);
    } else if (word_array.includes('of')) {
        and_index = word_array.indexOf('of');
    } else if (word_array.includes('the')) {
        and_index = word_array.indexOf('the');
    } else if (word_array.includes('a')) {
        and_index = word_array.indexOf('a');
    }
    const token_before = word_array[and_index - 1];
    const token_after = word_array[and_index + 1];

    return [token_before, token_after];
}

function splitToken(token) {
    const onset_start = 0;
    let onset_end;
    for (let i = 0; i < token.length; i++) {
        char = token.charAt(i);
        if (consonants.includes(char) === false) {
            onset_end = i;
            break;
        }
    }

    return {
        onset: token.slice(onset_start, onset_end),
        rest: token.slice(onset_end, token.length)
    }
}

function getSpoonTokens(text) {
    const a = splitToken(findSwapWords(readDatasheet(text))[0]);
    const b = splitToken(findSwapWords(readDatasheet(text))[1]);
    const new_a = b.onset + a.rest;
    const new_b = a.onset + b.rest;

    return [new_a, new_b];
}

function reconstructText(text) {
    const word_array = readDatasheet(text);
    let and_index;
    
    if (word_array.includes(and)) {
        and_index = word_array.indexOf(and);
        word_array.splice(and_index - 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[0]}</b>`);
        word_array.splice(and_index + 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[1]}</b>`);
    } else if (word_array.includes('of')) {
        and_index = word_array.indexOf('of');
        word_array.splice(and_index - 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[0]}</b>`);
        word_array.splice(and_index + 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[1]}</b>`);
    } else if (word_array.includes('the')) {
        and_index = word_array.indexOf('the');
        word_array.splice(and_index - 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[0]}</b>`);
        word_array.splice(and_index + 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[1]}</b>`);
    } else if (word_array.includes('a')) {
        and_index = word_array.indexOf('a');
        word_array.splice(and_index - 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[0]}</b>`);
        word_array.splice(and_index + 1, 1, `<b style="color: blue;">${getSpoonTokens(text)[1]}</b>`);
    } else {
        const a = word_array[0];
        const b = word_array[1];
        const a_split = splitToken(a);
        const b_split = splitToken(b);

        const new_a = b_split.onset + a_split.rest;
        const new_b = a_split.onset + b_split.rest;

        word_array.splice(0, 1, `<b style="color: blue;">${new_a}</b>`);
        word_array.splice(1, 1, `<b style="color: blue;">${new_b}</b>`);
    }

    return word_array.join(' ');
}

function main() {
    const text = document.getElementById('text').value;
    // if (text.includes(and) || text.includes('of') || text.includes('the') || text.includes('a') || text.split(' ').length === 2) {
        response = reconstructText(text);
        response_p = document.getElementById('response');
        response_p.innerHTML = '';
        response_p.innerHTML += response;
    // } else {
    //     alert('Try typing something with either exactly 2 words or something that contains \'and\', \'of\', \'a\', or \'the\'.');
    // }
}
