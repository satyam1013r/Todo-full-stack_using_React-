
import { useState } from "react";
import DeleteTodoButton from "./DeleteTodoButton";

function TodoItem({ todo, index, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    text: todo.text,
    priority: todo.priority,
    dueDate: todo.dueDate
      ? new Date(todo.dueDate).toISOString().slice(0, 10)
      : "",
  });

  const dueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      text: todo.text,
      priority: todo.priority,
      dueDate: todo.dueDate
        ? new Date(todo.dueDate).toISOString().slice(0, 10)
        : "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.text.trim()) return;

    const updatedData = {
      text: formData.text.trim(),
      priority: formData.priority,
     dueDate: formData.dueDate || null,
    };

    const result = await onUpdate(todo._id, updatedData);

    if (result) {
      setIsEditing(false);
    }
  };

  return (
    <article
      className={`todo-item ${
        todo.completed ? "todo-item--completed" : ""
      }`}
    >
      {isEditing ? (
        <form className="todo-item__edit-form" onSubmit={handleSave}>
          <div className="todo-item__edit-group">
            <label htmlFor={`todo-text-${todo._id}`}>
              Task
            </label>
            <input
              id={`todo-text-${todo._id}`}
              className="todo-item__edit-input"
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
            />
          </div>

          <div className="todo-item__edit-group">
            <label htmlFor={`todo-priority-${todo._id}`}>
              Priority
            </label>
            <select
              id={`todo-priority-${todo._id}`}
              className="todo-item__edit-select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="todo-item__edit-group">
            <label htmlFor={`todo-date-${todo._id}`}>
              Due date
            </label>
            <input
              id={`todo-date-${todo._id}`}
              className="todo-item__edit-input"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="todo-item__edit-actions">
            <button
              className="todo-item__save"
              type="submit"
            >
              Save Changes
            </button>

            <button
              className="todo-item__cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-item__header">
            <h3 className="todo-item__title">
              {index + 1}. {todo.text}
            </h3>

            <span
              className={`todo-item__status ${
                todo.completed
                  ? "todo-item__status--completed"
                  : "todo-item__status--pending"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="todo-item__details">
            <div className="todo-item__detail">
              <span className="todo-item__label">Priority</span>
              <span
                className={`todo-item__priority todo-item__priority--${todo.priority}`}
              >
                {todo.priority}
              </span>
            </div>

            <div className="todo-item__detail">
              <span className="todo-item__label">Due date</span>
              <span className="todo-item__due-date">
                {dueDate}
              </span>
            </div>
          </div>

          <div className="todo-item__footer">
            <label className="todo-item__complete">
              <input
                className="todo-item__checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  onToggle(todo._id, !todo.completed)
                }
              />
              <span>
                {todo.completed ? "Completed" : "Mark as complete"}
              </span>
            </label>

            <div className="todo-item__actions">
              <button
                className="todo-item__edit"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>

              <DeleteTodoButton
                onConfirm={() => onDelete(todo._id)}
                loading={false}
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default TodoItem;
