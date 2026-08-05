# Development Log

------------------------------------------------------------------

## 2026-08-05  -  Expression Calculator Interface

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

------------------------------------------------------------------

## 2026-08-05  -  JavaScript Application Structure

The calculator project has moved from a static interface into an initialized JavaScript application.

### Development Environment

Configured the project to run through a local development server.

The application is now loaded through HTTP instead of directly opening the HTML file through the file system. This allows JavaScript modules to function correctly and better matches the workflow that will be used for future development.

### Initial Module Architecture

Created the initial JavaScript module structure:

- main.js
    - Application entry point
    - Initializes calculator components

- calculator.js
    - Owns calculator state
    - Will manage expression data, cursor position, and results

- ui.js
    - Responsible for updating the display
    - Separates rendering logic from calculator logic

- input.js
    - Responsible for handling user input
    - Will unify button and keyboard interactions

- parser.js
    - Reserved for future tokenizer, parser, and evaluator logic

### Design Direction

The project will follow a modular monolith approach.

The application will avoid tightly coupling UI elements with calculator behavior. Instead, inputs will eventually be converted into actions that modify calculator state, with the UI rendering the current state.

Planned data flow:

Input
↓
Action Handler
↓
Calculator State
↓
UI Renderer

### Current Status

The application successfully loads JavaScript modules and initializes the calculator.

The calculator does not yet modify expressions or calculate results.

### Next Milestone

Implement the first working interaction loop:

- Button press detection
- Passing button actions into calculator state
- Updating the expression display
- Creating the first usable expression editor behavior