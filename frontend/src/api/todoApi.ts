import apiClient from './apiClient'
import type { Todo, TodoCreateData, TodoUpdateData } from '../types/Todo'

export async function getTodos(videoId: string): Promise<Todo[]> {
  const res = await apiClient.get<Todo[]>(`/videos/${videoId}/todos`)
  return res.data
}

export async function createTodo(data: TodoCreateData): Promise<Todo> {
  const res = await apiClient.post<Todo>(`/videos/${data.video}/todos`, data)
  return res.data
}

export async function updateTodo(id: string, data: TodoUpdateData): Promise<Todo> {
  const res = await apiClient.put<Todo>(`/todos/${id}`, data)
  return res.data
}

export async function deleteTodo(id: string): Promise<void> {
  await apiClient.delete(`/todos/${id}`)
}