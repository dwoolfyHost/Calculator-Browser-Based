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

------------------------------------------------------------------

2026-08-06  -  Milestone 06 — String-Based Expression Editor Refactor
Summary

Completed the first major architectural refactor from the original token-editing model to a string-based expression editor.

The calculator no longer treats tokens as the editable representation of the current expression. Instead, the calculator maintains a single internal expression string with an independent cursor position.

This establishes the foundation for separating expression editing from parsing and evaluation.

Changes

Replaced the previous calculator state model:

Previous:

Token array storage
Token-based cursor positioning
Direct token creation during input

New:

Expression string storage
Integer cursor position tracking
Character/symbol insertion at cursor location

The calculator state now follows the model:

{
    expression: "",

    cursor: {
        position: 0
    },

    result: "0",

    answer: null,

    error: null
}

Implemented expression editor operations:

Insert characters/symbols at the cursor position
Move cursor left
Move cursor right
Delete the character before the cursor
Clear the current expression
Design Decisions

The calculator editor is now completely independent from mathematical interpretation.

The editor is responsible only for:

Maintaining the current expression
Tracking cursor position
Modifying expression contents

It does not know:

What a number is
What a function does
Operator precedence
How expressions are evaluated

Those responsibilities will be handled later by the parser subsystem.

The new data flow is:

Input

↓

Calculator Action Handler

↓

Expression State

↓

Display Renderer

↓

Future Parser/Evaluator

Architecture Direction

The project will now maintain separate representations for separate responsibilities:

Internal Expression:

12+L(24)

Display Translation:

12+log(24)

Parser Input:

Tokenized expression data

The internal expression string remains the single source of truth.

Current Status

The calculator can now function as an editable expression container.

Implemented:

String-based expression storage
Cursor state management
Expression insertion
Expression deletion
Cursor movement
Expression clearing

Not yet implemented:

Display translation
Tokenizer
Parser
Evaluator
Result handling
Next Milestone

Create the separated parser subsystem.

Initial goals:

Move token definitions into the parser module
Create tokenizer responsible for converting expression strings into tokens
Create parser responsible for interpreting token structure
Prepare evaluator layer for mathematical execution

------------------------------------------------------------------

Milestone 07 — Application Flow Cleanup and Display Preparation
Summary

Completed additional cleanup following the transition to the string-based expression editor architecture.

The calculator is now separated more clearly into three responsibilities:

Input handling
Calculator state management
User interface rendering

This milestone prepares the project for implementing the expression display translation layer.

Changes
HTML Cleanup

Removed the duplicate JavaScript module initialization.

The application now loads a single instance of main.js, preventing duplicate initialization of calculator components.

Calculator Action Handling

Refined calculator action handling to better match the new expression editor architecture.

Changes include:

Removed UI update responsibility from the calculator state manager
Kept calculator logic focused on modifying internal state
Added placeholder handling for the future ANS action

The calculator no longer directly depends on UI behavior.

Input Layer

Confirmed the input layer remains responsible for coordinating external actions.

Current flow:

Mouse / Keyboard Input

        ↓

Input Normalizer

        ↓

Calculator Action Handler

        ↓

Calculator State Update

        ↓

UI Refresh

Input sources continue to be unified before reaching calculator logic.

Interface Changes

Replaced the previous unused percent control with an ANS control.

The ANS feature is planned to insert the previous successful calculation result at the current cursor position.

The action has been reserved but evaluation and answer insertion logic will be implemented later.

Design Decisions

The calculator continues to maintain a single internal expression representation.

Example:

12+L(P)

The expression editor does not store display formatting such as:

12+log(π)

Display conversion will be handled by a separate translation layer.

This keeps:

Editing logic independent from presentation
Parsing logic independent from UI formatting
Internal symbols stable regardless of display choices
Current Status

Completed:

String-based calculator state
Cursor state storage
Expression editing methods
Input normalization
Separation of calculator and UI responsibilities
Preparation for display translation

Not yet implemented:

Display translator
Expression rendering from calculator state
Display cursor mapping
Tokenizer
Parser
Evaluator
Next Milestone

Implement the display translation layer.

Goals:

Translate internal symbols into user-facing calculator notation
Connect calculator expression state to the expression display
Begin rendering the editable expression in the UI

------------------------------------------------------------------

Milestone 08 — Internal Symbol Registry
Summary

Introduced a centralized symbol definition layer for the calculator expression system.

The calculator will no longer rely on display text or button labels as its internal representation.

Instead, special calculator functions and constants will use dedicated internal symbols that are translated into user-facing display text when rendered.

Changes

Created a symbol registry responsible for defining calculator-specific symbols.

The registry stores:

Internal representation
Display representation
Symbol category/type

Examples:

Internal:

§

Display:

log

Internal:

=

Display:

ANS

The display representation is now separate from the expression storage format.

Added Symbol Helpers

Added shared helper methods for:

Converting calculator actions into internal expression symbols
Translating internal expression symbols into display text

This allows different parts of the application to use the same symbol definitions.

Current flow:

Button Action

      ↓

Symbol Registry

      ↓

Internal Expression Symbol

      ↓

Display Translator

      ↓

User Display
Design Decisions

The internal expression format is optimized for program logic rather than human readability.

The user should never need to interact with internal symbols directly.

This approach allows future additions such as:

Additional mathematical functions
Trigonometric functions
Absolute value
Additional constants
Answer references

without changing the expression editor architecture.

The expression editor continues to maintain a single source of truth.

Example:

Internal expression:

12+§π

Displayed expression:

12+logπ
Current Status

Completed:

String-based expression storage
Cursor-based editing model
Input normalization
Calculator/UI separation
Internal symbol registry
Display symbol mappings

Not yet implemented:

Display rendering connection
Visible cursor rendering
Tokenizer
Parser
Evaluator
Next Milestone

Connect the expression state to the display layer.

Goals:

Render the current expression from calculator state
Translate internal symbols into display text
Render the cursor position through the display translator
Complete the first functional expression editor loop

------------------------------------------------------------------