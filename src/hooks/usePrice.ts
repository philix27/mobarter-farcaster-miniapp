// import { useQuery } from '@apollo/client'
// import { FxRate_GetAllDocument, QueryResponse } from '@repo/api'
// import { AppStores } from '../zustand'

const rateNGN = 1520;
export function usePrice(props?: { amountInFiat?: number }) {
  // const store = AppStores.useSettings()
  // const [amountToPay, setAmtToPay] = useState(0)
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

  // const handleOnChange = () => {

  //   setAmtToPay(plusFee)
  // }


  if (!props || !props.amountInFiat) {
    return { amountToPay: 0 }
  }
  const rate = rateNGN
  const c = props.amountInFiat / rate
  const plusFee = c + 0.1


  return { amountToPay: plusFee.toFixed(4) }
}
