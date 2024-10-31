
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  function handleInputChange(e) {
    const inputValue = e.target.value;
    setTodo(inputValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim()) {
      const newTodo = {
        id: todos.length,
        data: todo.trim(),
        done: false
      };
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  }

  function handleDelete(id) {
    const array = todos.filter((x) => x.id !== id);
    setTodos(array);
  }

  function handleToggle(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  function handleAllDone() {
    setTodos(todos.map((todo) => ({
      ...todo,
      done: true
    })));
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={todo}
            onChange={handleInputChange}
            placeholder="Add a new task"
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>

      {/* Action Buttons */}
      {todos.length > 0 && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleAllDone}
            className="bg-green-500 text-white px-4 py-2 rounded flex-1"
          >
            Complete All
          </button>
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-4 py-2 rounded flex-1"
          >
            Delete All
          </button>
        </div>
      )}

      {/* Todo List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo.id)}
                className="h-4 w-4"
              />
              <span className={todo.done ? 'line-through text-gray-500' : ''}>
                {todo.data}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 px-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No tasks yet. Add some tasks to get started!
        </p>
      )}
    </div>
  );
}

export default App;
