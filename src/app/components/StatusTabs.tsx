'use client'

type Status = 'all' | 'not_started' | 'pending' | 'in_progress' | 'completed'

interface StatusTabsProps {
  current: Status
  onChange: (status: Status) => void
}

const labels: Record<Status, string> = {
  all: 'All',
  not_started: 'Not Started',
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
}

export default function StatusTabs({ current, onChange }: StatusTabsProps) {
  return (
    <div className="flex gap-4 border-b mb-4">
      {Object.entries(labels).map(([value, label]) => (
        <button
          key={value}
          onClick={() => onChange(value as Status)}
          className={`pb-2 ${
            current === value ? 'border-b-2 border-black font-bold' : 'text-gray-500'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
