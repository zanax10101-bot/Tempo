import { db } from './database'

export async function seedDatabase() {
  const projectCount = await db.projects.count()
  if (projectCount > 0) return // Already seeded

  const now = new Date()

  // 1. Create Inbox project
  await db.projects.add({
    name: 'Inbox',
    color: '#6B7280',
    emoji: '📥',
    sortOrder: 0,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  })

  // 2. Create default timer presets
  await db.timerPresets.bulkAdd([
    {
      name: 'Classic Pomodoro',
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      cyclesBeforeLongBreak: 4,
      isDefault: true,
      isBuiltIn: true,
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      name: 'Long Focus',
      focusMinutes: 50,
      breakMinutes: 10,
      longBreakMinutes: 30,
      cyclesBeforeLongBreak: 2,
      isDefault: false,
      isBuiltIn: true,
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      name: 'Quick Sprint',
      focusMinutes: 15,
      breakMinutes: 3,
      longBreakMinutes: 10,
      cyclesBeforeLongBreak: 4,
      isDefault: false,
      isBuiltIn: true,
      sortOrder: 2,
      createdAt: now,
      updatedAt: now,
    },
  ])

  // 3. Create default user settings
  await db.userSettings.add({
    id: 1,
    theme: 'dark',
    accentColor: '#E5A84B',
    defaultPresetId: 1,
    autoStartBreaks: false,
    autoStartFocus: false,
    soundEnabled: true,
    soundVolume: 80,
    browserNotifications: false,
    defaultProjectId: 1,
    updatedAt: now,
  })
}
