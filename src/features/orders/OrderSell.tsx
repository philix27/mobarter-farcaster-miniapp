import ComingSoon from '@/components/ComingSoon'
import { mapCountryToData, secrets } from '@/src/lib'
import React from 'react'
import { PriceDisplay, PayWithToken, getSafeErrorMessage, useSendToken } from '../pay'
import { Input } from '@/components/Input'
import { useOrders } from './_store'
import { useSettings } from '@/src/lib/zustand/settings'
import { Card, Label } from '@/components/comps'
import { usePrice, } from '@/src/hooks'
import { toast } from 'sonner'
import { appAddresses } from '@/src/lib/const'
import { triggerEvent } from '@/src/providers/PostHogProvider'
import { logger } from '@/src/lib/utils'
import { useAccount } from 'wagmi'
import { useNotification } from '@coinbase/onchainkit/minikit'

export default function OrderSell() {
  const ordersStore = useOrders()
  const store = useSettings()
  const { sendErc20 } = useSendToken()
  const { amountToPay, } = usePrice({ amountInFiat: ordersStore.amountFiat })
  const { address } = useAccount()
  const sendNotification = useNotification()
  const currencySymbol = mapCountryToData[store.countryIso].currencySymbol
  if (secrets.NODE_ENV !== "development") {
    return <div className='h-[500px] flex items-center justify-center'>
      <ComingSoon />
    </div>
  }

  const handleSend = async () => {
    const leastAmount = 50

    if (ordersStore.amountFiat == undefined || ordersStore.amountFiat < leastAmount) {
      toast.error('Minimum of NGN 50')
      return
    }

    try {
      ordersStore.update({ isLoading: true })
      const txn = await sendErc20({
        recipient: appAddresses.topUpCollector,
        amount: amountToPay!.toString(),
        payWith: store.payWith
      })

      // purchaseTopUp.mutate({
      //   phoneNo: `${mapCountryToData[store.countryIso].callingCodes}${topUp.phoneNo}`,
      //   amount: topUp.amountFiat,
      //   countryCode: store.country,
      //   operatorId: topUp.operatorId!,
      //   userId: address!,
      //   payment: {
      //     txHash: txn?.txHash,
      //     user_uid: address!,
      //     transaction_pin: '',
      //     tokenAddress: store.payWith.token.address,
      //     tokenChain: store.payWith.chain.name,
      //     amountCrypto: amountToPay as number,
      //     amountFiat: topUp.amountFiat,
      //     from: RequestFrom.Farcaster,
      //     fiatCurrency: Country.Ng
      //   },
      // })

      logger.info(txn)
      triggerEvent('top_up_airtime_successful', { userId: address, amount: ordersStore.amountFiat });
      toast.success('Airtime sent successfully')

      await sendNotification({
        title: "Congratulations!",
        body: `Airtime sent successfully!`,
      });

    } catch (err) {
      toast.error(getSafeErrorMessage(err));
      logger.error('Topup ' + JSON.stringify(err))
      triggerEvent('top_up_airtime_failed', { userId: address, amount: ordersStore.amountFiat, error: err });
    } finally {
      ordersStore.update({ isLoading: false })
    }
  }
  return (
    <div className='space-y-5 px-2'>
      <PayWithToken />
      <Input
        label={`Amount*`}
        preText={currencySymbol}
        placeholder="Amount to send"
        type="number"
        step=".01"
        value={ordersStore.amountFiat}
        onChange={(e) => {
          const num = parseFloat(e.target.value)
          if (isNaN(num)) {
            return
          }

          ordersStore.update({ amountFiat: num })
        }}
      />

      <div className=''>
        <Label> Select Account </Label>
        <Card className='bg-background'>
          <Label> Opay | 090292 </Label>
        </Card>
      </div>

      <PriceDisplay isLoading={ordersStore.isLoading} handleSend={handleSend} rows={[
        { "title": "You Pay", subtitle: "USD ".concat(amountToPay.toString()) },
        { "title": "You Receive", subtitle: currencySymbol.concat(ordersStore.amountFiat.toString()) },
        { "title": "Bank Account", subtitle: "OPAY", },
        { "title": "Account No", subtitle: "81234567890", },
        { "title": "Account name", subtitle: "Felix Eligbue" },
      ]} />
    </div>
  )
}
