import React from 'react'

import SelfVerification from './comps/Self'
import VerifyPhone from './comps/VerifyPhone'
import { BottomModal } from '@/components/BottomModal'
import { AppStores } from '@/src/lib/zustand'

export default function KycBottomSheets() {
  const store = AppStores.useKyc()
  const active = store.modals
  return (
    <>
      <BottomModal
        fullHeight
        showSheet={active === 'VERIFY_SELF_PROTOCOL'}
        onClose={() => {
          store.update({ modals: 'NONE' })
        }}
      >
        <SelfVerification />
      </BottomModal>
      <BottomModal
        fullHeight
        showSheet={active === 'VERIFY_PHONE'}
        onClose={() => {
          store.update({ modals: 'NONE' })
        }}
      >
        <VerifyPhone />
      </BottomModal>


    </>
  )
}
