import React from "react";

function Formula() {
  return <div className="Formula">234 + 234 x 23</div>;
}

function Output({ value }) {
  return <div className="Output">{value}</div>;
}

export default ({ state }) => (
  <div className="Display">
    <Formula />
    <Output value={state.currentVal} />
  </div>
);
