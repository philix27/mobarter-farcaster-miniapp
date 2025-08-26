// import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { AppStores } from "../lib/zustand";
import { cn } from "../lib/utils";
import { IHomeTab } from "../lib/zustand/settings";
import { AirtimeSection } from "../features/topup/TopUpAirtime";
import TopUpDataPlan from "../features/topup/TopUpData";
import TopUpDataBundle from "../features/topup/TopUpDataBundle";
import ComingSoon from "@/components/ComingSoon";
import Head from "next/head";

type ITab = {
  title: string;
  name: IHomeTab;
  href: string;
  onClick: VoidFunction;
}

export default function HomePage() {
  const settingsStore = AppStores.useSettings();


  const dashboardItems: ITab[] = [
    {
      title: "Airtime",
      href: "/topup/airtime",
      name: 'TopUp',
      onClick: () => {
        settingsStore.update({ homeTab: 'TopUp' });
      }
    },
    {
      title: "D. Bundle",
      name: "DataBundle",
      href: "/topup/data-bundle", onClick: () => {
        settingsStore.update({ homeTab: "DataBundle" });
      }
    },
    {
      title: "D. Plan",
      name: "DataPlan",
      href: "/topup/data-plan", onClick: () => {
        settingsStore.update({ homeTab: "DataPlan" });
      }
    },
    {
      title: "TV",
      name: "TV",
      href: "/tv", onClick: () => {
        settingsStore.update({ homeTab: "TV" });
      }
    },
    {
      title: "Electric", name: "Electricity",
      href: "/electricity", onClick: () => {
        settingsStore.update({ homeTab: "Electricity" });
      }
    },
    {
      title: "Bet",
      name: "Betting",
      href: "/betting", onClick: () => {
        settingsStore.update({ homeTab: "Betting" });
      }
    },
  ]

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

        <div className="bg-card mx-auto rounded-lg px-2 py-4 w-[90%]">
          {settingsStore.homeTab === "TopUp" && <AirtimeSection />}
          {settingsStore.homeTab === "DataBundle" && <TopUpDataPlan />}
          {settingsStore.homeTab === "DataPlan" && <TopUpDataBundle />}
          {settingsStore.homeTab === "TV" && <ComingSoon />}
          {settingsStore.homeTab === "Electricity" && <ComingSoon />}
          {settingsStore.homeTab === "Betting" && <ComingSoon />}
        </div>
      </div>
    </>
  )
}

// function ComingSoon() {}



function Tabs({ tabs }: { tabs: ITab[] }) {
  const settingsStore = AppStores.useSettings();
  return (
    <div className="w-full flex items-center justify-between border-b-1 bg-card"
    >
      {tabs.map((item, i) => {
        const isActive = settingsStore.homeTab === item.name;
        return (
          <div key={i}
            onClick={item.onClick}
            className={cn("p-2 border-b-2 px-4",
              isActive ? "border-primary-500 text-primary" : "border-card")}
          >
            <p className={cn("text-[11px] font-semibold")} >{item.title}</p>
          </div>
        )
      }
      )}
    </div>
  )
}


export function ProfileCard() {
  // const { setFrameReady, isFrameReady, } = useMiniKit();
  return (
    <div className="w-full border-b-1 bg-background border-muted flex flex-col justify-center p-4 "
    >
      <p className="text-[12px]">@name</p>
      <p className="text-[12px]">@userName</p>
      <p className="text-[12px]">Avatar</p>
      <p className="text-[12px]">Select country</p>
    </div>
  )
}
