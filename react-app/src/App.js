import React from "react";

function App() {
  const [name, setName] = React.useState("World");

  return (
    <div className="App">
      <h1>Hello, {name}</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

export default App;
