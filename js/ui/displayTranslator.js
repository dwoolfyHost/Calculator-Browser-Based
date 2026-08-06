import {
    getDisplaySymbol
} from "../symbols/symbols.js";


function translate(expression, cursorPosition){

    let display = "";


    for(let i = 0; i < expression.length; i++){

        if(i === cursorPosition){

            display += "|";

        }


        display +=
            getDisplaySymbol(expression[i]);

    }


    if(cursorPosition === expression.length){

        display += "|";

    }


    return display;

}


export default translate;