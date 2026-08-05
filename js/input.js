class Input {

    constructor(calculator, ui){

        this.calculator = calculator;
        this.ui = ui;

        this.bindButtons();

    }


    bindButtons(){

        document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    console.log(
                        button.dataset.action
                    );

                }
            );

        });

    }

}

export default Input;