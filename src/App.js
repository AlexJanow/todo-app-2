import "./App.css";
import React from "react";

function App() {
  // States
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  //localstorage

  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  //formsubmit
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  }
  //delete
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //checkbox
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  //edit button

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <div className="headerForm">
        <h1>
          todo or{" "}
          <s className="notnot">
            <h1 className="headerNot">not</h1>
          </s>{" "}
          todo
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button className="buttonFormSubmit" type="submit">
            add todo
          </button>
        </form>
      </div>
      {todos
        .filter((todo) => {
          return todo.completed === false;
        })
        .map((todo) => (
          <div
            className={`todoItem ${
              todo.completed === false ? "notDone" : "done"
            }`}
            key={todo.id}
          >
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div className="textContent">{todo.text}</div>
            )}
            <div className="checkbox-box">
              <label for="checkbox">check:</label>
              <input
                name="checkbox"
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
            </div>

            <button
              className="buttonDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              delete
            </button>

            {todoEditing === todo.id ? (
              <button
                className="buttonSubmit"
                onClick={() => editTodo(todo.id)}
              >
                submit
              </button>
            ) : (
              <button
                className="buttonEdit"
                onClick={() => setTodoEditing(todo.id)}
              >
                edit
              </button>
            )}
          </div>
        ))}
      {todos
        .filter((todo) => {
          return todo.completed === true;
        })
        .map((todo) => (
          <div
            className={`todoItem ${
              todo.completed === false ? "notDone" : "done"
            }`}
            key={todo.id}
          >
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div className="textContent">{todo.text}</div>
            )}
            <div className="checkbox-box">
              <label for="checkbox">check:</label>
              <input
                name="checkbox"
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
            </div>

            <button
              className="buttonDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              delete
            </button>

            {todoEditing === todo.id ? (
              <button
                className="buttonSubmit"
                onClick={() => editTodo(todo.id)}
              >
                submit
              </button>
            ) : (
              <button
                className="buttonEdit"
                onClick={() => setTodoEditing(todo.id)}
              >
                edit
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
