const input = "LLR";

function valueCalculator(input) {
  let values = [];
  for (let i = 0; i < input.length; i++) {
    let value = 0;
    if (input[i] === "R") {
      value = input.length - i - 1;
      values.push(value);
    }
    if (input[i] === "L") {
      value = i;
      values.push(value);
    }
  }
  return values.reduce((acc, el) => acc + el, 0);
}

function left0Right(input, k) {
  let inputArray = input.split("");
  let counter = 0;
  for (let i = 0, j = inputArray.length - 1; i < j; i++, j--) {
    if (inputArray[i] === "L" && counter < k) {
      inputArray[i] = "R";
      counter++;
    }
    if (inputArray[j] === "R" && counter < k) {
      inputArray[j] = "L";
      counter++;
    }
  }
  const newString = inputArray.join("");
  const value = valueCalculator(newString);
  return `The max value of your initial input, with ${k} replacements is ${value}.
Your new string is ------> ${newString}`;
}

console.log(left0Right(input, 3));
