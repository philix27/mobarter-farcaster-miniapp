import { cn } from '@/src/lib/utils'
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isLoading?: boolean
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
  }
) {
  return (
    <button
      className={cn(
        'bg-primary rounded-lg my-2 border-none outline-none hover:bg-primary/50 bg-primary ',
        props.className,
        props.variant === 'secondary' && 'bg-primary/50 hover:bg-secondary/50 border-muted border-2',
      )}
      onClick={props.onClick}
      style={{ padding: "8px 16px" }}
    >
      <p className='text-[12px] font-semibold text-[#fff]'>{props.children}</p>
    </button>
  )
}
