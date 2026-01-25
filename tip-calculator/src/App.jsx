import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [percent, setPercent] = useState(0);
  const [frndPercent, setFrndPercent] = useState(0);
  let tip = (percent / 200) * bill + (frndPercent / 200) * bill;
  function handleReset() {
    setBill("");
    setPercent(0);
    setFrndPercent(0);
  }
  return (
    <>
      <Bill bill={bill} onBill={setBill} id="bill" />
      <SelectPercentage percent={percent} onPercent={setPercent} id="percent" />
      <SelectPercentage
        percent={frndPercent}
        onPercent={setFrndPercent}
        id="frndPercent"
      />
      <Output bill={bill} tip={tip} />
      <Reset onReset={handleReset} />
    </>
  );
}
function Bill({ bill, onBill, id }) {
  return (
    <div>
      <label htmlFor={id}>How much was the bill?</label>
      <input
        type="text"
        placeholder="bill amount"
        id={id}
        value={bill}
        onChange={(e) => onBill(Number(e.target.value))}
      />
    </div>
  );
}
function SelectPercentage({ percent, onPercent, id }) {
  return (
    <div>
      <label htmlFor={id}>How did you like the service?</label>
      <select
        value={percent}
        id={id}
        onChange={(e) => onPercent(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <>
      {bill && (
        <h3>
          You pay ${Number(bill + tip).toFixed(2)} (${Number(bill).toFixed(2)}+
          ${Number(tip).toFixed(2)}
          tip)
        </h3>
      )}
    </>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>reset</button>;
}
export default App;

// 10% impression - 5% of total price tip
