import { Button } from '@/components/Button'
import { Label } from '@/components/comps'
import React from 'react'


type IPriceRow = { title: string; subtitle: string; subImg?: string; }
export function PriceDisplay(props: { isLoading: boolean; handleSend?: () => Promise<void>; rows: IPriceRow[] }) {
    // const topUp = useTopUpForm();

    return (
        <div className='w-full items-center justify-center flex flex-col gap-y-2 py-2 px-3 bg-background rounded-lg border-muted border-1'>
            <p className='text-[12px] font-bold text-muted'>Transaction Summary</p>

            {props.rows.map((item, i) => <PriceRow key={i} {...item} />)}

            <Button className="mt-5 mb-3 w-[60%]"
                isLoading={props.isLoading}
                onClick={props.handleSend}>
                Confirm
            </Button>
        </div>
    )
}


function PriceRow(props: IPriceRow) {
    return (
        <div className="w-full flex items-center justify-between">
            <Label>{props.title}</Label>
            <div className='flex items-center'>
                {props.subImg && <img src={props.subImg} alt="icon" className='w-4 h-4 inline mr-1' />}
                <Label>{props.subtitle}</Label>
            </div>
        </div>
    )
}
