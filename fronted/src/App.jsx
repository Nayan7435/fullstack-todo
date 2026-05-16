import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // FETCH TODOS
  useEffect(() => {

    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));

  }, []);

  // ADD TODO
  async function addTodo() {

    if (input.trim() === "") return;

    let response = await fetch("http://localhost:3000/todos", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        task: input,
      }),

    });

    let newTodo = await response.json();

    setTodos([...todos, newTodo]);

    setInput("");
  }

  // DELETE TODO
  async function deleteTodo(id) {

    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  }

  return (

    <div className="bg-gray-900 min-h-screen flex justify-center items-center px-4">

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          🚀 Full Stack Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-3 mb-6">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Task..."
            className="flex-1 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none border border-gray-600 focus:border-green-500"
          />

          <button
            onClick={addTodo}
            className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-xl transition"
          >
            Add
          </button>

        </div>

        {/* Todo List */}
        <ul className="space-y-3">

          {todos.map((todo) => (

            <li
              key={todo._id}
              className="bg-gray-700 p-4 rounded-xl flex justify-between items-center"
            >

              <span className="text-white text-lg">
                {todo.task}
              </span>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
              >
                ❌
              </button>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default App;