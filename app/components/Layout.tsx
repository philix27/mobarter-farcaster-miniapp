'use client'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { BiArrowBack } from 'react-icons/bi';

export default function AppLayout(props: { children: ReactNode; title: string; subtitle?: string; hideBack?: boolean }) {
    return (
        <div className="flex flex-col min-h-screen w-screen bg-background" >
            <div className='p-10'>
                <Navbar title={props.title} hideBack={props.hideBack} />
                {props.children}
            </div>
        </div>
    )
}


export function Navbar(props: { title: string; hideBack?: boolean }) {
    const router = useRouter();
    return (
        <div className='w-full h-[40px] flex items-center px-4 border-b'
            onClick={() => {
                console.log("Closer")
            }}>
            {props.hideBack || <BiArrowBack
                size={20}
                onClick={() => {
                    console.log("Closer")
                    router.back()
                }}
                className='mr-5' />}
            <div className='w-full flex items-center justify-center'>
                <p style={{ marginLeft: 20 }} className='font-bold'>{props.title} </p>
            </div>
        </div>
    )
}
export function Footer() {
    return (
        <div>

        </div>
    )
}
