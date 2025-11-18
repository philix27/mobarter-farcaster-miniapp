import { useDarkMode } from "@/src/styles/mediaQueries";
import { BsMoon, BsSun } from "react-icons/bs";
import { MdClose, MdMenu } from "react-icons/md";
import { Sidebar } from "./Sidebar";
import { Wallet } from "lucide-react";
import QRCode from "react-qr-code";
import React, { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/Button";
import { toast } from "sonner";
import { copyTextToClipboard, } from "@/src/lib/utils";
import { DrawerComp, } from "@/components/Drawer";


export function TopBar() {
    const { isDarkMode, setDarkMode } = useDarkMode()
    const [showSideBar, setShowSidebar] = useState<boolean>(false)
    const activeAccount = useActiveAccount()

    return (
        <div className='w-full h-[45px] md:px-[50px] px-[15px] flex items-center justify-between py-2 border-b-muted border-b-1 '>
            <div>
                <p className="font-bold text-[18px] hidden md:block">Mobarter</p>
                {showSideBar ? <MdClose className="md:hidden" onClick={() => {
                    setShowSidebar(false)
                }} /> : <MdMenu className="md:hidden"
                    onClick={() => {
                        setShowSidebar(true)
                    }} />}
                {showSideBar && <div className="fixed z-[10] top-[40px] left-0 w-screen bg-card md:hidden bg-card">
                    <Sidebar />
                </div>}
            </div>
            <div>

            </div>
            <div className="flex space-x-6 items-center">
                <DrawerComp
                    title={"Wallet Address"}
                    trigger={<Wallet
                        size={20}
                    />}
                    body={
                        <div className="flex flex-col items-center bg-background space-y-5 rounded-lg p-4 mb-5">
                            <QRCode
                                value={activeAccount?.address || "No wallet"}
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
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




                <div className="flex space-x-3 mr-5">
                    {isDarkMode ? <BsSun
                        size={20}
                        onClick={() => {
                            setDarkMode(false)
                        }}
                    /> : <BsMoon size={20} onClick={() => {
                        setDarkMode(true)
                    }} />}
                </div>
            </div>

        </div>
    )
}


