import React from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import reducer, { initialState } from "./reducer";

function Calculator(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setInputVal = e => {
    console.log(e.target.value);
    dispatch({
      type: "inputReceived",
      payload: e.target.value
    });
  };

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
