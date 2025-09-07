import { AppSelect, } from '@/components/Select'
import { Input, } from '@/components/Input'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import { BANKS_LIST } from '@/src/lib/banks'
import { toast } from 'sonner'
import { useFetchAccountInfo } from './hook'
import { Card, Label } from '@/components/comps'
import { useBankAccountCreate } from '@/src/lib/mongodb/bank/hook'
import { useFarcasterProfile } from '../profile/hook'

const require = (val: any, msg: string) => {
  if (!val) {
    throw new Error(msg)
  }
}

type IAccountFormData = { bankName: string; bankCode: string; accountNo: string; accountName: string }
export default function AddBankAccount(props: { onClose: VoidFunction }) {
  const [formData, setFormData] = useState<IAccountFormData | undefined>(undefined)
  const addAccount = useBankAccountCreate()
  const profile = useFarcasterProfile()

  const onAdd = async () => {
    try {
      try {
        require(formData?.accountNo, "Account no needed")
        require(formData?.accountName, "No account name found")
        addAccount.mutate({
          // "user_id": "854428",
          "user_id": profile.data!.user.fid.toString(),
          "account_name": formData!.accountName,
          "account_no": formData!.accountNo,
          "bank_name": formData!.bankName,
          bank_code: formData!.bankCode,
        })
      } catch (e: any) {
        toast.error("Err: " + e.message)
        return
      }
    } catch (e: any) {
      toast.error("Err: " + e.message)

    } finally {
      props.onClose()
    }
  }
  return (
    <div className='h-[45vh] space-y-5'>
      <AppSelect
        label="Bank*"
        onChange={(data) => {
          setFormData({ ...formData!, bankCode: data })
        }}
        data={BANKS_LIST.map((val, i) => {
          return {
            value: val.code,
            label: (
              <div key={i} className='flex items-center'>
                <p className='text-[12px]'>{val.name} </p>
              </div>
            )
          }
        })}
      />
      <Input
        label={`Account no*`}
        placeholder={`0123456789`}
        value={formData?.accountNo}
        type="number"
        onChange={(e) => {
          const num = e.target.value
          if (num.length > 10) {
            toast.error('10 characters max')
            return
          }
          setFormData({ ...formData!, accountNo: num })
        }}

      />

      {formData && formData!.accountNo && formData!.accountNo.length === 10 && formData!.bankCode &&
        <AccountName account_number={formData!.accountNo} bank_code={formData!.bankCode!} setFormData={setFormData} formData={formData} />}

      <div className='flex justify-center items-center mt-5'>
        <Button className='w-[45%]' onClick={onAdd} isLoading={addAccount.isPending} >Add</Button>
      </div>
    </div>
  )
}



function AccountName(props: {
  account_number: string;
  bank_code: string;
  formData: IAccountFormData
  setFormData: React.Dispatch<React.SetStateAction<IAccountFormData | undefined>>
}) {
  const c = useFetchAccountInfo({ ...props }, (name) => {
    props.setFormData({ ...props.formData!, accountName: name })
  })


  if (!c.data) return null

  return (<div>
    <Label>Account name</Label>
    <Card>{c.data.account_name} </Card>
    {/* <Card>{props.formData.accountName} </Card> */}
  </div>)
}