import { Label } from '@/components/comps'
import { Spinner } from '@/components/Spinner'
import { useOrdersGet } from '@/src/lib/mongodb/orders/hook'
import React from 'react'


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
    <div className=''>
      {ordersAcct.data.map((val, i) => {
        return (
          <div key={i} className='flex items-center justify-between w-full'>
            <div className='flex items-center mr-2'>
              <p>
                <span className='text-[12px] font-semibold'> {val.bank_name} </span>
                <span className='text-[10px] text-muted'>{val.account_name}</span>
              </p>
            </div>
            <p className='text-[13px] font-normal text-muted'>{val.amount_in_crypto} </p>
          </div>
        )
      })}
    </div>
  )
}
