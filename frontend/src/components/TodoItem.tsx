import React from "react";
import type { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo-item">
      <h4>{todo.title}</h4>
      {todo.description && <p>{todo.description}</p>}
      <p>Status: {todo.status}</p>
    </div>
  );
};

export default TodoItem;