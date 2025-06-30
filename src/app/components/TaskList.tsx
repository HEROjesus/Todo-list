"use client";

import { Task } from "../types/task";
import { X, Pen } from "@phosphor-icons/react/ssr";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
        >
          <div>
            <p className="text-lg font-semibold">{task.description}</p>

            <div className="text-sm text-gray-500 flex flex-wrap gap-2 mt-1">
              <span
                className={`px-2 py-1 rounded text-white ${
                  task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "in_progress"
                    ? "bg-blue-500"
                    : task.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {formatStatus(task.status)}
              </span>

              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {task.type === "work" ? "Work" : "Personal"}
              </span>

              <span className="text-gray-400">
                {task.date ? formatDate(task.date) : "Sem data"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              aria-label="Editar tarefa"
              title="Editar"
            >
              <Pen
                size={32}
                className="text-gray-700 hover:text-blue-400 transition-colors duration-300"
              />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              aria-label="Excluir tarefa"
              title="Excluir"
            >
              <X
                size={32}
                className="text-gray-700 hover:text-red-400 transition-colors duration-300"
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatStatus(status: Task["status"]): string {
  const labels = {
    not_started: "Not Started",
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };
  return labels[status];
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
