"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { IconType } from 'react-icons';
import { PiTelevisionThin } from "react-icons/pi";
import { PiGameController } from "react-icons/pi";
import { MdElectricalServices } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { TbMobiledata } from "react-icons/tb";
import { MdOutlinePermDataSetting } from "react-icons/md";

import { useEffect, } from "react";
import { cn } from "../lib/utils";
import AppLayout from "./components/Layout";

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
        href: "/airtime"
      },
      {
        title: "Data Bundle",
        icon: TbMobiledata,
        color: "#0CB906FF",
        href: "/data-bundle"
      },
      {
        title: "Data Plan",
        icon: MdOutlinePermDataSetting,
        color: "#9CBE04FF",
        href: "/data-plan"
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
      <div className="w-full max-w-md mx-auto px-4 py-3 grid grid-cols-2    "
        style={{ columnGap: 20, rowGap: 20 }}>
        {dashboardItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <a key={i} href={item.href}
              className={cn("p-3 flex flex-col items-center rounded-[10px] bg-primary")}
              style={{backgroundColor: "#29678BFF"}}
             >
              <Icon size={25} className="text-white mb-4 bg-secondary" />
              <p className="text-[14px] text-white">{item.title}</p>
            </a>
          )
        }
        )}
      </div>
    </AppLayout>
  );
}
