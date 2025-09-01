import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { AppStores } from "../lib/zustand";
import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";
import { Spinner } from "@/components/Spinner";
import { useCallback, useEffect } from "react";
import { TopUpSection } from "src/features/topup/TopUpSection";
import { ITab, Tabs } from "@/components/Tabs";
import { useAccount, useConnect } from "wagmi";
import { shortenAddress } from "../lib/config";
import { Button } from "@/components/Button";
import { celo } from "viem/chains";


const metadata = {
  title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  description: "Mobarter Mini App",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      button: {
        title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          url: URL,
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
          splashBackgroundColor:
            process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
        },
      },
    }),
  },
}

export default function HomePage() {
  const settingsStore = AppStores.useSettings();
  const { isFrameReady, setFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      void setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);


  const dashboardItems: ITab[] = [
    {
      title: "TopUp",
      name: 'TopUp',
      isActive: settingsStore.homeTab === 'TopUp',
      onClick: () => {
        settingsStore.update({ homeTab: 'TopUp' });
      }
    },
    {
      title: "TV",
      name: "TV",
      isActive: settingsStore.homeTab === "TV",
      onClick: () => {
        settingsStore.update({ homeTab: "TV" });
      }
    },
    {
      title: "Electricity", name: "Electricity",
      isActive: settingsStore.homeTab === "Electricity",
      onClick: () => {
        settingsStore.update({ homeTab: "Electricity" });
      }
    },
    {
      title: "Betting",
      name: "Betting",
      isActive: settingsStore.homeTab === "Betting",
      onClick: () => {
        settingsStore.update({ homeTab: "Betting" });
      }
    },
  ]


  if (!isFrameReady) {
    return <Spinner />
  }
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="other" content={metadata.other["fc:frame"]} />
        <meta name="fc:frame" content={metadata.other["fc:frame"]} />

        {/* Dynamic Open Graph tags based on post data */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
      </Head>
      <div className="w-full h-screen flex flex-col gap-4 bg-background">
        <ProfileCard />
        <Tabs tabs={dashboardItems} />

        <div className="mx-auto rounded-lg px-3 w-full">
          {settingsStore.homeTab === "TopUp" && <TopUpSection />}
          {settingsStore.homeTab === "TV" && <ComingSoon />}
          {settingsStore.homeTab === "Electricity" && <ComingSoon />}
          {settingsStore.homeTab === "Betting" && <ComingSoon />}
        </div>
      </div>
    </>
  )
}




export function ProfileCard() {
  // const { setFrameReady, isFrameReady, } = useMiniKit();
  const { address, isConnected, } = useAccount()
  const { connect, connectors } = useConnect()

  const handleConnect = useCallback(() => {
    const connector = connectors.find((c) => c.id === "miniAppConnector") || connectors[0];
    connect({ connector, chainId: celo.id });
  }, [connect, connectors]);

  useEffect(() => {
    if (!isConnected) {
      handleConnect()
    }
  }, [handleConnect, isConnected]);



  if (!isConnected) {
    return <div className="w-full border-b-1 bg-background border-muted flex flex-col items-center justify-center p-4 "
    >

      <Button onClick={handleConnect} className="w-[60%]">Connect</Button>
    </div>
  }
  return (
    <div className="w-full border-b-1 bg-background border-muted flex flex-col justify-center p-4 "
    >
      {address && <p className="text-[12px]"> {shortenAddress(address as string)}</p>}
      <p className="text-[12px]">@userName</p>
      <p className="text-[12px]">Avatar</p>
      <p className="text-[12px]">Select country</p>
    </div>
  )
}

