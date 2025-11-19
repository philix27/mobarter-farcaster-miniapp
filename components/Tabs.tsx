import { cn } from "@/src/lib/utils";

export type ITab = {
    title: string;
    value: string;
    comp?: JSX.Element;
    // isActive?: boolean;
    // onClick: VoidFunction;
}

export function Tabs(props: { onClick: (value: string) => void; activeValue: string; tabs: ITab[]; }) {
    const { tabs, activeValue } = props
    const ActiveComp = tabs.filter((t) => t.value === activeValue)[0].comp
    return (
        <>
            <div className="w-full border-b-1 bg-card border-muted flex items-center justify-around"
            >
                {tabs.map((item, i) => {
                    const isActive = item.value == activeValue
                    return (
                        <div key={i}
                            onClick={() => {
                                props.onClick(item.value)
                            }}
                            className={cn("py-1 md:py-2 border-b-2 px-4 w-full text-center",
                                isActive ? "border-primary-500 text-primary" : "border-card text-muted")}
                        >
                            <p className={"text-[12px] font-normal ".concat(isActive ? 'text-primary font-semibold' : 'text-muted')}  >{item.title}</p>
                        </div>
                    )
                }
                )}

            </div>
            {ActiveComp && ActiveComp}
        </>
    )
}
