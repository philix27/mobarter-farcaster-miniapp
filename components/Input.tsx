import React, { useState } from 'react'

import { BottomNote, Label } from './comps'
import { cn } from '@/src/lib/utils'

export function Input(
  props: {
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
          'rounded-lg px-3 py-2 flex items-center justify-center border-[0.5px] text-muted border-muted border mt-2',
          focus && 'border-primary',
          props.error && 'border-destructive',
          className
        )}
      >
        {props.preText && (
          <div className="h-full mr-2" style={{marginRight: "4px"}}>
            <p className="font-normal  text-[15px]">{props.preText}</p>
          </div>
        )}
        <input
          {...inputParams}
          {...(typeof props.control === 'object' && props.control !== null ? props.control : {})}
          className={cn(
            "w-full bg-card border-none outline-none text-[16px] font-normal placeholder:font-light placeholder:text-sm py-[2px]",
          )}
          style={{outline: "none", border: "none", padding: "2px 0"}}
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
        // style={{ backgroundColor: styles.bgColor }}
        />
        {trailingIcon && trailingIcon}
      </div>
      {desc && <BottomNote>{desc}</BottomNote>}
      {error && <p className="text-destructive text-[13px] mt-1">{error}</p>}
    </div>
  )
}
