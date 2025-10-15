import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [requestDelay, setRequestDelay] = useState(500) // Default 500ms
  const [isLoading, setIsLoading] = useState(true) // Start with loading state
  const [isInitialized, setIsInitialized] = useState(false)

  const initialTasks = [
    { id: 1, text: "Learn React 19 new features", completed: false },
    { id: 2, text: "Build a todo application", completed: true },
    { id: 3, text: "Implement request simulation", completed: false },
    { id: 4, text: "Add loading states", completed: true },
    { id: 5, text: "Style the application", completed: false },
    { id: 6, text: "Test different delay times", completed: false },
  ]

  // Fetch initial todos on component mount
  useEffect(() => {
    const fetchInitialTodos = async () => {
      setIsLoading(true)
      // Simulate fetching from an API
      await new Promise(resolve => setTimeout(resolve, requestDelay))
      setTodos(initialTasks)
      setIsInitialized(true)
      setIsLoading(false)
    }

    if (!isInitialized) {
      fetchInitialTodos()
    }
  }, [isInitialized, requestDelay])

  // Simulate API request with configurable delay for user actions
  const simulateRequest = async (operation) => {
    if (!isInitialized) return // Don't simulate requests during initial load
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, requestDelay))
    operation()
    setIsLoading(false)
  }

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      
      await simulateRequest(() => {
        setTodos(prev => [...prev, newTodo])
        setInputValue('')
      })
    }
  }

  const toggleTodo = async (id) => {
    await simulateRequest(() => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ))
    })
  }

  const deleteTodo = async (id) => {
    await simulateRequest(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    })
  }

  const getFilteredTodos = () => {
    switch (activeTab) {
      case 'todo':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const filteredTodos = getFilteredTodos()
  const todoCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List</h1>
        
        {/* Request Simulation Control */}
        <div className="simulation-control">
          <label htmlFor="delay-slider" className="delay-label">
            Request Delay: {requestDelay}ms
          </label>
          <input
            id="delay-slider"
            type="range"
            min="0"
            max="3000"
            step="100"
            value={requestDelay}
            onChange={(e) => setRequestDelay(Number(e.target.value))}
            className="delay-slider"
          />
          <div className="delay-markers">
            <span>0ms</span>
            <span>1.5s</span>
            <span>3s</span>
          </div>
          <button 
            onClick={() => {
              setIsInitialized(false)
              setTodos([])
            }}
            className="refresh-btn"
            disabled={isLoading}
            title="Refresh todos (simulates API refetch)"
          >
            {isLoading && !isInitialized ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>
              {!isInitialized ? 'Loading todos...' : 'Processing request...'}
            </span>
          </div>
        )}
        
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
            disabled={isLoading}
          />
          <button 
            onClick={addTodo} 
            className="add-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`tab ${activeTab === 'todo' ? 'active' : ''}`}
            onClick={() => setActiveTab('todo')}
          >
            Todo ({todoCount})
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {activeTab === 'todo' ? 'No pending tasks!' : 
               activeTab === 'completed' ? 'No completed tasks!' : 
               'No tasks yet. Add one above!'}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
                  {isLoading ? '...' : 'Delete'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
