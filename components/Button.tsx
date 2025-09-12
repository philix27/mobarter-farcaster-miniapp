import { cn } from '@/src/lib/utils'
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Spinner } from './Spinner'

export function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isLoading?: boolean
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
    btnName: string
  }
) {

  if (props.isLoading) {
    return <div
      // onClick={props.onClick}
      className={cn('bg-primary rounded-lg my-2 border-none outline-none hover:bg-primary/50 bg-primary px-8 py-1', props.className)}>
      <Spinner size={25} color='#fff' />
    </div>
  }
  return (
    <button
      data-umami-event={props.btnName}
      className={cn(
        'bg-primary rounded-lg my-2 border-none outline-none hover:bg-primary/50 bg-primary px-8 py-[8px]',
        props.className,
        props.variant === 'secondary' && 'bg-primary/50 hover:bg-secondary/50 border-muted border-2',
      )}
      onClick={props.onClick}
    >
      <p className='text-[12px] font-semibold text-[#fff]'>{props.children}</p>
    </button>
  )
}
