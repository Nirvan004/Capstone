import React, { useState } from "react";
import { createVideo } from "../api/videoApi";
import type { Video } from "../types/Video";

interface Props {
  onVideoCreated: (video: Video) => void;
}

const CreateVideoForm: React.FC<Props> = ({ onVideoCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newVideo = await createVideo({ title, description });
    onVideoCreated(newVideo);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Create Video</h3>

      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Video</button>
    </form>
  );
};

export default CreateVideoForm;
