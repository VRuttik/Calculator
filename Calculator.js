document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  let firstOperand = "";
  let secondOperand = "";
  let currentOperator = null;
  let shouldResetDisplay = false;

  buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
  });

  function handleButtonClick(value) {
    if (value >= "0" && value <= "9" || value === ".") {
      appendNumber(value);
    } else if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      evaluate();
    } else {
      setOperator(value);
    }
  }

  function appendNumber(number) {
    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = number;
      shouldResetDisplay = false;
    } else if (!(display.textContent.includes(".") && number === ".")) {
      display.textContent += number;
    }
  }

  function clearDisplay() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetDisplay = false;
  }

  function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
  }

  function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondOperand = display.textContent;

    const result = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand));
    display.textContent = result;

    firstOperand = result;
    currentOperator = null;
  }

  function operate(operator, a, b) {
    if (operator === "/" && b === 0) {
      display.textContent = "Error: Div by 0!";
      return 0;
    }

    switch (operator) {
      case "+":
        return roundResult(a + b);
      case "-":
        return roundResult(a - b);
      case "*":
        return roundResult(a * b);
      case "/":
        return roundResult(a / b);
      default:
        return b;
    }
  }

  function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }
});
