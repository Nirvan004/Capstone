import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos } from "../api/videoApi";
import type { Video } from "../types/Video";
import CreateVideoForm from "../components/CreateVideoForm";

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setError(null);
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load videos");
      }
    };

    fetchVideos();
  }, []);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Your Videos</h2>
      <CreateVideoForm
        onVideoCreated={(video) =>
          setVideos((prev) => [video, ...prev])
        }
      />
      <div className="video-grid">
        {videos.map((video) => (
          <Link key={video._id} to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
            <div className="video-card">
              <h3>{video.title}</h3>
              {video.description && <p>{video.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;