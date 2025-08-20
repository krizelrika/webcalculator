// Global variables
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let displayValue = '0';
let hasResult = false;

// DOM elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');

// Math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Nice try. Dividing by 0? 🫠';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Utility functions
function formatNumber(num) {
    if (typeof num === 'string') return num; // Error messages
    
    // Handle very large or very small numbers
    if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
    }
    
    // Round to prevent floating point errors and limit display length
    const rounded = Math.round(num * 1e10) / 1e10;
    const str = rounded.toString();
    
    // Limit display to 12 characters
    if (str.length > 12) {
        if (str.includes('.')) {
            const decimalIndex = str.indexOf('.');
            const integerPart = str.substring(0, decimalIndex);
            if (integerPart.length >= 12) {
                return num.toExponential(6);
            }
            return rounded.toFixed(12 - integerPart.length - 1);
        }
        return num.toExponential(6);
    }
    
    return str;
}

function updateDisplay(value = displayValue) {
    display.textContent = value;
}

function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    displayValue = '0';
    hasResult = false;
    clearActiveOperator();
    updateDisplay();
}

function clearActiveOperator() {
    operatorButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
}

function setActiveOperator(operator) {
    clearActiveOperator();
    const activeBtn = document.querySelector(`[data-operator="${operator}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

// Input handlers
function handleNumber(num) {
    if (hasResult) {
        // Start new calculation after result
        displayValue = num;
        hasResult = false;
        clearActiveOperator();
    } else {
        // Append digit, removing leading zeros
        if (displayValue === '0') {
            displayValue = num;
        } else {
            displayValue += num;
        }
    }
    updateDisplay();
}

function handleOperator(operator) {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
        // First operator press
        firstOperand = inputValue;
        currentOperator = operator;
        displayValue = '';
        hasResult = false;
    } else if (currentOperator && displayValue !== '' && !hasResult) {
        // Chain operations: evaluate current pair
        const result = operate(currentOperator, firstOperand, inputValue);
        
        if (typeof result === 'string') {
            // Error occurred
            updateDisplay(result);
            resetCalculator();
            return;
        }
        
        const formattedResult = formatNumber(result);
        updateDisplay(formattedResult);
        firstOperand = result;
        currentOperator = operator;
        displayValue = '';
        hasResult = false;
    } else {
        // Consecutive operator presses or after equals
        currentOperator = operator;
        if (hasResult) {
            firstOperand = inputValue;
            hasResult = false;
            displayValue = '';
        }
    }
    
    setActiveOperator(operator);
}

function handleEquals() {
    if (firstOperand !== null && currentOperator && displayValue !== '' && !hasResult) {
        const inputValue = parseFloat(displayValue);
        const result = operate(currentOperator, firstOperand, inputValue);
        
        if (typeof result === 'string') {
            // Error occurred
            updateDisplay(result);
            resetCalculator();
            return;
        }
        
        const formattedResult = formatNumber(result);
        updateDisplay(formattedResult);
        displayValue = formattedResult;
        firstOperand = null;
        currentOperator = null;
        hasResult = true;
        clearActiveOperator();
    }
}

function handleDecimal() {
    if (hasResult) {
        // Start new number after result
        displayValue = '0.';
        hasResult = false;
        clearActiveOperator();
    } else if (!displayValue.includes('.')) {
        // Add decimal point if not present
        if (displayValue === '' || displayValue === '0') {
            displayValue = '0.';
        } else {
            displayValue += '.';
        }
    }
    updateDisplay();
}

function handleBackspace() {
    if (hasResult) {
        // After result, backspace starts new entry
        displayValue = '0';
        hasResult = false;
        clearActiveOperator();
    } else {
        // Remove last character
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '' || displayValue === '-') {
            displayValue = '0';
        }
    }
    updateDisplay();
}

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const num = button.getAttribute('data-number');
        handleNumber(num);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.getAttribute('data-operator');
        handleOperator(operator);
    });
});

equalsButton.addEventListener('click', handleEquals);
clearButton.addEventListener('click', resetCalculator);
backspaceButton.addEventListener('click', handleBackspace);
decimalButton.addEventListener('click', handleDecimal);

// Keyboard support
document.addEventListener('keydown', (e) => {
    // Prevent default for calculator keys
    if (/[0-9+\-*/=.\r\n]/.test(e.key) || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
        e.preventDefault();
    }
    
    if (/[0-9]/.test(e.key)) {
        handleNumber(e.key);
    } else if (e.key === '+') {
        handleOperator('+');
    } else if (e.key === '-') {
        handleOperator('-');
    } else if (e.key === '*') {
        handleOperator('*');
    } else if (e.key === '/') {
        handleOperator('/');
    } else if (e.key === '=' || e.key === 'Enter') {
        handleEquals();
    } else if (e.key === '.') {
        handleDecimal();
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key === 'Delete') {
        resetCalculator();
    }
});

// Initialize display
updateDisplay('0');

// Set initial ARIA attributes
operatorButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', 'false');
});