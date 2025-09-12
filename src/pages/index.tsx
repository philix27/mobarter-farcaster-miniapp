import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { AppStores } from "../lib/zustand";
// import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";
import { TopUpSection } from "src/features/topup/TopUpSection";
import { ITab, Tabs } from "@/components/Tabs";
import { ProfileCard } from "../features/profile";
import OrderSection from "../features/orders/orders";
import { Label } from "@/components/comps";
import { useFarcasterProfile } from "../features/profile/hook";
import KycSelf from "../features/kyc/self";


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
      title: "TOPUP",
      isActive: settingsStore.homeTab === 'TopUp',
      onClick: () => {
        settingsStore.update({ homeTab: 'TopUp' });
      }
    },
    {
      title: "EXCHANGE",
      isActive: settingsStore.homeTab === "ORDERS",
      onClick: () => {
        settingsStore.update({ homeTab: "ORDERS" });
      }
    },
    {
      title: "SETTINGS",
      isActive: settingsStore.homeTab === "Profile",
      onClick: () => {
        settingsStore.update({ homeTab: "Profile" });
      }
    },
    // {
    //   title: "REWARDS",
    //   isActive: settingsStore.homeTab === "REWARDS",
    //   onClick: () => {
    //     settingsStore.update({ homeTab: "REWARDS" });
    //   }
    // },
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
      <div className="w-full h-screen flex flex-col overflow-y-scroll h-screen">

        <div className="py-2 px-4 flex items-center justify-between">
          <div className="h-[35px] flex items-center">
            <img src="/icon.png" className="h-[35px] mr-2" />
            <Greetings />
          </div>
          <Label>COUNTRIES: NG </Label>
        </div>
        {settingsStore.homeTab === "ORDERS" &&
          <div className="h-[100px]">
            <img src="/fast.png" className="h-full" />

          </div>}
        {settingsStore.homeTab === "TopUp" &&
          <div className="h-[100px]">
            <img src="/bgx.png" className="h-full" />
          </div>}

        <Tabs tabs={dashboardItems} />

        <div className="mx-auto rounded-lg px-3 w-full mt-4">
          {settingsStore.homeTab === "TopUp" && <TopUpSection />}
          {settingsStore.homeTab === "Profile" && <ProfileCard />}
          {settingsStore.homeTab === "ORDERS" && <OrderSection />}
          {settingsStore.homeTab === "REWARDS" && <KycSelf />}
          {/* {settingsStore.homeTab === "REWARDS" && <RewardsSection />} */}
          {/* {settingsStore.homeTab === "Electricity" && <ComingSoon />} */}
          {/* {settingsStore.homeTab === "Betting" && <ComingSoon />} */}
        </div>
      </div>
    </>
  )
}





function Greetings() {
  const profile = useFarcasterProfile()
  return <p className="font-bold text-[15px]">Hi {` ${profile.data?.user.displayName || ""}`},</p>
}