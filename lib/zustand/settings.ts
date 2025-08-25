import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Country } from '@/zapi'

export type IHomeTab = 'TopUp' | 'TV' | 'Electricity' | 'Betting' | "DataPlan" | "DataBundle"
export type IHistoryTabs = 'ALL' | 'AIRTIME'

export interface ISlice {
  homeTab?: IHomeTab
  token?: boolean
  countryIso?: Country
  chainIcon?: string
}

export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}

export const defaultValues: Required<ISlice> = {
  homeTab: 'TopUp',
  token: false,
  countryIso: Country.Ng,
  chainIcon: '',
}

export const useSettings = create(
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
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
