// token.js
//
// Represents a single parsed element of an expression.
// Tokens are created by the tokenizer and consumed by the parser.


import { getSymbol } from "../symbols/symbols.js";


class Token {

    constructor(type, value){

        this.type = type;

        this.value = value;


        const symbol =
            getSymbol(value);


        if(symbol){

            Object.assign(
                this,
                symbol
            );

        }

    }

}


export default Token;