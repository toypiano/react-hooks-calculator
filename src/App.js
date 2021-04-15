import React from 'react';
import Buttons from './Buttons';
import reducer, { initialState } from './reducer';

function Display({ formula, currentVal }) {
  return (
    <div className="display">
      <span className="formula">{formula}</span>
      <span className="output">{currentVal}</span>
    </div>
  );
}

function Calculator() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setInputVal = (e) => {
    dispatch({
      type: 'inputReceived',
      payload: e.target.value,
    });
  };

  return (
    <div className="calculator">
      <Display formula={state.formula} currentVal={state.currentVal} />
      <Buttons currentVal={state.currentVal} setInputVal={setInputVal} />
    </div>
  );
}

const Credit = () => (
  <div className="credit">
    by Sid H. Lee
    <a
      href="https://github.com/sidhlee"
      rel="noopener noreferrer"
      target="_blank"
    >
      <i className="fab fa-github"></i>
    </a>
  </div>
);

function App() {
  return (
    <div className="app">
      <div className="container">
        <Calculator />
        <Credit />
        <p className="instruction">Use keypad to input numbers!</p>
      </div>
    </div>
  );
}

export default App;
