import { Input } from '@/components/Input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'

type IRewardSection = { title: string; placeholder: string }
const rewardsSections: IRewardSection[] = [
    { title: "Subscribe to our email newsletter", placeholder: "Enter your email address" },
    { title: "Follow on Farcaster", placeholder: "Enter your email address" },
    { title: "Follow on twitter", placeholder: "Enter your twitter handle" },
    { title: "Join WhatsApp Group", placeholder: "Enter your whatsapp no" },
    { title: "Join Telegram Group", placeholder: "Enter your telegram username" },
]
export default function RewardsSection() {
    return (
        <div className='space-y-2'>
            {rewardsSections.map((item, i) => <RCard key={i} data={item} />)}
        </div>
    )
}


function RCard({ data }: { data: IRewardSection }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className='py-2 px-1 bg-card rounded-md '
        >
            <div className='flex items-center justify-between'
                onClick={() => {
                    setOpen(!isOpen)
                }}>
                <div className='px-2'>
                    <p className='text-sm font-bold'>{data.title}</p>
                </div>
                <div>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>

            {isOpen && <div className='flex items-center px-1'>
                <Input placeholder={data.placeholder} />
                <button className='bg-primary text-[12px] ml-1 px-3 rounded-lg h-[37px]'>submit</button>
            </div>}
        </div>
    )
}