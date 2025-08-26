import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { AppStores } from "../lib/zustand";
import { cn } from "../lib/utils";
import { IHomeTab } from "../lib/zustand/settings";
import { AirtimeSection } from "../features/topup/TopUpAirtime";

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
      title: "Top Up",
      href: "/topup/airtime",
      name: 'TopUp',
      onClick: () => {
        settingsStore.update({ homeTab: 'TopUp' });
      }
    },
    {
      title: "Data Bundle",
      name: "DataBundle",
      href: "/topup/data-bundle", onClick: () => {
        settingsStore.update({ homeTab: "DataBundle" });
      }
    },
    {
      title: "Data Plan",
      name: "DataPlan",
      href: "/topup/data-plan", onClick: () => {
        settingsStore.update({ homeTab: "DataPlan" });
      }
    },
    // {
    //   title: "TV",
    //   name: "TV",
    //   href: "/tv", onClick: () => {
    //     settingsStore.update({ homeTab: "TV" });
    //   }
    // },
    // {
    //   title: "Electricity", name: "Electricity",
    //   href: "/electricity", onClick: () => {
    //     settingsStore.update({ homeTab: "Electricity" });
    //   }
    // },
    // {
    //   name: "Betting",
    //   title: "Betting",
    //   href: "/betting", onClick: () => {
    //     settingsStore.update({ homeTab: "Betting" });
    //   }
    // },
  ]
  return (
    <div className="w-full h-screen flex flex-col gap-4 bg-background">
      <ProfileCard />
      <Tabs tabs={dashboardItems} />

      <div className="bg-card mx-auto rounded-lg px-2 py-4 w-[90%]">
        {settingsStore.homeTab === "TopUp" && <AirtimeSection />}
      </div>
    </div>
  )
}



function Tabs({ tabs }: { tabs: ITab[] }) {
  const settingsStore = AppStores.useSettings();
  return (
    <div className="w-full flex items-center justify-between border-b-1 bg-card px-4"
    >
      {tabs.map((item, i) => {
        const isActive = settingsStore.homeTab === item.name;
        return (
          <div key={i}
            onClick={item.onClick}
            className={cn("p-2 border-b-2",
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
  const { setFrameReady, isFrameReady, } = useMiniKit();
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
