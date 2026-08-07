// tokenizer.js
//
// Converts an internal expression string into parser tokens.
//
// The tokenizer does not evaluate expressions.
// It only identifies meaningful expression components.


import Token from "./token.js";
import TokenType from "./tokenTypes.js";

import {
    getSymbol
} from "../symbols/symbols.js";


class Tokenizer {


    constructor(expression){

        this.expression = expression;

        this.position = 0;

        this.tokens = [];

    }



    tokenize(){

        while(
            this.position < this.expression.length
        ){

            const character =
                this.expression[this.position];


            if(
                this.isNumberStart(character)
            ){

                this.tokens.push(
                    this.readNumber()
                );

                continue;

            }


            const symbol =
                getSymbol(character);


            if(symbol){

                this.tokens.push(

                    new Token(
                        symbol.type,
                        symbol.internal
                    )

                );

                this.position++;

                continue;

            }


            throw new Error(
                `Unknown character: ${character}`
            );

        }


        return this.tokens;

    }



    readNumber(){

        let value = "";

        let decimalFound = false;


        while(
            this.position <
            this.expression.length
        ){

            const character =
                this.expression[this.position];


            if(character === "."){

                if(decimalFound){

                    throw new Error(
                        "Invalid number format"
                    );

                }

                decimalFound = true;

            }

            else if(
                !this.isDigit(character)
            ){

                break;

            }


            value += character;

            this.position++;

        }


        return new Token(

            TokenType.NUMBER,

            Number(value)

        );

    }



    isDigit(character){

        return /[0-9]/.test(character);

    }



    isNumberStart(character){

        return (

            this.isDigit(character) ||

            character === "."

        );

    }


}


export default Tokenizer;