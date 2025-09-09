import { AdsRow, Label } from '@/components/comps'
import { Spinner } from '@/components/Spinner'
import { useOrdersGet } from '@/src/lib/mongodb/orders/hook'
import React from 'react'
import { convertToWAT } from './dateConversion'


export default function OrderHistory() {
  const ordersAcct = useOrdersGet()

  if (ordersAcct.isPending) {
    return <Spinner size={24} />
  }

  if (!ordersAcct.data || ordersAcct.data?.length === 0) {
    return (
      <div className='flex space-y-4 items-center justify-center flex-col py-5'>
        <Label>No orders found</Label>
      </div>
    )
  }

  return (
    <div className='space-y-1 p-2'>
      {ordersAcct.data.map((val, i) => {
        return (
          <div key={i} className='p-2 w-full bg-background rounded-lg'>
            <AdsRow text='Bank' text2={`${val.bank_name} | ${val.account_number}`} />
            <AdsRow text={convertToWAT(val.createdAt!)} text2={val.status} />
            <AdsRow text='SELL' text2={`${val.amount_in_crypto.toString()} ${val.token_name}`} />
            <AdsRow text='RECEIVE' text2={`${val.amount_in_fiat.toString()} ${val.fiat_currency}`} />
          </div>
        )
      })}
    </div>
  )
}
