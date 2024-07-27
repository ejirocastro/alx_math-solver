// Select all elements with the attribute cal-number
const numberButtons = document.querySelectorAll("[cal-number]");

// Select all elements with the attribute cal-operation
const numberOperations = document.querySelectorAll("[cal-operation]");

// Select the element with the attribute cal-equals
const equalsButton = document.querySelector("[cal-equals]");

// Select the element with the attribute cal-delete
const deleteButton = document.querySelector("[cal-delete]");

// Select the element with the attribute cal-all-clear
const allClearButton = document.querySelector("[cal-all-clear]");

// Select the element for displaying the previous operand
const previousOperandTextElement = document.querySelector("[data-previous-operand]");

// Select the element for displaying the current operand
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// Select the element to display the answer
const answer = document.querySelector(".answer");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement, answer) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.answer = answer;
    this.clear();
  }

  // Clear the calculator display
  clear() {
    this.currentOperandTextElement.value = "";
    this.answer.textContent = "";
    this.currentOperandTextElement.focus();
  }

  // Append a number or decimal point to the current operand
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (!this.currentOperandTextElement.value) {
      this.currentOperand = "";
      this.currentOperandTextElement.value = "";
    }
    this.currentOperandTextElement.value += number;
    this.currentOperandTextElement.focus();
  }

  // Choose an operation to perform
  chooseOperation(operation) {
    if (this.currentOperandTextElement.value === " ") return;
    this.currentOperandTextElement.value += operation;
    this.currentOperandTextElement.focus();
  }

  // Delete the last character from the current operand
  delete() {
    this.currentOperandTextElement.value = this.currentOperandTextElement.value.slice(0, -1);
  }

  // Compute the result of the current expression
  compute() {
    try {
      let expression = this.currentOperandTextElement.value;

      // Supports trigonometric functions
      expression = expression.replace(/sin(\d+)/g, "sin($1)");
      expression = expression.replace(/cos(\d+)/g, "cos($1)");
      expression = expression.replace(/tan(\d+)/g, "tan($1)");

      // Support hyperbolic functions
      expression = expression.replace(/sinh(\d+)/g, "sinh($1)");
      expression = expression.replace(/cosh(\d+)/g, "cosh($1)");
      expression = expression.replace(/tanh(\d+)/g, "tanh($1)");

      // Supports logarithm and exponential functions
      expression = expression.replace(/log(\d+)/g, "log($1)");
      expression = expression.replace(/exp(\d+)/g, "exp($1)");

      // Supports square root
      expression = expression.replace(/√(\d+)/g, "sqrt($1)");

      // Evaluate the expression using math.js
      const result = math.evaluate(expression);

      if (result === undefined) throw new Error("Invalid Operation");

      // Display the result
      this.answer.textContent = `${this.currentOperandTextElement.value} = ${result}`;
    } catch (error) {
      return (answer.textContent = error.msg === undefined && "Invalid Operation");
    } finally {
      // Clear the output form
      this.currentOperand = "";
      this.currentOperandTextElement.value = "";
      this.currentOperandTextElement.focus();
    }
  }
}

// Instantiate a new Calculator object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement,
  answer
);

// Show clicked number
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.textContent);
  });
});

// Delete the last character when the delete button is clicked
deleteButton.addEventListener("click", () => {
  calculator.delete();
});

// Clear the calculator display when the all-clear button is clicked
allClearButton.addEventListener("click", () => {
  calculator.clear();
});

// Append the chosen operation when an operation button is clicked
numberOperations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

// Compute the result when the equals button is clicked
equalsButton.addEventListener("click", calculator.compute.bind(calculator));

// Compute the result when the Enter key is pressed
currentOperandTextElement.addEventListener("keypress", function ({ key }) {
  if (key === "Enter") calculator.compute();
});

