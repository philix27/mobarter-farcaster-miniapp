import { cn } from '@/lib/utils/utils';
import { ReactNode } from 'react';
import { styles } from '../app/styles/style';


export function Label(params: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-start mb-[2px] mt-1', params.className)}>
      <p className="text-muted text-[10px] uppercase ml-1 font-semibold"
        style={{ color: styles.mutedColor }}>{params.children}</p>
    </div>
  )
}

export function BottomNote(params: { children: ReactNode }) {
  return (
    <div className="mb-1 flex items-center w-full justify-start mt-0">
      <p className="text-muted text-[12px] ml-2" style={{ color: styles.mutedColor }}>{params.children}</p>
    </div>
  )
}

export function AdsRow(params: {
  text: string
  text2: string
  text2options?: { onClick: VoidFunction; active?: boolean }
}) {
  return (
    <div className="mb-1 flex items-center w-full justify-between p-1">
      <p className="text-[12.5px] uppercase text-muted" style={{ color: styles.color }}>{params.text}</p>
      <p
        className={cn('text-xs', params.text2options?.active && 'text-primary')}
        style={{ color: styles.color }}
        onClick={() => {
          params.text2options?.onClick()
        }}
      >
        {params.text2}
      </p>
    </div>
  )
}

export const Line = () => <hr className="border-[0.2px] h-[0.2px] border-muted" />

export const Instructions = (props: { children: ReactNode }) => (
  <div className="bg-card rounded-md p-3  w-full hover:disabled:">
    <p className="text-muted" style={{ color: styles.color }}>{props.children}</p>
  </div>
)

export const Card = (props: { children: ReactNode; onClick?: VoidFunction; className?: string }) => (
  <div
    className={cn('bg-card rounded-md p-2  w-full hover:disabled text-muted', props.className)}
    onClick={props.onClick}
    style={{ color: styles.color, backgroundColor: styles.cardColor }}
  >
    {props.children}
  </div>
)