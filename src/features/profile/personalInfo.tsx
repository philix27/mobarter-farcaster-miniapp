import { AdsRow, Label } from '@/components/comps'
import { useRouter } from 'next/router'
import React from 'react'

export default function PersonalInfo() {
    const router = useRouter()
    return (
        <div className="w-full p-2 border-b-1 mt-4 border-muted  rounded-lg flex flex-col items-start justify-center bg-card">

            <div className='flex justify-between items-center w-full'>
                <Label>Bank Accounts</Label>

                <p className='text-primary text-[12px] font-semibold underline' onClick={() => {
                    void router.push("/kyc-form")
                }} > Verify</p>

            </div>
            <hr className='border-1 border-muted w-full mb-1' />
            <AdsRow text="First Name" text2={"Lix"} />
            <hr />
            <AdsRow text="Last Name" text2={""} />
            <AdsRow text="Middle Name" text2={""} />
            <AdsRow text="DOB" text2={""} />
            <AdsRow text="NIN" text2={""} />
            <AdsRow text="BVN" text2={""} />
            <AdsRow text="Phone" text2={""} />
        </div>
    )
}
