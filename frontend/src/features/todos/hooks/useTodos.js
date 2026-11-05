
import { useCallback, useEffect, useState } from "react";
import {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todo.api";

const initialFilters = {
  search: "",
  status: "all",
  priority: "all",
  sort: "newest",
};

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(initialFilters);

  // READ: Fetch todos using current filters
  const fetchTodos = useCallback(async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const params = Object.fromEntries(
        Object.entries(currentFilters).filter(
          ([key, value]) => value && value !== "all"
        )
      );

      const response = await getAllTodo(params);

      setTodos(response.todos);
      return response.todos;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch todos. Please try again.";

      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Automatically fetch when filters change
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // CREATE
  const addTodo = async (data) => {
    try {
      setCreating(true);
      setError(null);

      const response = await createTodo(data);

      // Add locally only if it matches current filters
      await fetchTodos();

      return response.todo;
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create todo. Please try again."
      );

      return null;
    } finally {
      setCreating(false);
    }
  };

  // UPDATE COMPLETION
  const toggleTodo = async (id, completed) => {
    try {
      setError(null);

      await updateTodo(id, { completed });

      await fetchTodos();

      return true;
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update todo."
      );

      return false;
    }
  };

  // UPDATE TASK DETAILS
  const editTodo = async (id, data) => {
    try {
      setError(null);

      const response = await updateTodo(id, data);

      await fetchTodos();

      return response.todo;
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update todo."
      );

      return null;
    }
  };

  // DELETE
  const removeTodo = async (id) => {
    try {
      setError(null);

      await deleteTodo(id);

      await fetchTodos();

      return true;
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to delete todo."
      );

      return false;
    }
  };

  // CHANGE FILTERS
  const updateFilters = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // RESET FILTERS
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    todos,
    loading,
    creating,
    error,
    filters,
    fetchTodos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    updateFilters,
    clearFilters,
  };
}

export default useTodos;
