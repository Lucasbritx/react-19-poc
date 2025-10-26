import React from "react";
import TodoCard from "../TodoCard";

function TodoList({ activeTab, todos }) {
  const getFilteredTodos = () => {
    switch (activeTab) {
      case "todo":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todo-list">
      {filteredTodos.length === 0 ? (
        <p className="empty-message">
          {activeTab === "todo"
            ? "No pending tasks!"
            : activeTab === "completed"
            ? "No completed tasks!"
            : "No tasks yet. Add one above!"}
        </p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            isLoading={isLoading}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
