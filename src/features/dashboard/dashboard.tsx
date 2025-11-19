import React from 'react'
import DesktopWrapper from '../desktop/Wrapper';
import { TokensSection } from './TokensList';
import { QuickActions } from './QuickActions';
import { TransactionsHistorySection } from './TransactionsHistory';

export default function DashboardPage() {
    return (
        <DesktopWrapper>
            <div className='w-full  h-full flex flex-col items-center space-y-8'>
                <div className='w-full flex items-center md:gap-x-5 gap-y-4 flex-col md:flex-row'>
                    <div className='md:w-[50%] w-full h-[100px] rounded-md'>
                        <CryptoBalance />
                    </div>
                    {/* <div className='md:w-[50%] w-full h-[100px] bg-card rounded-md'>
                        <BankAccount />
                    </div> */}
                </div>
                <QuickActions />
                <div className='w-full flex items-center md:gap-x-5 gap-y-5 flex-col md:flex-row'>
                    <div className='md:w-[50%] w-full h-full bg-card rounded-md'>
                        <TokensSection />
                    </div>
                    <div className='md:w-[50%] w-full h-full bg-card rounded-md'>
                        <TransactionsHistorySection />
                    </div>
                </div>
            </div>
        </DesktopWrapper>
    )
}



export function CryptoBalance() {
    return (
        <div className='rounded-md py-3 px-5 '>
            <p className='font-light text-[12px] text-muted '>Total Balance</p>
            <p className='font-semibold text-foreground text-[33px] mt-2 '>$28,457.00 <span className='text-[15px] text-muted font-medium '>USD</span></p>
        </div>
    )
}

export function BankAccount() {
    return (
        <div className='bg-card rounded-md py-3 px-5  '>
            <p className='font-light text-[12px] text-muted '>Total Balance</p>
            <p className='font-semibold text-foreground text-[33px] mt-2 '>$28,457.00 <span className='text-[15px] text-muted font-medium '>USD</span></p>
        </div>
    )
}
