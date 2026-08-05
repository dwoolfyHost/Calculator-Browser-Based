class Calculator {

    constructor() {

        this.expression = [];

        this.cursor = 0;

        this.result = "0";

    }


    insert(value) {

        this.expression.splice(
            this.cursor,
            0,
            value
        );

        this.cursor++;

    }


    clear() {

        this.expression = [];

        this.cursor = 0;

        this.result = "0";

    }

}


export default Calculator;