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

                        type: "BUTTON_PRESS",

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


    const keyMap = {

        "Enter": "ENTER",

        "Backspace": "DELETE",

        "Delete": "DELETE",

        "ArrowLeft": "LEFT",

        "ArrowRight": "RIGHT",

        "Escape": "CLEAR"

    };


    if(keyMap[key]){

        return {

            type:"BUTTON_PRESS",

            value:keyMap[key]

        };

    }


    if(
        "0123456789+-*/^()".includes(key)
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