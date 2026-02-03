import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos, deleteVideo, updateVideo} from "../api/videoApi";
import type { Video } from "../types/Video";
import CreateVideoForm from "../components/CreateVideoForm";
import VideoCard from "../components/VideoCard";

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

  const handleDeleteVideo = async (
  e: React.MouseEvent,
  videoId: string
) => {
  e.preventDefault();
  e.stopPropagation();

  const confirmed = window.confirm(
    "Are you sure you want to delete this video? This cannot be undone."
  );

  if (!confirmed) return;

  try {
    await deleteVideo(videoId);
    setVideos((prev) => prev.filter((v) => v._id !== videoId));
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to delete video");
  }
};

const handleUpdateVideo = async (updatedVideo: Video) => {
  try {
    const savedVideo = await updateVideo(updatedVideo._id, {
      title: updatedVideo.title,
      description: updatedVideo.description,
    });
    setVideos((prev) =>
      prev.map((v) => (v._id === savedVideo._id ? savedVideo : v))
    );
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to update video");
  }
};


  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="dashboard-container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Your Videos</h2>

      <CreateVideoForm
        onVideoCreated={(video) => setVideos((prev) => [video, ...prev])}
      />

      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            onDelete={handleDeleteVideo}
            onUpdate={handleUpdateVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

