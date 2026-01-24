import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState(0);
  function message() {
    let date = new Date();
    date.setDate(date.getDate() + number);
    if (number === 0) {
      return `Today is ${date.toDateString()}`;
    } else if (number > 0) {
      if (number === 1) {
        return `1 day from today is ${date.toDateString()}`;
      } else {
        return `${number} days from today is ${date.toDateString()}`;
      }
    } else {
      if (number === -1) {
        return `1 day ago was ${date.toDateString()}`;
      } else {
        return `${Math.abs(number)} days ago was ${date.toDateString()}`;
      }
    }
  }
  function handleReset() {
    setStep(1);
    setNumber(0);
  }
  return (
    <>
      <div>
        <p>Step: {step}</p>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <button onClick={() => setNumber((n) => n - step)}>-</button>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        ></input>
        <button onClick={() => setNumber((n) => n + step)}>+</button>
      </div>
      <div>{message()}</div>
      <div>
        {(number != 0 || step != 1) && (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </>
  );
}

export default App;
