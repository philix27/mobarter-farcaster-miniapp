import React, { useState } from 'react'
import AirtimeSection from '../topup/TopUpAirtime';
import TopUpDataPlan from '../topup/TopUpData';
import { Tabs } from '@/components/Tabs';

export default function BillsSection() {
    const [active, setActive] = useState<"airtime" | "databundle" | "utilities" | "betting">("airtime")
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='md:w-[40%] w-full bg-card rounded-lg py-2 px-2'>
                <Tabs
                    activeValue={active}
                    onClick={(v: any) => {
                        setActive(v)
                    }}
                    tabs={
                        [
                            {
                                title: "Airtime",
                                value: "airtime",
                                comp: <AirtimeSection />,
                            },
                            {
                                title: "Data",
                                value: "databundle",
                                comp: <TopUpDataPlan />,
                            },
                            {
                                title: "Utilities",
                                value: "utilities",
                                comp: <div>Ethereum Tokens</div>,
                            },
                            {
                                title: "Betting",
                                value: "betting",
                                comp: <div>Ethereum Tokens</div>,
                            },
                        ]
                    } />
            </div>
        </div>
    )
}
