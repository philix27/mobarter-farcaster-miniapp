import ComingSoon from '@/components/ComingSoon'
import { secrets } from '@/src/lib'
import React from 'react'

export default function OrderSell() {
  if (secrets.NODE_ENV === "development") {
    return <div className='h-[500px] flex items-center justify-center'>
      <ComingSoon />
    </div>
  }

  return (
    <div>

    </div>
  )
}
