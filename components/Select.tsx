import { ComponentType } from 'react'
import Select, { GroupBase, OptionProps, PlaceholderProps } from 'react-select'

import { BottomNote, Label } from './comps'
import { useThemeColor } from '@/src/styles/Color'
import { cn } from '@/src/lib/utils'

const CustomOption: ComponentType<OptionProps<any, false, GroupBase<any>>> = (props) => {
  if (props.isDisabled) return null;

  return (
    <div {...props.innerProps} className="w-full bg-card py-[6px] px-3 text-[13px] hover:bg-primary">
      {props.children}
      {/* <p className="w-full bg-card py-[6px] px-3 text-[12px] hover:bg-primary">
        {props.label}
      </p> */}
    </div>
  )
}


const CustomPlaceholder: ComponentType<PlaceholderProps<any, false, GroupBase<any>>> = (props) =>
  !props.isDisabled ? (
    <p {...props.innerProps} className="w-full bg-card shadow-md px-3 text-muted" />
  ) : null

export const AppSelect = (props: {
  label?: string
  error?: string
  value?: string
  className?: string
  name?: string
  desc?: string
  defaultInputValue?: string
  useBg?: string
  onChange: (newValue: string) => void
  data: {
    label: JSX.Element | string
    value: string
    logo?: string
  }[]
}) => {
  const theme = useThemeColor()
  const bgCard = theme.card
  // const bgCard = props.useBg ? theme.bg : theme.card
  const textColor = theme.text

  return (
    <div className={cn("w-full", props.className)}>
      {props.label && <Label>{props.label}</Label>}
      <Select
        isSearchable
        components={{
          Option: CustomOption,
          // Option: (res) => {
          //   return <div {...res.innerProps} className='flex items-center'>
          //     {/* <img src={data.logo} alt={val.token.symbol} className='w-4 h-4 inline mr-1' /> */}
          //     <p className="w-full bg-card py-[6px] px-3 text-[13px] hover:bg-primary">
          //       {props.label}
          //     </p>

          //   </div>
          // },

          Placeholder: CustomPlaceholder
        }}
        defaultInputValue={props.defaultInputValue}
        options={props.data}
        name={props.name}
        value={props.value}
        className="w-full m-0"
        onChange={(newValue: any) => {
          props.onChange(newValue!.value!)
        }}
        styles={{
          menu: (base: any) => ({
            ...base,
            color: textColor,
            background: bgCard,
            borderStyle: 'none',
            outlineStyle: 'none',
            marginTop: 0,
            borderRadius: 5,
          }),
          option: (base: any) => ({
            ...base,
            color: textColor,
            background: bgCard,
          }),
          indicatorsContainer: (base: any) => ({
            ...base,
            color: textColor,
            background: bgCard,
            borderStyle: 'none',
            outlineStyle: 'none',
            borderRadius: 5,
          }),
          singleValue: (base: any) => ({
            ...base,
            color: textColor,
            background: bgCard,
          }),
          container: (base: any) => ({
            ...base,
            background: bgCard,
            color: textColor,
            borderStyle: 'none',
            outlineStyle: 'none',
            margin: 0,
            borderRadius: 5,
          }),
          valueContainer: (base: any) => ({
            ...base,
            background: bgCard,
            color: textColor,
            borderRadius: 5,
            borderStyle: 'none',
            outlineStyle: 'none',
          }),
          control: (baseStyles: any) => ({
            ...baseStyles,
            color: textColor,
            background: bgCard,
            borderStyle: 'solid',
            outlineStyle: 'none',
            borderColor: theme.muted,
            borderRadius: 5,
          }),
        }}
      />
      {props.error && <p className="text-destructive text-[13px] mt-1">{props.error}</p>}
      {props.desc && <BottomNote>{props.desc}</BottomNote>}
    </div>
  )
}
