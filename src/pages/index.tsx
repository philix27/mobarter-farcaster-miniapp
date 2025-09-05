import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { AppStores } from "../lib/zustand";
// import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";
import { TopUpSection } from "src/features/topup/TopUpSection";
import { ITab, Tabs } from "@/components/Tabs";
import { ProfileCard } from "../features/profile";
import OrderSection from "../features/order-sell/orders";


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
      title: "Buy/Sell",
      name: "Orders",
      isActive: settingsStore.homeTab === "Orders",
      onClick: () => {
        settingsStore.update({ homeTab: "Orders" });
      }
    },
    {
      title: "Profile", name: "Profile",
      isActive: settingsStore.homeTab === "Profile",
      onClick: () => {
        settingsStore.update({ homeTab: "Profile" });
      }
    },
    // {
    //   title: "Betting",
    //   name: "Betting",
    //   isActive: settingsStore.homeTab === "Betting",
    //   onClick: () => {
    //     settingsStore.update({ homeTab: "Betting" });
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
      <div className="w-full h-screen flex flex-col bg-background">

        <Tabs tabs={dashboardItems} />

        <div className="mx-auto rounded-lg px-3 w-full mt-4">
          {settingsStore.homeTab === "TopUp" && <TopUpSection />}
          {settingsStore.homeTab === "Profile" && <ProfileCard />}
          {settingsStore.homeTab === "Orders" && <OrderSection />}
          {/* {settingsStore.homeTab === "Electricity" && <ComingSoon />} */}
          {/* {settingsStore.homeTab === "Betting" && <ComingSoon />} */}
        </div>
      </div>
    </>
  )
}





