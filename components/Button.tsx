import { cn } from '@/lib/utils/utils'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { styles } from '../app/styles/style'

export function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isLoading?: boolean
  }
) {
  return (
    <button
      className={cn(
        'bg-primary rounded-md my-2 border-none outline-none hover:bg-primary/50',
        props.className
      )}
      onClick={props.onClick}
      style={{
        padding: "8px 10px",
        backgroundColor: styles.primaryColor
      }}
    >
      {props.children}
    </button>
  )
}
