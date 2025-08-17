import React, { useState } from 'react'

import { BottomNote, Label } from './comps'
import { cn } from '@/lib/utils/utils'
import { styles } from '../styles/style'

export function Input(
  props: {
    useBg?: string
    preText?: string
    error?: string
    desc?: string
    label?: string
    trailingIcon?: JSX.Element
    control?: unknown
  } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  const { className, error, desc, label, trailingIcon, ...inputParams } = props
  const [focus, setFocus] = useState(false)
  const isNum = props.type === 'number'
  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div
        className={cn(
          'rounded-md px-3 py-[5px] flex items-center justify-center',
          focus && 'border-primary border-[0.5px]',
          props.error && 'border-destructive',
          props.useBg ? styles.bgColor : styles.cardColor,
          className
        )}
        style={{ color: styles.color, }}
      >
        {props.preText && (
          <div className="h-full pr-1">
            <p className="font-normal  text-[16px]">{props.preText}</p>
          </div>
        )}
        <input
          {...inputParams}
          {...(typeof props.control === 'object' && props.control !== null ? props.control : {})}
          className={cn(
            `
            w-full
            border-none outline-none
            text-[16px] font-normal placeholder:font-light placeholder:text-sm
            py-[2px]
          `,
            props.useBg ? styles.bgColor : styles.cardColor
          )}
          autoComplete={isNum ? 'off' : undefined}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          type={isNum ? 'number' : undefined}
          pattern={isNum ? '[0-9]*' : undefined}
          inputMode={isNum ? 'decimal' : undefined}
          min={isNum ? 0 : undefined}
          style={{ backgroundColor: styles.bgColor }}
        />
        {trailingIcon && trailingIcon}
      </div>
      {desc && <BottomNote>{desc}</BottomNote>}
      {error && <p className="text-destructive text-[13px] mt-1">{error}</p>}
    </div>
  )
}
