import { Input } from '@/components/Input'
import { mapCountryToIso, countryCode } from '@/src/lib'
import { pasteTextFromClipboard } from '@/src/lib/utils'
import { AppStores } from '@/src/lib/zustand'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useTopUpForm } from './hook'

export default function PhoneInput() {
    const store = AppStores.useSettings()
    const topUp = useTopUpForm();
    return (
        <div className='w-full bg-card rounded-lg mb-3 px-3 py-4'>
            <Input
                label={`Phone no. (${mapCountryToIso[store.countryIso]})*`}
                placeholder={`8101234567`}
                preText={countryCode(store.countryIso)}
                value={topUp.phoneNo}
                type="number"
                onChange={(e) => {
                    const num = e.target.value
                    if (num.length >= 11) {
                        toast.error('11 characters max')
                        return
                    }
                    topUp.update({ phoneNo: num })
                }}
                trailingIcon={
                    <FaCopy
                        className="text-muted"
                        onClick={async () => {
                            const text = await pasteTextFromClipboard()

                            topUp.update({ phoneNo: text.substring(0, 10) })
                        }}
                    />
                }
            />
        </div>
    )
}
