"use client";

import { useState, useEffect, FormEvent } from "react";
import { Task } from "../types/task";

interface TaskFormProps {
  onAdd: (task: Task) => void;
  editingTask: Task | null;
}

export default function TaskForm({ onAdd, editingTask }: TaskFormProps) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("not_started");
  const [type, setType] = useState<"personal" | "work">("personal");

  // Preenche o formulário se estiver editando uma tarefa
  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setType(editingTask.type);
    }
  }, [editingTask]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newTask: Task = {
      id: editingTask?.id || Date.now().toString(),
      description,
      completed: editingTask?.completed || false,
      status,
      type,
      date: editingTask?.date || Date.now(),
    };

    onAdd(newTask);

    // Limpar o formulário após adicionar
    setDescription("");
    setStatus("not_started");
    setType("personal");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-2 grid-cols-1 md:grid-cols-4 mb-4"
    >
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded col-span-1 md:col-span-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task["status"])}
        className="p-2 border rounded"
      >
        <option value="not_started">Not Started</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "personal" | "work")}
        className="p-2 border rounded"
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded col-span-1"
      >
        {editingTask ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
