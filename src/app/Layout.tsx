import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'

export function Layout() {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
