import { NavLink } from 'react-router-dom'
import { Sun, Calendar, Tray, Timer, Gear, Plus } from '@phosphor-icons/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'
import { cn } from '@/utils'

const navItems = [
  { to: '/', icon: Sun, label: 'Today' },
  { to: '/upcoming', icon: Calendar, label: 'Upcoming' },
  { to: '/inbox', icon: Tray, label: 'Inbox' },
]

export function Sidebar() {
  const projects = useLiveQuery(() => db.projects.where('isArchived').equals(0).toArray())

  // Get task counts for nav items
  const taskCounts = useLiveQuery(async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const allTasks = await db.tasks.where('completedAt').equals(undefined as unknown as Date).toArray()

    const todayCount = allTasks.filter(
      (t) => t.dueDate && t.dueDate < tomorrow
    ).length
    const upcomingCount = allTasks.filter(
      (t) => t.dueDate && t.dueDate >= tomorrow && t.dueDate < nextWeek
    ).length
    const inboxCount = allTasks.filter((t) => t.projectId === 1 && !t.dueDate).length

    return { today: todayCount, upcoming: upcomingCount, inbox: inboxCount }
  })

  return (
    <aside className="flex w-sidebar flex-col border-r border-border bg-bg-raised">
      {/* Logo */}
      <div className="flex h-16 items-center px-5">
        <NavLink to="/" className="flex items-center gap-2">
          <Timer weight="bold" className="h-7 w-7 text-accent-primary" />
          <span className="text-lg font-bold text-text-primary">TEMPO</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-bg-hover text-accent-primary'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              )
            }
          >
            <div className="flex items-center gap-3">
              <item.icon weight="regular" className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            {taskCounts && (
              <span className="text-xs text-text-tertiary">
                {item.label === 'Today' && taskCounts.today > 0 && taskCounts.today}
                {item.label === 'Upcoming' && taskCounts.upcoming > 0 && taskCounts.upcoming}
                {item.label === 'Inbox' && taskCounts.inbox > 0 && taskCounts.inbox}
              </span>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-border-subtle" />

        {/* Projects section */}
        <div className="px-3 py-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
            Projects
          </span>
        </div>

        {projects?.filter(p => p.name !== 'Inbox').map((project) => (
          <NavLink
            key={project.id}
            to={`/project/${project.id}`}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-bg-hover text-text-primary'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              )
            }
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="flex-1 truncate">{project.name}</span>
            {project.emoji && <span className="text-sm">{project.emoji}</span>}
          </NavLink>
        ))}

        {/* Add project button */}
        <button className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-text-tertiary transition-colors hover:bg-bg-hover hover:text-text-primary">
          <Plus weight="regular" className="h-5 w-5" />
          <span>Add project</span>
        </button>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border-subtle p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-bg-hover text-accent-primary'
                : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
            )
          }
        >
          <Gear weight="regular" className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  )
}
