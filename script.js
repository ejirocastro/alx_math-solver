const numberButtons = document.querySelectorAll("[cal-number]");
const numberOperations = document.querySelectorAll("[cal-operation]");
const equalsButton = document.querySelector("[cal-equals]");
const deleteButton = document.querySelector("[cal-delete]");
const allClearButton = document.querySelector("[cal-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = " ";
    this.currentOperand = " ";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  compute() {}

  chooseOperation(operation) {
    if (this.currentOperand === " ") return;
    if (this.previousOperand !== " ") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";
  }

  updateDisplay() {
    this.currentOperandTextElement.value = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Show clicked number
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

/*numberOperations.forEach(function(buttonOperation) {
    buttonOperation.addEventListener('click', function() {
        calculator.appendNumber(buttonOperation.textContent)
        calculator.updateDisplay()
    })
})*/

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

numberOperations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
