// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.js

// IF SOL LEWITT WROTE DITTIES
// With each run, this program generates a little sequence of
// "la", "di", "da", "dum"s. It then provies Sol Lewitt- style
// instructions for how to pronounce the ranomly generated sequence.

const font_size = 15,
    row_height = font_size * 1.5,
    canvasWidth = 1000,
    canvasHeight = 800;

let rand_phrase_string_raw,
    rand_phrase_string,
    instruction_num,
    y;

function setup() {
    // Canvas
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("sketch-div");

    // Content styling
    textFont("Courier");
    textSize(font_size);

    // Interaction
    let refreshButton = createButton("Make another!");
    refreshButton.parent("sketch-div");
    refreshButton.position(20, 680);
    refreshButton.mouseClicked(refresh);

    // Var "dict" is a data object that will act as our dictionary.
    // Every item in this dictionary has a spelling (graphemes),
    // and a pronunciation (phonemes).
    // We'll use the graphemes to print the title of the piece.
    // We'll use the phonemes to find "instructions" for executing 
    // the piece.
    dict = [
        {graphemes: "LA", phonemes: ["l","a"]},
        {graphemes: "DI", phonemes: ["d","i"]},
        {graphemes: "DA", phonemes: ["d","a"]},
        {graphemes: "DUM", phonemes: ["d", "u", "m"]}
    ];

    refresh();
}

function chooseRandomPhrase() {
    // Return an array of 4 numbers, each between 0 and 3, like: [0, 0, 1, 3].
    // This array will be used to retrieve a specific order
    // of words from our dictionary, like "LA LA DI DUM".
    let rand_phrase_dict_indexes = [];
    let rand_phrase_dict_index;
    for (i = 0; i < 4; i++) {
        rand_phrase_dict_index = Math.floor(random(0, dict.length));
        rand_phrase_dict_indexes.push(rand_phrase_dict_index);
        rand_phrase_string_raw = rand_phrase_string_raw.concat(" " + dict[rand_phrase_dict_index].graphemes);
        rand_phrase_string = trim(rand_phrase_string_raw);
    }
    return rand_phrase_dict_indexes;
}

function displayPhraseTitle(rand_phrase_string) {
    // Display the title of the prhase in the DOM, like "LA LA DI DUM".
    textAlign(CENTER);
    text(rand_phrase_string, width / 2, y);
    y += row_height * 2;
    textAlign(LEFT);
}

function displayPhraseInstructions(rand_phrase_dict_indexes) {
    // Take in a random array of numbers. Use each as an index number,
    // and retrieve the corresponding word from our dictionary.
    //   e.g. [0, 0, 1, 3] -> "LA" "LA" "DI" DUM"
    // Then retrieve and print the instructions for how to
    // pronounce this particular string, sound by sound.

    let start_instruction = ".\tBreathe in.";
    text(instruction_num + start_instruction, 10, y);
    instruction_num++;
    y += row_height;

    for (w in rand_phrase_dict_indexes) { // for word in phrase
        word = dict[rand_phrase_dict_indexes[w]];
        for (p in word.phonemes) { // for phoneme in word
            phoneme = word.phonemes[p];
            for (i in getPhonemeInstructions(phoneme)) { // for instruction in phoneme
                instruction = getPhonemeInstructions(phoneme)[i];
                text((instruction_num + ".\t" + instruction), 10, y);
                instruction_num++;
                y += row_height;
            }
        }
    }
    
    let end_instruction = ".\tRepeat as desired.";
    text(instruction_num + end_instruction, 10, y);
}

function getPhonemeInstructions(phoneme) {
    // Take in a phoneme (ie. sound) and return 
    // the corresponding instructions (as an array of strings) for how
    // to produce that sound with your mouth, nose, etc.

    switch (phoneme) {
        case "l":
            instructions = [
                "Place the tip of your tongue near your superior alveolar ridge.",
                "Raise the back of your tongue near the soft palate at the back of your mouth.",
                "With your tongue in this position, vibrate your vocal cords and release past the sides of your tongue."
            ];
            break;
        case "a":
            instructions = [
                "Place your tongue as low and as far back in your mouth as possible, without creating a constriction.",
                "With your tongue in this position, vibrate your vocal cords and release air."
            ];
            break;
        case "d":
            instructions = [
                "Raise the tip of your tongue to touch your alveolar ridge, temporarily stopping all airflow.",
                "With your tongue in this position, vibrate your vocal cords and release a burst of air."
            ];
            break;
        case "i":
            instructions = [
                "Place your tongue as high and as far forward in your mouth as possible, without creating a constriction.",
                "With your tongue in this position, vibrate your vocal cords and release air."
            ];
            break;
        case "u":
            instructions = [
                "Place your tongue as far back in your mouth as possible, without creating a constriction.",
                "With your tongue in this position, vibrate your vocal cords and release air."
            ];
            break;
        case "m":
            instructions = [
                "Close your lips together, so that they constrict airflow.",
                "With your lips in this position, vibrate your vocal cords and release air through your nose."
            ];
            break;
        default:
            instructions = ["error returning instruction"];
    }
    return instructions;
}

function refresh() {
    // TODO: make display dynamic with text wrapping and
    // flexible window.

    // Reset DOM and data
    background(255);
    rand_phrase_string_raw = "";
    rand_phrase_string;
    instruction_num = 1;
    y = row_height;

    // Get random phrase and display
    rand_phrase = chooseRandomPhrase();
    displayPhraseTitle(rand_phrase_string);
    displayPhraseInstructions(rand_phrase);
}