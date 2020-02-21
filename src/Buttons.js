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

function Buttons({ setInputVal }) {
  const [pressedKey, setPressedKey] = React.useState(null);
  React.useEffect(() => {
    function handleKeyDown(e) {
      console.log("keydown: " + e.key);
      if (e.key === pressedKey) return;
      if (e.key === "Enter") {
        // prevent another button that was focused by clicking
        // from being "clicked" by pressing Enter
        e.preventDefault();
        setInputVal({ target: { value: e.key } });
      }
      setInputVal({ target: { value: e.key } });
      setPressedKey(e.key);
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
  }, [pressedKey, setInputVal]);

  const buttons = buttonObjects.map(btn => {
    return (
      <Button
        type="button"
        key={btn.gridArea}
        value={btn.value}
        gridArea={btn.gridArea}
        pressedKey={pressedKey}
        clicked={setInputVal}
      />
    );
  });

  return <div className="Buttons">{buttons}</div>;
}

export default Buttons;
