import { toast } from 'sonner'
import { mapCountryToData, COLLECTOR, } from '@/src/lib/const'
import { AppStores } from '@/src/lib/zustand'
import { ISendTxnError, usePrice, useSendToken } from '@/src/hooks'
import { Input } from '@/components/Input'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import PriceDisplay from './Price'
import { useTopUpForm } from './_store'
import { usePurchaseTopUp } from './TopUps/hook'
import { Country, RequestFrom } from '@/zapi'
import { logger } from '@/src/lib/utils'
import { useAccount } from 'wagmi'
// import { useNotification } from '@coinbase/onchainkit/minikit'


export function AirtimeSection() {
  const { sendErc20 } = useSendToken()
  const store = AppStores.useSettings()
  // const sendNotification = useNotification();
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

    await sendErc20({
      recipient: COLLECTOR,
      amount: amountToPay!.toString(),
      payWith: store.payWith
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


  return (
    <>
      <div className="w-full px-1 mb-4"
      >
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
        rows={[
          { title: "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
          { title: "Airtime Amount", subtitle: "NGN ".concat(topUp.amountFiat.toString()) },
        ]}

      />
    </>
  )
}
