// calculator.js
//
// Manages calculator state and expression editing.
//
// The calculator does not directly handle buttons or keyboard input.
// It receives actions and modifies its internal state.


import { getInternalSymbol } from "../symbols/symbols.js";


class Calculator {


    constructor() {

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

    handleAction(action) {

        switch(action.value) {

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
                    getInternalSymbol(action.value)
                );
                break;
        }

    }


    insert(value) {

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
            before + value + after;


        this.state.cursor.position++;

    }

    moveLeft() {

            if(this.state.cursor.position > 0){

            this.state.cursor.position--;

        }

    }

    moveRight() {

        if(
            this.state.cursor.position <
            this.state.expression.length
        ){

            this.state.cursor.position++;

        }

    }

    delete() {

        const position = this.state.cursor.position;


        if(position === 0){
            return;
        }


        const expression = this.state.expression;


        this.state.expression =
            expression.slice(0, position - 1) +
            expression.slice(position);


        this.state.cursor.position--;

    }

    evaluate(){

        console.log("Evaluation not implemented");

    }

    clear() {

        this.state.expression = "";

        this.state.cursor.position = 0;

        this.state.error = null;

    }


}


export default Calculator;