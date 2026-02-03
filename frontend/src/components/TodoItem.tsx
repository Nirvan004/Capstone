import React, { useState } from "react";
import type { Todo , TodoStatus } from "../types/Todo";
import { updateTodo } from "../api/todoApi";

interface Props {
  todo: Todo;
  onTodoUpdated: (updated: Todo) => void;
  onDelete: () => void;
}

const TodoItem: React.FC<Props> = ({ todo, onTodoUpdated, onDelete }) => {
  const [status, setStatus] = useState(todo.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TodoStatus;
    setLoading(true);
    try {
      const updated = await updateTodo(todo._id, { status: newStatus });
      setStatus(updated.status);
      onTodoUpdated(updated);
    } catch (err: any) {
      console.error("Failed to update todo:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-item">
      <h4>{todo.title}</h4>
      {todo.description && <p>{todo.description}</p>}
      <p>
        Status:{" "}
        <select value={status} onChange={handleStatusChange} disabled={loading}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </p>
      <button 
        onClick={(e)=>{
          e.stopPropagation();
          onDelete();
        }}
        style={{ backgroundColor: "red", color: "white", padding: "0.25rem", borderRadius: "4px" }}
        >
        Delete
        </button>
    </div>
  );
};

export default TodoItem;