import React from "react";
import TodoCard from "../TodoCard";

function TodoList({
  todos,
  isLoading,
  toggleTodo = () => {},
  deleteTodo = () => {},
}) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">
          No tasks yet.
        </p>
      ) : (
        todos.map((todo) => (
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
