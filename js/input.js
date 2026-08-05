// input.js
//
// Handles all external input sources.
// Converts buttons and keyboards into standardized actions.


class Input {


    constructor(calculator, ui){

        this.calculator = calculator;
        this.ui = ui;

        this.bindButtons();
        this.bindKeyboard();

    }



    bindButtons(){

        document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action = {

                        type: "INSERT",

                        value: button.dataset.action

                    };


                    this.handleAction(action);

                }
            );

        });

    }



    bindKeyboard(){

        document.addEventListener(
            "keydown",
            event => {

                const action =
                    this.translateKey(event);


                if(action){

                    event.preventDefault();

                    this.handleAction(action);

                }

            }
        );

    }



translateKey(event){

    const key = event.key;


    // Evaluation
    if(key === "Enter"){

        return {

            type:"BUTTON_PRESS",

            value:"ENTER"

        };

    }


    // Delete last entry
    if(key === "Backspace" || key === "Delete"){

        return {

            type:"BUTTON_PRESS",

            value:"DELETE"

        };

    }


    // Cursor movement
    if(key === "ArrowLeft"){

        return {

            type:"BUTTON_PRESS",

            value:"LEFT"

        };

    }


    if(key === "ArrowRight"){

        return {

            type:"BUTTON_PRESS",

            value:"RIGHT"

        };

    }

    if(key === "Escape"){

        return {

            type:"BUTTON_PRESS",

            value:"CLEAR"

        };

    }

    // Numbers
    if("0123456789".includes(key)){

        return {

            type:"BUTTON_PRESS",

            value:key

        };

    }



    // Operators and parentheses
    if(
        [
            "+",
            "-",
            "*",
            "/",
            "^",
            "(",
            ")"
        ].includes(key)
    ){

        return {

            type:"BUTTON_PRESS",

            value:key

        };

    }




        return null;

    }



    handleAction(action){

        console.log(action);

    }


}


export default Input;