import { AppStores } from "@/src/lib/zustand";
import { AirtimeSection } from "src/features/topup/TopUpAirtime";
import TopUpDataPlan from "src/features/topup/TopUpData";
import TopUpDataBundle from "src/features/topup/TopUpDataBundle";
import PhoneInput from "src/features/topup/PhoneInput";
import { ITab, Tabs } from "@/components/Tabs";

export function TopUpSection() {
    const store = AppStores.useSettings();
    const tabItems: ITab[] = [
        {
            title: "Airtime",
            name: 'TopUp',
            isActive: store.topUpTab === "Airtime",
            onClick: () => {
                store.update({ topUpTab: "Airtime" });
            }
        },
        {
            title: "Bundle",
            name: "DataBundle",
            isActive: store.topUpTab === "DataBundle",
            onClick: () => {
                store.update({ topUpTab: "DataBundle" });
            }
        },
        {
            title: "Plan",
            name: "DataPlan",
            isActive: store.topUpTab === "DataPlan",
            onClick: () => {
                store.update({ topUpTab: "DataPlan" });
            }
        },
    ]

    return (<>
        <PhoneInput />
        <div className="w-full py-1 bg-card rounded-lg mb-3">
            <Tabs tabs={tabItems} />
            <div className="px-3 py-2">
                {store.topUpTab === "Airtime" && <AirtimeSection />}
                {store.topUpTab === "DataBundle" && <TopUpDataPlan />}
                {store.topUpTab === "DataPlan" && <TopUpDataBundle />}
            </div>
        </div>
    </>)
}

