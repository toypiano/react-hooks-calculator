import React from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import reducer, { initialState } from "./reducer";

function Calculator(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const v = state.inputVal;
    if (/[0-9]/.test(v)) enterNumber();
    if (/[=/*-+]/.test(v)) enterOperator();
    if (/\./.test(v)) enterDecimal();
    if (/clear/i.test(v)) initialize();
    if (/enter|=/i.test(v)) evaluate();
  }, [state.inputVal]);

  const setInputVal = e => {
    dispatch({
      type: "inputReceived",
      payload: e.target.value
    });
  };

  const enterNumber = () => dispatch({ type: "numberEntered" });
  const enterOperator = () => dispatch({ type: "operatorEntered" });
  const enterDecimal = () => dispatch({ type: "decimalEntered" });
  const initialize = () => dispatch({ type: "initialized" });
  const evaluate = () => dispatch({ type: "evaluated" });

  return (
    <div className="Calculator">
      <Display state={state} />
      <Buttons
        currentVal={state.currentVal}
        setInputVal={setInputVal}
      />
    </div>
  );
}

export default Calculator;
