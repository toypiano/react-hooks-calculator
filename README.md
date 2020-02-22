# Keypad Calculator with React Hooks

Using React hooks & css grid

<p class="codepen" data-height="575" data-theme-id="default" data-default-tab="js,result" data-user="sidhlee" data-slug-hash="yLNJaqb" style="height: 575px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="React Hooks Calculator">
  <span>See the Pen <a href="https://codepen.io/sidhlee/pen/yLNJaqb">
  React Hooks Calculator</a> by sidhlee (<a href="https://codepen.io/sidhlee">@sidhlee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

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

- `-` is the only math operator that needs to be escaped inside regex character class.

```jsx
const isOperator = val => /[/*\-+]/.test(val);
```

- Css grid is awesome.

```css
Buttons {
  display: grid;
  grid-gap: $btn-size/10;
  grid-template-columns: $btn-size $btn-size $btn-size $btn-size;
  grid-template-rows: $btn-size $btn-size $btn-size $btn-size $btn-size;
  grid-template-areas:
    "clear equal divide multiply"
    "seven eight nine minus"
    "four five six plus"
    "one two three enter"
    "zero zero point enter";
}
```

```jsx
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
```
