const Symbols = {

    ADD: {
        internal: "+",
        display: "+",
        type: "OPERATOR",
        precedence: 1,
        associativity: "LEFT"
    },

    SUBTRACT: {
        internal: "-",
        display: "-",
        type: "OPERATOR",
        precedence: 1,
        associativity: "LEFT"
    },

    NEGATE: {
        internal: "~",
        display: "-",
        type: "UNARY",
        precedence: 2,
        associativity: "RIGHT",
        operation: "NEGATE"
    },

    MULTIPLY: {
        internal: "*",
        display: "×",
        type: "OPERATOR",
        precedence: 2,
        associativity: "LEFT"
    },

    DIVIDE: {
        internal: "/",
        display: "÷",
        type: "OPERATOR",
        precedence: 2,
        associativity: "LEFT"
    },

    POWER: {
        internal: "^",
        display: "^",
        type: "OPERATOR",
        precedence: 3,
        associativity: "RIGHT"
    },

    ROOT: {
        internal: "√",
        display: "√",
        type: "OPERATOR",
        precedence: 3,
        associativity: "RIGHT"
    },

    LOG: {
        internal: "§",
        display: "log",
        type: "FUNCTION"
    },

    LN: {
        internal: "∆",
        display: "ln",
        type: "FUNCTION"
    },

    LEFT_PAREN: {
        internal: "(",
        display: "(",
        type: "LEFT_PAREN"
    },

    RIGHT_PAREN: {
        internal: ")",
        display: ")",
        type: "RIGHT_PAREN"
    },

    PI: {
        internal: "π",
        display: "π",
        type: "CONSTANT"
    },

    E: {
        internal: "€",
        display: "e",
        type: "CONSTANT"
    },

    ANS: {
        internal: "=",
        display: "ANS",
        type: "CONSTANT"
    }

};

function getInternalSymbol(actionName) {

    return Symbols[actionName]?.internal ?? actionName;

}



function getDisplaySymbol(symbol) {

    for(const key in Symbols) {

        if(Symbols[key].internal === symbol) {

            return Symbols[key].display;

        }

    }


    return symbol;

}

function getSymbol(value){

    return Object.values(Symbols).find(
        symbol => symbol.internal === value
    );

}

export {

    Symbols,

    getSymbol,

    getInternalSymbol,

    getDisplaySymbol

};