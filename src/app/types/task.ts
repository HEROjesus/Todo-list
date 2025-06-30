export interface Task {
  id: string
  description: string
  completed: boolean
  status: 'not_started' | 'pending' | 'in_progress' | 'completed'
  date?: number
  type: 'personal' | 'work'
}
