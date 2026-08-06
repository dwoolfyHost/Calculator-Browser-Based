// tokenizer.js
//
// Converts an internal expression string into parser tokens.
//
// The tokenizer does not evaluate expressions.
// It only identifies meaningful expression components.


import Token from "./token.js";
import TokenType from "./tokenTypes.js";
import { Symbols } from "../symbols/symbols.js";

class Tokenizer {


    constructor(expression){

        this.expression = expression;

        this.position = 0;

        this.tokens = [];

    }



    tokenize(){

        while(this.position < this.expression.length){

            const character =
                this.expression[this.position];





            if(this.isNumberStart(character)){

                this.tokens.push(
                    this.readNumber()
                );

            }


            else if(this.isOperator(character)){

                this.tokens.push(
                    new Token(
                        TokenType.OPERATOR,
                        character
                    )
                );

                this.position++;

            }


            else if(this.isParenthesis(character)){

                this.tokens.push(
                    new Token(
                        TokenType.PARENTHESIS,
                        character
                    )
                );

                this.position++;

            }


            else if(this.isSymbol(character)){

                this.tokens.push(
                    this.readSymbol()
                );

            }


            else {

                throw new Error(
                    `Unknown character: ${character}`
                );

            }

        }

        
        return this.tokens;

    }



    readNumber(){

        let value = "";

        let decimalFound = false;


        while(
            this.position < this.expression.length
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

            else if(!this.isDigit(character)){

                break;

            }


            value += character;

            this.position++;

        }


        return new Token(
            TokenType.NUMBER,
            value
        );

    }



    readSymbol(){

        const symbol =
            this.expression[this.position];


        this.position++;


        const symbolDefinition =
            Object.values(Symbols)
                .find(entry =>
                    entry.internal === symbol
                );


        if(!symbolDefinition){

            throw new Error(
                `Unknown symbol: ${symbol}`
            );

        }


        return new Token(
            symbolDefinition.type,
            symbolDefinition.internal
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



    isOperator(character){

        return "+-*/^%".includes(character);

    }



    isParenthesis(character){

        return "()".includes(character);

    }



    isSymbol(character){

        return Object.values(Symbols)
            .some(entry =>
                entry.internal === character
            );

    }



}


export default Tokenizer;