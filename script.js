// variables used for calculations and for function arg
var first;
var second;

// global variables
var defaultValue = 0,
    currentValue = 0,
    defaultState = true,
    firstValue = [],
    secondValue = [],
    operatorValue = '',
    log = [];
var logItem =
{
    expression: String,
    result: Number
}

// output panel
var output = document.getElementById('total');



function addition(num1, num2) {
    return num1 + num2;
}

function subtraction(num1, num2) {
    return num1 - num2;
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    var result = 0;
    if (operator === 'addition') {

    }
    switch (operator) {
        case 'addition':
            console.log(addition(num1, num2));
            result = addition(num1, num2);
            return result;
        case 'subtraction':
            console.log('test')
            console.log(subtraction(num1, num2));
            break;
        case 'multiplication':
            console.log(multiplication(num1, num2));
            break;
        case 'division':
            console.log(division(num1, num2));
            break;
        default:
            alert('Error');
    }
}

// operate('addition', 2, 2)
// operate('subtraction', 2, 2)
// operate('multiplication', 2, 2)
// operate('division', 2, 2)


let buttons = document.getElementById('the-buttons');
buttons.addEventListener('click', (e) => {

    let target = e.target.value;
    // if user presses neg/pov button, backspace button, 0 button and equals button when current value is 0 then ignore
    if (defaultState) {
        if (target === '-/+' || target === '←' || target === '0' || target === '=') {
            resetOutput();
            return;
        }
    }

    // if target is numeric
    if (isNumeric(target)) {
        // get first and second value
        convertArrToNum(target);
        // update defaultState to false
        defaultState = false;
    } else {

        // if target is operator
        currentValue = target;
        // the logic is to check if first number is not null if not the operation will not work
        switch (target) {
            case 'C/E':
                console.log('clear' + target);
                break;
            case '←':
                console.log('backspace');
                break;
            case '-/+':
                console.log('neg/pos');
                break;
            case '/':
                console.log('divide');
                break;
            case '*':
                console.log('multiply');
                break;
            case '-':
                console.log('subtract');
                break;
            case '+':
                if (first) {
                    operatorValue = 'addition';
                }
                // console.log('add' + first);
                break;
            case '.':
                console.log('dot');
                break;
            case '=':
                // console.log('equals');
                // if one of the values are empty then return

                if (firstValue === null || secondValue === null || operatorValue === '') {
                    return;
                } else {
                    switch (operatorValue) {
                        case 'addition':
                            let result = operate(operatorValue, first, second);
                            currentValue = result;
                    }
                }

                break;
            default:
                console.log('unknown');
        }
    }








    // display target 
    output.innerText = currentValue;

})

function resetOutput() {
    output.innerText = defaultValue;
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function convertArrToNum(target) {
    // if operator is not selected then target is for first value, else if operator is selected then target is for second value
    if (operatorValue === '') {
        firstValue.push(target);
        // convert array to string
        let string = firstValue.toString();
        // remove whitespace and commas from string
        first = string.replace(/[, ]+/g, '').trim();
        // convert string to number
        first = parseInt(first);
        currentValue = first;
    } else {
        secondValue.push(target);
        // convert array to string
        let string = secondValue.toString();
        // remove whitespace and commas from string
        second = string.replace(/[, ]+/g, '').trim();
        // convert string to number
        second = parseInt(second);
        currentValue = second;
    }
}