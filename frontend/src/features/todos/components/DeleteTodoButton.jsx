
import { useState } from "react";

function DeleteTodoButton({ onConfirm, loading }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    const success = await onConfirm();

    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="todo-item__delete"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      {isOpen && (
        <div className="delete-modal__overlay">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal__title"
          >
            <div className="delete-modal__icon">!</div>

            <h2
              className="delete-modal__title"
              id="delete-modal__title"
            >
              Delete task?
            </h2>

            <p className="delete-modal__description">
              Are you sure you want to delete this task?
              This action cannot be undone.
            </p>

            <div className="delete-modal__actions">
              <button
                className="delete-modal__cancel"
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="delete-modal__confirm"
                type="button"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteTodoButton;
