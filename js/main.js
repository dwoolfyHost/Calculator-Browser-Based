import Calculator from "./calculator/calculator.js";
import UI from "./ui/ui.js";
import Input from "./input/input.js";


const calculator = new Calculator();

const ui = new UI(calculator);

const input = new Input(calculator, ui);
console.log("Calculator started");