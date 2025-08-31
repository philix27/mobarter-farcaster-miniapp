import { AppSelect } from '@/components/Select'
import { AppStores } from '@/src/lib/zustand'
import React from 'react'
import { payTokens } from './pay/tokens'


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
                        <div key={i} className='flex items-center'>
                            <img src={val.token.logo} alt={val.token.symbol} className='w-4 h-4 inline mr-1' />
                            <p>{val.token.symbol} <span className='text-[10.5px] text-muted'>{val.chain.name.toUpperCase()}</span> </p>
                        </div>
                    )
                }
            })}
        />
    )
}
