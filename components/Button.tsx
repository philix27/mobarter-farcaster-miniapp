import { cn } from '@/src/lib/utils'
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isLoading?: boolean
    children: React.ReactNode
  }
) {
  return (
    <button
      className={cn(
        'bg-primary rounded-md my-2 border-none outline-none hover:bg-primary/50 bg-primary  p-2',
        props.className
      )}
      onClick={props.onClick}

    >
      <p className='text-[12px] font-semibold py-2'>{props.children}</p>
    </button>
  )
}
