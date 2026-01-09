import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-sm border bg-bg-base px-3.5 py-2.5 text-sm text-text-primary',
          'placeholder:text-text-tertiary',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-base',
          error
            ? 'border-error focus:border-error focus:ring-error/30'
            : 'border-border focus:border-accent-primary focus:ring-accent-primary/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
