// calculator.js
//
// Manages calculator state and expression editing.
//
// The calculator does not directly handle buttons or keyboard input.
// It receives actions and modifies its internal state.


import { getInternalSymbol } from "../symbols/symbols.js";

import Tokenizer from "../parser/tokenizer.js";
import Validator from "../parser/validator.js";
import Evaluation from "../parser/evaluator.js";


class Calculator {


    constructor(){

        this.state = {

            expression: "",

            cursor: {
                position: 0
            },

            result: "0",

            answer: null,

            error: null

        };

    }



    handleAction(action){

        switch(action.value){

            case "CLEAR":
                this.clear();
                break;

            case "DELETE":
                this.delete();
                break;

            case "LEFT":
                this.moveLeft();
                break;

            case "RIGHT":
                this.moveRight();
                break;

            case "ENTER":
                this.evaluate();
                break;

            case "ANS":

                if(this.state.answer !== null){

                    this.insert(
                        getInternalSymbol("ANS")
                    );

                }

                break;

            default:

                this.insert(
                    getInternalSymbol(
                        action.value
                    )
                );

                break;

        }

    }


    insert(value){

        const before =
            this.state.expression.slice(
                0,
                this.state.cursor.position
            );


        const after =
            this.state.expression.slice(
                this.state.cursor.position
            );


        this.state.expression =
            before +
            value +
            after;


        this.state.cursor.position++;

    }



    moveLeft(){

        if(this.state.cursor.position > 0){

            this.state.cursor.position--;

        }

    }



    moveRight(){

        if(

            this.state.cursor.position <
            this.state.expression.length

        ){

            this.state.cursor.position++;

        }

    }



    delete(){

        if(
            this.state.cursor.position === 0
        ){

            return;

        }


        const position =
            this.state.cursor.position;


        this.state.expression =

            this.state.expression.slice(
                0,
                position - 1
            ) +

            this.state.expression.slice(
                position
            );


        this.state.cursor.position--;

    }



    evaluate(){

        try{

            const tokens =

                new Tokenizer(
                    this.state.expression
                )

                .tokenize();


            const validatedTokens =

                new Validator(tokens)

                .validate();


            const result =

                new Evaluation(
                    this.state.answer
                )

                .evaluate(
                    validatedTokens
                );


            this.state.answer =
                result.value;

            this.state.result =
                String(result.value);

            this.state.error =
                null;

            this.state.expression = "";

            this.state.cursor.position = 0;

        }

        catch(error){

            this.state.error =
                error.message;

            this.state.result =
                error.message;

        }

    }



    clear(){

        this.state.expression = "";

        this.state.cursor.position = 0;

        this.state.result = "0";

        this.state.answer = null;

        this.state.error = null;

    }


}


export default Calculator;