import { useState, useCallback, useMemo } from "react";

export const useTodoOperations = (requestDelay = 500) => {
  const [todos, setTodos] = useState([]);
  const [pendingOperations, setPendingOperations] = useState(new Set());

  const initialTasks = useMemo(() => [
    { id: 1, text: "Learn React 19 new features", completed: false },
    { id: 2, text: "Build a todo application", completed: true },
    { id: 3, text: "Implement request simulation", completed: false },
    { id: 4, text: "Add loading states", completed: true },
    { id: 5, text: "Style the application", completed: false },
    { id: 6, text: "Test different delay times", completed: false },
  ], []);

  // Create a promise for initial data loading
  const createInitialDataPromise = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialTasks);
      }, requestDelay);
    });
  }, [initialTasks, requestDelay]);

  // Simulate async operations
  const createAsyncOperation = useCallback((operation, operationId) => {
    return new Promise(async (resolve, reject) => {
      try {
        setPendingOperations(prev => new Set(prev).add(operationId));
        
        // Simulate network delay
        await new Promise(delayResolve => setTimeout(delayResolve, requestDelay));
        
        // Execute operation
        const result = await operation();
        
        setPendingOperations(prev => {
          const newSet = new Set(prev);
          newSet.delete(operationId);
          return newSet;
        });
        
        resolve(result);
      } catch (error) {
        setPendingOperations(prev => {
          const newSet = new Set(prev);
          newSet.delete(operationId);
          return newSet;
        });
        reject(error);
      }
    });
  }, [requestDelay]);

  const isOperationPending = useCallback((operationId) => {
    return pendingOperations.has(operationId);
  }, [pendingOperations]);

  return {
    todos,
    setTodos,
    createInitialDataPromise,
    createAsyncOperation,
    isOperationPending,
    pendingOperations: pendingOperations.size > 0
  };
};