// "use strict"
let result = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".result-container");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    //if buffer is 0 then it's 0
    buffer = value;
  } else {
    //otherwise append the next number on. ie if 3 is buffer and you click 5 now buffer is 35
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer); //parseInt takes string and returns INT
  if (result === 0) {
    result = intBuffer; //variable to hold INT version of buffer variable
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = ""; //what is shown inbetween button pushes
}
// `${buffer}${previousOperator}` would show like 2+2 but gives issue with subtraction
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    result += intBuffer;
  } else if (previousOperator === "-") {
    result -= intBuffer;
  } else if (previousOperator === "×") {
    result *= intBuffer;
  } else {
    result /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      result = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +result;
      result = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:  //if none of above do the math
      handleMath(value);
      break;
  }
}

function rerender() {
  //refreshes screen anytime inputs are hit
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".input-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText); //event listener for button click
    });
}
rerender(); //running this here means I don't have to have a 0 in the HTML
init(); //starts the event listener
