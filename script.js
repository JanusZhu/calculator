function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multi(a, b) {
  return a * b;
}

function divide(a, b) {
  return b == 0 ? NaN : a / b;
}

function roundResult(num) {
  return Math.round(num * 10000) / 10000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  } else if (operator == "x") {
    return multi(a, b);
  } else if (operator == "/") {
    return divide(a, b);
  }
}

function displayNumber(e) {
  if (displayValue.length > 10) return;
  //if operator is not equals
  //update previous when pressing the next number
  if (previousValue) {
    updatePre(previousValue);
  }
  //if operator is equals
  //if we press a number, we start a new operation
  if (currentOperator === "=") {
    currentOperator = null;
    previousValue = null;
    displayValue = "0";
  }

  let currentDisplay = document.querySelector(".cur");
  //handle decimal
  if ((isDecimal === true) | displayValue.includes(".")) {
    const decimal = displayValue.split(".")[1] || 0;
    currentDisplay.textContent += e.target.value;
    displayValue = currentDisplay.textContent;
  } else if (displayValue == "0") {
    currentDisplay.textContent = e.target.value;
    displayValue = e.target.value;
  } else {
    currentDisplay.textContent += e.target.value;
    displayValue = currentDisplay.textContent;
  }
}

function resetDisplay() {
  let currentDisplay = document.querySelector(".cur");
  displayValue = "0";
  currentDisplay.textContent = "0";
  currentOperator = null;
  previousValue = null;
  isDecimal = false;
  updatePre("");
}

function deleteDisplay() {
  let currentDisplay = document.querySelector(".cur");
  displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
  currentDisplay.textContent = displayValue;
}
function updatePre(str) {
  let previousDisplay = document.querySelector(".pre");
  previousDisplay.textContent = str;
}

function updateCur(str) {
  let currentDisplay = document.querySelector(".cur");
  currentDisplay.textContent = str;
}

function executeOperator(e) {
  if (isDecimal === true) {
    isDecimal = false;
  }
  //first operation and skips equals
  if (!previousValue & (e.target.value !== "=")) {
    previousValue = displayValue;
    displayValue = "0";
    currentOperator = e.target.value;
  }
  //second operator
  else if ((previousValue != null) & (e.target.value === "=")) {
    //equal operation

    displayValue = roundResult(
      operate(currentOperator, previousValue, displayValue)
    );
    previousValue = null;
    currentOperator = e.target.value;

    updatePre("");
    updateCur(displayValue);
  } else if ((previousValue != null) & (e.target.value !== "=")) {
    //other operation
    previousValue = roundResult(
      operate(currentOperator, previousValue, displayValue)
    );

    displayValue = "0";
    currentOperator = e.target.value;
    updateCur(previousValue);
  }
}

function executeDecimal() {
  if ((isDecimal == false) & !displayValue.includes(".")) {
    isDecimal = true;
    let currentDisplay = document.querySelector(".cur");
    currentDisplay.textContent += ".";
  }
}

let currentOperator;
let displayValue = "0";
let previousValue;
let isDecimal = false;

const numberButtons = Array.from(document.querySelectorAll(".number"));

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

const operatorButtons = Array.from(document.querySelectorAll(".operator"));

operatorButtons.forEach((button) =>
  button.addEventListener("click", executeOperator)
);

const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", executeDecimal);
