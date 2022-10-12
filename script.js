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
  return a / b;
}

function operate(operator, a, b) {
  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  } else if (operator == "x") {
    return multi(a, b);
  } else if (operate == "/") {
    return divide(a, b);
  }
}

function displayNumber(e) {
  let currentDisplay = document.querySelector(".current");

  if (displayValue == 0) {
    displayValue = parseInt(e.target.value);
  } else {
    displayValue = displayValue * 10 + parseInt(e.target.value);
  }

  currentDisplay.innerHTML = displayValue.toString();
}

function resetDisplay() {
  let currentDisplay = document.querySelector(".current");
  displayValue = 0;
  currentDisplay.innerHTML = "0";
}

function deleteDisplay() {
  let currentDisplay = document.querySelector(".current");
  displayValue = Math.floor(displayValue / 10);
  currentDisplay.innerHTML = displayValue.toString();
}

function executeOperator(e) {
  if (!previousNumber) {
    previousNumber = displayNumber;
    displayNumber = 0;
    updatePre(previousNumber);
    updateCur(displayNumber);
    currentOperator = e.target.value;
  } else if (e.target.value != "=") {
  }
}

let currentOperator = "=";
let displayValue = 0;
let previousValue;

const numberButtons = Array.from(document.querySelectorAll(".number"));

numberButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

const operatorButtons = Array.from(document.querySelectorAll(".operator"));

operatorButtons.forEach((button) =>
  button.addEventListener("click", executeOperator)
);
