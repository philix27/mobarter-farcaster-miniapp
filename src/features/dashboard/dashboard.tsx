import React from 'react'
import DesktopWrapper from '../desktop/Wrapper';
import { WalletBalance } from './WalletBalances';
import { TokensSection } from './TokensList';

export default function DashboardPage() {
    return (
        <DesktopWrapper>
            <div className='w-full  h-full flex flex-col items-center'>
                <WalletBalance />
                <TokensSection />
            </div>
        </DesktopWrapper>
    )
}



