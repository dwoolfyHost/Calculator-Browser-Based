# Development Log

---

## 2026-08-05

### Expression Calculator Interface

This milestone marks the transition from a traditional desktop calculator layout to an expression-oriented calculator intended for parsing and evaluating complete mathematical expressions.

### Interface Changes

Removed legacy calculator controls that were designed around immediate execution:

- Memory operations (MC, MR, MS, M+, M-)
- CE
- ±
- Reciprocal (1/x)

Added controls supporting expression construction:

- Parentheses
- Exponent operator (^)
- Root operator (√)
- Mathematical constants (π and e)
- log()
- ln()
- Cursor movement
- Delete (backspace)
- Clear
- Eval

Buttons were reorganized by purpose rather than by traditional calculator layout.

Editing controls now occupy the top rows, while mathematical operators and functions are grouped together for easier expression entry.

### Design Decisions

The project is no longer being designed as an immediate-execution calculator.

Instead, it is being built as an expression editor backed by a mathematical parser.

Expressions such as

((23 + 5) * 2) / (13 - 4)

will be entered directly, parsed, and evaluated without using JavaScript's `eval()` function.

The square root operator will be implemented as the inverse of exponentiation rather than as a special unary function.

Examples:

8 ^ 2 = 64

64 √ 2 = 8

27 √ 3 = 3

Internally the evaluator will treat

a √ b

as

pow(a, 1 / b)

allowing exponentiation and roots to share the same implementation.

### Architecture Direction

The project will follow a modular monolith design.

Planned JavaScript modules include:

- main.js
- input.js
- ui.js
- calculator.js
- parser.js

The calculator state will exist independently of the DOM.

Mouse input and keyboard input will both generate the same internal actions, allowing the controller to process user interactions through a single code path.

### Next Milestone

Begin implementation of the calculator engine.

Initial goals:

- Calculator state model
- Action dispatch system
- Expression editing
- Keyboard support
- Tokenizer
- Parser
- Expression evaluator

