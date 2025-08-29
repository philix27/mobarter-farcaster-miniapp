import { Button } from '@/components/Button'
import { Label } from '@/components/comps'
import React from 'react'

export default function PriceDisplay(props: { amountToPay: string; handleSend: () => Promise<void> }) {
    return (
        <div className='w-full items-center justify-center flex flex-col gap-y-4 py-2 px-3 bg-background rounded-lg'>
            <div className="w-full flex items-center justify-between">
                <Label>You Pay:</Label>
                <Label>{props.amountToPay}</Label>
            </div>
            <div className="w-full flex items-center justify-between">
                <Label>You Pay:</Label>
                <Label>{props.amountToPay}</Label>
            </div>
            <div className="w-full flex items-center justify-between">
                <Label>You Pay:</Label>
                <Label>{props.amountToPay}</Label>
            </div>
            <Button className="mt-4 mb-3 w-[60%]" onClick={props.handleSend}>
                Send
            </Button>
        </div>
    )
}
