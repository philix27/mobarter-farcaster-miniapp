import { useState } from 'react'
import { toast } from 'sonner'
import { AppStores } from '@/src/lib/zustand'
import { appAddresses, } from '@/src/lib/const'
import { usePrice, useSendToken } from '@/src/hooks'
import { mapCountryToData, mapCountryToIso } from '@/src/lib/const/countries'
import { Country, RequestFrom, useUtility_purchaseDataBundle } from '@/zapi'
import { AppSelect } from '@/components/Select'
import PriceDisplay from './Price'
import { Operator, useTopUpForm } from './_store'
import { operatorsData } from './operatorData'

export default function TopUpDataPlan() {
  const topUp = useTopUpForm();
  const { sendErc20 } = useSendToken()
  const [operatorPlan, setOperatorPlan] = useState<{ amount: string; desc: string }>()
  const operaror = operatorsData[Country.Ng];
  const ops = operaror.dataBundles

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
      recipient: appAddresses.topUpCollector,
      amount: amountToPay!.toString(),
      payWith: store.payWith,
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
    // if (blankPlan) return []
    const v = ops.filter((val) => val.name.toUpperCase() === topUp.dataBundleOperator.toUpperCase())[0]

    if (!v) return []
    return v.plans
  }

  return (
    <>
      <div className="w-full items-center justify-center flex flex-col gap-y-4 px-1">
        <AppSelect
          label="Network*"
          onChange={(data) => {
            topUp.update({
              dataBundleOperator: data as unknown as Operator,
              dataBundleOperatorId: ops.filter((val) => val.name === data)[0]?.operatorId || 0,
              operatorLogo: ops.filter((val) => val.name === data)[0]?.logo || '',
              dataAmount: undefined
            })
          }}
          defaultInputValue={topUp.dataBundleOperator}
          data={ops.map((val, i) => {
            return {
              value: val.name,
              label: (
                <div key={i} className='flex items-center'>
                  <img src={val.logo} alt={val.name} className='w-4 h-4 inline mr-1' />
                  <p className='text-[12px]'>{val.name} </p>
                </div>
              )
            }
          })}
        />
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
          data={getPlans().map((val, i) => {
            return {
              label: (
                <p key={i} className='text-[12px]'>{`${val.desc} | ${mapCountryToData[store.countryIso].currencySymbol}${val.amount}`} </p>
              ),
              value: val.amount.toString()
            }
          })}
        />


        <PriceDisplay
          handleSend={handleSend}
          rows={[
            { title: "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
            { title: "Data Plan", subtitle: topUp.dataDesc },
            { title: "Data Amount", subtitle: "NGN ".concat(topUp.amountFiat.toString()) },

          ]}

        />
      </div>

    </>
  )
}
