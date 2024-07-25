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

const answer = document.querySelector(".answer");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement, answer) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.answer = answer;
    this.clear();
  }

  clear() {
    this.currentOperandTextElement.value = "";
    this.answer.textContent = "";

    this.currentOperandTextElement.focus();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (!this.currentOperandTextElement.value) {
      this.currentOperand = "";
      this.currentOperandTextElement.value = "";
    }

    this.currentOperandTextElement.value += number;
    this.currentOperandTextElement.focus();
  }

  chooseOperation(operation) {
    if (this.currentOperandTextElement.value === " ") return;
    this.currentOperandTextElement.value += operation;
    this.currentOperandTextElement.focus();
  }

  delete() {
    this.currentOperandTextElement.value =
      this.currentOperandTextElement.value.slice(0, -1);
  }

  compute() {
    try {
      let expression = this.currentOperandTextElement.value;

        //suports trigonomentric functions
      expression = expression.replace(/sin(\d+)/g, "sin($1)");
      expression = expression.replace(/cos(\d+)/g, "cos($1)");
      expression = expression.replace(/tan(\d+)/g, "tan($1)");

      // support hyperbolic functions
      expression = expression.replace(/sinh(\d+)/g, "sinh($1)");
      expression = expression.replace(/cosh(\d+)/g, "cosh($1)");
      expression = expression.replace(/tanh(\d+)/g, "tanh($1)");

      // supports logarithm and exponential function
      expression = expression.replace(/log(\d+)/g, "log($1)");
      expression = expression.replace(/exp(\d+)/g, "exp($1)");

      //supports square root
      expression = expression.replace(/√(\d+)/g, "sqrt($1)");

      const result = math.evaluate(expression);

      if (result === undefined) throw new Error("Invalid Operation");

      this.answer.textContent = `${this.currentOperandTextElement.value} = ${result}`;
    } catch (error) {
      return (answer.textContent =
        error.msg === undefined && "Invalid Operation");
    } finally {
      // clear output form
      this.currentOperand = "";
      this.currentOperandTextElement.value = "";
      this.currentOperandTextElement.focus();
    }
  }
}

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

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
});

numberOperations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

// Equal Sign
equalsButton.addEventListener("click", calculator.compute.bind(calculator));

currentOperandTextElement.addEventListener("keypress", function ({ key }) {
  if (key === "Enter") calculator.compute();
});


