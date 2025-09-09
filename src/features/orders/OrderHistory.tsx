import { AdsRow, Label } from '@/components/comps'
import { Spinner } from '@/components/Spinner'
import { useOrdersGet } from '@/src/lib/mongodb/orders/hook'
import React, { useState } from 'react'
import { convertToWAT } from './dateConversion'
import { BottomModal } from '@/components/BottomModal'
import { IOrder } from '@/src/lib/mongodb/orders/model'
import { shortString } from '@/src/lib/utils'


export default function OrderHistory() {
  const ordersAcct = useOrdersGet()
  const [showModal, setShowModal] = useState(false)
  const [modalOrder, setModalOrder] = useState<IOrder>()
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

  const sorted = ordersAcct.data.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  return (
    <div className='space-y-1 p-2'>
      {sorted.map((val, i) => {
        return (
          <div key={i} className='p-2 w-full bg-background rounded-lg'>
            <AdsRow text={`SELL | ${val.amount_in_crypto.toString()} ${val.token_name}`} text2={`More`} text2options={{
              "active": true,
              onClick: () => {
                setShowModal(true)
                setModalOrder(val)
              }
            }} />
            <AdsRow text='RECEIVE' text2={`${val.amount_in_fiat.toString()} ${val.fiat_currency}`} />
            <AdsRow text='Bank' text2={`${val.bank_name} | ${val.account_number}`} />
            <AdsRow text={convertToWAT(val.createdAt!)} text2={val.status} />
          </div>
        )
      })}


      <BottomModal showSheet={showModal}
        onClose={() => {
          setShowModal(false)
        }}>
        {modalOrder && <div>
          <AdsRow text="Status" text2={modalOrder.status} />
          <AdsRow text='SELL' text2={`${modalOrder.amount_in_crypto.toString()} ${modalOrder.token_name}`} />
          <AdsRow text='RECEIVE' text2={`${modalOrder.amount_in_fiat.toString()} ${modalOrder.fiat_currency}`} />
          <hr />
          <AdsRow text='Account No' text2={`${modalOrder.account_number}`} />
          <AdsRow text='Bank' text2={`${modalOrder.bank_name}`} />
          <AdsRow text='Account Name' text2={`${modalOrder.account_name} `} />
          <hr />
          <AdsRow text="Transaction Hash" text2={shortString(modalOrder.txn_hash!)} />
          <AdsRow text="Date" text2={convertToWAT(modalOrder.createdAt!)} />
        </div>}
      </BottomModal>
    </div>
  )
}
