import React from 'react'
import OrderSell from './OrderSell'
import { ITab, Tabs } from "@/components/Tabs";
import { useOrders } from './_store';
import BuyOrder from './OrderBuy';
import OrderHistory from './OrderHistory';

export default function OrderSection() {
  const store = useOrders();
  const tabItems: ITab[] = [
    {
      title: "SELL",
      value: "SELL",
      comp: <OrderSell />,
    },
    {
      title: "BUY",
      value: "BUY",
      comp: <BuyOrder />,
    },
    {
      title: "HISTORY",
      value: "HISTORY",
      comp: <OrderHistory />,

    },
  ]
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='md:w-[40%] w-full bg-card rounded-lg py-2'>
        <Tabs
          onClick={(v: any) => {
            store.update({ tabs: v });
          }}
          activeValue={store.tabs} tabs={tabItems} />
      </div>
    </div>
  )
}
