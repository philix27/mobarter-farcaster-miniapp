import { AdsRow, Label } from '@/components/comps'
import React from 'react'

export default function PersonalInfo() {
    return (
        <div className="w-full p-2 border-b-1 mt-4 border-muted  rounded-lg flex flex-col items-start justify-center bg-card">
            <Label>Personal Info</Label>
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
