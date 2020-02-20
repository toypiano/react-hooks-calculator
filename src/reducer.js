const MAX_DIGIT = 21;

const isOperator = /[/*-+]/;

// TODO: add logic to process non-digits to generate formula string and display value
// display: "123.0003"
// formula: "321 + 324 * 323 / 4343"
function numberEntered(state, action) {
  // return if MAX_DIGIT is reached
  if (state.currentVal.match(/digit/i)) return;

  const { currentVal, formula, evaluated } = state;
  const newCurrentVal =
    currentVal === "0" || isOperator.test(currentVal)
      ? action.payload
      : currentVal.concat(action.payload);
  const newFormula =
    currentVal === "0" && action.payload === "0"
      ? "0"
      : action.payload;
  return {
    ...state,
    evaluated: false,
    currentVal: newCurrentVal,
    formula: newFormula
  };
}

function maxDigitReached(state, action) {
  return {
    ...state,
    currentVal: "Too many digits",
    prevVal: state.currentVal
  };
}

// TODO
function operatorEntered(state, action) {
  return;
}

export const initialState = {
  currentVal: "0",
  prevVal: "0",
  formula: "",
  currentSign: "pos",
  lastClicked: "",
  digitMaxed: false
};
function initialized(state) {
  return {
    ...state,
    ...initialState
  };
}
// TODO
function evaluated(state, action) {
  return;
}

// reducer for Calculator state
const reducer = (state, action) => {
  switch (action.type) {
    case "numberEntered":
      return numberEntered(state, action);
    case "operatorEntered":
      return operatorEntered(state, action);
    case "maxDigitReached":
      return maxDigitReached(state, action);
    case "initialized":
      return initialized(state, action);
    case "evaluated":
      return evaluated(state, action);
    default:
      return state;
  }
};

export default reducer;
