import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { TodayPage } from '@/pages/TodayPage'
import { UpcomingPage } from '@/pages/UpcomingPage'
import { InboxPage } from '@/pages/InboxPage'
import { TimerPage } from '@/pages/TimerPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ProjectPage } from '@/pages/ProjectPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodayPage />} />
          <Route path="upcoming" element={<UpcomingPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="timer" element={<TimerPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="project/:projectId" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
