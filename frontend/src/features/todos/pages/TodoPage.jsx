
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useTodos from "../hooks/useTodos";
import { useAuth } from "../../../hooks/useAuth";

import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import TodoFilters from "../components/TodoFilters";

function TodoPage() {
  const navigate = useNavigate();
  const { user, logout, logoutAll } = useAuth();

  const {
    todos,
    loading,
    creating,
    error,
    filters,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    updateFilters,
    clearFilters,
  } = useTodos();

  const [pendingAction, setPendingAction] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountError, setAccountError] = useState("");

  const handleCreateTodo = async (data) => addTodo(data);
  const handleToggleTodo = async (id, completed) =>
    toggleTodo(id, completed);
  const handleDeleteTodo = async (id) => removeTodo(id);
  const handleUpdateTodo = async (id, data) => editTodo(id, data);

  const handleAccountAction = async () => {
    if (!pendingAction) return;

    try {
      setAccountLoading(true);
      setAccountError("");

      if (pendingAction === "logout") {
        await logout();
      } else {
        await logoutAll();
      }

      navigate("/login", { replace: true });
    } catch (error) {
      setAccountError(
        error.response?.data?.message ||
          "The logout request failed. Please try again."
      );
    } finally {
      setAccountLoading(false);
      setPendingAction(null);
    }
  };

  const closeAccountModal = () => {
    if (accountLoading) return;
    setPendingAction(null);
    setAccountError("");
  };

  const isLogoutAll = pendingAction === "logoutAll";

  return (
    <main className="todo-page">
      <div className="todo-page__container">

        <header className="todo-page__header">
          <div className="todo-page__heading">
            <h1 className="todo-page__title">My Todos</h1>
            <p className="todo-page__description">
              Manage your daily tasks.
            </p>
          </div>

          <div className="todo-page__account">
            <span className="todo-page__account-email">
              {user?.email || "My Account"}
            </span>

            <div className="todo-page__account-actions">
              <button
                className="todo-page__logout-button"
                type="button"
                onClick={() => setPendingAction("logout")}
              >
                Logout
              </button>

              <button
                className="todo-page__logout-all-button"
                type="button"
                onClick={() => setPendingAction("logoutAll")}
              >
                Logout all devices
              </button>
            </div>
          </div>
        </header>

        <section className="todo-page__create">
          <h2 className="todo-page__section-title">Create a Todo</h2>
          <TodoForm
            onSubmit={handleCreateTodo}
            loading={creating}
          />
        </section>

        <TodoFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClear={clearFilters}
        />

        {error && (
          <p className="todo-page__error">{error}</p>
        )}

        {loading && (
          <p className="todo-page__loading">Loading todos...</p>
        )}

        {!loading && todos.length === 0 && (
          <p className="todo-page__empty">
            No matching todos found.
          </p>
        )}

        {!loading && todos.length > 0 && (
          <>
            <p className="todo-page__count">
              Showing {todos.length} tasks
            </p>

            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          </>
        )}
      </div>

      {pendingAction && (
        <div
          className="account-modal__overlay"
          onClick={closeAccountModal}
        >
          <section
            className="account-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal__title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              className="account-modal__title"
              id="account-modal__title"
            >
              {isLogoutAll
                ? "Logout from all devices?"
                : "Logout?"}
            </h2>

            <p className="account-modal__description">
              {isLogoutAll
                ? "This will end all your active sessions on every device. You will need to log in again."
                : "Are you sure you want to log out of this device?"}
            </p>

            {accountError && (
              <p className="account-modal__error">
                {accountError}
              </p>
            )}

            <div className="account-modal__actions">
              <button
                className="account-modal__cancel"
                type="button"
                onClick={closeAccountModal}
                disabled={accountLoading}
              >
                Cancel
              </button>

              <button
                className="account-modal__confirm"
                type="button"
                onClick={handleAccountAction}
                disabled={accountLoading}
              >
                {accountLoading
                  ? "Please wait..."
                  : isLogoutAll
                    ? "Logout all"
                    : "Logout"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default TodoPage;
