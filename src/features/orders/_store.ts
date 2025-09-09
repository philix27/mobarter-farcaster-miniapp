import { Country } from '@/zapi'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type IExchangeTabs = 'BUY' | "SELL" | "HISTORY"

export enum Operator {
  MTN = "MTN",
  AIRTEL = "AIRTEL", GLO = "GLO", ETISALAT = "ETISALAT",
}

export interface ISlice {
  isLoading?: boolean
  amountFiat?: number
  country?: Country
  tabs?: IExchangeTabs
  accountName?: string
  accountNo?: string
  bankName?: string
  bankCode?: string
  accountId?: string
}

const defaultValues: Required<ISlice> = {
  amountFiat: 0,
  country: Country.Gh,
  tabs: "BUY",
  isLoading: false,
  accountName: '',
  accountNo: '',
  bankName: '',
  bankCode: '',
  accountId: ''
}


export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}


export const useOrders = create(
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
      name: 'useSellOrders',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
