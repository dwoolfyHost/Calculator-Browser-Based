// validator.js
//
// Validates and normalizes token streams before evaluation.
// Converts ambiguous tokens into explicit forms.
// Adds metadata required by the evaluator.


import Token from "./token.js";
import TokenType from "./tokenTypes.js";
import Symbols from "../symbols/symbols.js";


const Grammar = {

    unaryOperators: {

        "-": {
            precedence: 2,
            associativity: "RIGHT"
        }

    },


    binaryOperators: {

        "+": {
            precedence: 1,
            associativity: "LEFT"
        },

        "-": {
            precedence: 1,
            associativity: "LEFT"
        },

        "*": {
            precedence: 2,
            associativity: "LEFT"
        },

        "/": {
            precedence: 2,
            associativity: "LEFT"
        },

        "^": {
            precedence: 3,
            associativity: "RIGHT"
        },

        "R": {
            precedence: 3,
            associativity: "RIGHT"
        }

    }

};


class Validator {


    constructor(tokens){

        this.tokens = [...tokens];

        this.validatedTokens = [];

    }


    validate(){

        this.validatedTokens =
            [...this.tokens];


        this.checkParentheses();

        this.resolveUnaryOperators();

        this.resolveImplicitMultiplication();

        this.checkTokenSequence();

        this.assignOperatorMetadata();


        return this.validatedTokens;

    }


    checkParentheses(){

        let count = 0;


        for(const token of this.validatedTokens){

            if(token.type === TokenType.LEFT_PAREN){

                count++;

            }


            else if(token.type === TokenType.RIGHT_PAREN){

                count--;

            }


            if(count < 0){

                throw new Error(
                    "Unexpected closing parenthesis"
                );

            }

        }


        if(count !== 0){

            throw new Error(
                "Unbalanced parentheses"
            );

        }

    }


    resolveUnaryOperators(){

        for(
            let i = 0;
            i < this.validatedTokens.length;
            i++
        ){

            const token =
                this.validatedTokens[i];


            if(
                token.value !== "-" ||
                token.type !== TokenType.OPERATOR
            ){

                continue;

            }


            if(this.isUnaryPosition(i)){

                token.type =
                    TokenType.UNARY;

                token.operation =
                    "NEGATE";

            }

        }

    }


    isUnaryPosition(index){

        if(index === 0){

            return true;

        }


        const previous =
            this.validatedTokens[index - 1];


        return (
            previous.type === TokenType.OPERATOR ||
            previous.type === TokenType.LEFT_PAREN ||
            previous.type === TokenType.UNARY
        );

    }


    resolveImplicitMultiplication(){

        const result = [];


        for(
            let i = 0;
            i < this.validatedTokens.length;
            i++
        ){

            const current =
                this.validatedTokens[i];


            result.push(current);


            const next =
                this.validatedTokens[i + 1];


            if(
                next &&
                this.requiresImplicitMultiply(
                    current,
                    next
                )
            ){

                result.push(
                    this.createMultiplyToken()
                );

            }

        }


        this.validatedTokens = result;

    }


    assignOperatorMetadata(){

        for(const token of this.validatedTokens){

            if(token.type === TokenType.OPERATOR){

                const info =
                    Grammar.binaryOperators[token.value];


                if(info){

                    token.precedence =
                        info.precedence;

                    token.associativity =
                        info.associativity;

                }

            }


            else if(token.type === TokenType.UNARY){

                const info =
                    Grammar.unaryOperators[token.value];


                if(info){

                    token.precedence =
                        info.precedence;

                    token.associativity =
                        info.associativity;

                }

            }

        }

    }


    checkTokenSequence(){

        let expectsValue = true;


        for(const token of this.validatedTokens){

            if(expectsValue){

                if(this.isValue(token)){

                    expectsValue = false;

                }


                else if(
                    token.type === TokenType.UNARY ||
                    token.type === TokenType.LEFT_PAREN
                ){

                    expectsValue = true;

                }


                else {

                    throw new Error(
                        "Expected value"
                    );

                }

            }


            else {

                if(this.isOperator(token)){

                    expectsValue = true;

                }


                else if(
                    token.type === TokenType.RIGHT_PAREN
                ){

                    expectsValue = false;

                }


                else {

                    throw new Error(
                        "Unexpected value"
                    );

                }

            }

        }


        if(expectsValue){

            throw new Error(
                "Expression cannot end with operator"
            );

        }

    }


}


export default Validator;