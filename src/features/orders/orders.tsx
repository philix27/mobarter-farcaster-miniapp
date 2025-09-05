import React from 'react'
import OrderSell from './OrderSell'
import { ITab, Tabs } from "@/components/Tabs";
import { useOrders } from './_store';
import BuyOrder from './OrderBuy';

export default function OrderSection() {
  const store = useOrders();
  const tabItems: ITab[] = [
    {
      title: "SELL",
      isActive: store.tabs === "SELL",
      onClick: () => {
        store.update({ tabs: "SELL" });
      }
    },
    {
      title: "BUY",
      isActive: store.tabs === "BUY",
      onClick: () => {
        store.update({ tabs: "BUY" });
      }
    },
  ]
  return (
    <div>
      <div className='bg-card rounded-lg py-2'>
      <Tabs tabs={tabItems} />
        {store.tabs === "SELL" && <OrderSell />}
        {store.tabs === "BUY" && <BuyOrder />}
      </div>
    </div>
  )
}
