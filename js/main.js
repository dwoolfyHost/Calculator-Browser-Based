import Calculator from "./calculator.js";
import UI from "./ui.js";
import Input from "./input.js";


const calculator = new Calculator();

const ui = new UI(calculator);

const input = new Input(calculator, ui);
console.log("Calculator started");