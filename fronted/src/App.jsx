import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  async function addTodo() {
    if (input === "") return;

    let response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input }),
    });

    let newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setInput("");
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE"
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  }

  return (
    <div>
      <h1>Full Stack Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Task..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
