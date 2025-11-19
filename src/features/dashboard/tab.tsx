
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ReactNode } from "react";

export function TabsDemo(props: { defaultValue: string; list: { heading: string; value: string; content: ReactNode }[] }) {
    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={props.defaultValue} className="w-full">
                <div className="w-full flex items-center justify-center">
                    <TabsList clasName="w-full rounded-sm bg-background">
                    {props.list.map((tab, index) => (
                        <TabsTrigger key={index} value={tab.value}>{tab.heading}</TabsTrigger>
                    ))}

                </TabsList>
                </div>
                {props.list.map((tab, index) => (
                    <TabsContent key={index} value={tab.value}>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
