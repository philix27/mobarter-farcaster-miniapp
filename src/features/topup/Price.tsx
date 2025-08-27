import { Button } from '@/components/Button'
import { Card, Label } from '@/components/comps'
import React from 'react'

export default function PriceDisplay(props: { amountToPay: string; handleSend: () => Promise<void> }) {
    return (
        <div className='w-full items-center justify-center flex flex-col gap-y-4 px-1 space-y-5 mb-4'>
            <div className="w-full mt-3">
                <Label>You Pay:</Label>
                <Card>{props.amountToPay}</Card>
            </div>
            <Button className="mt-10 w-[70%]" onClick={props.handleSend}>
                Send
            </Button>
        </div>
    )
}
