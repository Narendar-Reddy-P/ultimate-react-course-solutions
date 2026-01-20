const messages = ["Learn React", "Apply for jobs", "Invest your new income"];
function App() {
  return (
    <>
      <button className="toggleBtn">X</button>
      <div className="container">
        <div className="numbers">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div className="message">Hello</div>
        <div className="end">
          <button className="PNbtn">Previous</button>
          <button className="PNbtn">Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
