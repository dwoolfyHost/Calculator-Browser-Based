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

------------------------------------------------------------------

# Milestone 03 — Expression Input Pipeline

## Changes

Connected calculator button events to the calculator state system.

Buttons now generate actions that are passed through the input processor and into the calculator logic.

The calculator now converts incoming values into token objects rather than storing raw characters.

## Technical Notes

The current pipeline is:

Button
→ Input Processor
→ Calculator State
→ Token Storage

The UI display is intentionally not connected yet.

## Next Steps

Implement expression rendering so the stored token state is reflected in the expression display.

------------------------------------------------------------------

Milestone 04 — Input Normalization

Summary:

Completed the first stage of the calculator input system.

Mouse button presses and keyboard input are now converted into a shared action format before reaching calculator logic.

Implemented:

- Keyboard number input
- Keyboard operator input
- Parentheses input
- Power operator input
- Enter key mapping for evaluation
- Delete and Backspace mapping
- Left and Right arrow mapping
- Escape key mapping for clear/reset
- Browser default behavior prevention for calculator-controlled keys

Design Decisions:

Input sources are intentionally separated from calculator behavior.

The calculator does not know whether an action originated from:
- a mouse click
- a keyboard press
- future macro/script input

All sources produce standardized BUTTON_PRESS actions.

Current pipeline:

Physical Input
    ↓
Input Normalizer
    ↓
Action Object
    ↓
Calculator State (next phase)

Next Steps:

Connect standardized actions to calculator logic and begin modifying the expression token state.

------------------------------------------------------------------

Milestone 05 — Unified Input Layer
Summary
Completed the first version of the calculator input system. Mouse interaction and keyboard shortcuts now share a common input pipeline, allowing multiple input methods to generate the same calculator actions.

Changes
Added keyboard support for:
Number keys (top row and numeric keypad)
Arithmetic operators (+, -, *, /)
Parentheses
Exponent (^)
Enter (Evaluate)
Backspace/Delete
Left and Right Arrow keys
Escape (Clear)
Prevented default browser behavior for recognized calculator keys.
Standardized button actions using data-action attributes.
Normalized mouse and keyboard input into a common action object before calculator processing.
Design Decisions
The calculator treats the keyboard as an alternative way of pressing calculator buttons rather than as a separate text-entry system.

All supported input methods now converge into a single action pipeline:

Mouse Click
        \
         \
          → Input Normalizer → Action Object → Calculator Logic
         /
Keyboard

This separation keeps calculator logic independent of the physical input source and provides a foundation for future features such as macros, saved calculation sequences, or additional input methods.

Next Steps
Connect normalized actions to the calculator state manager.
Begin implementing expression editing using the token-based expression model.
Update the expression and result displays from calculator state rather than console output.
