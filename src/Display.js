import React from "react";

function Formula({ value }) {
  return <div className="Formula">{value}</div>;
}

function Output({ value }) {
  return <div className="Output">{value}</div>;
}

export default ({ state }) => (
  <div className="Display">
    <Formula value={state.formula} />
    <Output value={state.currentVal} />
  </div>
);
