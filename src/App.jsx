import { useState, use, Suspense, useTransition, Activity } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import Tabs from "./components/Tabs";

// TODO
// Call useTodoOperations hook
// useActionState for formHandling
// useOptimistic for updates
// useTransition to isPending state(startTransition on button click) DONE
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
  await new Promise((resolve) => setTimeout(resolve, 3000));

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
  const [isTabPending, startTabTransition] = useTransition();

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedTasks = todos.filter((todo) => todo.completed);
  const todoTasks = todos.filter((todo) => !todo.completed);

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h1>Todo list</h1>
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

      <Tabs
        activeTab={activeTab}
        isLoading={isTabPending}
        setActiveTab={(newTab) =>
          startTabTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setActiveTab(newTab);
          })
        }
        todos={todos}
      />
      {isPending && <span>Adding todo...</span>}
      {isTabPending && <span>Switching tabs...</span>}

      <Activity mode={activeTab === "all" ? "visible" : "hidden"}>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </Activity>
      <Activity mode={activeTab === "todo" ? "visible" : "hidden"}>
        <TodoList todos={todoTasks} toggleTodo={toggleTodo} />
      </Activity>
      <Activity mode={activeTab === "completed" ? "visible" : "hidden"}>
        <TodoList todos={completedTasks} toggleTodo={toggleTodo} />
      </Activity>
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
