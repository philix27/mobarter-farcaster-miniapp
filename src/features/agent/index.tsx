import { ITab, Tabs } from "@/components/Tabs";
import { useAgentSettings } from "./_store";

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

        Agents Section
    </div>
}