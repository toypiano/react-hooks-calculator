// const MAX_DIGIT = 21;

const isOperator = val => /[/*-+]/.test(val);
const isNumber = val => /[0-9]/.test(val);
const isEval = val => /Enter|=/i.test(val);
const isClear = val => /clear/i.test(val);

// TODO: add logic to process non-digits to generate formula string and display value
// display: "123.0003"
// formula: "321 + 324 * 323 / 4343"
function numberEntered(state, action) {
  console.log("state: " + state.inputVal);
  const { currentVal } = state;
  const { payload: inputVal } = action;
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
    inputVal,
    evaluated: false,
    currentVal: newCurrentVal
  };
}

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

function operatorEntered() {
  return;
}

function evaluated() {
  return;
}

function inputReceived(state, action) {
  const v = action.payload;
  if (isNumber(v)) {
    return numberEntered(state, action);
  }
  if (isClear(v)) {
    return initialized(state, action);
  }
  if (isOperator(v)) {
    operatorEntered(state, action);
  }
  if (isEval(v)) {
    evaluated(state, action);
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
