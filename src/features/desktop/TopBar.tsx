import { useDarkMode } from "@/src/styles/mediaQueries";
import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { MdClose, MdMenu } from "react-icons/md";
import { Sidebar } from "./Sidebar";

export function TopBar() {
    const { isDarkMode, setDarkMode } = useDarkMode()
    const [showSideBar, setShowSidebar] = useState<boolean>(false)

    return (
        <div className='w-full h-[45px] md:px-[50px] px-[15px] flex items-center justify-between py-2 border-b-muted border-b-1 bg-card'>
            <div>
                <p className="font-bold text-[18px] hidden md:block">Mobarter</p>
                {showSideBar ? <MdClose  className="md:hidden" onClick={() => {
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
            <div className="flex">
                <div className="flex space-x-3 mr-5">
                    {isDarkMode ? <BsSun
                        onClick={() => {
                            setDarkMode(false)
                        }}
                    /> : <BsMoon onClick={() => {
                        setDarkMode(true)
                    }} />}
                </div>
                <p className="md:block hidden">Username</p>
            </div>
        </div>
    )
}
