import { cn } from "@/src/lib/utils";

export type ITab = {
    title: string;
    isActive: boolean;
    name: string
    onClick: VoidFunction;
}

export function Tabs({ tabs }: { tabs: ITab[]; }) {
    return (
        <div className="w-full flex items-center justify-between border-b-1 bg-card border-muted"
        >
            {tabs.map((item, i) => {
                return (
                    <div key={i}
                        onClick={item.onClick}
                        className={cn("p-2 border-b-2 px-4 flex-1 items-center justify-center flex cursor-pointer",
                            item.isActive ? "border-primary-500 text-primary" : "border-card text-muted")}
                    >
                        <p className={cn("text-[11px] font-semibold")} >{item.title}</p>
                    </div>
                )
            }
            )}
        </div>
    )
}