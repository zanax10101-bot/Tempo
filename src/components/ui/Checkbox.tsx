import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import { cn } from '@/utils'
import { forwardRef } from 'react'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onCheckedChange, className, disabled }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          checked
            ? 'border-success bg-success text-white'
            : 'border-border hover:border-text-tertiary',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <CheckboxPrimitive.Indicator className="animate-scale-in">
          <Check weight="bold" className="h-3 w-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
