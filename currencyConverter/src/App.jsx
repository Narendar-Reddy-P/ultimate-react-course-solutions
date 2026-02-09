// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);
  const [loader, setLoader] = useState(false);

  console.log(`${from} ${to} ${amount}`);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setLoader(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
        { signal: controller.signal },
      );
      const data = await res.json();
      setLoader(false);
      if (amount === "") {
        setOutput(0);
      } else {
        if (from !== to) {
          setOutput(data.rates[`${to}`]);
        } else {
          setOutput(amount);
        }
      }

      console.log(data);
    }
    fetchData();
    return function () {
      controller.abort();
    };
  }, [from, to, amount]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loader}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={loader}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={loader}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{loader ? "loading.." : `${output} ${to}`}</p>
    </div>
  );
}
