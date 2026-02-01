import type { Todo } from './Todo'

export interface Video {
  _id: string
  title: string
  description?: string
  user: string
  todos?: Todo[]
  createdAt: string
  updatedAt: string
}