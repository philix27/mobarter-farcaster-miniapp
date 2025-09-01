import { Input } from '@/components/Input'
import { mapCountryToIso, countryCode } from '@/src/lib'
import { pasteTextFromClipboard } from '@/src/lib/utils'
import { AppStores } from '@/src/lib/zustand'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'sonner'
import { Operator, useTopUpForm } from './_store'
import { AppSelect } from '@/components/Select'
import { operatorsData } from './operatorData'

export default function PhoneInput() {
    const store = AppStores.useSettings()
    const topUp = useTopUpForm();
    const ops = operatorsData[AppStores.useSettings().countryIso].airtime;

    return (
        <div className='w-full bg-card rounded-lg mb-3 px-3  pb-3 pt-1 gap-y-4 flex flex-col'>
            <Input
                label={`Phone no. (${mapCountryToIso[store.countryIso]})*`}
                placeholder={`8101234567`}
                preText={"+" + countryCode(store.countryIso)}
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

            <AppSelect
                label="Network*"
                onChange={(data) => {
                    topUp.update({
                        operator: data as unknown as Operator,
                        operatorId: ops.filter((val) => val.name === data)[0]?.operatorId || 0,
                        operatorLogo: ops.filter((val) => val.name === data)[0]?.logo || ''
                    })
                }}
                data={ops.map((val, i) => {
                    return {
                        // label: val.name,
                        value: val.name,
                        label: (
                            <div key={i} className='flex items-center'>
                                <img src={val.logo} alt={val.name} className='w-4 h-4 inline mr-1' />
                                <p>{val.name} </p>
                            </div>
                        )
                    }
                })}
            />
        </div>
    )
}
