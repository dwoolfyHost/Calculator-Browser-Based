// token.js
//
// Represents a single parsed element of an expression.
// Tokens are created by the tokenizer and consumed by the parser.


class Token {

    constructor(type, value) {

        this.type = type;

        this.value = value;

    }

}


export default Token;