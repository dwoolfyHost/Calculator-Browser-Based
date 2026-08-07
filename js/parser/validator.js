// validator.js
//
// Validates and normalizes token streams before evaluation.
// Converts ambiguous tokens into explicit forms.
// Adds metadata required by the evaluator.


import Token from "./token.js";
import TokenType from "./tokenTypes.js";
import { Symbols } from "../symbols/symbols.js";


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

                Object.assign(
                    token,
                    Symbols.NEGATE
                );

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



    requiresImplicitMultiply(current,next){

        return (

            this.isValue(current)

            &&

            (
                next.type === TokenType.LEFT_PAREN ||
                next.type === TokenType.FUNCTION ||
                next.type === TokenType.CONSTANT
            )

        );

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
                    token.type === TokenType.LEFT_PAREN ||
                    token.type === TokenType.FUNCTION
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



    isValue(token){

        return (
            token.type === TokenType.NUMBER ||
            token.type === TokenType.CONSTANT
        );

    }



    isOperator(token){

        return (
            token.type === TokenType.OPERATOR
        );

    }



    createMultiplyToken(){

        return new Token(
            TokenType.OPERATOR,
            "*"
        );

    }


}


export default Validator;