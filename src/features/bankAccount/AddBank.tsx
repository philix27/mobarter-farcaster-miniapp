import { AppSelect, } from '@/components/Select'
import { Input, } from '@/components/Input'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import { BANKS_LIST } from '@/src/lib/banks'
import { toast } from 'sonner'
import { useFetchAccountInfo } from './hook'
import { Card, Label } from '@/components/comps'

export default function AddBankAccount() {
  const [formData, setFormData] = useState<{ bankName: string; bankCode: string; accountNo: string; accountName: string } | undefined>(undefined)
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
        <AccountName account_number={formData!.accountNo} bank_code={formData!.bankCode!} />}
      <div className='flex justify-center items-center mt-5'>
        <Button className='w-[45%]' >Add</Button>
      </div>
    </div>
  )
}



function AccountName(props: { account_number: string; bank_code: string }) {
  const c = useFetchAccountInfo({ ...props })

  if (!c.data) return null

  return (<div>
    <Label>Account name</Label>
    <Card>{c.data.account_name} </Card>
  </div>)
}