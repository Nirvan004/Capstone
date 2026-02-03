import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Video } from "../types/Video";

interface Props {
  video: Video;
  onDelete: (e: React.MouseEvent, videoId: string) => void;
  onUpdate: (updatedVideo: Video) => void;
}

const VideoCard: React.FC<Props> = ({ video, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || "");

  const handleSave = () => {
    onUpdate({ ...video, title, description });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(video.title);
    setDescription(video.description || "");
    setEditing(false);
  };

  return (
    <div className="video-card">
      <div className="video-card-header">
        {!editing && (
          <Link
            to={`/videos/${video._id}`}
            style={{ textDecoration: "none", flex: 1, color: "inherit" }}
          >
            <h3>{video.title}</h3>
            {video.description && <p>{video.description}</p>}
          </Link>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="edit-video-btn"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(!editing);
            }}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          <button
            className="delete-video-btn"
            onClick={(e) => onDelete(e, video._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Editing form */}
      {editing && (
        <div style={{ marginTop: "0.5rem" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
