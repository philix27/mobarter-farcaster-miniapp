import ComingSoon from '@/components/ComingSoon'
import { mapCountryToData, secrets } from '@/src/lib'
import React from 'react'
import PriceDisplay from '../pay/Price'
import PayWithToken from '../pay/PayWithToken'
import { Input } from '@/components/Input'
import { useOrders } from './_store'
import { useSettings } from '@/src/lib/zustand/settings'
import { Card, Label } from '@/components/comps'

export default function OrderSell() {
  const ordersStore = useOrders()
  const store = useSettings()
  if (secrets.NODE_ENV !== "development") {
    return <div className='h-[500px] flex items-center justify-center'>
      <ComingSoon />
    </div>
  }

  return (
    <div className='space-y-5'>
      <div className='w-full items-center flex justify-center'>
        <Label>Sell Crypto</Label>
      </div>
      <PayWithToken />
      <Input
        label={`Amount*`}
        preText={mapCountryToData[store.countryIso].currencySymbol}
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
        <Card>
          <Label> Opay | 090292 </Label>
        </Card>
      </div>

      <div className='bg-card p-1 rounded-lg'>
        <PriceDisplay rows={[
          { "title": "You Pay", subtitle: "898" },
          { "title": "You Receive", subtitle: "898" },
          { "title": "Bank Account", subtitle: "OPAY", },
          { "title": "Account No", subtitle: "81234567890", },
          { "title": "Account name", subtitle: "Felix Eligbue" },
        ]} />
      </div>
    </div>
  )
}
