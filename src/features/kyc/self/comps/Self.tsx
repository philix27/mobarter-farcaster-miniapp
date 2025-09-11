import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode'
import { toast } from 'sonner'
import { logoBase64ToString } from './logoBase64'
import { useFarcasterProfile } from '@/src/features/profile/hook'
import { getUniversalLink, SelfApp } from '@selfxyz/core'
import { ITab, Tabs } from '@/components/Tabs'
import { useState } from 'react'
import { secrets } from '@/src/lib'
import { logger } from '@/src/lib/utils'
import { numberToDeterministicHex } from './userToUid'

const rootUrl = secrets.NODE_ENV === "development" ? "http://localhost:3233/" : process.env.NEXT_PUBLIC_ROOT_URL
export default function SelfVerification() {
  const profile = useFarcasterProfile()
  const userId = profile.data?.user.fid
  const [openOrScan, setOpenOrScan] = useState<"OPEN_APP" | "SCAN">("SCAN")
  if (!userId) return null

  // Create the SelfApp configuration
  const selfApp = new SelfAppBuilder({
    appName: 'Mobarter',
    scope: 'mini-app',
    endpoint: `${rootUrl}/api/auth-self`,
    // endpointType: "https",
    "userIdType": "hex",
    // userId: userId.toString(),
    userId: numberToDeterministicHex(userId),
    header: 'A payment solution for Africans',
    logoBase64: logoBase64ToString,
    // userId: evmAddress,
  }).build()
  let deeplink = ""
  try {
    deeplink = getUniversalLink(selfApp);
  } catch (e) {
    logger.error(e)
  }
  const tabItems: ITab[] = [
    {
      title: "SCAN QR CODE",
      isActive: openOrScan === "SCAN",
      onClick: () => {
        setOpenOrScan("SCAN")
      }
    },
    {
      title: "OPEN APP",
      isActive: openOrScan === "OPEN_APP",
      onClick: () => {
        setOpenOrScan("OPEN_APP")
      }
    },

  ]

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Tabs tabs={tabItems} />
      {openOrScan === "OPEN_APP" ? <SelfDeepLink deeplink={deeplink} /> : <SelfQRCode selfApp={selfApp} />}
    </div>
  )
}


function SelfQRCode(props: { selfApp: SelfApp }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center text-center w-[85%]">
        <h1 className="font-semibold text-xl mb-3">Verify Your Identity</h1>
        <p className="font-light text-sm">Open the Self App and scan the QR code</p>
      </div>

      <div className="mt-4 mb-5">
        <SelfQRcodeWrapper
          selfApp={props.selfApp}
          onSuccess={() => {
            toast.success('Verification Successful')
          }}
          size={350}
        />
      </div>
    </div>
  )
}

function SelfDeepLink(props: { deeplink: string; }) {

  return (
    <div className="h-[400px] w-full flex items-center justify-center flex-col">
      {/* <a target='_blank' href={props.deeplink} */}
      <a href={props.deeplink}
        className='bg-primary rounded-lg my-2 border-none outline-none hover:bg-primary/50 bg-primary px-8 py-[8px]'
      >
        <p className='text-[12px] font-semibold text-[#fff]'>Open Self App</p>
      </a>
    </div>
  )
}