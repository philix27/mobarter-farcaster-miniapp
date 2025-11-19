import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";
import { BsWallet, BsPerson } from "react-icons/bs";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import QRCode from "react-qr-code";
import { Button } from "@/components/Button";
import { copyTextToClipboard } from "@/src/lib/utils";
import { toast } from "sonner";
import { DrawerSideContent } from "@/components/Drawer";
import { Input } from "@/components/Input";

type Actions = "TRANSFER" | "DEPOSIT" | "WALLET" | "BUY" | "SELL" | "NONE"
export function QuickActions() {
    const router = useRouter()
    const [action, setAction] = useState<Actions>("NONE")
    const actions: { Icon: IconType; title: string; href: string; onClick: VoidFunction }[] = [
        {
            title: "Transfer", href: "/bills", Icon: FiSend, onClick: () => {
                setAction("TRANSFER")
            }
        },
        {
            title: "Deposit", href: "/bills", Icon: MdOutlineCallReceived,
            onClick: () => {
                void router.push("/bills")
            }
        },
        {
            title: "Wallet", href: "/bills", Icon: BsWallet, onClick: () => {
                setAction("WALLET")
            }
        },
        {
            title: "Buy", href: "/buy", Icon: BsPerson, onClick: () => {
                setAction("BUY")
            }
        },
        {
            title: "Sell", href: "/sell", Icon: BsPerson, onClick: () => {
                setAction("SELL")
            }
        },
        // { title: "TopUp", href: "/bills", Icon: BsPhone, },
        // { title: "Bills", href: "/bills", Icon: FaDollarSign, },
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
                            onClick={item.onClick}
                        >
                            <div className=' p-3 rounded-md mb-1'>
                                <Icon className='text-white' size={22} />
                            </div>

                            <p className='text-[10.4px] md:text-[14px] text-muted'>{item.title}</p>
                        </div>
                    )
                })}
                <WalletDrawer
                    isOpen={action == "WALLET"}
                    onClose={() => {
                        setAction("NONE")
                    }} />
                <TransferDrawer
                    isOpen={action == "TRANSFER"}
                    onClose={() => {
                        setAction("NONE")
                    }} />
                <SellCryptoDrawer
                    isOpen={action == "SELL"}
                    onClose={() => {
                        setAction("NONE")
                    }} />
                <BuyCryptoDrawer
                    isOpen={action == "BUY"}
                    onClose={() => {
                        setAction("NONE")
                    }} />
            </div>
        </div>
    )
}


function SellCryptoDrawer(props: { isOpen: boolean; onClose: VoidFunction }) {
    return (
        <DrawerSideContent
            open={props.isOpen}
            title={"Sell Crypto"}
            onClose={props.onClose}
            body={
                <div className="flex flex-col items-center bg-background space-y-8 rounded-lg p-4 mb-5 ">
                    <Input placeholder="Wallet" label="Wallet Address" />
                    <Input placeholder="Amount" label="Amount" />
                    <Input placeholder="Token" label="Select token" />
                    <Button btnName="Sell-crypto"
                        onClick={async () => {
                            toast.success("Sell")
                        }}>Buy</Button>
                </div>
            }
        />
    )
}
function BuyCryptoDrawer(props: { isOpen: boolean; onClose: VoidFunction }) {
    return (
        <DrawerSideContent
            open={props.isOpen}
            title={"Buy Crypto"}
            onClose={props.onClose}
            body={
                <div className="flex flex-col items-center bg-background space-y-8 rounded-lg p-4 mb-5 ">
                    <Input placeholder="Wallet" label="Wallet Address" />
                    <Input placeholder="Amount" label="Amount" />
                    <Input placeholder="Token" label="Select token" />
                    <Button btnName="Buy-crypto"
                        onClick={async () => {
                            toast.success("Buy")
                        }}>Buy</Button>
                </div>
            }
        />
    )
}

function TransferDrawer(props: { isOpen: boolean; onClose: VoidFunction }) {
    return (
        <DrawerSideContent
            open={props.isOpen}
            title={"Send Crypto"}
            onClose={props.onClose}
            body={
                <div className="flex flex-col items-center bg-background space-y-8 rounded-lg p-4 mb-5 ">
                    <Input placeholder="Wallet" label="Wallet Address" />
                    <Input placeholder="Amount" label="Amount" />
                    <Input placeholder="Token" label="Select token" />
                    <Button btnName="send-crypto"
                        onClick={async () => {
                            toast.success("Send")
                        }}>Send</Button>
                </div>
            }
        />
    )
}











function WalletDrawer(props: { isOpen: boolean; onClose: VoidFunction }) {
    // const [showSideBar, setShowSidebar] = useState<boolean>(false)
    const activeAccount = useActiveAccount()
    return (
        <DrawerSideContent
            open={props.isOpen}
            title={"Wallet Address"}
            onClose={props.onClose}
            body={
                <div className="flex flex-col items-center bg-background space-y-5 rounded-lg p-4 mb-5">
                    <QRCode
                        value={activeAccount?.address || "No wallet"}
                        size={150}
                        style={{ height: "auto", maxWidth: "70%", width: "70%" }}
                        viewBox={`0 0 256 256`}
                        bgColor={'#FFFFFF'}
                        fgColor={'#000000'}
                        level="L"
                        title="Wallet Address"
                    />
                    <p className="font-semibold">{activeAccount?.address || "No wallet"}</p>
                    <Button btnName="copy"
                        onClick={async () => {
                            await copyTextToClipboard(activeAccount?.address || "")
                            toast.success("Copied")
                        }}>Copy</Button>
                </div>
            }
        />
    )
}
