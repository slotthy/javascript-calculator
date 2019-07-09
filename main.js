const calculate = {
    '+': (firstOp, secondOp) => firstOp + secondOp,
    '-': (firstOp, secondOp) => firstOp - secondOp,
    '*': (firstOp, secondOp) => firstOp * secondOp,
    '/': (firstOp, secondOp) => firstOp / secondOp,
    '=': (firstOp, secondOp) => secondOp
};

const initCalcData = {
    displayVal: '0',
    firstOp: null,
    waitingForSecondOp: false,
    operator: null,
};

function inputNum(num) {
    const {displayVal, waitingForSecondOp} = initCalcData;

    if (waitingForSecondOp === true) {
        initCalcData.displayVal = num;
        initCalcData.waitingForSecondOp = false;
    } else {
        initCalcData.displayVal = displayVal === '0' ? num : displayVal + num;
    }
}

function inputDecimal(dec) {
    if (initCalcData.waitingForSecondOp === true) return;

    if (!initCalcData.displayVal.includes(dec)) {
        initCalcData.displayVal += dec;
    }
}

function storeOperator(funcOperator) {
    const {firstOp, displayVal, operator} = initCalcData
    const inputVal = parseFloat(displayVal);

    if (operator && initCalcData.waitingForSecondOp) {
        initCalcData.operator = funcOperator;
        return;
    }

    if (firstOp === null) {
        initCalcData.firstOp = inputVal;
    } else if (operator) {
        const currentVal = firstOp || 0;
        const result = calculate[operator](currentVal, inputVal);

        initCalcData.displayVal = String(result);
        initCalcData.firstOp = result;
    }

    initCalcData.waitingForSecondOp = true;
    initCalcData.operator =  funcOperator;
}

function clearCalc() {
    initCalcData.displayVal = '0';
    initCalcData.firstOp = null;
    initCalcData.waitingForSecondOp = false;
    initCalcData.operator = null;
}

function populateDisplay() {
    const display = document.querySelector('.display');
    display.value = initCalcData.displayVal;
}

populateDisplay();

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (event) => {
    const {target} = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('opera')) {
        storeOperator(target.value);
        populateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        populateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        clearCalc();
        populateDisplay();
        return;
    }

    inputNum(target.value);
    populateDisplay();
});