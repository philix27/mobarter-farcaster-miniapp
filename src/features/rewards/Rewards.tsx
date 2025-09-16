import { Input } from '@/components/Input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useOpenUrl } from '@coinbase/onchainkit/minikit';
import { useAddRewardsInfo, useGetUserRewardsInfo } from '@/src/lib/mongodb/rewards/hook';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { baseUSDC, useClaim } from '@/src/contract/hook';
import { SupportedChains } from '@/src/contract/services/onchainUtils';

type IRewardSection = {
    title: string;
    placeholder?: string;
    link?: string;
    hasValue?: boolean;
    onSubmit?: (val: string) => void
}

export default function RewardsSection() {
    const addInfo = useAddRewardsInfo()
    const { data, isPending } = useGetUserRewardsInfo()
    const claim = useClaim()

    if (isPending) {
        return <Spinner />
    }

    const handleClaim = async () => {
        try {
            await claim.claim({ tokenAddress: baseUSDC, chain: SupportedChains.base })

        } catch (error: any) {
            const msg = error.message.toString().split(",")[0]
            toast.error(msg)
        }
    }
    const info = data
    const rewardsSections: IRewardSection[] = [
        {
            hasValue: info && !!info.email,
            title: "Subscribe to our email newsletter",
            placeholder: "Enter your email address",
            onSubmit: async (val) => {
                addInfo.mutate({ "email": val }, {
                    onSuccess: () => {
                        toast.success("Subscribed")
                    }
                })
            }
        },
        {
            title: "Follow on Farcaster",
            // placeholder: "Enter your farcaster username",
            link: "https://farcaster.xyz/philix",
            onSubmit: () => {
                toast.success("Success")
            }
        },
        {
            hasValue: info && !!info.twitter_handle,
            title: "Follow on twitter",
            placeholder: "Enter your twitter handle",
            link: 'https://x.com/mobarter_com',
            onSubmit: (val) => {
                addInfo.mutate({ twitter_handle: val }, {
                    onSuccess: () => {
                        toast.success("Submitted")
                    }
                })
            }
        },
        {
            hasValue: info && !!info.whatsapp_no,
            title: "Join WhatsApp Group",
            placeholder: "Enter your whatsapp no",
            link: "https://chat.whatsapp.com/KCUxiROyufX44M04SP2L6j",
            onSubmit: (val) => {
                addInfo.mutate({ whatsapp_no: val }, {
                    onSuccess: () => {
                        toast.success("Submitted")
                    }
                })
            }
        },
        {
            hasValue: info && !!info.telegram_handle,
            title: "Join Telegram Group",
            placeholder: "Enter your telegram username",
            link: "https://t.me/mobarter/1",
            onSubmit: (val) => {
                addInfo.mutate({ telegram_handle: val }, {
                    onSuccess: () => {
                        toast.success("Submitted")
                    }
                })
            }
        },
        {
            title: "Subscribe to our youtube",
            // placeholder: "Enter your telegram username",
            link: "https://www.youtube.com/@mobarter",
            onSubmit: () => {
                return
            }
        },
    ]

    return (
        <div className='space-y-2'>

            {rewardsSections.map((item, i) => <RCard key={i} data={item} />)}
            <button
                className='bg-primary text-[12px] ml-1 px-3 rounded-lg h-[32px]'
                onClick={handleClaim}>Claim Reward</button>
        </div>
    )
}

function RCard({ data }: { data: IRewardSection }) {
    const [isOpen, setOpen] = useState(false)
    const [field, setField] = useState<string>()
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
                    <div>
                        {isOpen ? <ChevronUp className='text-muted' /> : <ChevronDown className='text-muted' />}
                    </div>
                </div>
            </div>


            {isOpen && <div>
                {data.hasValue ? <div className='flex items-center justify-center w-full h-[80px]'>
                    <Button btnName={'CLAIM Rewards'}>Claim</Button> </div> :
                    <div>
                        {data.placeholder ? <div className='flex items-center px-1'>
                            <Input
                                placeholder={data.placeholder}
                                value={field}
                                onChange={(e) => {
                                    setField(e.target.value)
                                }} />
                            <button
                                className='bg-primary text-[12px] ml-1 px-3 rounded-lg h-[32px]'
                                onClick={() => {
                                    if (data.onSubmit) {
                                        if (!field) {
                                            toast.error(`${data.placeholder}`)
                                            return
                                        }
                                        data.onSubmit(field)
                                    }
                                }}>submit</button>
                        </div> :

                            <div> </div>
                        }
                    </div>
                }
            </div>
            }
        </div>
    )
}