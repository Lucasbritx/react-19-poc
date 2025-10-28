import { useState, use, Suspense } from "react";
import "./App.css";

// TODO
// Call useTodoOperations hook
// useActionState for formHandling
// useOptimistic for updates
// useTransition to isPending state(startTransition on button click)
// add ViewTransition https://react.dev/reference/react/ViewTransition
// Add Activity component

const todos = [
  { id: 1, text: "Learn React 19", completed: false },
  { id: 2, text: "Test SSR", completed: true },
  { id: 3, text: "Use use() hook", completed: false },
];

let promise = null;
const fetchTodos = () => {
  if (!promise) {
    promise = new Promise(resolve => 
      setTimeout(() => resolve(todos), 10000)
    );
  }
  return promise;
};

function TodoApp() {
    const initialTodos = use(fetchTodos());

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        completed: false 
      }]);
      setInput("");
    }
  };

  const toggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1>React 19 + SSR</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} style={{ margin: '10px 0' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggle(todo.id)}
          />
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoApp />
    </Suspense>
  );
}

export default App;
