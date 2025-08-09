import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ToDo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [email, setEmail] = useState(null);
  const [docId, setDocId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('zentro_user_email');
    if (!userEmail) {
      alert('You must be logged in.');
      navigate('/login');
    } else {
      setEmail(userEmail);
    }
  }, [navigate]);

  useEffect(() => {
    if (email) fetchTodos(email);
  }, [email]);

  const fetchTodos = async (userEmail) => {
    try {
      const res = await fetch(`http://localhost:5000/todos?email=${userEmail}`);
      const data = await res.json();

      if (data.length > 0) {
        setTodos(data[0].items);
        setDocId(data[0].id);
      } else {
        const res = await fetch('http://localhost:5000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, items: [] }),
        });
        const newDoc = await res.json();
        setTodos([]);
        setDocId(newDoc.id);
      }
    } catch (error) {
      console.error('Fetch todos error:', error);
    }
  };

  const saveTodos = async (newTodos) => {
    if (!docId) return;
    try {
      await fetch(`http://localhost:5000/todos/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: docId,
          email,
          items: newTodos,
        }),
      });
    } catch (error) {
      console.error('Save todos error:', error);
    }
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const updated = [...todos, { text: trimmed, done: false }];
    setTodos(updated);
    saveTodos(updated);
    setInput('');
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    saveTodos(updated);
  };

  const toggleDone = (index) => {
    const updated = todos.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTodos(updated);
    saveTodos(updated);
  };

  const handleClearAll = () => {
    const confirmed = window.confirm("Are you sure you want to clear all tasks?");
    if (!confirmed) return;

    setTodos([]);
    saveTodos([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Your To-Do List</h1>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4 mb-6">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 px-5 py-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(index)}
                  className="w-5 h-5 accent-blue-500"
                />
                <span
                  className={`text-lg ${todo.done ? 'line-through opacity-60' : ''}`}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => handleDelete(index)}
                className="text-red-400 hover:text-red-600 text-xl font-bold"
                title="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={handleClearAll}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDo;