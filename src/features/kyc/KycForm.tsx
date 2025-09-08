import { Button } from '@/components/Button';
import { HeaderSection } from '@/components/HeaderSection';
import { Input } from '@/components/Input'
import React from 'react'


export default function KycForm() {
    const handleSubmit = () => { return }
    return (
        <>
            <HeaderSection title='KYC Verification' />
            <div className='py-2 px-4 space-y-4'>
                <Input
                    label={`First name*`}
                    placeholder={`John`}
                />
                <Input
                    label={`Last name*`}
                    placeholder={`Doe`}
                />
                <Input
                    label={`Middle name`}
                    placeholder={``}
                />
                <Input
                    label={`Date of Birth (DOB)*`}
                    placeholder={`DY-MM-YR`}
                />
                <Input
                    label={`National Identity No (NIN)*`}
                    placeholder={`012345678901`}
                />
                <Input
                    label={`Bank Verification No (BVN)*`}
                    placeholder={`012345678901`}
                />
                <Input
                    label={`Phone*`}
                    placeholder={`08012345678`}
                />
                <div className='flex justify-center items-center mt-5'>
                    <Button className='w-[45%]' onClick={handleSubmit} isLoading={true} >Add</Button>
                </div>
            </div>
        </>
    )
}
