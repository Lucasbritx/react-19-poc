import { useState, use, Suspense, useTransition } from "react";
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
    promise = new Promise((resolve) => setTimeout(() => resolve(todos), 1000));
  }
  return promise;
};

// Simulate async todo addition with delay
const addTodoAsync = async (todoText, currentTodos) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  return [...currentTodos, newTodo];
};

function TodoApp() {
  const initialTodos = use(fetchTodos());
  const [isPending, startTransition] = useTransition();

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      const todoText = input.trim();
      setInput("");

      startTransition(async () => {
        try {
          const updatedTodos = await addTodoAsync(todoText, todos);
          setTodos(updatedTodos);
        } catch (error) {
          console.error("Failed to add todo:", error);
        }
      });
    }
  };

  const toggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h1>React 19 + SSR</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={input}
          disabled={isPending}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add todo..."
          style={{
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "text",
          }}
        />
        <button
          disabled={isPending}
          onClick={addTodo}
          style={{
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {isPending && (
        <span
        >
          Adding todo...
        </span>
      )}

      {todos.map((todo) => (
        <div key={todo.id} style={{ margin: "10px 0" }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggle(todo.id)}
          />
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
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
