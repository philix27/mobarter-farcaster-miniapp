import { toast } from 'sonner'
import { AppStores } from '@/src/lib/zustand'
import { appAddresses, } from '@/src/lib/const'
import { ISendTxnError, usePrice, useSendToken } from '@/src/hooks'
import { mapCountryToData, } from '@/src/lib/const/countries'
import { Country, RequestFrom, } from '@/zapi'
import { AppSelect } from '@/components/Select'
import PriceDisplay from './Price'
import { Operator, useTopUpForm } from './_store'
import { operatorsData } from './operatorData'
import { usePurchaseTopUp } from './api/hook'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import { logger } from '@/src/lib/utils'
import { useAccount } from 'wagmi'

export default function TopUpDataPlan() {
  const topUp = useTopUpForm();
  const { sendErc20 } = useSendToken()
  const ops = operatorsData[Country.Ng].dataBundles
  const { address } = useAccount()
  const store = AppStores.useSettings()
  const purchaseTopUp = usePurchaseTopUp()
  const { amountToPay } = usePrice({ amountInFiat: topUp.amountFiat })


  const handleSend = async () => {

    if (!topUp.phoneNo || topUp.phoneNo.length < 10) {
      toast.error('Enter a valid phone number')
      return
    }

    if (!topUp.dataBundleOperatorId || topUp.dataBundleOperatorId === 0) {
      toast.error('Select an operator')
      return
    }


    if (topUp.amountFiat <= 0) {
      toast.error('Amount must be above zero')
      return
    }

    await sendErc20({
      recipient: appAddresses.topUpCollector,
      amount: amountToPay!.toString(),
      payWith: store.payWith,
    })
      .then(async (txHash) => {
        purchaseTopUp.mutate({
          phoneNo: `${mapCountryToData[store.countryIso].callingCodes}${topUp.phoneNo}`,
          amount: topUp.amountFiat,
          countryCode: store.country,
          operatorId: topUp.operatorId!,
          userId: address!,
          payment: {
            txHash: txHash,
            user_uid: address!,
            transaction_pin: '',
            tokenAddress: store.payWith.token.address,
            tokenChain: store.payWith.chain.name,
            amountCrypto: amountToPay as number,
            amountFiat: topUp.amountFiat,
            from: RequestFrom.Farcaster,
            fiatCurrency: Country.Ng
          },
        })

        triggerEvent('top_up_airtime_successful', { userId: "", amount: topUp.amountFiat });
        toast.success('Airtime sent successfully')

        // await sendNotification({
        //   title: "Congratulations!",
        //   body: `Airtime sent successfully!`,
        // });
        topUp.clear()
      })
      .catch((err: ISendTxnError) => {
        toast.error(err.reason)
        logger.error('Topup error:' + JSON.stringify(err))
        triggerEvent('top_up_airtime_failed', { userId: "", amount: topUp.amountFiat, error: err.reason });
      })
  }

  const getPlans = () => {
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
              amountFiat: 0
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
              dataDesc: getPlans().filter((val) => val.amount.toString() === value)[0]?.desc || ''
            })
          }}
          // defaultInputValue={topUp.amountFiat.toString()}
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
            { title: "Data Amount", subtitle: "NGN ".concat(topUp.amountFiat === undefined ? "0" : topUp.amountFiat.toString()) },

          ]}

        />
      </div>

    </>
  )
}
