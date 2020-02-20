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

  const setCurrentVal = e => {
    dispatch({
      type: "inputReceived",
      payload: e.target.value
    });
  };

  const initialize = () => dispatch({ type: "initialized" });
  const evaluate = () => dispatch({ type: "evaluated" });

  return (
    <div className="Calculator">
      <Display state={state} />
      <Buttons
        enterNumber={enterNumber}
        enterOperator={enterOperator}
        evaluate={evaluate}
        initialize={initialize}
        currentVal={state.currentVal}
        setCurrentVal={setCurrentVal}
      />
    </div>
  );
}

export default Calculator;
