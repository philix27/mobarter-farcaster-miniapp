import { AppSelect } from '@/components/Select'
import { AppStores } from '@/src/lib/zustand'
import React from 'react'
import { payTokens } from './tokens'
import TokenBalanceDisplay from './TokenBalance'


export default function PayWithToken() {
    const store = AppStores.useSettings()
    return (
        <AppSelect
            label="Pay With*"
            onChange={(value) => {
                store.update({ payWith: payTokens.filter((t) => t.token.address === value)[0] })
            }}
            data={payTokens.map((val, i) => {
                return {
                    value: val.token.address,
                    label: (
                        <div key={i} className='flex items-center justify-between w-full'>
                            <div className='flex items-center mr-2'>
                                <img src={val.token.logo} alt={val.token.symbol} className='w-4 h-4 inline mr-1' />
                                <p><span className='text-[13px] font-semibold'> {val.token.symbol} </span> <span className='text-[10px] text-muted'>{val.chain.name.toUpperCase()}</span> </p>
                            </div>

                            <TokenBalanceDisplay tokenAddress={val.token.address as `0x${string}`} chainId={val.chain.chainId} />
                        </div>
                    )
                }
            })}
        />
    )
}
