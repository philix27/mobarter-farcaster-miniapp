import React from 'react'

import KycBottomSheets from './ModalList'
import { AppStores } from '@/src/lib/zustand'
import { TileSimple } from '@/components/TileSimple'

export default function KycSelf() {
  const storeKyc = AppStores.useKyc()
  
  return (
    <>
      <TileSimple
        title={'Self Protocol'}
        desc="Scan this QR code with the Self app to verify your identity"
        onClick={() => {
          storeKyc.update({ modals: 'VERIFY_SELF_PROTOCOL' })
        }}
      />
      <KycBottomSheets />

    </>
  )
}
