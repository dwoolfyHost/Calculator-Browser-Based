class UI {

    constructor(calculator) {

const displayText =
    translate(
        state.expression,
        state.cursor.position
    );

expressionElement.textContent =
    displayText;

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