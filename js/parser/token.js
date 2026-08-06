// token.js
//
// Defines the structure of expression tokens.
// Tokens are the smallest meaningful pieces of a mathematical expression.
//
// Examples:
// 12      -> NUMBER token
// +       -> OPERATOR token
// log     -> FUNCTION token
// π       -> CONSTANT token
// (       -> PARENTHESIS token


class Token {


    constructor(type, value) {

        this.type = type;

        this.value = value;

    }


}


/*
    Token type constants.

    Using constants prevents accidental spelling differences.

    Bad:
        "function"
        "Function"
        "FUNCTION"

    Good:
        TokenType.FUNCTION
*/


const TokenType = {

    NUMBER: "NUMBER",

    OPERATOR: "OPERATOR",

    FUNCTION: "FUNCTION",

    CONSTANT: "CONSTANT",

    PARENTHESIS: "PARENTHESIS"

};


export {
    Token,
    TokenType
};