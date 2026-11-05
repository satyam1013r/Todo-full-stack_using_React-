
import TodoItem from "./TodoItem";
function TodoList({ todos, onToggle, onDelete , onUpdate }) {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
export default TodoList;
