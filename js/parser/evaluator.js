evaluation.js


class Evaluation {


    // =========================
    // Entry Point
    // =========================

    evaluate(tokens) {

        this.tokens = [...tokens];

        while(!this.isComplete()) {

            const operation =
                this.findNextOperation();


            const result =
                this.resolveOperation(operation);


            this.replaceOperation(
                operation,
                result
            );

        }


        return this.tokens[0];

    }



    // =========================
    // Reduction / Order of Operations
    // =========================

    findNextOperation() {

        // locate highest precedence operation
        // return the token range to resolve

    }


    replaceOperation(operation, result) {

        // replace processed tokens
        // with one result token

    }


    isComplete() {

        return this.tokens.length === 1;

    }



    // =========================
    // Operation Resolution
    // =========================

    resolveOperation(operation) {

        // determine operation type
        // send to correct math function

    }



    // =========================
    // Mathematical Operations
    // =========================

    add(a,b) {

        return a + b;

    }


    subtract(a,b) {

        return a - b;

    }


    multiply(a,b) {

        return a * b;

    }


    divide(a,b) {

        return a / b;

    }


    power(a,b) {

        return a ** b;

    }


    root(a,b) {

        return Math.pow(a,1/b);

    }


    logarithm(a,b) {

        return Math.log(a) / Math.log(b);

    }


    naturalLog(a) {

        return Math.log(a);

    }



    // =========================
    // Helpers / Validation Support
    // =========================

    isValue(token) {

    }


    isOperator(token) {

    }


    getPrecedence(token) {

    }


}


export default Evaluation;