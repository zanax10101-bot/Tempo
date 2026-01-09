import { Gear } from '@phosphor-icons/react'

export function SettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Gear weight="duotone" className="h-8 w-8 text-accent-primary" />
        <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
      </div>

      {/* Coming soon placeholder */}
      <div className="rounded-lg border border-border bg-bg-raised p-8 text-center">
        <Gear weight="light" className="mx-auto h-16 w-16 text-text-tertiary" />
        <h3 className="mt-4 text-lg font-medium text-text-primary">Settings coming soon</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Theme, timer presets, sounds, and data export will be configured here.
        </p>
      </div>
    </div>
  )
}
