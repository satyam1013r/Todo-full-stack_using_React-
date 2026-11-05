
import { useState } from "react";

function TodoForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    text: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.text.trim()) return;

  const todoData = {
    text: formData.text.trim(),
    priority: formData.priority,
    ...(formData.dueDate && { dueDate: formData.dueDate }),
  };

  const result = await onSubmit(todoData);

  if (result) {
    setFormData({
      text: "",
      priority: "medium",
      dueDate: "",
    });
  }
};

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__group">
        <label className="todo-form__label" htmlFor="todo-text">
          Task
        </label>

        <input
          className="todo-form__input"
          id="todo-text"
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="What do you need to do?"
          required
        />
      </div>

      <div className="todo-form__group">
        <label className="todo-form__label" htmlFor="todo-priority">
          Priority
        </label>

        <select
          className="todo-form__select"
          id="todo-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="todo-form__group">
        <label className="todo-form__label" htmlFor="todo-due-date">
          Due date
        </label>

        <input
          className="todo-form__input"
          id="todo-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <button
        className="todo-form__submit"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
