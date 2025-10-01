import React, { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'

export default function DesktopWrapper(props: { children: ReactNode }) {
    return (
        <div className='h-screen w-full'>
            <TopBar />
            <div className='w-full flex h-[calc(100vh-45px)]'>
                <Sidebar />
                <div className='w-full justify-center flex ' >
                    <div className='w-[60%] h-full' style={{ backgroundColor: "orange" }}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}


