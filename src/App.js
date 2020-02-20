import React from "react";

const buttonObjects = [
  { value: "Clear", gridArea: "clear", keyCode: 12 },
  { value: "=", gridArea: "equal", keyCode: 187 },
  { value: "/", gridArea: "divide", keyCode: 111 },
  { value: "*", gridArea: "multiply", keyCode: 106 },
  { value: "7", gridArea: "seven", keyCode: 55 },
  { value: "8", gridArea: "eight", keyCode: 56 },
  { value: "9", gridArea: "nine", keyCode: 57 },
  { value: "-", gridArea: "minus", keyCode: 109 },
  { value: "4", gridArea: "four", keyCode: 52 },
  { value: "5", gridArea: "five", keyCode: 53 },
  { value: "6", gridArea: "six", keyCode: 54 },
  { value: "+", gridArea: "plus", keyCode: 107 },
  { value: "1", gridArea: "one", keyCode: 49 },
  { value: "2", gridArea: "two", keyCode: 50 },
  { value: "3", gridArea: "three", keyCode: 51 },
  { value: "Enter", gridArea: "enter", keyCode: 13 },
  { value: "0", gridArea: "zero", keyCode: 48 },
  { value: ".", gridArea: "point", keyCode: 110 }
];

const MAX_DIGIT = 21;

function Formula() {
  return <div className="Formula">234 + 234 x 23</div>;
}

function Display({ value }) {
  return <div className="Display">{value}</div>;
}

function Buttons({ enterNumber, initialize }) {
  const [pressedKey, setPressedKey] = React.useState(null);
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === pressedKey) return;
      // return so that we don't set pressedKey as "Clear"
      if (e.key === "Clear") return initialize();
      setPressedKey(e.key);
      enterNumber({
        target: { value: e.key }
      });
    }
    function handleKeyUp(e) {
      if (e.key === pressedKey) {
        setPressedKey(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKey, enterNumber, initialize]);

  const buttons = buttonObjects.map(btn => {
    return (
      <Button
        key={btn.gridArea}
        value={btn.value}
        gridArea={btn.gridArea}
        pressedKey={pressedKey}
        clicked={btn.value === "Clear" ? initialize : enterNumber}
      />
    );
  });

  return <div className="Buttons">{buttons}</div>;
}

function Button({ value, gridArea, pressedKey, clicked }) {
  let classes = ["Button"];
  if (pressedKey === value) {
    classes = [...classes, "active"];
  }
  const style = { gridArea };
  return (
    <button
      style={style}
      className={classes.join(" ")}
      onClick={clicked}
      value={value}
    >
      {value}
    </button>
  );
}

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

const initialState = {
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

function Calculator(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const enterNumber = e =>
    dispatch({
      type: "numberEntered",
      payload: e.target.value
    });

  const enterOperator = e =>
    dispatch({
      type: "operatorEntered",
      payload: e.target.value
    });

  const initialize = () => ({ type: "initialized" });
  const evaluate = () => ({ type: "evaluated" });

  return (
    <div className="Calculator">
      <Formula />
      <Display value={state.currentVal} />
      <Buttons
        enterNumber={enterNumber}
        enterOperator={enterOperator}
        evaluate={evaluate}
        initialize={initialize}
      />
    </div>
  );
}

const Credit = () => <div className="Credit">by Toypiano</div>;

function App(props) {
  return (
    <div className="App">
      <Calculator />
      <Credit />
    </div>
  );
}

export default App;
