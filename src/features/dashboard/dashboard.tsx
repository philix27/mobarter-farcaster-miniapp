import React from 'react'
import DesktopWrapper from '../desktop/Wrapper';
import { WalletBalance } from './WalletBalances';
import { TokensSection } from './TokensList';
import { IconType } from 'react-icons';
import { BsPerson, BsPhone } from 'react-icons/bs';
import { MdSavings, } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import { RiExchange2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';

export default function DashboardPage() {
    return (
        <DesktopWrapper>
            <div className='w-full  h-full flex flex-col items-center'>
                <WalletBalance />
                <QuickActions />
                <TokensSection />
            </div>
        </DesktopWrapper>
    )
}


export function QuickActions() {
    const router = useRouter()
    const actions: { Icon: IconType; title: string; href: string }[] = [
        { title: "TopUp", href: "/bills", Icon: BsPhone, },
        { title: "Bills", href: "/bills", Icon: FaDollarSign, },
        { title: "Exchange", href: "/exchange", Icon: RiExchange2Fill, },
        { title: "Savings", href: "/savings", Icon: MdSavings, },
        { title: "Settings", href: "/profile", Icon: BsPerson, },
    ]

    return (
        <div className='flex items-center justify-around w-full md:mb-10 mb-5 md:hidden'>
            {actions.map((item, i) => {
                const Icon = item.Icon;
                return (
                    <div key={i} className='flex flex-col items-center justify-center'
                        onClick={() => {
                            void router.push(item.href )
                        }}
                    >
                        <div className='bg-primary p-3 rounded-md mb-1'>
                            <Icon className='text-white' />
                        </div>

                        <p className='text-[10.4px] text-muted'>{item.title}</p>
                    </div>
                )
            })}
        </div>
    )
}
