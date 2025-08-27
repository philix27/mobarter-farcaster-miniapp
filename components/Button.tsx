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
        'bg-primary rounded-lg my-2 border-none outline-none hover:bg-primary/50 bg-primary ',
        props.className
      )}
      onClick={props.onClick}
      style={{padding: "5px 16px"}}
    >
      <p className='text-[12px] font-semibold py-2 text-[#fff]'>{props.children}</p>
    </button>
  )
}
