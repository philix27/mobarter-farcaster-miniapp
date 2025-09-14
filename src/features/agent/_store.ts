import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type IAgentTabs = 'COMPLETED' | "PENDING" | "ALL"

export interface ISlice {

  tabs?: IAgentTabs

}

const defaultValues: Required<ISlice> = {
  tabs: "ALL",
}


export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}


export const useAgentSettings = create(
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
      name: 'useAgentSettings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
