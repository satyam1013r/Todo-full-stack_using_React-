
function TodoFilters({ filters, onFilterChange, onClear }) {
  return (
    <section className="todo-filters">
      <div className="todo-filters__search">
        <label
          className="todo-filters__label"
          htmlFor="todo-search"
        >
          Search tasks
        </label>

        <input
          className="todo-filters__input"
          id="todo-search"
          type="search"
          placeholder="Search by task name..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange("search", e.target.value)
          }
        />
      </div>

      <div className="todo-filters__controls">
        <div className="todo-filters__group">
          <label
            className="todo-filters__label"
            htmlFor="todo-status"
          >
            Status
          </label>

          <select
            className="todo-filters__select"
            id="todo-status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange("status", e.target.value)
            }
          >
            <option value="all">All tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="todo-filters__group">
          <label
            className="todo-filters__label"
            htmlFor="todo-priority"
          >
            Priority
          </label>

          <select
            className="todo-filters__select"
            id="todo-priority"
            value={filters.priority}
            onChange={(e) =>
              onFilterChange("priority", e.target.value)
            }
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="todo-filters__group">
          <label
            className="todo-filters__label"
            htmlFor="todo-sort"
          >
            Sort by
          </label>

          <select
            className="todo-filters__select"
            id="todo-sort"
            value={filters.sort}
            onChange={(e) =>
              onFilterChange("sort", e.target.value)
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <button
          className="todo-filters__clear"
          type="button"
          onClick={onClear}
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}

export default TodoFilters;
