import { toast } from 'sonner'
import { mapCountryToData, COLLECTOR, } from '@/src/lib/const'
import { AppStores } from '@/src/lib/zustand'
import { usePrice, useSendToken } from '@/src/hooks'
import { Input } from '@/components/Input'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import PriceDisplay from './Price'
import { useTopUpForm } from './_store'
import { usePurchaseTopUp } from './TopUps/hook'
import { Country, RequestFrom } from '@/zapi'
import { useNotification } from '@coinbase/onchainkit/minikit'


export function AirtimeSection() {
  const { sendErc20 } = useSendToken()
  const store = AppStores.useSettings()
  const sendNotification = useNotification();

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

    await sendErc20({
      recipient: COLLECTOR,
      amount: amountToPay!.toString(),
      payWith: store.payWith
    })
      .then(async (txHash) => {
        purchaseTopUp.mutate({
          phoneNo: `${mapCountryToData[store.countryIso].currencySymbol}${topUp.phoneNo}`,
          amount: topUp.amountFiat,
          countryCode: Country.Gh,
          operatorId: topUp.operatorId!,
          userId: '',
          payment: {
            txHash: txHash,
            transaction_pin: '',
            user_uid: '',
            tokenAddress: '',
            tokenChain: '',
            amountCrypto: 0,
            amountFiat: 0,
            from: RequestFrom.Farcaster,
            fiatCurrency: Country.Gh
          },
        })

        triggerEvent('top_up_airtime_successful', { userId: "", amount: topUp.amountFiat });
        toast.success('Airtime sent successfully')

        await sendNotification({
          title: "Congratulations!",
          body: `Airtime sent successfully!`,
        });
        topUp.clear()
      })
      .catch((err) => {
        toast.error('Error: ', err.message)
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
