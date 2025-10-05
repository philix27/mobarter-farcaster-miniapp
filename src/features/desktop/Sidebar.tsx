import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BsBank, BsPerson } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { MdDashboard, MdSavings, MdWallet } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";

export function Sidebar() {
    const path = usePathname()
    const drawerItems: { title: string; href: string; Icon: IconType; isActive: boolean }[] = [
        { title: "Dashboard", href: "/dashboard", Icon: MdDashboard, isActive: path === "/dashboard" },
        { title: "Bills & Payments", href: "/bills", Icon: FaDollarSign, isActive: path === "/bills" },
        { title: "Exchange", href: "/exchange", Icon: RiExchange2Fill, isActive: path === "/exchange" },
        { title: "Wallet", href: "/wallet", Icon: MdWallet, isActive: path === "/wallet" },
        { title: "Savings", href: "/savings", Icon: MdSavings, isActive: path === "/savings" },
        { title: "Bank Account", href: "/bank-account", Icon: BsBank, isActive: path === "/bank-account" },
        { title: "Profile", href: "/profile", Icon: BsPerson, isActive: path === "/profile" },
    ]
    return <div className='md:w-[275px] w-full bg-card h-full py-4 px-3 bg-card'>
        <div>
            {drawerItems.map((val, i) => {
                const { Icon } = val;
                return (
                    <Link key={i}
                        href={val.href}
                        className={cn("my-2 px-4 py-2 rounded-md hover:bg-primary hover:text-white hover:text-foreground flex",
                            val.isActive && "bg-primary text-foreground")}>
                        <Icon className={cn("mr-4 text-muted", val.isActive && "text-foreground")} size={20} />
                        <p className={cn("text-muted  hover:text-foreground text-[13px]", val.isActive && "text-foreground")}>{val.title}</p>
                    </Link>
                )
            })}
        </div>
    </div>
}
