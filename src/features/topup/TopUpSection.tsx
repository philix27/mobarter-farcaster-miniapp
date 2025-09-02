// import { AirtimeSection } from "src/features/topup/TopUpAirtime";
// import TopUpDataPlan from "src/features/topup/TopUpData";
import PhoneInput from "src/features/topup/PhoneInput";
// import { ITab, Tabs } from "@/components/Tabs";
// import { useTopUpForm } from "./_store";

export function TopUpSection() {
    // const store = useTopUpForm();
    // const tabItems: ITab[] = [
    //     {
    //         title: "Airtime",
    //         name: 'TopUp',
    //         isActive: store.topUpTab === "Airtime",
    //         onClick: () => {
    //             store.update({ topUpTab: "Airtime" });
    //         }
    //     },
    //     {
    //         title: "Bundle",
    //         name: "DataBundle",
    //         isActive: store.topUpTab === "DataBundle",
    //         onClick: () => {
    //             store.update({ topUpTab: "DataBundle" });
    //         }
    //     },

    // ]

    return (<>
        <PhoneInput />
        {/* <div className="w-full py-1 bg-card rounded-lg mb-3">
            <Tabs tabs={tabItems} />
            <div className="px-2 py-2">
                {store.topUpTab === "Airtime" && <AirtimeSection />}
                {store.topUpTab === "DataBundle" && <TopUpDataPlan />}
            </div>
        </div> */}
    </>)
}

