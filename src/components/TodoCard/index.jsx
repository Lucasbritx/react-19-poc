import { ViewTransition } from "react";

const TodoCard = ({ todo, isLoading = false }) => (
  <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
    <div className="todo-content">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
        disabled={isLoading}
      />
      <span className="todo-text">{todo.text}</span>
    </div>
    <button
      onClick={() => deleteTodo(todo.id)}
      className="delete-btn"
      disabled={isLoading}
    >
      {isLoading ? "..." : "Delete"}
    </button>
  </div>
);

export default TodoCard;
