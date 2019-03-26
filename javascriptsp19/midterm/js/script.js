// Javascript Midterm
// NAIVE THESAURUS
// Author: Anna Garbier (2018-03-26)

const getSynsButton = document.getElementById('getSyns');
getSynsButton.addEventListener('click', getSyns);

// Initialize output
let output = [];

// Read the text input from the DOM element called 'text',
// and return a cleaned up array of words.
function getWordArray() {
    const words_string_raw = document.getElementById('text').value.toLowerCase();
    // Remove punctuation that may violate the API url string
    // TODO: preserve these extra characters so we can put them
    // back in the displayed output.
    const words_string_norm = words_string_raw
        .replace(/[^a-z0-9']/g, ' ')
        .replace(/  +/g, ' ')
        .trim(' ');
    let words_array = words_string_norm.split(' ');
    return words_array;
}

function getSyn(wordIndex) {

    // Figure out what word we're on.
    let current_word = getWordArray()[wordIndex];
    output[wordIndex] = current_word;

    // Create the URL for the current word
    const key = "4b696c28-3589-4162-80d9-4fe1ee690332";
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
                        let numSynGroups = response.syns.length;
                        let randSynGroupIndex = Math.floor(Math.random() * numSynGroups);
                        let numSynsInGroup = response.syns[randSynGroupIndex].length;
                        let randSynIndex = Math.floor(Math.random() * numSynsInGroup);

                        // Replace the current word with the chosen synonym
                        // and display the replacement immediately
                        output[wordIndex] = response.syns[randSynGroupIndex][randSynIndex];
                        document.getElementById('text').value = output.join(' ');


                        let node = document.createElement("LI");                 // Create a <li> node
                        let textnode = document.createTextNode(`${response.id} was replaced with ${output[wordIndex]}\n`);         // Create a text node
                        node.appendChild(textnode);                              // Append the text to <li>
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

function getSyns() {
    output = getWordArray();
    for (let i = 0; i < getWordArray().length; i++) {
        getSyn(i);
    } 
}
