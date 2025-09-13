import { Input } from '@/components/Input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';

type IRewardSection = { title: string; placeholder: string; link?: string; onSubmit?: VoidFunction }

export default function RewardsSection() {

    const rewardsSections: IRewardSection[] = [
        {
            title: "Subscribe to our email newsletter", placeholder: "Enter your email address",
            onSubmit: () => {
                toast.success("Subscribed")
            }
        },
        {
            title: "Follow on Farcaster", placeholder: "Enter your email address",
            onSubmit: () => {
                toast.success("Subscribed")
            }
        },
        {
            title: "Follow on twitter",
            placeholder: "Enter your twitter handle",
            link: 'https://x.com/mobarter_com',
            onSubmit: () => {
                toast.success("Subscribed")
            }
        },
        {
            title: "Join WhatsApp Group", placeholder: "Enter your whatsapp no",
            onSubmit: () => {
                toast.success("Subscribed")
            }
        },
        {
            title: "Join Telegram Group", placeholder: "Enter your telegram username",
            link: "https://t.me/mobarter/1",
            onSubmit: () => {
                toast.success("Subscribed")
            }
        },
        {
            title: "Subscribe to our youtube", placeholder: "Enter your telegram username",
            link: "https://www.youtube.com/@mobarter",
            onSubmit: () => {
                return
            }
        },
    ]
    return (
        <div className='space-y-2'>
            {rewardsSections.map((item, i) => <RCard key={i} data={item} />)}
        </div>
    )
}

function RCard({ data }: { data: IRewardSection }) {
    const [isOpen, setOpen] = useState(false)
    const openUrl = useOpenUrl()
    return (
        <div
            className='py-2 px-1 bg-card rounded-md '
        >
            <div className='flex items-center justify-between'
                onClick={() => {
                    setOpen(!isOpen)
                }}>
                <div className='px-2'>
                    <p className='text-[12px] font-normal text-muted'>{data.title} {data.link &&
                        <span className='text-primary' onClick={() => {
                            openUrl(data.link!)
                        }}>Link</span>}</p>
                </div>
                <div>
                    {isOpen ? <ChevronUp className='text-muted' /> : <ChevronDown className='text-muted' />}
                </div>
            </div>

            {isOpen && <div className='flex items-center px-1'>
                <Input placeholder={data.placeholder} />
                <button className='bg-primary text-[12px] ml-1 px-3 rounded-lg h-[32px]' onClick={data.onSubmit}>submit</button>
            </div>}
        </div>
    )
}