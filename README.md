# Calculator

A browser-based scientific calculator built with modern JavaScript using a custom parsing pipeline. Rather than relying on JavaScript's `eval()`, this project tokenizes, validates, and evaluates mathematical expressions through independent parser stages.

The project was built to explore compiler-inspired parsing techniques while maintaining a clean separation of responsibilities between components.

---

## Features

* Standard arithmetic

  * Addition
  * Subtraction
  * Multiplication
  * Division
  * Powers
  * Roots

* Scientific functions

  * Natural logarithm (`ln`)
  * Base-10 logarithm (`log`)

* Mathematical constants

  * π
  * e

* Previous answer (`ANS`) support

* Unary negation

* Implicit multiplication

  Examples:

  ```
  2π
  3(4+5)
  2log(10)
  ```

* Parentheses and operator precedence

* Cursor editing

* Expression validation with descriptive error messages

* No use of JavaScript `eval()`

---

## Project Structure

```
js/
│
├── calculator/
│   └── calculator.js
│
├── parser/
│   ├── tokenizer.js
│   ├── validator.js
│   ├── evaluator.js
│   ├── token.js
│   └── tokenTypes.js
│
├── symbols/
│   └── symbols.js
│
├── input/
│
├── display/
│
└── main.js
```

---

## Architecture

Expressions pass through four distinct stages.

```
Expression
     │
     ▼
Tokenizer
     │
     ▼
Validator
     │
     ▼
Evaluator
     │
     ▼
Result
```

### Tokenizer

The tokenizer converts an expression string into a sequence of tokens.

Example:

```
3+4×2
```

becomes

```
NUMBER
OPERATOR
NUMBER
OPERATOR
NUMBER
```

The tokenizer does not determine whether an expression is valid.

---

### Validator

The validator prepares tokens for evaluation by resolving ambiguous cases and enforcing expression rules.

Responsibilities include:

* Unary minus detection
* Implicit multiplication
* Parenthesis validation
* Token sequence validation

---

### Evaluator

The evaluator reduces validated tokens into a single value while respecting operator precedence.

Responsibilities include:

* Constant resolution
* Function evaluation
* Unary operations
* Binary operations
* Scope reduction

---

### Symbols

All calculator symbols are defined in a single source of truth.

Each symbol stores metadata including:

* Internal representation
* Display representation
* Token type
* Precedence
* Associativity
* Operation metadata (when applicable)

This keeps the tokenizer, validator, evaluator, and display synchronized.

---

## Error Handling

Expressions are validated before evaluation.

If validation fails:

* evaluation stops immediately
* the current expression remains unchanged
* the previous `ANS` value is preserved
* an error message is displayed

Examples include:

* Unbalanced parentheses
* Unexpected operators
* Missing operands
* Invalid token sequences

---

## Design Goals

This project emphasizes:

* Separation of concerns
* Readable, maintainable code
* Parser-based expression evaluation
* Extensibility for future mathematical functions

---

## Future Improvements

Potential enhancements include:

* Additional scientific functions
* Factorials
* Trigonometric functions
* Memory registers
* Degree/radian mode
* Configurable precision
* Expression history
* Unit tests

---

## Running the Project

Clone the repository.

```
git clone <repository-url>
```

Open the project folder.

Serve the project with a local web server (for example, Live Server in Visual Studio Code).

Open the application in your browser.

---

## Technologies

* HTML5
* CSS3
* JavaScript (ES6 Modules)

---

## License

This project is released under the MIT License.
