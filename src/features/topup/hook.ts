import { Country } from '@/zapi'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type ITopUpTabs = 'Airtime' | "DataPlan" | "DataBundle"
export enum Operator { MTN, AIRTEL, GLO, ETISALAT, }
export interface ISlice {
  operator?: Operator
  phoneNo?: string
  amountFiat?: number
  country?: Country
  topUpTab?: ITopUpTabs
}

const defaultValues: Required<ISlice> = {
  phoneNo: '',
  amountFiat: 0,
  country: Country.Gh,
  operator: Operator.MTN,
  topUpTab: 'Airtime'
}


export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}


export const useTopUpForm = create(
  persist<ISliceUpdate>(
    (set) => ({
      ...defaultValues,
      update: (data) =>
        set((state) => {
          return { ...state, ...data }
        }),
      clear: () =>
        set((state) => {
          return { ...state, ...defaultValues }
        }),
    }),
    {
      name: 'useTopUpForm',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
