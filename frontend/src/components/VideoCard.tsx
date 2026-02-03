import React from "react";
import type { Video } from "../types/Video";

interface Props {
  video: Video;
  onDelete: (e: React.MouseEvent, videoId: string) => void;
}

const VideoCard: React.FC<Props> = ({ video, onDelete }) => {
  return (
      <div className="video-card">
        <div className="video-card-header">
          <h3>{video.title}</h3>

          <button
            className="delete-video-btn"
            onClick={(e) => onDelete(e, video._id)}
          >
            Delete
          </button>
        </div>
        {video.description && <p>{video.description}</p>}
      </div>
  );
};

export default VideoCard;