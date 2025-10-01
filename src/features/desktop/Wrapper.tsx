import React, { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'

export default function DesktopWrapper(props: { children: ReactNode }) {
    return (
        <div className='h-screen w-full bg-background'>
            <TopBar />
            <div className='w-full flex h-[calc(100vh-45px)]'>
                <div className='md:block hidden'>
                    <Sidebar />
                </div>
                <div className='w-full justify-center flex py-10' >
                    <div className='md:w-[50%] w-[90%] h-full'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}


