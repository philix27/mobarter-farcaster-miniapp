import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CountriesIso } from '../const/countries'
import { IPayWith } from '@/src/features/pay/tokens'
import { ChainName } from '@/src/features/pay/chains'
import { Country } from '@/zapi'

export type IHomeTab = 'TopUp' | 'TV' | 'Electricity' | 'Betting' | "Profile" | "Orders"
export type ITopUpTabs = 'Airtime' | "DataPlan" | "DataBundle"

// export type IHomeTab = 'BALANCE' | 'TX_HISTORY'
export type IManageAdsTab = 'OPEN' | 'CLOSED' | 'ADD'
export type IOrdersTabs = 'PENDING' | 'COMPLETED' | 'CANCELED' | 'APPEAL'
export type IHomeBottomSheet =
  | 'WALLET'
  | 'SEND_CRYPTO'
  | 'WITHDRAW'
  | 'SELECT_COUNTRY'
  | 'SELECT_NETWORK'
  | 'AIRTIME'
  | 'GIFT_CARD'
  | 'SEND_TO_BANK'
  | 'FX_RATES'
  | 'NULL'
  | undefined
export type IHistoryTabs = 'ALL' | 'AIRTIME'

export interface ISlice {
  sidebarOpen?: boolean
  infoTabOpen?: boolean
  drawerIsOpen?: boolean
  showSupportModal?: boolean
  searchValue?: string
  manageAdsTab?: IManageAdsTab
  ordersTab?: IOrdersTabs
  homeBtmSheet?: IHomeBottomSheet
  historyTab?: IHistoryTabs
  token?: boolean
  countryIso?: CountriesIso
  country?: Country
  chainIcon?: string
  homeTab?: IHomeTab
  topUpTab?: ITopUpTabs
  payWith?: IPayWith

}

export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}

export const defaultValues: Required<ISlice> = {
  drawerIsOpen: false,
  sidebarOpen: false,
  infoTabOpen: false,
  searchValue: '',
  manageAdsTab: 'OPEN',
  ordersTab: 'PENDING',
  homeTab: "TopUp",
  homeBtmSheet: 'NULL',
  historyTab: 'ALL',
  showSupportModal: false,
  token: false,
  countryIso: 'NG',
  chainIcon: '',
  topUpTab: 'DataPlan',
  payWith: {
    chain: {
      name: ChainName.Celo,
      logo: '',
      chainId: 0
    },
    token: {
      address: '',
      symbol: '',
      logo: '',
      decimal: 0
    }
  },
  country: Country.Ng
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
