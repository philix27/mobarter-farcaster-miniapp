import { toast } from 'sonner'
import { mapCountryToData, appAddresses, } from '@/src/lib/const'
import { AppStores } from '@/src/lib/zustand'
import { usePrice, } from '@/src/hooks'
import { Input } from '@/components/Input'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import { PriceDisplay, getSafeErrorMessage, useSendToken } from '../pay'
import { Operator, useTopUpForm } from './_store'
import { usePurchaseTopUp } from './api/hook'
import { Country, RequestFrom } from '@/zapi'
import { logger } from '@/src/lib/utils'
import { useAccount } from 'wagmi'
import { operatorsData } from './operatorData'
import { AppSelect } from '@/components/Select'
import { useNotification } from '@coinbase/onchainkit/minikit'


export default function AirtimeSection() {
  const { sendErc20 } = useSendToken()
  const store = AppStores.useSettings()
  const ops = operatorsData[AppStores.useSettings().countryIso].airtime;
  const sendNotification = useNotification()
  const { address } = useAccount()
  const topUp = useTopUpForm();
  const { amountToPay, } = usePrice({ amountInFiat: topUp.amountFiat })
  const purchaseTopUp = usePurchaseTopUp()

  const handleSend = async () => {
    const leastAmount = 50

    if (!topUp.phoneNo || topUp.phoneNo.length < 10) {
      toast.error('Enter a valid phone number')
      return
    }

    if (topUp.amountFiat == undefined || topUp.amountFiat < leastAmount) {
      toast.error('Minimum of NGN 50')
      return
    }

    if (topUp.operatorId == undefined || topUp.operatorId === 0) {
      toast.error('Please select an operator')
      return
    }

    try {
      topUp.update({ isLoading: true })
      const txn = await sendErc20({
        recipient: appAddresses.topUpCollector,
        amount: amountToPay!.toString(),
        payWith: store.payWith
      })

      purchaseTopUp.mutate({
        phoneNo: `${mapCountryToData[store.countryIso].callingCodes}${topUp.phoneNo}`,
        amount: topUp.amountFiat,
        countryCode: store.country,
        operatorId: topUp.operatorId!,
        userId: address!,
        payment: {
          txHash: txn?.txHash,
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


      triggerEvent('top_up_airtime_successful', { userId: address, amount: topUp.amountFiat });
      toast.success('Airtime sent successfully')

      await sendNotification({
        title: "Congratulations!",
        body: `Airtime sent successfully!`,
      });

    } catch (err) {
      toast.error(getSafeErrorMessage(err));
      logger.error('Topup ' + JSON.stringify(err))
      triggerEvent('top_up_airtime_failed', { userId: address, amount: topUp.amountFiat, error: err });
    } finally {
      topUp.update({ isLoading: false })
    }
  }


  return (
    <>
      <div className="w-full px-1 mb-4"
      >
        <AppSelect
          label="Network*"
          onChange={(data) => {
            topUp.update({
              operator: data as unknown as Operator,
              operatorId: ops.filter((val) => val.name === data)[0]?.operatorId || 0,
              operatorLogo: ops.filter((val) => val.name === data)[0]?.logo || ''
            })
          }}
          defaultInputValue={topUp.operator}
          data={ops.map((val, i) => {
            return {
              // label: val.name,
              value: val.name,
              label: (
                <div key={i} className='flex items-center'>
                  <img src={val.logo} alt={val.name} className='w-4 h-4 inline mr-1' />
                  <p>{val.name} </p>
                </div>
              )
            }
          })}
        />

        <Input
          label={`Amount*`}
          preText={mapCountryToData[store.countryIso].currencySymbol}
          placeholder="Amount to send"
          type="number"
          step=".01"
          value={topUp.amountFiat}
          onChange={(e) => {
            const num = parseFloat(e.target.value)
            if (isNaN(num)) {
              return
            }

            topUp.update({ amountFiat: num })
          }}
        />


      </div>
      <PriceDisplay
        handleSend={handleSend}
        isLoading={topUp.isLoading}
        rows={[
          { title: "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
          { title: "Airtime Amount", subtitle: "NGN ".concat(topUp.amountFiat.toString()) },
          { title: "Operator", subtitle: topUp.operator, subImg: topUp.operatorLogo },
          { title: "Phone", subtitle: "0".concat(topUp.phoneNo) },
        ]}

      />
    </>
  )
}
