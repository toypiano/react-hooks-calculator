// const MAX_DIGIT = 21;

const isOperator = val => /[/*\-+]/.test(val);
const isNumber = val => /[0-9]/.test(val);
const isEval = val => /Enter|=/i.test(val);
const isClear = val => /clear/i.test(val);
const isDecimal = val => /\./.test(val);

export const initialState = {
  inputVal: null,
  currentVal: "0",
  prevVal: "0",
  formula: "",
  currentSign: "pos",
  lastClicked: "",
  digitMaxed: false
};

function initialized() {
  return initialState;
}

// TODO: add logic to process non-digits to generate formula string and display value
// display: "123.0003"
// formula: "321 + 324 * 323 / 4343"
function numberEntered(state, inputVal) {
  const { currentVal } = state;
  // return if MAX_DIGIT is reached
  if (state.currentVal.match(/digit/i)) return;

  let newCurrentVal;
  if (currentVal === "0") {
    if (inputVal === "0") newCurrentVal = "0";
    else newCurrentVal = inputVal;
  } else {
    newCurrentVal = currentVal.concat(inputVal);
  }

  return {
    ...state,
    inputVal: inputVal,
    evaluated: false,
    currentVal: newCurrentVal
  };
}

function decimalEntered(state, inputVal) {
  const { currentVal } = state;
  let newCurrentVal;
  if (currentVal === ".") newCurrentVal = ".";
  newCurrentVal = currentVal.concat(".");
  if (currentVal.includes(".")) newCurrentVal = currentVal;

  return {
    ...state,
    inputVal: inputVal,
    currentVal: newCurrentVal
  };
}

function operatorEntered(state, inputVal) {
  console.log("operator");
  const { currentVal } = state;
  let newCurrentVal;
  if (inputVal === "-") {
    if (currentVal === "-" || currentVal[0] === "-")
      newCurrentVal = currentVal;
    if (currentVal === "0") newCurrentVal = "-";
  }

  return {
    ...state,
    inputVal: inputVal,
    currentVal: newCurrentVal
  };
}

function evaluated(state, inputVal) {
  return state;
}

function inputReceived(state, action) {
  const v = action.payload;
  console.log("inputReceived: " + v);
  if (isNumber(v)) {
    return numberEntered(state, v);
  }
  if (isDecimal(v)) {
    return decimalEntered(state, v);
  }
  if (isClear(v)) {
    return initialized(state, v);
  }
  if (isOperator(v)) {
    return operatorEntered(state, v);
  }
  if (isEval(v)) {
    return evaluated(state, v);
  }
  return state;
}

// reducer for Calculator state
const reducer = (state, action) => {
  switch (action.type) {
    case "inputReceived":
      return inputReceived(state, action);
    default:
      return state;
  }
};

export default reducer;
