import { cn } from "@/src/lib/utils";

export type ITab = {
    title: string;
    isActive: boolean;
    name: string
    onClick: VoidFunction;
}

export function Tabs({ tabs }: { tabs: ITab[]; }) {
    return (
        <div className="w-full border-b-1 bg-card border-muted flex items-center justify-around"
        >
            {tabs.map((item, i) => {
                return (
                    <div key={i}
                        onClick={item.onClick}
                        className={cn("py-1 border-b-2 px-4 w-full text-center",
                            item.isActive ? "border-primary-500 text-primary" : "border-card text-muted")}
                    >
                        <p className={"text-[12px] font-normal ".concat(item.isActive ? 'text-primary font-semibold' : 'text-muted')}  >{item.title}</p>
                    </div>
                )
            }
            )}
        </div>
    )
}
