import React from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import reducer, { initialState } from "./reducer";

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
      <Display state={state} />
      <Buttons
        enterNumber={enterNumber}
        enterOperator={enterOperator}
        evaluate={evaluate}
        initialize={initialize}
      />
    </div>
  );
}

export default Calculator;
