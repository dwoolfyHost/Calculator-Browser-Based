class UI {

    constructor(calculator){

        this.calculator = calculator;

        this.expressionDisplay =
            document.getElementById("expression");

        this.resultDisplay =
            document.getElementById("result");

    }


    render(){

        this.expressionDisplay.textContent =
            this.calculator.expression.join("");

        this.resultDisplay.textContent =
            this.calculator.result;

    }

}

export default UI;