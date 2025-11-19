import { BottomModal } from '@/components/BottomModal'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import AddBankAccount from './AddBank';
import { useBankAccountGetAll } from '@/src/lib/mongodb/bank/hook';
import { Spinner } from '@/components/Spinner';
import { AdsRow, Card, Label } from '@/components/comps';

  
export default function BankAccounts() {
  const [showAddAccount, setShowAddAccount] = useState(false)

  return (
    <div className='w-full'>
      <div className='bg-card rounded-lg mt-4 px-2 py-2'>
        <div className='flex justify-between items-center mb-2'>
          <Label>Bank Accounts</Label>
          {/* <div className='p-1 bg-background flex justify-center items-center rounded-full'
            onClick={() => {
              setShowAddAccount(true)
            }}>
            <MdAddCircle size={16} className='text-primary' />
          </div> */}
        </div>
        {/* <hr className='border-1 border-muted w-full mb-1' /> */}
        <AccountList setShowAddAccount={setShowAddAccount} />

        <BottomModal showSheet={showAddAccount}
          onClose={() => {
            setShowAddAccount(false)
          }}>
          <AddBankAccount onClose={() => {
            setShowAddAccount(false)
          }} />
        </BottomModal>
      </div>
      <Button btnName='add-bank-account'
        onClick={() => {
          setShowAddAccount(true)
        }}
      >Add Bank Account</Button>
    </div>
  )
}

function AccountList(props: { setShowAddAccount: React.Dispatch<React.SetStateAction<boolean>> }) {
  const accounts = useBankAccountGetAll()

  if (accounts.isPending) {
    return <Spinner size={24} />
  }

  if (!accounts.data || accounts.data?.length === 0) {
    return <div className='flex space-y-4 items-center justify-center flex-col'>
      <Label>No bank account</Label>
      <Button
        btnName='Add new bank account'
        onClick={() => {
          props.setShowAddAccount(true)
        }}>Add new account</Button>
      <div className='mb-5' />
    </div>

  }

  return <div className='w-full space-y-1'>
    {accounts.data?.map((bank, i) => (
      <Card key={i} className='bg-background rounded-lg'>
        <AdsRow text={bank.account_name} text2={`${bank.bank_name} | ${bank.account_no}`} />
      </Card>
    ))}
  </div>
}