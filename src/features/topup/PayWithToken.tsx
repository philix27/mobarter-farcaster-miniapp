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
            data={payTokens.map((val) => {
                return {
                    label: `${val.token.symbol} (${val.chain.name.toLowerCase()})`,
                    value: val.token.address,
                }
            })}
        />
    )
}
