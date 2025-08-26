// import { useQuery } from '@apollo/client'
// import { FxRate_GetAllDocument, QueryResponse } from '@repo/api'
import { useState } from 'react'
// import { AppStores } from '../zustand'


export function usePrice() {
  // const store = AppStores.useSettings()
  const [amountToPay, setAmtToPay] = useState(0)
  // const { data: fxData, error } = useQuery<QueryResponse<'fxRate_GetAll'>>(FxRate_GetAllDocument)

  // if (error) {
  //   console.error('Error getting rate: ' + error.message)
  // }

  // if (!fxData)
  //   return {
  //     cusdAmt: 0,
  //     handleOnChange: () => {
  //       return
  //     },
  //   }

  // const rate = fxData!.fxRate_GetAll[store.countryIso]

  const handleOnChange = (amountInFiatCurrency: number) => {
    const rate = 1
    const c = amountInFiatCurrency / rate
    const plusFee = c + 0.1
    setAmtToPay(plusFee)
  }

  return { amountToPay, handleOnChange }
}
