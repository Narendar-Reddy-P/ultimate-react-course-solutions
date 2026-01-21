import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  function decrementStep() {
    if (step > 1) {
      setStep((n) => n - 1);
    }
  }
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
  return (
    <>
      <div>
        <button onClick={decrementStep}>-</button>
        <p>Step: {step}</p>
        <button onClick={() => setStep((n) => n + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setNumber((n) => n - step)}>-</button>
        <p>Count: {number}</p>
        <button onClick={() => setNumber((n) => n + step)}>+</button>
      </div>
      <div>{message()}</div>
    </>
  );
}

export default App;
