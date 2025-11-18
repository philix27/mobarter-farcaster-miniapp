import React, { ReactNode, useEffect } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { useActiveAccount } from 'thirdweb/react'
import { useRouter } from 'next/router'

export default function DesktopWrapper(props: { children: ReactNode }) {

    return (
        <AuthChecker>
            <div className='h-screen w-full bg-background'>
                <TopBar />
                <div className='w-full flex h-[calc(100vh-45px)]'>
                    <div className='md:block hidden'>
                        <Sidebar />
                    </div>
                    <div className='w-full justify-center flex md:py-8 py-3' >
                        <div className='md:w-[50%] w-[90%] h-full'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </AuthChecker>
    )
}


export function AuthChecker(props: { children: ReactNode }) {
    const activeAccount = useActiveAccount()
    const route = useRouter()

    useEffect(() => {
        if (!activeAccount) {
            void route.push("/login")
        }
    }, [activeAccount, route]);

    return (
        <>
            {props.children}
        </>
    )
}
