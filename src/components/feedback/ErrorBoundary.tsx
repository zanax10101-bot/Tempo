import { WarningCircle, ArrowClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui'

export function ErrorBoundary() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base p-6 text-center">
      <WarningCircle weight="duotone" className="h-16 w-16 text-error" />
      <h1 className="mt-6 text-2xl font-semibold text-text-primary">Something went wrong</h1>
      <p className="mt-2 max-w-md text-text-secondary">
        We've logged this error and will look into it. Try refreshing the page.
      </p>
      <Button onClick={handleReload} className="mt-6 gap-2">
        <ArrowClockwise weight="bold" className="h-4 w-4" />
        Refresh Page
      </Button>
    </div>
  )
}
