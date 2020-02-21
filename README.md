# Keypad Calculator with React Hooks

## Thing I learned from this project

- When you listen to `keydown` or `keypress` event to programmatically activate buttons,
  **`Enter` key will activate the pre-focused element**,
  which can sometimes be another button clicked by a mouse(and thus became focused).
  You can prevent this by calling `preventDefault` on event object.

```jsx
function Buttons({ setInputVal }) {
  const [pressedKey, setPressedKey] = React.useState(null);

  React.useEffect(() => {
    function handleKeyDown(e) {
      // prevent another button that was focused by clicking
      // from being "clicked" by pressing Enter
      e.preventDefault();
      console.log("keydown: " + e.key);
      if (e.key === pressedKey) return;
      setInputVal({
        target: { value: e.key }
      });
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
```
