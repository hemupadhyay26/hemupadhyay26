const display1E1 = document.querySelector('.display1');
const display2E1 = document.querySelector('.display2');
const tempResultE1 = document.querySelector('.temp-result');
const numbersE1 = document.querySelectorAll('.number');
const operationE1 = document.querySelectorAll('.operation');
const equalE1 = document.querySelector('.equal');
const clearAllE1 = document.querySelector('.allclear');
const clearLastE1 = document.querySelector('.last-entity-clear');
// console.log(display2E1);
let dis1num = '';
let dis2num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersE1.forEach(number => {
    number.addEventListener('click', (e) => {
        // for neglecting two decimal point in an number 
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        }
        else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        // number we click get store in dis2num for further calculation
        dis2num += e.target.innerText;
        // number we enter is display 2 (lower one) in main screen 
        display2E1.innerText = dis2num;
        // console.log(dis2num);
        // console.log(dis1num);
    });
});

// operation dealing
operationE1.forEach(operation => {
    operation.addEventListener('click', (e) => {
        // if there is no number then
        if (!dis2num) {
            return;
        }
        // have dot false because we entering another number
        haveDot = false; 
        // check which operation we clicked
        const operationName = e.target.innerText;
        // if dis1 dis2 and last operation is true means we enter something then run this if condition
        if (dis1num && dis2num && lastOperation) {
            mathoperations();
        } else {
            // store the result
            result = parseFloat(dis2num);
        }
        // clear our screen 
        clearvar(operationName);
        lastOperation = operationName;
        // console.log(result);

    })
});
function clearvar(name = '') {
    dis1num += dis2num + ' ' + name + ' ';
    // console.log(dis1num);
    // dis2 number and operation we apply store in upper display level
    display1E1.innerText = dis1num;
    // lower display will became 0
    display2E1.innerText = '0';
    // lower display value also 0
    dis2num = '';
    // our temp result start storing
    tempResultE1.innerText = result;
}

function mathoperations() {
    // we check what click and performe tasks
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2num);
    }
    else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2num);
    }
    else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2num);
    }
    else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2num);
    }
    else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2num);
    }
}

equalE1.addEventListener('click', (e) => {
    // check both number is enter or not
    if (!dis2num || !dis1num) {
        return;
    }
    // as one operation finshid so new number should have dot
    haveDot = false;
    // now again mathoperations() run the calculation
    mathoperations();
    // clear display
    clearvar();
    // update content
    display2E1.innerText = result;
    tempResultE1.innerText = '';
    dis2num = result;
    dis1num = '';
})


clearAllE1.addEventListener('click', (e) => {
    display1E1.innerText = '0';
    display2E1.innerText = '0';
    dis1num = '';
    dis2num = '';
    result = '';
    tempResultE1.innerText = '0';
});


clearLastE1.addEventListener('click', (e) => {
    display2E1.innerText = '0';
    dis2num = '';
})

window.addEventListener('keydown', (e) => {
    if (e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.') {
        clickbtnEl(e.key);
    }
    else if (
        e.key === '/' ||
        e.key === '%' ||
        e.key === '-' ||
        e.key === '+') {
        clickoperation(e.key);
    }
    else if (e.key === '*') {
        clickoperation('X');
    }
    else if (e.key === 'Enter' || e.key === '=') {
        clickequal();
    }
});
function clickbtnEl(key) {
    numbersE1.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickoperation(key) {
    operationE1.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickequal() {
    equalE1.click();
}