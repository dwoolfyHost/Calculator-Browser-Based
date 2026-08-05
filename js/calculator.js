// calculator.js
//
// Manages calculator state and expression editing.
//
// The calculator does not directly handle buttons or keyboard input.
// It receives actions and modifies its internal state.


import { Token, TokenType } from "./token.js";


class Calculator {


    constructor() {

        this.state = {

            tokens: [],

            cursor: {

                tokenIndex: 0,

                position: "after"

            },

            result: "0",

            error: null

        };

    }



    insertNumber(value) {

        const token = new Token(
            TokenType.NUMBER,
            value
        );


        this.state.tokens.push(token);


        this.state.cursor.tokenIndex =
            this.state.tokens.length;

    }



    clear() {

        this.state.tokens = [];


        this.state.cursor = {

            tokenIndex: 0,

            position: "after"

        };


        this.state.result = "0";

        this.state.error = null;

    }


}


export default Calculator;