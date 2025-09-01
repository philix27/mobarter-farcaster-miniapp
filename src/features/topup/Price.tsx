import { Button } from '@/components/Button'
import { Label } from '@/components/comps'
import React from 'react'
import { useTopUpForm } from './_store';
import PayWithToken from '../pay/PayWithToken';


type IPriceRow = { title: string; subtitle: string; subImg?: string }
export default function PriceDisplay(props: { handleSend?: () => Promise<void>; rows: IPriceRow[] }) {
    const topUp = useTopUpForm();

    return (
        <div className='w-full items-center justify-center flex flex-col gap-y-4 py-2 px-3 bg-background rounded-lg border-muted border-1'>
            <p className='text-[12px] font-bold'>Transaction Summary</p>

            {props.rows.map((item, i) => <PriceRow key={i} {...item} />)}
            <PriceRow title='Phone' subtitle={"0".concat(topUp.phoneNo)} />
            <PriceRow title='Operator'
                subtitle={topUp.operator?.toString() || ""}
                subImg={topUp.operatorLogo} />

            <PayWithToken />
            <Button className="mt-4 mb-3 w-[60%]"
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
