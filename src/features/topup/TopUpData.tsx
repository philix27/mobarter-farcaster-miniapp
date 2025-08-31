import { useState } from 'react'
import { toast } from 'sonner'
import { AppStores } from '@/src/lib/zustand'
import { COLLECTOR, TokenId } from '@/src/lib/const'
import { usePrice, useSendToken } from '@/src/hooks'
import { mapCountryToData, mapCountryToIso } from '@/src/lib/const/countries'
import { Country, RequestFrom, useUtility_purchaseDataBundle } from '@/zapi'
import { AppSelect } from '@/components/Select'
import PriceDisplay from './Price'
import { useTopUpForm } from './_store'
import { operatorsData } from './operatorData'

export default function TopUpDataPlan(props?: { isDataPlan?: boolean }) {
  const topUp = useTopUpForm();
  const { sendErc20 } = useSendToken()
  const [operatorPlan, setOperatorPlan] = useState<{ amount: string; desc: string }>()
  const operaror = operatorsData[Country.Ng];
  const ops = props?.isDataPlan ? operaror.dataPlan : operaror.dataBundles;

  const store = AppStores.useSettings()
  const countryCode = mapCountryToData[store.countryIso].callingCodes[0]
  // const { sendErc20 } = useSendToken()
  const { amountToPay } = usePrice({ amountInFiat: topUp.amountFiat })

  const [mutate] = useUtility_purchaseDataBundle();

  const handleSend = async () => {
    if (operatorPlan === undefined) {
      toast.error('Select an operator')
      return
    }

    const amtValue = parseInt(operatorPlan.amount)

    if (amtValue < 0) {
      toast.error('Amount must be above zero')
      return
    }

    await sendErc20({
      recipient: COLLECTOR,
      amount: amountToPay!.toString(),
      token: TokenId.cUSD,
    })
      .then((txHash) => {
        void mutate({
          variables: {
            input: {
              amount: parseInt(operatorPlan.amount),
              countryCode: mapCountryToIso[store.countryIso],
              operatorId: topUp.operatorId!,
              phoneNo: `${countryCode.slice(1)}${topUp.phoneNo}`,
              payment: {
                amountCrypto: 0,
                amountFiat: 0,
                fiatCurrency: mapCountryToIso[store.countryIso],
                tokenAddress: '',
                tokenChain: '',
                transaction_pin: '',
                user_uid: '',
                txHash: txHash || `${Date.now()}`,
                from: RequestFrom.Farcaster,
              }
            },
          },
          onCompleted() {
            toast.success('Sent successfully')
            setOperatorPlan({ amount: '', desc: '' })
          },
        })
      })
      .catch((err) => {
        toast.error('Error sending cUSD:', err.message)
      })
  }

  const getPlans = () => {
    const v = ops.filter((val) => val.name.toUpperCase() === topUp.operator.toUpperCase())[0]

    if (!v) return []
    return v.plans
  }

  return (
    <>
      <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1">

        <AppSelect
          label="Select a plan*"
          onChange={(value) => {
            topUp.update({
              operatorId: parseInt(value),
              amountFiat: getPlans().filter((val) => val.amount.toString() === value)[0]?.amount || 0,
              dataAmount: getPlans().filter((val) => val.amount.toString() === value)[0]?.amount || 0,
              dataDesc: getPlans().filter((val) => val.amount.toString() === value)[0]?.desc || ''
            })

          }}
          data={getPlans().map((val) => {
            return {
              label: `${val.desc} | ${mapCountryToData[store.countryIso].currencySymbol}${val.amount}`,
              value: `${val.amount}`,
            }
          })}
        />


        <PriceDisplay
          handleSend={handleSend}
          rows={[
            { title: "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
            { title: "Data Amount", subtitle: "NGN ".concat(topUp.amountFiat.toString()) },

          ]}

        />
      </div>

    </>
  )
}
