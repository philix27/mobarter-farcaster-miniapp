import { ITab, Tabs } from "@/components/Tabs";
import { useAgentSettings } from "./_store";
import { useGetOrdersForAgent } from "@/src/lib/mongodb/orders/hook";

export function AgentsSection() {
    const settingsStore = useAgentSettings();

    const dashboardItems: ITab[] = [
        {
            title: "ALL",
            isActive: settingsStore.tabs === "ALL",
            onClick: () => {
                settingsStore.update({ tabs: 'ALL' });
            }
        },
        {
            title: "PENDING",
            isActive: settingsStore.tabs === "PENDING",
            onClick: () => {
                settingsStore.update({ tabs: "PENDING" });
            }
        },
        {
            title: "COMPLETED",
            isActive: settingsStore.tabs === "COMPLETED",
            onClick: () => {
                settingsStore.update({ tabs: "COMPLETED" });
            }
        },

    ]


    return <div>
        <Tabs tabs={dashboardItems} />
        - Display Orders
        - Use Tab
        - Pending
        - Completed
        <DisplayOrders />
        Agents Section
    </div>
}

function DisplayOrders() {
    const { isPending, data } = useGetOrdersForAgent()

    if (isPending) {
        return <div>Loading</div>
    }
    if (!data) {
        return <div>No data found</div>
    }
    return <div className="px-2">

        {data.map((order, i) => {
            return (
                <div key={i} className="bg-card mb-1 p-1 rounded-md">
                    <p>{order.account_name}</p>
                </div>
            )
        })}
    </div>
}