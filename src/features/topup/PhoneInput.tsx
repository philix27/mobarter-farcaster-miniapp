import { Input } from '@/components/Input'
import { mapCountryToIso, countryCode } from '@/src/lib'
import { pasteTextFromClipboard } from '@/src/lib/utils'
import { AppStores } from '@/src/lib/zustand'
import React, { useState } from 'react'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'sonner'

export default function PhoneInput() {
    const store = AppStores.useSettings()
    const [phoneNo, setPhoneNo] = useState<string>('')

    return (
        <div className='w-full bg-card rounded-lg mb-3 px-3 py-4'>
            <Input
                label={`Phone NO. (${mapCountryToIso[store.countryIso]})*`}
                placeholder={`8101234567`}
                preText={countryCode(store.countryIso)}
                value={phoneNo}
                type="number"
                onChange={(e) => {
                    const num = e.target.value
                    if (num.length > 11) {
                        toast.error('11 characters max')
                        return
                    }
                    setPhoneNo(num.toString())
                }}
                trailingIcon={
                    <FaCopy
                        className="text-muted"
                        onClick={async () => {
                            const text = await pasteTextFromClipboard()
                            setPhoneNo(text)
                        }}
                    />
                }
            />
        </div>
    )
}
