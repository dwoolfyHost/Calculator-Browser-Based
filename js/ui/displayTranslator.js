// displayTranslator.js

const symbols = {

    "L": "log",

    "N": "ln",

    "P": "π",

    "E": "e",

    "R": "√"

};


function translate(expression) {

    let display = "";


    for (const character of expression) {

        display +=
            symbols[character] ?? character;

    }


    return display;

}


export default translate;