export type TodoStatus = 'To Do' | 'In Progress' | 'Done'

export interface Todo {
  _id: string
  title: string
  description?: string
  status: TodoStatus
  video: string
  createdAt: string
  updatedAt: string
}
export interface TodoCreateData {
  title: string;
  description?: string;
  status: TodoStatus;
  video: string;
}

export interface TodoUpdateData {
  title?: string;
  description?: string;
  status?: TodoStatus;
}