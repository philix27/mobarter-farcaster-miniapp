"use client"

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { IconType } from 'react-icons';
import { PiGameController, PiTelevisionThin } from "react-icons/pi";
import { MdElectricalServices } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { useEffect, } from "react";
import { cn } from "../lib/utils/utils";
import AppLayout from "../components/Layout";
import ProfileCard from "./home/ProfileCard";
import { AppStores } from "@/lib/zustand";
import { IHomeTab } from "@/lib/zustand/settings";

export default function App() {
  const { setFrameReady, isFrameReady, } = useMiniKit();
  const settingsStore = AppStores.useSettings();


  const dashboardItems: {
    title: string;
    name: IHomeTab;
    icon: IconType;
    href: string;
    onClick: VoidFunction;
  }[] = [
      {
        title: "Top Up",
        icon: CiPhone,
        href: "/topup/airtime",
        name: 'TopUp',
        onClick: () => {
          settingsStore.update({ homeTab: 'TopUp' });
        }
      },
      // {
      //   title: "Data Bundle",
      //   icon: TbMobiledata,
      //   color: "#0CB906FF",
      //   href: "/topup/data-bundle"
      // },
      // {
      //   title: "Data Plan",
      //   icon: MdOutlinePermDataSetting,
      //   color: "#9CBE04FF",
      //   href: "/topup/data-plan"
      // },
      {
        title: "TV",
        name: "TV",
        icon: PiTelevisionThin,
        href: "/tv", onClick: () => {
          settingsStore.update({ homeTab: "TV" });
        }
      },
      {
        title: "Electricity", name: "Electricity",
        icon: MdElectricalServices,
        href: "/electricity", onClick: () => {
          settingsStore.update({ homeTab: "Electricity" });
        }
      },
      {
        icon: PiGameController, name: "Betting",
        title: "Betting",
        href: "/betting", onClick: () => {
          settingsStore.update({ homeTab: "Betting" });
        }
      },
    ]

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);


  return (
    <AppLayout title="Home" hideBack>
      <ProfileCard />
      {/* <div className="w-full max-w-md mx-auto px-4 py-3 grid grid-cols-2" */}
      <div className="w-full max-w-md mx-auto py-3 flex items-center justify-between flex-wrap"
      >
        {dashboardItems.map((item, i) => {
          const isActive = settingsStore.homeTab === item.name;
          return (
            <div key={i}
              onClick={item.onClick}
              className={cn("p-2 bg-card",
                isActive ? "border-b-2 border-primary text-primary" : "border-b-2 border-background")}
            >
              <p className={cn("text-[11px] font-normal")} >{item.title}</p>
            </div>
          )
        }
        )}
      </div>
      
    </AppLayout>
  );
}



//  <div className="w-full max-w-md mx-auto px-4 py-3 flex"
//         style={{ columnGap: 50, rowGap: 20 }}>
//         {dashboardItems.map((item, i) => {
//           const Icon = item.icon;
//           return (
//             <a key={i} href={item.href}
//               className={cn("p-2 flex flex-col items-center rounded-[10px] bg-primary")}
//               style={{ backgroundColor: styles.primaryColor, color: styles.bgColor }}
//             >
//               <Icon size={25} className="mb-4" />
//               <p className="text-[13px] font-normal" >{item.title}</p>
//             </a>
//           )
//         }
//         )}

//       </div>