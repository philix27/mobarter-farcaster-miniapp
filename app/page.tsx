"use client"

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { IconType } from 'react-icons';
import { PiGameController, PiTelevisionThin } from "react-icons/pi";
import { MdElectricalServices } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { TbMobiledata } from "react-icons/tb";
import { MdOutlinePermDataSetting } from "react-icons/md";

import { useEffect, } from "react";
import { cn } from "../lib/utils/utils";
import AppLayout from "../components/Layout";
import { styles } from "./styles/style";

export default function App() {
  const { setFrameReady, isFrameReady, } = useMiniKit();

  const dashboardItems: {
    title: string;
    subtitle?: string;
    icon: IconType;
    color: string;
    href: string;
  }[] = [
      {
        title: "Airtime",
        icon: CiPhone,
        color: "#000343",
        href: "/topup/airtime"
      },
      {
        title: "Data Bundle",
        icon: TbMobiledata,
        color: "#0CB906FF",
        href: "/topup/data-bundle"
      },
      {
        title: "Data Plan",
        icon: MdOutlinePermDataSetting,
        color: "#9CBE04FF",
        href: "/topup/data-plan"
      },
      {
        title: "TV",
        icon: PiTelevisionThin,
        color: "#DB15DBFF",
        href: "/tv"
      },
      {
        title: "Electricity",
        icon: MdElectricalServices,
        color: "#09A9D1FF",
        href: "/electricity"
      },
      {
        title: "Betting",
        icon: PiGameController,
        color: "#AD7F3AFF",
        href: "/betting"
      },
    ]

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);


  return (
    <AppLayout title="Home" hideBack>
      <div className="w-full max-w-md mx-auto px-4 py-3 grid grid-cols-2"
        style={{ columnGap: 50, rowGap: 20 }}>

        {dashboardItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <a key={i} href={item.href}
              className={cn("p-2 flex flex-col items-center rounded-[10px] bg-primary")}
              style={{ backgroundColor: styles.primaryColor, color: styles.bgColor }}
            >
              <Icon size={25} className="mb-4" />
              <p className="text-[13px] font-normal" >{item.title}</p>
            </a>
          )
        }
        )}

      </div>
    </AppLayout>
  );
}
