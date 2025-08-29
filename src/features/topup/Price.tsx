import { Button } from '@/components/Button'
import { Label } from '@/components/comps'
import React from 'react'


type IPriceRow = { title: string; subtitle: string }
export default function PriceDisplay(props: { handleSend: () => Promise<void>; rows: IPriceRow[] }) {
    return (
        <div className='w-full items-center justify-center flex flex-col gap-y-4 py-2 px-3 bg-background rounded-lg border-muted border-1'>
            <p className='text-[13px] font-bold'>Summary</p>
            {props.rows.map((item, i) => <PriceRow key={i} {...item} />)}

            <Button className="mt-4 mb-3 w-[60%]" onClick={props.handleSend}>
                Confirm
            </Button>
        </div>
    )
}



function PriceRow(props: IPriceRow) {
    return (
        <div className="w-full flex items-center justify-between">
            <Label>{props.title}</Label>
            <Label>{props.subtitle}</Label>
        </div>
    )
}
