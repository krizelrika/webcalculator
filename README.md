# Calculator Project

A simple web-based calculator built with HTML, CSS, and JavaScript. The project demonstrates DOM manipulation, event handling, and state management while handling common calculator operations and edge cases.

## Features
- Basic math functions: addition, subtraction, multiplication, division
- Operate function: takes an operator and two numbers, then calls the appropriate math function.
- Interactive UI:
⋅⋅⋅⋅* Buttons for digits (0–9), operators (+ − × ÷), equals (=), clear (C).
⋅⋅⋅⋅* A display area for inputs and results.
- Chained operations: evaluates one pair of numbers at a time.
- Error handling:
⋅⋅⋅⋅* Prevents multiple operators from evaluating prematurely.
⋅⋅⋅⋅* Displays a snarky error message for division by zero.
⋅⋅⋅⋅* Ignores invalid inputs like pressing = without completing an operation.
- Reset logic: clear button wipes all data and resets the calculator state.
- Result replacement: typing a digit after a result starts a new calculation instead of appending to the result.

## Extra Features
- Decimal input: users can enter floating-point numbers with a . button. Prevents multiple decimals in one number.
- Backspace: undo the last input character.
- Keyboard support:
⋅⋅⋅⋅* Digits 0–9
⋅⋅⋅⋅* Operators + - * /
⋅⋅⋅⋅* Enter/Return for equals
⋅⋅⋅⋅* Backspace for delete
⋅⋅⋅⋅* Delete or C for clear

## Tech Stack
⋅⋅⋅⋅* HTML → structure and display.
⋅⋅⋅⋅* CSS → styling and layout.
⋅⋅⋅⋅* JavaScript → logic, DOM updates, event handling.