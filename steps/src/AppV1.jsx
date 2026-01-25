import { useState } from "react";

const messages = ["Learn React", "Apply for jobs", "Invest your new income"];
function App() {
  const [state, setState] = useState(1);
  const [containerState, setContainerState] = useState(true);

  return (
    <>
      <button
        className="toggleBtn"
        onClick={() => setContainerState((containerState) => !containerState)}
      >
        X
      </button>
      {containerState && (
        <div className="container">
          <div className="numbers">
            {console.log(state >= 2)}
            <div className="num focus">1</div>
            <div className={`num ${state >= 2 ? "focus" : ""}`}>2</div>
            <div className={`num ${state >= 3 ? "focus" : ""}`}>3</div>
          </div>
          <div className="message">
            {(state === 1 && messages[0]) ||
              (state === 2 && messages[1]) ||
              (state === 3 && messages[2])}
          </div>
          <div className="end">
            <button
              className="PNbtn"
              onClick={() =>
                state === 1 ? {} : setState((state) => state - 1)
              }
            >
              Previous
            </button>
            <button
              className="PNbtn"
              onClick={() =>
                state === 3 ? {} : setState((state) => state + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
