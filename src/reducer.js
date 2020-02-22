// TODO: add input for precision setting
const PRECISION = 2;

const isOperator = val => /^[/*\-+]$/.test(val.trim());
const isNumber = val => /^[0-9]$/.test(val);
const isEval = val => /^Enter$|^=$/i.test(val);
const isClear = val => /^clear$/i.test(val);
const isDecimal = val => /^\.$/.test(val);
const endsWithOperator = val => isOperator(val.trim().slice(-1));

export const initialState = {
  inputVal: null,
  currentVal: "0",
  evaluated: false,
  prevVal: "0",
  formula: "",
  error: false
};

function initialized() {
  return initialState;
}

function numberEntered(state, inputVal) {
  const { currentVal, formula, evaluated } = state;
  let newCurrentVal, newFormula;

  if (evaluated && !endsWithOperator(formula))
    return {
      ...initialState,
      currentVal: inputVal,
      formula: inputVal
    };
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
  const { currentVal, formula, evaluated, prevVal } = state;
  let newCurrentVal = currentVal,
    newFormula = formula;
  if (evaluated)
    return {
      ...state,
      currentVal: inputVal,
      formula: prevVal + " " + inputVal + " "
    };
  if (inputVal === "-" && !endsWithOperator(currentVal)) {
    if (currentVal === "-" || currentVal[0] === "-") {
      newCurrentVal = currentVal;
      newFormula = formula;
    }
    if (currentVal === "0") {
      newCurrentVal = "-";
      newFormula = "-";
    } else {
      newCurrentVal = "-";
      newFormula = formula.concat(" " + inputVal + " ");
    }
  } else if (!isOperator(currentVal)) {
    if (currentVal === "0") {
      newCurrentVal = currentVal;
      newFormula = formula;
    } else {
      newCurrentVal = inputVal;
      newFormula = formula.concat(" " + inputVal + " ");
    }
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
  const { currentVal, formula } = state;
  let expression = formula;
  if (isOperator(currentVal.trim().slice(-1)))
    expression = formula.slice(0, -3);
  // eslint-disable-next-line no-eval
  const answer =
    // eslint-disable-next-line no-eval
    Math.round(eval(expression) * 10 ** PRECISION) / 10 ** PRECISION;
  const newFormula = expression + " = " + answer;
  return {
    ...state,
    currentVal: answer.toString(),
    formula: newFormula,
    prevVal: answer,
    evaluated: true
  };
}

function inputReceived(state, action) {
  const v = action.payload;
  if (state.error) {
    return isClear(v) ? initialized(state, v) : state;
  }
  if (isNumber(v)) return numberEntered(state, v);
  if (isDecimal(v)) return decimalEntered(state, v);
  if (isClear(v)) return initialized(state, v);
  if (isOperator(v)) return operatorEntered(state, v);
  if (isEval(v)) return evaluated(state, v);
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
