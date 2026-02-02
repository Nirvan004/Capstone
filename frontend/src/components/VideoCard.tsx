import React from "react";
import { Link } from "react-router-dom";
import type { Video } from "../types/Video";

interface Props {
  video: Video;
}

const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <Link to={`/videos/${video._id}`} className="video-card-link">
      <div className="video-card">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </Link>
  );
};

export default VideoCard;