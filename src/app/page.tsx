'use client'

import { useState, useEffect } from 'react'
import { Task } from './types/task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import StatusTabs from './components/StatusTabs'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | Task['status']>('all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Carrega tarefas salvas no localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    }
  }, [])

  // Salva as tarefas no localStorage sempre que forem alteradas
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Filtra tarefas conforme status selecionado
  const filteredTasks = tasks.filter((task) =>
    statusFilter === 'all' ? true : task.status === statusFilter
  )

  // Remove uma tarefa pelo ID
  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Inicia a edição de uma tarefa
  function handleEdit(task: Task) {
    setEditingTask(task)
  }

  // Adiciona ou edita tarefa
  function handleAdd(newTask: Task) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? newTask : t))
      )
      setEditingTask(null)
    } else {
      setTasks((prev) => [...prev, newTask])
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">ToDo App Pro</h1>

      <StatusTabs current={statusFilter} onChange={setStatusFilter} />

      <TaskForm onAdd={handleAdd} editingTask={editingTask} />

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  )
}
