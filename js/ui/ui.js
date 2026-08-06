class UI {

    constructor(calculator) {

        this.calculator = calculator;

        this.expression =
            document.getElementById("expression");

        this.result =
            document.getElementById("result");

    }


    update() {

        const state =
            this.calculator.state;


        this.expression.textContent =
            translate(state.expression);


        this.result.textContent =
            state.result;

    }

}

export default UI;