import type { Task } from '@/db/types'
import { TaskItem } from './TaskItem'
import { motion, AnimatePresence } from 'framer-motion'

interface TaskListProps {
  tasks: Task[]
  showCompleted?: boolean
}

export function TaskList({ tasks, showCompleted = false }: TaskListProps) {
  return (
    <div className="space-y-1">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TaskItem task={task} showCompleted={showCompleted} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
