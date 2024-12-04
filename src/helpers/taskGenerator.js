import { evaluate, simplify } from "mathjs";

export default function getRandomTasks(tasks, level, amount) {
  const levelMultiplicators = { Beginner: 10, Intermediate: 100, Advanced: 1000 };
  const multiplicator = levelMultiplicators[level];
  const generatedTasks = [];

  for (let index = 0; index < amount; index++) {
    const taskIndex = Math.floor(Math.random() * tasks.length);
    const task = tasks[taskIndex];
    const operators = ["+", "-", "*", "/"];

    // Randomly select operands, operators and variables
    const randomOperands = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * multiplicator));

    const randomOperators = Array(4)
      .fill(null)
      .map(() => operators[Math.floor(Math.random() * 4) % 4]);

    const variableCoefficients = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * multiplicator));

    let answer = parseTaskString(task.answer, {
      operands: randomOperands,
      operators: randomOperators,
      variableCoefficients,
    });

    if (answer.includes("x") && !task.task.includes("A chocolate bar costs")) {
      answer = simplify(answer).toString().replace(/ /g, "");
    } else if (answer.includes("Math")) {
      let evalAnswer = Function(`'use strict'; return (${answer});`)();
      answer = Math.round(evalAnswer * 100) / 100;
    } else if (!/[a-zA-Z]/g.test(answer)) {
      answer = Math.round(evaluate(answer) * 100) / 100;
    }

    generatedTasks.push({
      task: parseTaskString(task.task, {
        operands: randomOperands,
        operators: randomOperators,
        variableCoefficients,
      }),
      answer,
    });
  }

  return generatedTasks;
}

function parseTaskString(expression, valueObj) {
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  let text = expression.replace(templateMatcher, (_, value) => {
    if (value.startsWith("reverseOperator")) {
      const match = value.match(/\((.*?)\)/)[1];
      const operatorValue = valueObj[match.substring(0, match.length - 1)][match.slice(-1)];
      value = reverseOperator(operatorValue);
      return value;
    } else {
      value = valueObj[value.substring(0, value.length - 1)][value.slice(-1)];
      return value;
    }
  });
  return text;
}

function reverseOperator(operator) {
  switch (operator) {
    case "+":
      return "-";
    case "-":
      return "+";
    case "*":
      return "/";
    case "/":
      return "*";
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
