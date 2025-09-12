import { AppSelect, } from '@/components/Select'
import { Input, } from '@/components/Input'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import { BANKS_LIST } from '@/src/lib/banks'
import { toast } from 'sonner'
import { useFetchAccountInfo } from './hook'
import { Card, Label } from '@/components/comps'
import { useBankAccountCreate } from '@/src/lib/mongodb/bank/hook'


type IAccountFormData = { bankName: string; bankCode: string; accountNo: string; accountName: string }
export default function AddBankAccount(props: { onClose: VoidFunction }) {
  const [formData, setFormData] = useState<IAccountFormData | undefined>(undefined)
  const addAccount = useBankAccountCreate()

  const onAdd = async () => {
    if (!formData!.bankName) { toast.error("Account name is needed"); return }
    if (!formData!.accountName) { toast.error("Account name is needed"); return }
    if (!formData!.accountNo) { toast.error("Account name is needed"); return };

    addAccount.mutate({
      "account_name": formData!.accountName,
      "account_no": formData!.accountNo,
      "bank_name": formData!.bankName,
      bank_code: formData!.bankCode,
    }, {
      onSuccess: () => {
        toast.success("Account added")
      },
      onError: (e) => {
        toast.error("Err: " + e.message)
      },
      onSettled: () => {
        props.onClose()
      }
    })


  }
  return (
    <div className='h-[45vh] space-y-5'>
      <AppSelect
        label="Bank*"
        onChange={(data) => {
          setFormData({ ...formData!, bankCode: data, bankName: BANKS_LIST.filter((item) => item.code === data)[0].name })
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
        {/* <Button className='w-[45%]' onClick={onAdd}  >Add</Button> */}
        <Button btnName='Submit New Bank account' className='w-[45%]' onClick={onAdd} isLoading={addAccount.isPending} >Add</Button>
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