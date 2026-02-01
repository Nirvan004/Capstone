import apiClient from './apiClient'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/Auth'

export async function loginUser(data: LoginCredentials): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/users/login', data)
  return res.data
}

export async function registerUser(data: RegisterCredentials): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/users/register', data)
  return res.data
}