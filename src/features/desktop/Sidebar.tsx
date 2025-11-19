import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BsBank, } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { MdDashboard, MdLogout, MdSavings, MdSettings, } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

export function Sidebar() {
    const { disconnect } = useDisconnect()
    const wallet = useActiveWallet();

    const path = usePathname()
    const drawerItems: { title: string; href: string; Icon: IconType; isActive: boolean }[] = [
        { title: "Dashboard", href: "/dashboard", Icon: MdDashboard, isActive: path === "/dashboard" },
        { title: "Bills & Payments", href: "/bills", Icon: FaDollarSign, isActive: path === "/bills" },
        { title: "Exchange", href: "/exchange", Icon: RiExchange2Fill, isActive: path === "/exchange" },
        { title: "Orders", href: "/orders", Icon: RiExchange2Fill, isActive: path === "/orders" },
        // { title: "Swap", href: "/swap", Icon: MdWallet, isActive: path === "/swap" },
        // { title: "Wallet", href: "/wallet", Icon: MdWallet, isActive: path === "/wallet" },
        // { title: "Invoice", href: "/invoice", Icon: MdWallet, isActive: path === "/invoice" },
        // { title: "Card", href: "/card", Icon: MdWallet, isActive: path === "/card" },
        // { title: "Support", href: "/support", Icon: MdWallet, isActive: path === "/support" },
        { title: "Savings", href: "/savings", Icon: MdSavings, isActive: path === "/savings" },
        { title: "Bank Account", href: "/bank-account", Icon: BsBank, isActive: path === "/bank-account" },
        { title: "Settings", href: "/profile", Icon: MdSettings, isActive: path === "/profile" },
    ]

    return (
        <div className='md:w-[275px] w-full h-full py-4 px-4 bg-card flex flex-col justify-between '>
            <div>
                {drawerItems.map((val, i) => {
                    const { Icon } = val;
                    return (
                        <Link key={i}
                            href={val.href}
                            className={cn("my-3 px-4 py-2 rounded-md hover:bg-primary hover:[&>p]:text-foreground  flex",
                                val.isActive && "border border-primary border-2 [&>p]:text-muted [&>svg]:text-muted")}>
                            <Icon className={cn("mr-4 text-muted", val.isActive && "text-muted")} size={20} />
                            <p className={cn("text-muted text-[14px] font-semibold", val.isActive && "text-foreground")}>{val.title}</p>
                        </Link>
                    )
                })}
            </div>

            <div className='space-y-1 mb-2 '>
                <div
                    onClick={() => {
                        if (wallet) {
                            disconnect(wallet)
                        }
                    }}
                    className={cn("my-3 px-4 py-2 rounded-md hover:bg-primary hover:[&>p]:text-foreground  flex",)}>
                    <MdLogout className={cn("mr-4 text-muted",)} size={20} />
                    <p className={cn("text-muted text-[14px] font-semibold")}>Sign out</p>
                </div>

                <div className='border-t border-border pt-4 mb-4 '></div>
                <div className='flex items-center justify-center space-x-2 '>
                    <img src='/logo.png' alt='Mobarter Logo' className='md:size-[25px] size-[20px] inline ' />
                    <p className='text-muted font-semibold text-[16px] '>Mobarter</p>
                </div>
                <div className='text-[12px] text-muted text-center '>
                    <p>© 2025 Mobarter Inc.</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
