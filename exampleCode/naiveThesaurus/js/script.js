// Javascript Midterm
// NAIVE THESAURUS
// Author: Anna Garbier (2018-03-26)

/* 
clean up dom updates by separating to a new function
dont use xhr
*/

const getSynsButton = document.getElementById('getSyns');
getSynsButton.addEventListener('click', getSyns);

const getAntsButton = document.getElementById('getAnts');
getAntsButton.addEventListener('click', getAnts);

// Initialize output
let output = [];

// Read the text input from the DOM element called 'text',
// and return a cleaned up array of words.
function getWordArray() {
    const words_string_raw = document.getElementById('text').value.toLowerCase();
    // Remove punctuation that may violate the API url string
    // TODO: preserve these extra characters so we can put them
    // back in in the displayed output.
    const words_string_norm = words_string_raw
        .replace(/[^a-z0-9']/g, ' ')
        .replace(/  +/g, ' ')
        .trim(' ');
    let words_array = words_string_norm.split(' ');
    return words_array;
}

// For a given word in the array of input words,
// look for a replacement and update the DOM
function getReplacement(wordIndex, type) {
    // Figure out what word we're on.
    let current_word = getWordArray()[wordIndex];
    output[wordIndex] = current_word;

    // Create the URL for the current word
    const key = '4b696c28-3589-4162-80d9-4fe1ee690332';
    const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${current_word}?key=${key}`;
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            if (xhr.status === 200) {
                // if the data matches what I expect...
                if (JSON.parse(xhr.responseText)[0].meta) {
                    let response = JSON.parse(xhr.responseText)[0].meta;
                    if (response.id === current_word) {

                        // Logic to choose a random synonym from a set of synonym
                        // arrays
                        let numGroups;
                        if (type === 'syn') {
                            numGroups = response.syns.length;
                            let randGroupIndex = Math.floor(Math.random() * numGroups);
                            let numInGroup = response.syns[randGroupIndex].length;
                            let randIndex = Math.floor(Math.random() * numInGroup);
                            output[wordIndex] = response.syns[randGroupIndex][randIndex];
                        } else if (type === 'ant') {
                            numGroups = response.ants.length;
                            let randGroupIndex = Math.floor(Math.random() * numGroups);
                            let numInGroup = response.ants[randGroupIndex].length;
                            let randIndex = Math.floor(Math.random() * numInGroup);
                            output[wordIndex] = response.ants[randGroupIndex][randIndex];
                        }
                        
                        document.getElementById('text').value = output.join(' ');
                        let node = document.createElement('LI');
                        let textnode = document.createTextNode(`${response.id} was replaced with ${output[wordIndex]}\n`);         // Create a text node
                        node.appendChild(textnode);
                        document.getElementById('log').appendChild(node);
                    }
                }
            } else {
                document.getElementById('error').innerHTML = 'There was an error';
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

// For each word, look for a replacement, and update
// the DOM word-by-word
function getSyns() {
    output = getWordArray();
    for (let i = 0; i < getWordArray().length; i++) {
        getReplacement(i, 'syn');
    } 
}

function getAnts() {
    output = getWordArray();
    for (let i = 0; i < getWordArray().length; i++) {
        getReplacement(i, 'ant');
    } 
}
