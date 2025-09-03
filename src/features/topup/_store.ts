import { Country } from '@/zapi'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type ITopUpTabs = 'Airtime' | "DataPlan" | "DataBundle"
export enum Operator {
  MTN = "MTN",
  AIRTEL = "AIRTEL", GLO = "GLO", ETISALAT = "ETISALAT",
}

export interface ISlice {
  // dataAmount?: number
  dataDesc?: string
  operator?: string
  dataBundleOperator?: string
  dataBundleOperatorLogo?: string
  operatorId?: number
  dataBundleOperatorId?: number
  operatorLogo?: string
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
  topUpTab: 'Airtime',
  operatorId: 0,
  // dataAmount: 0,
  dataDesc: '',
  operatorLogo: '',
  dataBundleOperator: '',
  dataBundleOperatorId: 0,
  dataBundleOperatorLogo: ''
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
