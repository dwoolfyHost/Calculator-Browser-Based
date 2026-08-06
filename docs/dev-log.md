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

Milestone 10 — Expression Editor Completion
Summary

Completed the first functional version of the expression editor.

The calculator now operates as an editable mathematical expression rather than an immediate-execution calculator.

The expression editor maintains a single internal expression string and a cursor position, while the display layer translates internal symbols into user-facing mathematical notation.

Changes

Completed migration away from token-based expression editing.

The calculator state now stores:

expression
cursor position
result
answer
error

The editor no longer creates or modifies token objects while entering expressions.

Implemented:

String-based expression insertion
Cursor-based editing
Cursor movement
Deletion based on internal expression position
Expression clearing
Display updates from calculator state
Internal Symbol System

Added a symbol translation layer separating internal expression storage from display formatting.

Internal symbols are used by the calculator logic, while the display translator converts them into familiar calculator notation.

Example:

Internal:

12+§π

Display:

12+logπ

This allows multi-character functions and constants to behave as single editable expression elements.

The display cursor is generated from the internal cursor position rather than maintaining a separate display cursor state.

ANS Design

Added the initial structure for answer references.

The ANS button now follows the intended behavior:

If no previous successful evaluation exists, the button does nothing.
After evaluation is implemented, ANS will insert an internal answer reference symbol.
The displayed expression will show ANS rather than the stored numeric result.

Example:

Internal:

=/2

Display:

ANS/2

During evaluation, the parser will resolve the answer reference to the previous result value.

Completed Architecture

The expression editor pipeline is now:

User Input

    ↓

Input Normalizer

    ↓

Calculator State

    ↓

Internal Expression String

    ↓

Display Translator

    ↓

Rendered Expression

The editor is now independent from mathematical evaluation.

Current Status

Completed:

Expression state management
Cursor-based editing
Input normalization
Internal symbol registry
Display translation
Expression rendering
Editable expression workflow

Not yet implemented:

Tokenizer
Parser
Abstract syntax tree
Evaluator
Mathematical functions
Error handling during evaluation
Next Milestone

Begin implementation of the parser subsystem.

Goals:

Convert internal expression strings into tokens
Define token types
Implement mathematical grammar
Build parsing structure for evaluation

------------------------------------------------------------------

Milestone 11 — Parser Token Foundation
Summary

Created the foundation of the parser subsystem by replacing the previous editor-oriented token model with a parser-oriented token representation.

Tokens are no longer used for storing or modifying expressions. The expression editor continues to use a single internal expression string, while tokens are now reserved for parsing and evaluation.

Changes

Added parser token structure:

parser/

├── token.js
├── tokenTypes.js
├── tokenizer.js
└── parser.js

Implemented:

New token object structure
Token type definitions
Separation between expression editing and mathematical parsing
Token Design

Tokens now represent individual meaningful pieces of an expression.

Token structure:

Token {

    type,

    value

}

Examples:

NUMBER("12.5")

OPERATOR("+")

FUNCTION("L")

CONSTANT("P")

ANSWER("=")

PARENTHESIS("(")

The token value preserves the internal calculator representation.

The parser subsystem will interpret these internal symbols later.

Design Decisions

The tokenizer will not normalize values during token creation.

Examples:

.5

remains:

NUMBER(".5")

rather than being converted into:

NUMBER("0.5")

Formatting and numerical conversion belong to later stages of evaluation.

The tokenizer's responsibility is only to group expression characters into meaningful tokens.

Architecture Update

The processing pipeline is now:

Expression String

        ↓

Tokenizer

        ↓

Token Array

        ↓

Parser

        ↓

Evaluator

        ↓

Result

The editor and parser systems are now fully separated.

Current Status

Completed:

Expression editor
Display translation
Internal symbol system
Parser token foundation

Remaining parser work:

Tokenizer implementation
Grammar and parsing logic
Parser error handling
Evaluation engine
Next Milestone

Implement the tokenizer.

Goals:

Convert expression strings into token arrays
Group contiguous numbers
Recognize operators
Recognize functions and constants
Detect invalid token sequences

------------------------------------------------------------------

## 2026-08-06 - Tokenizer Implementation

The expression editor pipeline has been extended with the first stage of expression processing.

### Changes

Implemented the initial tokenizer system.

The tokenizer now converts the internal expression string into parser-ready token objects.

Examples:

Internal expression:

12+L(5)

Becomes:

NUMBER("12")
OPERATOR("+")
FUNCTION("L")
PARENTHESIS("(")
NUMBER("5")
PARENTHESIS(")")

### Design Decisions

The tokenizer operates only on the internal expression representation.

It does not:

- evaluate expressions
- determine order of operations
- validate mathematical correctness
- modify calculator state

Its only responsibility is identifying individual expression components.

Whitespace handling was removed because the expression editor does not generate whitespace and the internal expression format does not require normalization.

### Architecture Update

Current evaluation pipeline:

Expression String
        ↓
Tokenizer
        ↓
Token Stream
        ↓
Parser / Expression Processor
        ↓
Evaluator

### Current Status

The calculator can now successfully transform an edited expression string into token objects.

Evaluation is not implemented yet.

### Next Milestone

Implement the expression processor/parser.

Goals:

- Apply mathematical precedence
- Resolve parentheses
- Resolve function boundaries
- Prepare ordered expressions for evaluation
- Add structural expression error handling

------------------------------------------------------------------

Validator Pipeline and Evaluator Foundation

The expression processing pipeline has been expanded beyond token generation with the introduction of validation and evaluation preparation.

Changes

Implemented the initial validator framework.

The validator now acts as the boundary between tokenizer output and expression evaluation.

Its responsibilities are:

Validate expression structure
Normalize ambiguous operators
Prepare tokens for evaluation
Attach evaluation metadata

Initial validator systems include:

Parenthesis balance checking
Unary operator resolution
Operator grammar definitions
Precedence and associativity framework
Implicit multiplication handling structure
Token sequence validation framework
Design Decisions

The expression processor approach was simplified.

Instead of constructing nested expression groups, the processing pipeline will operate on a normalized token stream.

The validator prepares the expression by transforming ambiguous syntax into explicit operations.

Examples:

5*-2

becomes:

NUMBER(5)
OPERATOR(*)
UNARY(-)
NUMBER(2)

This allows the evaluator to focus only on execution rather than interpreting expression grammar.

Architecture Update

Current evaluation pipeline:

Expression String
        ↓
Tokenizer
        ↓
Raw Token Stream
        ↓
Validator
        ↓
Validated Token Stream
        ↓
Evaluator
        ↓
Result
Evaluator Foundation

Created the initial evaluator structure.

The evaluator will receive only validated token streams.

Its responsibilities will be:

Execute operations in the order provided
Resolve mathematical functions
Produce final results
Return evaluation failures to the calculator display layer

The evaluator will not:

Validate syntax
Determine whether expressions are structurally valid
Interpret ambiguous operators
Current Status

The calculator can now:

Convert expressions into token objects
Begin validating expression structure
Prepare tokens for evaluation

Full evaluation is not implemented yet.

Next Milestone

Complete validator implementation.

Remaining goals:

Finish token sequence validation
Complete implicit multiplication insertion
Finalize operator metadata assignment
Connect validator output to evaluator

------------------------------------------------------------------