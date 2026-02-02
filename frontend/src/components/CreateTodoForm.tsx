import React, { useState } from "react";
import { createTodo } from "../api/todoApi";
import type { Todo } from "../types/Todo";

interface Props {
  videoId: string;
  onTodoCreated: (todo: Todo) => void;
}

const CreateTodoForm: React.FC<Props> = ({ videoId, onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo = await createTodo({
      title,
      description,
      video: videoId,
      status: "To Do"
    });

    onTodoCreated(newTodo);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <h4>Add Todo</h4>

      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Todo</button>
    </form>
  );
};

export default CreateTodoForm;