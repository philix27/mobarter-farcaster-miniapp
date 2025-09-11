import { AdsRow, Label } from '@/components/comps'
import { Spinner } from '@/components/Spinner'
import { useUserInfoGet } from '@/src/lib/mongodb/user/hook'
import { AppStores } from '@/src/lib/zustand'
import { useRouter } from 'next/router'
import React from 'react'
import KycBottomSheets from '../kyc/self/ModalList'

export default function PersonalInfo() {
    const router = useRouter()
    const storeKyc = AppStores.useKyc()
    const accounts = useUserInfoGet()
    const noKyc = accounts.data?.first_name
    return (
        <>
            <KycBottomSheets />

            <div className="w-full p-2 border-b-1 mt-4 border-muted  rounded-lg flex flex-col items-start justify-center bg-card">

                <div className='flex justify-between items-center w-full'>
                    <Label>Personal</Label>


                    <div className='flex space-x-2 items-center'>
                        <p className='text-primary text-[11px] font-semibold underline' onClick={() => {
                            storeKyc.update({ modals: 'VERIFY_SELF_PROTOCOL' })
                        }} > SELF PROTOCOL</p>
                        <Label>|</Label>
                        <p className='text-primary text-[11px] font-semibold underline' onClick={() => {
                            void router.push("/kyc-form")
                        }} > MANUAL</p>
                    </div>

                    {/* {noKyc == undefined &&
                        <div className='flex space-x-2 items-center'>
                            <p className='text-primary text-[11px] font-semibold underline' onClick={() => {
                                storeKyc.update({ modals: 'VERIFY_SELF_PROTOCOL' })
                            }} > SELF PROTOCOL</p>
                            <Label>|</Label>
                            <p className='text-primary text-[11px] font-semibold underline' onClick={() => {
                                void router.push("/kyc-form")
                            }} > MANUAL</p>
                        </div>
                    } */}
                </div>
                <hr className='border-1 border-muted w-full mb-1' />

                <AccountInfo />
            </div>
        </>
    )
}

function AccountInfo() {
    const accounts = useUserInfoGet()

    if (accounts.isPending) {
        return <Spinner size={24} />
    }

    if (!accounts.data) {
        return (
            <div
                className='flex space-y-4 items-center justify-center w-full'>
                <Label>Kindly complete your KYC</Label>
                <div className='mb-5' />
            </div>

        )
    }

    const user = accounts.data;
    return (
        <div className='w-full space-y-1'>
            <AdsRow text="First Name" text2={user.first_name} />
            <AdsRow text="Last Name" text2={user.last_name} />
            {user.middle_name &&
                <AdsRow text="Middle Name" text2={user.middle_name} />}
            <AdsRow text="DOB" text2={user.dob} />
            <AdsRow text="NIN" text2={user.nin} />
            <AdsRow text="BVN" text2={user.bvn} />
            <AdsRow text="Phone" text2={user.phone} />
        </div>
    )
}