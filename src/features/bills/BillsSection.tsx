import { TabsComp } from '@/components/tab'
import React from 'react'
import AirtimeSection from '../topup/TopUpAirtime';
import TopUpDataPlan from '../topup/TopUpData';

export default function BillsSection() {
    return (
        <div className='w-full'>
            < TabsComp
                defaultValue="airtime"
                list={[
                    {
                        heading: "Airtime",
                        value: "airtime",
                        content: < AirtimeSection />
                    },
                    {
                        heading: "Data Bundle",
                        value: "databundle",
                        content: < TopUpDataPlan />
                    },
                    {
                        heading: "Utilities",
                        value: "light",
                        content: <div>Ethereum Tokens</div>
                    },
                    {
                        heading: "Betting",
                        value: "betting",
                        content: <div>Ethereum Tokens</div>
                    },
                ]}
            />
        </div>
    )
}
