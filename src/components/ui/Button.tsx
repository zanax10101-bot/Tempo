import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-150',
          'rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Active/hover transforms
          'active:scale-[0.98]',
          // Variants
          {
            // Primary: Amber background
            primary: 'bg-accent-primary text-text-inverse hover:bg-accent-primary-hover',
            // Secondary: Ghost with border
            secondary:
              'border border-border bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
            // Ghost: No border
            ghost: 'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
            // Danger: Red tinted
            danger: 'bg-error/10 text-error hover:bg-error/20',
          }[variant],
          // Sizes
          {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
          }[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
