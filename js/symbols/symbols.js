const Symbols = {

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

    ROOT: {
        internal: "√",
        display: "√",
        type: "OPERATOR"
    },

    ANS: {
        internal: "=",
        display: "ANS",
        type: "CONSTANT"
    }

};

function getInternalSymbol(actionName) {

    return Symbols[action]?.internal ?? action;

}



function getDisplaySymbol(symbol) {

    for(const key in Symbols) {

        if(Symbols[key].internal === symbol) {

            return Symbols[key].display;

        }

    }


    return symbol;

}



export {

    Symbols,

    getInternalSymbol,

    getDisplaySymbol

};