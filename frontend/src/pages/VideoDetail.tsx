import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodos } from "../api/todoApi";
import type { Video } from "../types/Video";
import type { Todo } from "../types/Todo";
import TodoItem from "../components/TodoItem";

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoAndTodos = async () => {
      if (!id) return;
      setError(null);

      try {
        const res = await fetch(`http://localhost:8008/api/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch video");
        const videoData: Video = await res.json();
        setVideo(videoData);

        const todosData = await getTodos(id);
        setTodos(todosData);
      } catch (err: any) {
        setError(err.message || "Failed to load video details");
      }
    };

    fetchVideoAndTodos();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!video) return <div className="error-message">No videos found.</div>;

  return (
    <div className="dashboard-container">
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>{video.title}</h2>
      {video.description && <p style={{ textAlign: "center", marginBottom: "2rem" }}>{video.description}</p>}

      <h3>Todos</h3>
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <div className="video-grid">
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoDetail;