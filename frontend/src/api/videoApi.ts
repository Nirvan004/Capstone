import apiClient from './apiClient'
import type { Video, VideoCreateData, VideoUpdateData } from '../types/Video'

export async function getVideos(): Promise<Video[]> {
  const res = await apiClient.get<Video[]>('/videos')
  return res.data
}

export async function createVideo(data: VideoCreateData): Promise<Video> {
  const res = await apiClient.post<Video>('/videos', data)
  return res.data
}

export async function updateVideo(id: string, data: VideoUpdateData): Promise<Video> {
  const res = await apiClient.put<Video>(`/videos/${id}`, data)
  return res.data
}

export async function deleteVideo(id: string): Promise<void> {
  await apiClient.delete(`/videos/${id}`)
}