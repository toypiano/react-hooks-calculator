import React from "react";

function Formula({ value }) {
  return <div className="Formula">{value}</div>;
}

function Output({ value }) {
  return <div className="Output">{value}</div>;
}

function Display({ state }) {
  return (
    <div className="Display">
      <Formula value={state.formula} />
      <Output value={state.currentVal} />
    </div>
  );
}

export default Display;
