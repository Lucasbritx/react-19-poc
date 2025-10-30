function Tabs({ activeTab, setActiveTab, todos, isLoading }) {
  const todoCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="tabs">
      <button
        disabled={isLoading}
        className={`tab ${activeTab === "all" ? "active" : ""}`}
        onClick={() => setActiveTab("all")}
      >
        All ({todos.length})
      </button>
      <button
        disabled={isLoading}
        className={`tab ${activeTab === "todo" ? "active" : ""}`}
        onClick={() => setActiveTab("todo")}
      >
        Todo ({todoCount})
      </button>
      <button
        disabled={isLoading}
        className={`tab ${activeTab === "completed" ? "active" : ""}`}
        onClick={() => setActiveTab("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}

export default Tabs;
