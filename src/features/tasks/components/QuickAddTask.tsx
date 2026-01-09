import { useState, type KeyboardEvent } from 'react'
import { Plus } from '@phosphor-icons/react'
import { db } from '@/db'

interface QuickAddTaskProps {
  projectId?: number
  defaultDueDate?: Date
}

export function QuickAddTask({ projectId = 1, defaultDueDate }: QuickAddTaskProps) {
  const [title, setTitle] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return

    const now = new Date()
    await db.tasks.add({
      projectId,
      title: title.trim(),
      priority: 'none',
      dueDate: defaultDueDate,
      totalTimeSpent: 0,
      sortOrder: Date.now(),
      createdAt: now,
      updatedAt: now,
    })

    setTitle('')
    setIsExpanded(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === 'Escape') {
      setTitle('')
      setIsExpanded(false)
    }
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex w-full items-center gap-3 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-text-tertiary transition-colors hover:border-border-strong hover:bg-bg-hover hover:text-text-secondary"
      >
        <Plus weight="bold" className="h-4 w-4" />
        <span>Add task...</span>
        <span className="ml-auto text-xs opacity-50">⌘N</span>
      </button>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-bg-raised p-4">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (!title.trim()) {
            setIsExpanded(false)
          }
        }}
        placeholder="What do you need to do?"
        className="w-full bg-transparent text-base text-text-primary placeholder:text-text-tertiary focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <span>Press Enter to add</span>
          <span>·</span>
          <span>Esc to cancel</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="rounded-sm bg-accent-primary px-3 py-1.5 text-xs font-medium text-text-inverse transition-colors hover:bg-accent-primary-hover disabled:opacity-50"
        >
          Add Task
        </button>
      </div>
    </div>
  )
}
