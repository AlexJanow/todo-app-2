import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  // States
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  return (
    <div className="App">
      <form>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
