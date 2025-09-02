import { BottomModal } from '@/components/BottomModal'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import AddBankAccount from './AddBank';

export default function BankAccount() {
  const [showAddAccount, setShowAddAccount] = useState(false)
  return (
    <div className='bg-card rounded-lg mt-4 px-2 py-2'>
      <p>List</p>
      <div className='flex items-center justify-center'>
        <Button onClick={() => {
          setShowAddAccount(true)
        }}>Add new account</Button>
      </div>
      <BottomModal showSheet={showAddAccount}
        onClose={() => {
          setShowAddAccount(false)
        }}>
        <AddBankAccount />
      </BottomModal>
    </div>
  )
}
