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

function numberEntered(state, inputVal) {
  const { currentVal, formula } = state;

  let newCurrentVal, newFormula;
  if (currentVal === "0") {
    if (inputVal === "0") newCurrentVal = "0";
    else newCurrentVal = inputVal;
  } else if (isOperator(currentVal)) {
    newCurrentVal = inputVal;
  } else {
    newCurrentVal = currentVal.concat(inputVal);
  }

  newFormula = formula.concat(inputVal);
  return {
    ...state,
    formula: newFormula,
    inputVal: inputVal,
    evaluated: false,
    currentVal: newCurrentVal
  };
}

function decimalEntered(state, inputVal) {
  const { currentVal, formula } = state;
  let newCurrentVal, newFormula;
  if (currentVal === ".") newCurrentVal = ".";
  newCurrentVal = currentVal.concat(".");
  if (currentVal.includes(".")) newCurrentVal = currentVal;
  newFormula = formula.concat(inputVal);
  return {
    ...state,
    formula: newFormula,
    inputVal: inputVal,
    currentVal: newCurrentVal
  };
}

function operatorEntered(state, inputVal) {
  const { currentVal, formula } = state;
  let newCurrentVal = currentVal,
    newFormula = formula;
  if (inputVal === "-") {
    if (currentVal === "-" || currentVal[0] === "-")
      newCurrentVal = currentVal;
    newFormula = formula;
    if (currentVal === "0") {
      newCurrentVal = "-";
      newFormula = "-";
    } else {
      newCurrentVal = "-";
      newFormula = formula.concat(" " + inputVal + " ");
    }
  } else if (!isOperator(currentVal)) {
    newCurrentVal = inputVal;
    newFormula = formula.concat(" " + inputVal + " ");
  }

  return {
    ...state,
    formula: newFormula,
    inputVal: inputVal,
    currentVal: newCurrentVal
  };
}

// TODO
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
