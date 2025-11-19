import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";
import { BsWallet,BsPerson } from "react-icons/bs";

export function QuickActions() {
    const router = useRouter()
    const actions: { Icon: IconType; title: string; href: string }[] = [
        { title: "Transfer", href: "/bills", Icon: FiSend, },
        { title: "Deposit", href: "/bills", Icon: MdOutlineCallReceived, },
        { title: "Wallet", href: "/bills", Icon: BsWallet, },
        // { title: "TopUp", href: "/bills", Icon: BsPhone, },
        // { title: "Bills", href: "/bills", Icon: FaDollarSign, },
        { title: "Buy", href: "/buy", Icon: BsPerson, },
        { title: "Sell", href: "/sell", Icon: BsPerson, },
        // { title: "Exchange", href: "/exchange", Icon: RiExchange2Fill, },
        // { title: "Deposit", href: "/Deposit", Icon: MdSavings, },
    ]

    return (
        <div className="w-full flex items-center justify-center md:justify-normal ">
            <div className='flex items-center justify-around w-full md:w-[70%] space-x-4  p-3 rounded-md'>
                {actions.map((item, i) => {
                    const Icon = item.Icon;
                    return (
                        <div key={i} className='flex flex-col items-center hover:cursor-pointer bg-card rounded-md w-full py-2 '
                            onClick={() => {
                                void router.push(item.href)
                            }}
                        >
                            <div className=' p-3 rounded-md mb-1'>
                                <Icon className='text-white' size={22} />
                            </div>

                            <p className='text-[10.4px] md:text-[14px] text-muted'>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
