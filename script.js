// variables used for calculations and for function arg
var first;
var second;

// global variables
var defaultValue = 0,
    currentValue = 0, // button value
    defaultState = true,
    firstValue = [],
    secondValue = [],
    operatorValue = '',
    processedValue = 0, // computed value
    log = [],
    equalsCount = 0;
positiveVal = true;
var logItem =
{
    expression: String,
    result: Number
}

// global references
const resultList = document.getElementById('results_list');

// output panel
var output = document.getElementById('total');

// functions
function listeners() {
    // listens to buttons in calculator panel
    let buttons = document.getElementById('the-buttons');
    buttons.addEventListener('click', (e) => {
        let target = e.target.value;
        // console.log('target is = ' + target)
        // if user presses neg/pov button, backspace button, 0 button and equals button when current value is 0 then ignore
        if (defaultState) {
            if (target === '-/+' || target === '←' || target === '0' || target === '=') {
                resetOutput();
                return;
            }
        }
        // if target is numeric
        if (isNumeric(target)) {
            if (processedValue != 0) {
            }
            // get first and second value
            convertArrToNum(target);
            // update defaultState to false
            defaultState = false;
        } else {
            // if target is operator
            console.log(target)
            // the logic is to check if first number is not null if not the operation will not work
            operatorNavigation(target);
            // console.log(first, second)
        }
        // display target 
        output.innerText = currentValue;
    })
    // listens to extra buttons (bottom buttons) because cannot get target value on the extra buttons from listening to '.the-buttons'
    let extraBtn = document.querySelectorAll('#extra-buttons');
    // console.log(extraBtn.getAttribute('value'));
    console.log(extraBtn)
    Object.values(extraBtn).forEach((element) => {
        console.log(element)
        element.addEventListener('click', (e) => {
            console.log(e.target.value)
        })
    })
    // extraBtn.addEventListener('click', (e) => {
    //     console.log(extraBtn.getAttribute('value'));
    //     let target = e.target.value;
    //     console.log(target);
    // })
    // listens to wipe btn
    let wipe = document.getElementById('result_clear');
    wipe.onclick = () => {
        resetLog();
    }
}
listeners();

function operatorNavigation(target) {
    switch (target) {
        case 'C/E':
            resetOutput();
            break;
        case '←':
            console.log(currentValue)
            // happens when user click backspace on processed value
            //! without this it will return NaN
            if (currentValue === processedValue) {
                resetOutput();
                return;
            }
            if (isNumeric(currentValue)) {
                if (operatorValue === '') {
                    firstValue.pop();
                    // convert array to string
                    let string = firstValue.toString();
                    // remove whitespace and commas from string
                    first = string.replace(/[, ]+/g, '').trim();
                    // convert string to number
                    first = parseInt(first);
                    currentValue = first;
                } else {
                    secondValue.pop();
                    // convert array to string
                    let string = secondValue.toString();
                    // remove whitespace and commas from string
                    second = string.replace(/[, ]+/g, '').trim();
                    // convert string to number
                    second = parseInt(second);
                    currentValue = second;
                }
            } else {
                // happens when user click backspace on oeprators
                currentValue = defaultValue;
            }
            break;
        case '-/+':
            // positiveVal = !positiveVal;
            console.log(currentValue);
            if (currentValue < 0) {
                let positive = Math.abs(currentValue);
                if (equalsCount > 0) {
                    console.log(processedValue, target)
                    first = (processedValue + target);
                }
                // apply positive in first or second number
                if (operatorValue === '') {
                    first = positive;
                    currentValue = first;
                    processedValue = currentValue;
                } else {
                    second = positive;
                    currentValue = second;
                    processedValue = currentValue;
                }
            } else {
                let negative = -Math.abs(currentValue);
                // apply negative in first or second number
                if (operatorValue === '') {
                    first = negative;
                    currentValue = first;
                    processedValue = currentValue;
                } else {
                    second = negative;
                    currentValue = second;
                    processedValue = currentValue;
                }
            }
            console.log('current value after +/- ' + currentValue)
            break;
        case '/':
            currentValue = target;
            if (first) {
                operatorValue = '/';
            }
            if (equalsCount > 0) continueExpression();
            break;
        case '*':
            currentValue = target;
            if (first) {
                operatorValue = '*';
            }
            if (equalsCount > 0) continueExpression();
            break;
        case '-':
            currentValue = target;
            if (first) {
                operatorValue = '-';
            }
            if (equalsCount > 0) continueExpression();
            break;
        case '+':
            currentValue = target;
            if (first) {
                operatorValue = '+';
            }
            if (equalsCount > 0) continueExpression();
            console.log('continue expression')
            break;
        case '.':
            if (!isNumeric(currentValue) || defaultState) {
                resetOutput();
                convertArrToNum(defaultValue);
                convertArrToNum(target);
                // console.log(parseInt(firstValue.toString()))
            } else if (equalsCount > 0) {
                first = (processedValue + target);
                convertArrToNum(target);
            } else {
                convertArrToNum(target);
            }
            break;
        case 'denom':
            console.log(currentValue)
            console.log(target)
            console.log(processedValue)
            break;
        case '√':
            console.log(currentValue)
            console.log(target)
            console.log(processedValue)
            break;
        case '=':
            // if one of the values are empty then return
            if (firstValue === null || secondValue === null || operatorValue === '') {
                return;
            } else {
                let result;
                switch (operatorValue) {
                    case '+':
                        let num1 = first;
                        let num2 = second;
                        result = operate(operatorValue, num1, num2);
                        processedValue = result;
                        currentValue = processedValue;
                        equalsCount++;
                        break;
                    case '-':
                        result = operate(operatorValue, first, second);
                        processedValue = result;
                        currentValue = processedValue;
                        equalsCount++;
                        break;
                    case '*':
                        console.log(first, currentValue)
                        result = operate(operatorValue, first, second);
                        processedValue = result;
                        currentValue = processedValue;
                        equalsCount++;
                        break;
                    case '/':
                        result = operate(operatorValue, first, second);
                        processedValue = result;
                        currentValue = processedValue;
                        equalsCount++;
                        break;
                    default:
                        resetOutput();
                        break;
                }
            }
            // insert expression to log
            let expression = `${first} ${operatorValue} ${second}`;
            // console.log(expression, processedValue)
            insertLog(expression, processedValue);
            break;
        default:
            console.log('unknown');
    }
}

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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    console.log(num1, num2)
    switch (operator) {
        case '+':
            result = addition(num1, num2);
            return result;
        case '-':
            result = subtraction(num1, num2);
            return result;
        case '*':
            result = multiplication(num1, num2);
            return result;
        case '/':
            result = division(num1, num2);
            return result;
        default:
            alert('Error');
    }
}

function resetOutput() {
    output.innerText = defaultValue;
    currentValue = 0; // button value
    defaultState = true;
    firstValue = [];
    secondValue = [];
    operatorValue = '';
    processedValue = 0; // computed value
    equalsCount = 0;
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function convertArrToNum(target) {
    // if operator is not selected then target is for first value, else if operator is selected then target is for second value
    if (operatorValue === '') {
        console.log('First number')
        console.log('Arr before push - ' + firstValue)
        firstValue.push(target);
        console.log('Arr after push - ' + firstValue)
        // convert array to string
        let string = firstValue.toString();
        // remove whitespace and commas from string
        first = string.replace(/[, ]+/g, '').trim();
        // convert string to number
        // first = parseInt(first);
        currentValue = first;
    } else {
        console.log('Second number')
        console.log('Arr before push - ' + secondValue)
        secondValue.push(target);
        console.log('Arr after push - ' + secondValue)
        // convert array to string
        let string = secondValue.toString();
        // remove whitespace and commas from string
        second = string.replace(/[, ]+/g, '').trim();
        // convert string to number
        // second = parseInt(second);
        currentValue = second;
    }
}

function insertLog(exp, result) {
    if (document.getElementById('result_default')) {
        removeDefaultLog();
    }

    let li = document.createElement('li');
    let expression = document.createElement('span');
    let res = document.createElement('span');
    let use = document.createElement('span');
    let copyToClipboard = document.createElement('a');
    li.classList.add('result');
    li.setAttribute('id', 'result');
    li.style.display = 'list-item';
    expression.classList.add('equation');
    expression.innerText = exp;
    res.classList.add('answer');
    res.innerText = Math.round((result + Number.EPSILON) * 100) / 100;
    use.classList.add('use');
    copyToClipboard.classList.add('calc_user');
    copyToClipboard.innerHTML = '<img src="images/copy.png">'
    copyToClipboard.onclick = () => {
        navigator.clipboard.writeText(result);
    }
    use.appendChild(copyToClipboard);
    li.appendChild(expression);
    li.appendChild(res);
    li.appendChild(use);
    resultList.prepend(li);
}

function removeDefaultLog() {
    const defaultLog = document.getElementById('result_default');
    defaultLog.remove();
}

function resetLog() {
    // clear current logs
    let currentLogs = document.getElementById('result');
    currentLogs.remove();
    // add default log
    let li = document.createElement('li');
    li.setAttribute('id', 'result_default');
    li.innerText = 'Memory is Empty';
    resultList.appendChild(li);
}

function continueExpression() {
    first = processedValue;
    secondValue = [];
    second = 0;
}