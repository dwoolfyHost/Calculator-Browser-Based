// evaluation.js
//
// Reduces validated token streams into a final result.
// Handles order of operations and mathematical execution.

import Token from "./token.js";
import TokenType from "./tokenTypes.js";

class Evaluation {

    constructor(answer){

        this.answer = answer;
        this.tokens = [];

    }


    // =========================
    // Entry Point
    // =========================

    evaluate(tokens){

        this.tokens = [...tokens];

        this.resolveConstants();

        while(!this.isComplete()){

            this.collapseScopes();

            const operation =
                this.findNextOperation();

            const result =
                this.resolveReduction(operation);

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

    findNextOperation(){

        return this.findOperationInScope(
            this.findActiveScope()
        );

    }


    findActiveScope(){

        let start = -1;

        for(
            let i = 0;
            i < this.tokens.length;
            i++
        ){

            const token =
                this.tokens[i];

            if(token.type === TokenType.LEFT_PAREN){

                start = i;

            }

            else if(
                token.type === TokenType.RIGHT_PAREN &&
                start !== -1
            ){

                return {

                    start: start + 1,

                    end: i - 1

                };

            }

        }

        return {

            start: 0,

            end: this.tokens.length - 1

        };

    }


    findOperationInScope(scope){

        let best = null;

        for(
            let i = scope.start;
            i <= scope.end;
            i++
        ){

            const token =
                this.tokens[i];

            if(
                token.type === TokenType.FUNCTION ||
                token.type === TokenType.UNARY
            ){

                return {

                    index: i,

                    token

                };

            }

            if(!this.isOperator(token)){

                continue;

            }

            if(
                best === null ||
                this.getPrecedence(token) >
                this.getPrecedence(best.token)
            ){

                best = {

                    index: i,

                    token

                };

            }

        }

        return best;

    }


    collapseScopes(){

        for(
            let i = 0;
            i < this.tokens.length - 2;
            i++
        ){

            const current =
                this.tokens[i];

            const middle =
                this.tokens[i + 1];

            const next =
                this.tokens[i + 2];

            if(

                current.type === TokenType.LEFT_PAREN &&

                this.isValue(middle) &&

                next.type === TokenType.RIGHT_PAREN

            ){

                this.tokens.splice(
                    i,
                    3,
                    middle
                );

                i--;

            }

        }

    }


    replaceOperation(operation, result){

        const range =
            this.getReductionRange(operation);

        this.tokens.splice(

            range.start,

            range.end - range.start + 1,

            result

        );

    }


    isComplete(){

        return (

            this.tokens.length === 1 &&

            this.isValue(this.tokens[0])

        );

    }


    // =========================
    // Operation Resolution
    // =========================

    resolveBinary(operation){

        const left =
            this.tokens[operation.index - 1];

        const right =
            this.tokens[operation.index + 1];

        switch(operation.token.value){

            case "+":
                return this.createValueToken(left.value + right.value);

            case "-":
                return this.createValueToken(left.value - right.value);

            case "*":
                return this.createValueToken(left.value * right.value);

            case "/":
                return this.createValueToken(left.value / right.value);

            case "^":
                return this.createValueToken(left.value ** right.value);

            case "√":
                return this.createValueToken(
                    Math.pow(left.value, 1 / right.value)
                );

        }

    }


    resolveFunction(operation, argument){

        switch(operation.token.internal){

            case "∆":
                return this.createValueToken(
                    Math.log(argument.value)
                );

            case "§":
                return this.createValueToken(
                    Math.log10(argument.value)
                );

        }

    }


    resolveUnary(operator, value){

        switch(operator.operation){

            case "NEGATE":

                return this.createValueToken(
                    -value.value
                );

        }

    }


    resolveReduction(operation){

        switch(operation.token.type){

            case TokenType.OPERATOR:
                return this.resolveBinary(operation);

            case TokenType.UNARY:
            case TokenType.FUNCTION:
                return this.resolvePrefix(operation);

        }

    }


    resolvePrefix(operation){

        const value =
            this.tokens[operation.index + 1];

        switch(operation.token.type){

            case TokenType.UNARY:
                return this.resolveUnary(
                    operation.token,
                    value
                );

            case TokenType.FUNCTION:
                return this.resolveFunction(
                    operation,
                    value
                );

        }

    }


    // =========================
    // Constants
    // =========================

    resolveConstants(){

        for(
            let i = 0;
            i < this.tokens.length;
            i++
        ){

            if(
                this.tokens[i].type === TokenType.CONSTANT
            ){

                this.tokens[i] =
                    this.createValueToken(
                        this.resolveConstant(
                            this.tokens[i]
                        )
                    );

            }

        }

    }


    resolveConstant(token){

        switch(token.value){

            case "π":
                return Math.PI;

            case "€":
                return Math.E;

            case "=":
                return this.answer;

        }

    }


    // =========================
    // Helpers
    // =========================

    getReductionRange(operation){

        if(operation.token.type === TokenType.OPERATOR){

            return {

                start: operation.index - 1,

                end: operation.index + 1

            };

        }

        return {

            start: operation.index,

            end: operation.index + 1

        };

    }


    createValueToken(value){

        return new Token(
            TokenType.NUMBER,
            value
        );

    }


    isValue(token){

        return token.type === TokenType.NUMBER;

    }


    isOperator(token){

        return token.type === TokenType.OPERATOR;

    }


    getPrecedence(token){

        return token.precedence ?? -1;

    }

}

export default Evaluation;